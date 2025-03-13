import React, { useState, useEffect, useRef, Suspense } from 'react';
import {
  Box,
  Typography,
  Chip,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AdditionalServiceSelectModal from './AdditionalServiceSelectModal';
import ServiceSelectModal from './ServiceSelectModal';
import PhoneNumberSelectModal from './PhoneNumberSelectModal';
import useRegistrationContractStore from '@stores/registration/RegistrationContractStore';

import {
  SectionContainer,
  SectionInfoContainer,
  SectionTitle,
  FormRow,
  FormRowSection,
  FormLabel,
  RequiredLabel,
  StyledTextField,
  StyledRadio,
  ActionButton,
  TwoColumnContainer,
  Column,
  FormRowSectionPlan,
} from './ContractSectionComponent.styles';
import useCustomerStore from '@stores/CustomerStore';
import registrationContractService from '@api/services/registrationContractService';

interface PhoneNumber {
  id: number;
  status: string;
  phoneNumber: string;
  provider: string;
  expirationDate: string;
}

interface Service {
  serviceId: string;
  serviceName: string;
  serviceValueType: string;
  serviceValue: number;
}

interface AdditionalService extends Service {
  exclusiveServiceIds: string[];
}

interface ContractSectionComponentProps {
  contractTabId: string;
  onComplete: () => void;
}

const ContractSectionComponent: React.FC<ContractSectionComponentProps> = ({
  contractTabId,
  onComplete,
}) => {
  const {
    addRegistrationContractInfo,
    updateRegistrationContractInfo,
    updateRegistarationContractValidationFlag,
    getRegistarationContractValidationFlag,
  } = useRegistrationContractStore();

  const [customerId, setCustomerId] = useState<string>(null);

  const [subscriptionType, setSubscriptionType] = useState<string>('신규가입');
  const [sellType, setSellType] = useState<string>('신규폰');
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<PhoneNumber | null>(null);
  const [phoneNumberLastFour, setPhoneNumberLastFour] = useState<string>('');
  const [simNumber, setSimNumber] = useState<string>('');
  const [imeiNumber, setImeiNumber] = useState<string>('');
  const [deviceModelName, setDeviceModelName] = useState<string>('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<AdditionalService[]>(
    [],
  );

  const [isPhoneNumberModalOpen, setIsPhoneNumberModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState<boolean>(false);
  const [isAdditionalServiceModalOpen, setIsAdditionalServiceModalOpen] = useState<boolean>(false);

  const [showDebugInfo, setShowDebugInfo] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, validationField>>({
    salesType: { state: 'active', helperText: '' },
    phoneNumber: { state: 'active', helperText: '' },
    simNumber: { state: 'active', helperText: '' },
    imeiNumber: { state: 'active', helperText: '' },
    servicePlan: { state: 'active', helperText: '' },
  });

  const currentCustomerId = useCustomerStore((state) => state.selectedCustomerId);
  const currentContract = useRegistrationContractStore((state) => state.contracts[contractTabId]);
  const validationFlag = getRegistarationContractValidationFlag(contractTabId);

  const phoneNumberInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // store 정보 생성
    setCustomerId(currentCustomerId ?? '');
    addRegistrationContractInfo(contractTabId, {
      subscriptionType,
      sellType,
    });
    // 전화번호 입력 필드에 포커스 설정
    if (phoneNumberInputRef.current) {
      phoneNumberInputRef.current.focus();
    }
  }, []);

  // 모든 필드가 채워졌는지 확인하여 완료 되었을 때만 아코디언 활성화 함수 호출(한번 활성화 되면 비활성화 X)
  useEffect(() => {
    if (validationFlag) {
      console.log('contract section validationFlag', validationFlag);
      onComplete();
    }
  }, [validationFlag]);

  // 버튼, 모달 등에서 데이터 확정되어 들어오는 경우 useEffect로 관리하여 업데이트
  useEffect(() => {
    handleUpdateStoreAndValidationCompleteFields(contractTabId, {
      sellType: sellType,
      phoneNumber: selectedPhoneNumber?.phoneNumber ?? '',
      service: selectedService,
      additionalServices: selectedAdditionalServices,
      deviceModelName: deviceModelName,
    });
  }, [sellType, selectedPhoneNumber, selectedService, selectedAdditionalServices, deviceModelName]);

  // 전화번호 - 번호 채번 핸들러
  const handlePhoneNumberModalOpen = () => setIsPhoneNumberModalOpen(true);
  const handlePhoneNumberModalClose = () => setIsPhoneNumberModalOpen(false);
  const handlePhoneNumberSelect = (phoneNumber: PhoneNumber) => {
    setSelectedPhoneNumber(phoneNumber);
  };
  const handlePhoneNumberLastFourChange = (value: string) => {
    const replacedValue = value.replace(/[^0-9]/g, '');
    if (replacedValue.length <= 4) {
      setPhoneNumberLastFour(replacedValue);
      setSelectedPhoneNumber(null);
      handleUpdateStoreAndValidationCompleteFields(contractTabId, {
        phoneNumber: '',
      });
      // 4자리 미만일 때 에러 상태 설정
      setValidationErrors((prev) => ({
        ...prev,
        phoneNumber: {
          state: value.length < 4 ? 'error' : 'active',
          helperText: value.length < 4 ? '4자리를 입력해주세요' : '',
        },
      }));
    }
  };

  // SIM 핸들러
  const handleSimNumberChange = (value: string) => {
    const replacedValue = value.replace(/[^0-9]/g, '');
    setSimNumber(replacedValue);
    handleUpdateStoreAndValidationCompleteFields(contractTabId, {
      sim: '',
    });
    setValidationErrors((prev) => ({
      ...prev,
      simNumber: {
        state: !replacedValue ? 'error' : 'active',
        helperText: !replacedValue ? 'SIM을 입력해 주세요' : '',
      },
    }));
  };

  const handleImeiNumberChange = (value: string) => {
    setImeiNumber(value);
    setDeviceModelName('');
    handleUpdateStoreAndValidationCompleteFields(contractTabId, {
      imei: '',
    });
    setValidationErrors((prev) => ({
      ...prev,
      imeiNumber: {
        state: !value ? 'error' : 'active',
        helperText: !value ? 'IMEI를 입력해 주세요' : '',
      },
    }));
  };

  // 요금제 모달 핸들러
  const handleServiceModalOpen = () => setIsServiceModalOpen(true);
  const handleServiceModalClose = () => setIsServiceModalOpen(false);
  const handleServiceSelect = (selectedServiceFromModal: Service) => {
    // 기존 요금제와 새로 선택한 요금제가 다른 경우에만 부가서비스 초기화
    if (!selectedService || selectedService.serviceId !== selectedServiceFromModal.serviceId) {
      // 요금제가 변경되면 선택된 부가서비스를 모두 제거
      setSelectedAdditionalServices([]);
    }
    setSelectedService(selectedServiceFromModal);
  };

  // 부가서비스 모달 핸들러
  const handleAdditionalServiceModalOpen = () => setIsAdditionalServiceModalOpen(true);
  const handleAdditionalServiceModalClose = () => setIsAdditionalServiceModalOpen(false);
  const handleRemoveAdditionalService = (serviceId: string) => {
    setSelectedAdditionalServices((prev) =>
      prev.filter((service) => service.serviceId !== serviceId),
    );
  };

  const handleDeviceModelName = async (imeiNumber: string): Promise<void> => {
    const response = await registrationContractService.getDeviceModelByIMEI(imeiNumber);
    const deviceModelName = response.deviceModelNameAlias ?? '';
    setDeviceModelName(deviceModelName);
    setValidationErrors((prev) => ({
      ...prev,
      imeiNumber: {
        state: deviceModelName === '' ? 'error' : 'active',
        helperText: deviceModelName === '' ? '존재하는 모델이 없습니다' : '',
      },
    }));
  };

  const handleUpdateStoreAndValidationCompleteFields = (
    contractTabId: string,
    partialContract: any,
  ) => {
    // 스토어에 변경사항 업데이트 하고 모든 필드가 채워졌는지 validation field도 업데이트
    updateRegistrationContractInfo(contractTabId, partialContract);
    updateRegistarationContractValidationFlag(contractTabId);
  };

  interface validationField {
    state: 'error' | 'active';
    helperText: string;
  }

  const validateRequiredFields = (): boolean => {
    const errors: Record<string, validationField> = {};

    // Check sales type
    if (!sellType) {
      errors.salesType.state = 'error';
      errors.salesType.helperText = '판매유형을 선택해 주세요요';
    } else {
      errors.salesType.state = 'active';
      errors.salesType.helperText = '';
    }

    // Check phone number
    if (!selectedPhoneNumber?.phoneNumber || selectedPhoneNumber.phoneNumber.length < 4) {
      errors.phoneNumber.state = 'error';
      errors.phoneNumber.helperText = '4자리를 입력해주세요';
    } else {
      errors.phoneNumber.state = 'active';
      errors.phoneNumber.helperText = '';
    }

    // Check SIM
    if (!simNumber || simNumber === '') {
      errors.simNumber.state = 'error';
      errors.simNumber.helperText = 'SIM을 입력해 주세요';
    } else {
      errors.simNumber.state = 'active';
      errors.simNumber.helperText = '';
    }

    // Check IMEI
    if (!imeiNumber || imeiNumber === '') {
      errors.imeiNumber.state = 'error';
      errors.imeiNumber.helperText = 'IMEI를 입력해 주세요';
    } else {
      errors.imeiNumber.state = 'active';
      errors.imeiNumber.helperText = '';
    }

    // Check service plan
    if (!selectedService?.serviceId || selectedService.serviceId === '') {
      errors.servicePlan.state = 'error';
      errors.servicePlan.helperText = '요금제를 선택해 주세요';
    } else {
      errors.servicePlan.state = 'active';
      errors.servicePlan.helperText = '';
    }

    setValidationErrors(errors);

    // 전 필드 정상 상태
    return Object.keys(errors).length === 0;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SectionContainer>
        <TwoColumnContainer>
          <Column>
            {/* 가입기본정보 섹션 */}
            <SectionInfoContainer>
              <SectionTitle>
                <Typography variant='h5'>가입기본정보</Typography>
              </SectionTitle>

              <FormRow>
                <FormLabel>
                  <Typography variant='h5'>가입유형</Typography>
                </FormLabel>
                <Typography>{subscriptionType}</Typography>
              </FormRow>

              <FormRow>
                <FormLabel>
                  판매유형<RequiredLabel>*</RequiredLabel>
                </FormLabel>
                <RadioGroup row value={sellType} onChange={(e) => setSellType(e.target.value)}>
                  <FormControlLabel value='신규폰' control={<StyledRadio />} label='신규폰' />
                  <FormControlLabel value='중고폰' control={<StyledRadio />} label='중고폰' />
                </RadioGroup>
                {validationErrors.salesType.state === 'error' && (
                  <Typography color='error' variant='caption' sx={{ ml: 1 }}>
                    필수 항목입니다
                  </Typography>
                )}
              </FormRow>

              <FormRowSection>
                <FormLabel>
                  전화번호<RequiredLabel>*</RequiredLabel>
                </FormLabel>
                <StyledTextField
                  placeholder='뒤 4자리*'
                  size='small'
                  sx={{ width: '140px' }}
                  variant='outlined'
                  value={phoneNumberLastFour}
                  onChange={(value) => handlePhoneNumberLastFourChange(value)}
                  state={validationErrors.phoneNumber.state}
                  helperText={validationErrors.phoneNumber.helperText}
                  absoluteHelperText={true}
                  inputRef={phoneNumberInputRef}
                  inputProps={{
                    maxLength: 4,
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                />
                <ActionButton
                  variant='outlined'
                  size='small'
                  onClick={handlePhoneNumberModalOpen}
                  disabled={phoneNumberLastFour.length !== 4}
                >
                  <Typography sx={{ fontSize: '13px' }}>번호채번</Typography>
                </ActionButton>
                <Typography sx={{ ml: 1 }}>{selectedPhoneNumber?.phoneNumber ?? ''}</Typography>
              </FormRowSection>
            </SectionInfoContainer>

            {/* 기기정보 섹션 */}
            <SectionInfoContainer sx={{ mt: 1 }}>
              <SectionTitle>
                <Typography variant='h5'>기기정보</Typography>
              </SectionTitle>

              <FormRow>
                <FormLabel>
                  SIM<RequiredLabel>*</RequiredLabel>
                </FormLabel>
                <StyledTextField
                  sx={{ width: '160px' }}
                  size='small'
                  variant='outlined'
                  inputProps={{
                    maxLength: 13,
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                  value={simNumber}
                  onChange={handleSimNumberChange}
                  onBlur={() => {
                    handleUpdateStoreAndValidationCompleteFields(contractTabId, {
                      sim: simNumber,
                    });
                  }}
                  state={validationErrors.simNumber.state}
                  absoluteHelperText={true}
                  helperText={validationErrors.simNumber.helperText}
                />
              </FormRow>

              <FormRowSection sx={{ mt: 1 }}>
                <FormLabel>
                  IMEI<RequiredLabel>*</RequiredLabel>
                </FormLabel>
                <StyledTextField
                  sx={{
                    width: '160px',
                  }}
                  size='small'
                  variant='outlined'
                  value={imeiNumber}
                  onChange={handleImeiNumberChange}
                  onBlur={() => {
                    handleUpdateStoreAndValidationCompleteFields(contractTabId, {
                      imei: imeiNumber,
                    });
                    handleDeviceModelName(imeiNumber);
                  }}
                  state={validationErrors.imeiNumber.state}
                  absoluteHelperText={true}
                  helperText={validationErrors.imeiNumber.helperText}
                />

                <Typography variant='body1'>모델명: {deviceModelName}</Typography>
              </FormRowSection>
            </SectionInfoContainer>
          </Column>

          <Column>
            {/* 상품정보 섹션 */}
            <SectionInfoContainer>
              <SectionTitle>
                <Typography variant='h5'>상품정보</Typography>
              </SectionTitle>

              <FormRowSectionPlan>
                <FormLabel>
                  요금제<RequiredLabel>*</RequiredLabel>
                </FormLabel>
                <TextField
                  size='small'
                  variant='outlined'
                  value={selectedService ? selectedService.serviceName : ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <SearchIcon onClick={handleServiceModalOpen} sx={{ cursor: 'pointer' }} />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                  error={validationErrors.servicePlan.state === 'error'}
                  helperText={validationErrors.servicePlan.helperText}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      width: '200px',
                      height: '28px',
                    },
                  }}
                />
                <Typography
                  sx={{
                    ml: 2,
                  }}
                >
                  {selectedService
                    ? `${selectedService.serviceValue.toLocaleString()} 
              원`
                    : '0 원'}
                </Typography>
              </FormRowSectionPlan>

              {/* {selectedService && selectedService.serviceId && (
              <div>
                <h3>선택된 서비스</h3>
                <p>{selectedService.serviceName}</p>
              </div>
            )} */}

              <FormRow>
                <FormLabel>부가서비스</FormLabel>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ActionButton
                    variant='outlined'
                    size='small'
                    sx={{ width: '100px', height: '28px' }}
                    onClick={handleAdditionalServiceModalOpen}
                    disabled={!selectedService?.serviceId}
                  >
                    부가서비스 선택
                  </ActionButton>
                </Box>
              </FormRow>
              <FormRow>
                <FormLabel></FormLabel>
                {selectedAdditionalServices.length > 0 && (
                  <div>
                    {selectedAdditionalServices.map((service) => (
                      <Box
                        key={service.serviceId}
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      >
                        <Chip
                          sx={{ mr: 1 }}
                          label={`${service.serviceName} - ${service.serviceValue.toLocaleString()}원`}
                          onDelete={() => handleRemoveAdditionalService(service.serviceId)}
                        />
                      </Box>
                    ))}
                  </div>
                )}
              </FormRow>
            </SectionInfoContainer>
          </Column>
        </TwoColumnContainer>

        {/* 모달 컴포넌트들 */}
        <PhoneNumberSelectModal
          open={isPhoneNumberModalOpen}
          onClose={handlePhoneNumberModalClose}
          onSelect={handlePhoneNumberSelect}
          lastFourDigits={phoneNumberLastFour}
          customerId={customerId}
        />

        <ServiceSelectModal
          open={isServiceModalOpen}
          onClose={handleServiceModalClose}
          onSelect={(selectedPlan) => {
            const serviceData: Service = {
              serviceId: selectedPlan.id.toString(),
              serviceName: selectedPlan.name,
              serviceValueType: 'amount',
              serviceValue: selectedPlan.amount,
            };
            handleServiceSelect(serviceData);
          }}
        />

        <AdditionalServiceSelectModal
          open={isAdditionalServiceModalOpen}
          onClose={handleAdditionalServiceModalClose}
          onSelect={(selectedServices) => {
            setSelectedAdditionalServices(selectedServices);
          }}
          selectedServiceId={selectedService?.serviceId || ''}
          initialSelectedAdditionalServices={selectedAdditionalServices.map((service) => ({
            serviceId: service.serviceId,
            serviceName: service.serviceName,
            serviceValue: service.serviceValue,
            serviceValueType: service.serviceValueType,
            exclusiveServiceIds: service.exclusiveServiceIds,
          }))}
        />
      </SectionContainer>
    </Suspense>
  );
};

export default ContractSectionComponent;
