import React, { useState, useEffect, useRef } from 'react';
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
  SectionTitle,
  FormRow,
  FormLabel,
  RequiredLabel,
  StyledTextField,
  StyledRadio,
  ActionButton,
  TwoColumnContainer,
  Column,
} from './ContractSectionComponent.styles';
import useCustomerStore from '@stores/CustomerStore';

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
  const { addRegistrationContractInfo, updateRegistrationContractInfo } =
    useRegistrationContractStore();

  // Add ref for phone number input field
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);
  const [customerId, setCustomerId] = useState<string>(null);

  const [subscriptionType, setSubscriptionType] = useState<string>('신규가입');
  const [salesType, setSalesType] = useState<string>('신규폰');
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

  useEffect(() => {
    setCustomerId(currentCustomerId ?? '');

    const initialContract = {
      subscriptionType,
      salesType,
    };

    addRegistrationContractInfo(contractTabId, initialContract);

    // 전화번호 입력 필드에 포커스 설정
    if (phoneNumberInputRef.current) {
      phoneNumberInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    console.log('Required fields check:', {
      salesType: !!salesType && salesType !== '',
      phoneNumber: !!selectedPhoneNumber?.phoneNumber && selectedPhoneNumber.phoneNumber !== '',
      simNumber: !!simNumber && simNumber !== '',
      imeiNumber: !!imeiNumber && imeiNumber !== '',
      service: !!selectedService?.serviceId && selectedService.serviceId !== '',
      allFieldsFilled: areAllRequiredFieldsFilled(),
    });

    // 모든 필수 필드가 채워져 있는지 확인
    if (areAllRequiredFieldsFilled()) {
      // 모든 필드가 채워져 있으면 계약 정보 업데이트
      updateRegistrationContractInfo(contractTabId, {
        sellType: salesType,
        phoneNumber: selectedPhoneNumber?.phoneNumber || '',
        sim: simNumber,
        imei: imeiNumber,
        service: selectedService ? selectedService : undefined,
        additionalServices:
          selectedAdditionalServices.map((service) => ({
            serviceId: service.serviceId,
            serviceName: service.serviceName,
            serviceValueType: service.serviceValueType,
            serviceValue: service.serviceValue,
          })) || [],
      });
      // onComplete(); // 완료 시 다음 섹션으로 넘어가는 함수 호출 -- 별도 페이지 테스트 시는 막아놓기
    }
  }, [
    salesType,
    selectedPhoneNumber,
    simNumber,
    deviceModelName,
    selectedService,
    selectedAdditionalServices,
    contractTabId,
  ]);

  const handlePhoneNumberModalOpen = () => {
    setIsPhoneNumberModalOpen(true);
  };
  const handlePhoneNumberModalClose = () => {
    setIsPhoneNumberModalOpen(false);
  };
  const handlePhoneNumberSelect = (phoneNumber: PhoneNumber) => {
    setSelectedPhoneNumber(phoneNumber);
  };

  const handlePhoneNumberLastFourChange = (value: string) => {
    if (value.length <= 4) {
      setPhoneNumberLastFour(value);
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

  // 요금제 모달 핸들러
  const handleServiceSelect = (selectedServiceFromModal: Service) => {
    console.log('!!!!!!!!!!!handleServiceSelect', selectedServiceFromModal);
    setSelectedService(selectedServiceFromModal);
    // 기존 요금제와 새로 선택한 요금제가 다른 경우에만 부가서비스 초기화
    if (!selectedService || selectedService.serviceId !== selectedServiceFromModal.serviceId) {
      // 요금제가 변경되면 선택된 부가서비스를 모두 제거
      setSelectedAdditionalServices([]);
    }
    setSelectedService(selectedServiceFromModal);
  };

  const handleRemoveService = (serviceId: string) => {
    const updatedServices = selectedAdditionalServices.filter(
      (service) => service.serviceId !== serviceId,
    );
    setSelectedAdditionalServices(updatedServices);
  };

  // 부가서비스 모달 핸들러
  const handleAdditionalServiceModalOpen = () => setIsAdditionalServiceModalOpen(true);
  const handleAdditionalServiceModalClose = () => setIsAdditionalServiceModalOpen(false);
  const handleAdditionalServiceSelect = (selectedService: AdditionalService) => {
    // 이미 선택된 서비스인지 확인
    const isAlreadySelected = selectedAdditionalServices.some(
      (s) => s.serviceId === selectedService.serviceId,
    );

    if (!isAlreadySelected) {
      // 중복되지 않은 경우에만 추가
      setSelectedAdditionalServices((prev) => [...prev, selectedService]);
    }
  };

  const handleRemoveAdditionalService = (serviceId: string) => {
    setSelectedAdditionalServices((prev) =>
      prev.filter((service) => service.serviceId !== serviceId),
    );
  };

  const handleDeviceModelName = (imeiNumber: string): string => {
    // TODO: 실제 API 호출 로직 추가
    setDeviceModelName('test');
    // setDeviceModelName('');
    return 'test1';
  };

  interface validationField {
    state: 'error' | 'active';
    helperText: string;
  }

  const validateRequiredFields = (): boolean => {
    const errors: Record<string, validationField> = {};

    console.log('342242342342342');

    // Check sales type
    if (!salesType) {
      errors.salesType.state = 'error';
      errors.salesType.helperText = '선택필수수';
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
      console.log('simNumber', simNumber);
      errors.simNumber.state = 'error';
      errors.simNumber.helperText = '필수';
    } else {
      console.log('simNumber', simNumber);
      errors.simNumber.state = 'active';
      errors.simNumber.helperText = '';
    }

    // Check IMEI
    if (!imeiNumber || imeiNumber === '') {
      errors.imeiNumber.state = 'error';
      errors.imeiNumber.helperText = '필수';
    } else {
      errors.imeiNumber.state = 'active';
      errors.imeiNumber.helperText = '';
    }

    // Check service plan
    if (!selectedService?.serviceId || selectedService.serviceId === '') {
      errors.servicePlan.state = 'error';
      errors.servicePlan.helperText = '필수';
    } else {
      errors.servicePlan.state = 'active';
      errors.servicePlan.helperText = '';
    }

    setValidationErrors(errors);

    // Return true if all fields are valid (no errors)
    return Object.keys(errors).length === 0;
  };

  // Add a function to check if all required fields are filled
  const areAllRequiredFieldsFilled = (): boolean => {
    return (
      !!salesType &&
      salesType !== '' &&
      !!selectedPhoneNumber?.phoneNumber &&
      selectedPhoneNumber.phoneNumber !== '' &&
      !!simNumber &&
      simNumber !== '' &&
      !!deviceModelName &&
      deviceModelName !== '' &&
      !!selectedService?.serviceId &&
      selectedService.serviceId !== ''
    );
  };

  return (
    <SectionContainer>
      <TwoColumnContainer>
        <Column>
          {/* 가입기본정보 섹션 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
              <RadioGroup row value={salesType} onChange={(e) => setSalesType(e.target.value)}>
                <FormControlLabel value='신규폰' control={<StyledRadio />} label='신규폰' />
                <FormControlLabel value='중고폰' control={<StyledRadio />} label='중고폰' />
              </RadioGroup>
              {validationErrors.salesType.state === 'error' && (
                <Typography color='error' variant='caption' sx={{ ml: 1 }}>
                  필수 항목입니다
                </Typography>
              )}
            </FormRow>

            <FormRow>
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
                inputRef={phoneNumberInputRef}
                slotProps={{
                  htmlInput: {
                    maxLength: 4,
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  },
                }}
              />
              <ActionButton
                variant='outlined'
                size='small'
                sx={{ width: '61px', height: '28px' }}
                onClick={handlePhoneNumberModalOpen}
                disabled={phoneNumberLastFour.length !== 4}
              >
                <Typography sx={{ fontSize: '13px' }}>번호채번</Typography>
              </ActionButton>
              {selectedPhoneNumber && (
                <Typography sx={{ ml: 2 }}>{selectedPhoneNumber.phoneNumber}</Typography>
              )}
            </FormRow>
          </div>

          {/* 기기정보 섹션 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SectionTitle>
              <Typography variant='h5'>기기정보</Typography>
            </SectionTitle>

            <FormRow>
              <FormLabel>
                SIM<RequiredLabel>*</RequiredLabel>
              </FormLabel>
              <StyledTextField
                fullWidth
                size='small'
                variant='outlined'
                value={simNumber}
                onChange={(value) => {
                  setSimNumber(value);
                  setValidationErrors((prev) => ({
                    ...prev,
                    simNumber: {
                      state: !value ? 'error' : 'active',
                      helperText: !value ? '필수' : '',
                    },
                  }));
                }}
                state={validationErrors.simNumber.state}
                helperText={validationErrors.simNumber.helperText}
              />
            </FormRow>

            <FormRow>
              <FormLabel>
                IMEI<RequiredLabel>*</RequiredLabel>
              </FormLabel>
              <StyledTextField
                fullWidth
                size='small'
                variant='outlined'
                value={imeiNumber}
                onChange={(value) => {
                  setImeiNumber(value);
                  setValidationErrors((prev) => ({
                    ...prev,
                    imeiNumber: {
                      state: !value ? 'error' : 'active',
                      helperText: !value ? '필수' : '',
                    },
                  }));
                }}
                onBlur={() => {
                  const deviceModelName = imeiNumber ? handleDeviceModelName(imeiNumber) : '';
                  if (!deviceModelName) {
                    setValidationErrors((prev) => ({
                      ...prev,
                      imeiNumber: {
                        state: 'error',
                        helperText: '모델명은 필수입니다',
                      },
                    }));
                  }
                }}
                state={validationErrors.imeiNumber.state}
                helperText={validationErrors.imeiNumber.helperText}
              />
              {deviceModelName && <Typography sx={{ ml: 2 }}>모델명: {deviceModelName}</Typography>}
            </FormRow>
          </div>
        </Column>

        <Column>
          {/* 상품정보 섹션 */}
          <SectionTitle>
            <Typography variant='h5'>상품정보</Typography>
          </SectionTitle>

          <FormRow>
            <FormLabel>
              요금제<RequiredLabel>*</RequiredLabel>
            </FormLabel>
            <TextField
              fullWidth
              size='small'
              variant='outlined'
              value={selectedService ? selectedService.serviceName : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <SearchIcon
                      onClick={() => setIsServiceModalOpen(true)}
                      sx={{ cursor: 'pointer' }}
                    />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              error={validationErrors.servicePlan.state === 'error'}
              helperText={validationErrors.servicePlan.helperText}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '32px',
                },
              }}
            />
            <Typography sx={{ ml: 2 }}>
              {selectedService
                ? `${selectedService.serviceValue.toLocaleString()} 
              원`
                : '0 원'}
            </Typography>
          </FormRow>

          {selectedService && selectedService.serviceId && (
            <div>
              <h3>선택된 서비스</h3>
              <p>{selectedService.serviceName}</p>
            </div>
          )}

          <FormRow>
            <FormLabel>부가서비스</FormLabel>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ActionButton
                variant='outlined'
                size='small'
                onClick={handleAdditionalServiceModalOpen}
                disabled={!selectedService?.serviceId}
              >
                부가서비스 선택
              </ActionButton>
            </Box>
          </FormRow>

          {selectedAdditionalServices.length > 0 && (
            <div>
              <h3>선택된 추가 서비스</h3>
              {selectedAdditionalServices.map((service) => (
                <Box key={service.serviceId} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Chip
                    label={service.serviceName}
                    onDelete={() => handleRemoveAdditionalService(service.serviceId)}
                    sx={{ mr: 1 }}
                  />
                </Box>
              ))}
            </div>
          )}
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
        onClose={() => setIsServiceModalOpen(false)}
        onSelect={(selectedFee) => {
          const serviceData: Service = {
            serviceId: selectedFee.id.toString(),
            serviceName: selectedFee.name,
            serviceValueType: 'amount',
            serviceValue: selectedFee.amount,
          };
          handleServiceSelect(serviceData);
        }}
      />

      <AdditionalServiceSelectModal
        open={isAdditionalServiceModalOpen}
        onClose={handleAdditionalServiceModalClose}
        onSelect={(selectedServices) => {
          const newServices = selectedServices
            .filter(
              (service) =>
                !selectedAdditionalServices.some(
                  (existing) => existing.serviceId === service.serviceId,
                ),
            )
            .map((service) => ({
              serviceId: service.serviceId,
              serviceName: service.serviceName,
              serviceValueType: service.serviceValueType,
              serviceValue: service.serviceValue,
              exclusiveServiceIds: service.exclusiveServiceIds,
            }));

          if (newServices.length > 0) {
            setSelectedAdditionalServices((prev) => [...prev, ...newServices]);
          }
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

      {/* Contract Store Debug Display */}
      <Box sx={{ mt: 4, borderTop: '1px dashed #ccc', pt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant='h6'>Contract Store Data</Typography>
          <ActionButton
            variant='outlined'
            size='small'
            onClick={() => setShowDebugInfo(!showDebugInfo)}
          >
            {showDebugInfo ? 'Hide Details' : 'Show Details'}
          </ActionButton>
        </Box>

        {showDebugInfo && currentContract && (
          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              p: 2,
              borderRadius: 1,
              maxHeight: '300px',
              overflow: 'auto',
            }}
          >
            <Typography variant='body2' component='pre' sx={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(currentContract, null, 2)}
            </Typography>
          </Box>
        )}
      </Box>
    </SectionContainer>
  );
};

export default ContractSectionComponent;
