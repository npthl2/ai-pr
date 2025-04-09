// src/pages/modifyService/modification/components/ModifiedServiceSelect.tsx
// 이 컴포넌트는 사용자가 변경할 서비스(요금제)를 선택할 수 있는 드롭다운 UI를 제공합니다.
// API에서 서비스 목록을 가져와 최신 출시 순으로 정렬하여 보여주고, 선택된 서비스 정보를 상위 컴포넌트로 전달합니다.
import { Box, Typography, TextField as MuiTextField } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';

import {
  useServicesQuery,
  Service,
  useCheckServiceAgeRestrictionQuery,
} from '@api/queries/modifyService/useModifyServiceQuery';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
import useModifyServiceStore from '@stores/ModifyServiceStoreRefact';
import useCustomerStore from '@stores/CustomerStore';
import Autocomplete from '@components/Autocomplete';
// import Tooltip from '@components/Tooltip';
import ServiceModificationBlockModal from '../components/ServiceModificationBlockModal';
import { ServiceModificationModalType } from '../constants/modalConstants';
import { ServicePlan } from '../../../../model/modifyService/ModifyServiceModel';
import {
  RootContainer,
  ServiceRowContainer,
  LeftSectionContainer,
  TitleTypography,
  AutocompleteContainer,
  PriceContainer,
  PriceTypography,
  RevertButton,
  // InfoIcon,
  WarningContainer,
  WarningMessage,
  ErrorIcon,
  ServicePrice,
  serviceTextFieldStyle,
  disabledTextFieldStyle,
} from './ModifiedServiceSelect.styled';

/**
 * 서비스 선택 컴포넌트
 * 요금제 목록을 조회하고 사용자가 선택한 요금제를 Zustand 스토어에 저장합니다.
 */
const ModifiedServiceSelect = () => {
  // 스토어에서 필요한 정보 가져오기
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  const selectedContractId = useCurrentServiceStore(
    (state) => state.selectedContractIds[selectedCustomerId] || '',
  );

  // Zustand 스토어에서 필요한 함수 가져오기
  const { getModifyServiceInfo, setSelectedService, revertToPreviousService, setRevertButtonClickedDate } =
    useModifyServiceStore();

  // 계약 탭에 대한 정보가 없으면 기본값 제공
  const modifyServiceInfo = getModifyServiceInfo(selectedCustomerId, selectedContractId);
  const selectedService = modifyServiceInfo?.selectedService || null;
  const isServiceModifiable = modifyServiceInfo?.isServiceModifiable || false;
  const previousService = modifyServiceInfo?.previousService || null;
  const isRollbackAvailable = modifyServiceInfo?.isRollbackAvailable || false;

  // 임시 선택된 서비스 정보 관리
  const [tempSelectedService, setTempSelectedService] = useState<Service | null>(null);

  const { data: services = [] } = useServicesQuery();

  // API 응답 데이터를 컴포넌트에서 사용하기 적합한 형태로 매핑합니다.
  const servicePlans: ServicePlan[] = services.map((service: Service) => ({
    id: service.serviceId,
    name: service.serviceName,
    price: service.serviceValue,
    releaseDate: service.releaseDate || '1970-01-01', // 빈 문자열인 경우 기본값 제공
  }));

  // 고객 나이 확인
  const { customers, isCustomer } = useCustomerStore();
  const selectedCustomer = customers.find((customer) => customer.id === selectedCustomerId);
  const customerAge = selectedCustomer && isCustomer(selectedCustomer) ? String(selectedCustomer.age) : '';

  // 나이 제한을 위한 상태 관리
  const [serviceAgeCheckParams, setServiceAgeCheckParams] = useState<{
    age: string;
    serviceId: string;
  }>({
    age: customerAge,
    serviceId: '',
  });

  // 나이 제한 확인 쿼리
  const { data: ageRestrictionData, refetch } = useCheckServiceAgeRestrictionQuery(
    serviceAgeCheckParams.age,
    serviceAgeCheckParams.serviceId,
    !!serviceAgeCheckParams.age && !!serviceAgeCheckParams.serviceId, // 두 값이 모두 있을 때만 쿼리 활성화
  );

  // 사용자가 서비스를 선택했을 때 실행되는 핸들러
  const handlePlanChange = (
    _: SyntheticEvent,
    newValue: NonNullable<string | ServicePlan> | (string | ServicePlan)[] | null,
  ) => {
    // 새로운 선택이 들어오면 먼저 이전 선택 초기화
    setSelectedService(selectedCustomerId, selectedContractId, null);
    // 임시 선택된 서비스도 초기화
    setTempSelectedService(null);

    if (newValue && typeof newValue === 'object' && !Array.isArray(newValue) && 'id' in newValue) {
      if (!customerAge || !isServiceModifiable) {
        return;
      }

      const selectedServiceData =
        services.find((service: Service) => service.serviceId === newValue.id) || null;
      if (selectedServiceData) {
        // 먼저 파라미터 설정
        setServiceAgeCheckParams({
          age: customerAge,
          serviceId: selectedServiceData.serviceId,
        });

        // 파라미터 설정 후 다음 렌더링 사이클에서 임시 선택 서비스 설정
        setTimeout(() => {
          setTempSelectedService(selectedServiceData);
          refetch(); // 쿼리 강제 재실행
        }, 0);
      }
    }
  };

  // 이전 요금제가 있고, 당일 변경되었으며, 요금제 변경이 불가능한 상태인 경우에만 되돌리기 버튼 표시
  const showRevertButton = previousService && isRollbackAvailable && !isServiceModifiable;

  // 이전 요금제로 되돌리기 핸들러
  const handleRevertToPreviousService = () => {
    revertToPreviousService(selectedCustomerId, selectedContractId);
    // 되돌리기 버튼 클릭 시점의 날짜 저장
    setRevertButtonClickedDate(selectedCustomerId, selectedContractId, new Date().toISOString());
  };

  // 나이 제한 확인 결과 처리
  useEffect(() => {
    if (ageRestrictionData && tempSelectedService) {
      // 실제 ServiceAgeCheckResponse 타입으로 처리
      if ('isAvailable' in ageRestrictionData) {
        if (ageRestrictionData.isAvailable) {
          if (tempSelectedService.serviceId === previousService?.serviceId) {
            revertToPreviousService(selectedCustomerId, selectedContractId);
          } else {
            // 일반 요금제 변경인 경우 확인 모달 표시
            openConfirmModal(tempSelectedService.serviceName);
          }
        } else {
          // 나이 제한 있음 - 나이 제한 알림 모달 표시
          openAgeRestrictionModal();
        }
      }
    }
  }, [ageRestrictionData, tempSelectedService]);

  // 최신출시순으로 정렬
  // 서비스 목록을 출시일 기준 내림차순으로 정렬하여 최신 서비스가 상단에 표시되도록 합니다.
  const sortedServicePlans = [...servicePlans].sort((a, b) => {
    // 빈 releaseDate 처리를 위한 안전한 정렬 로직
    const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
    const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
    return dateB - dateA;
  });

  // 선택된 서비스가 있을 경우 해당 서비스 플랜 찾기
  const selectedPlan = selectedService
    ? servicePlans.find((plan) => plan.id === selectedService.serviceId) || null
    : null;

  // 모달 상태 관리
  const [modalState, setModalState] = useState<{
    open: boolean;
    type: ServiceModificationModalType;
    serviceName?: string;
  }>({
    open: false,
    type: ServiceModificationModalType.CONFIRM_CHANGE,
    serviceName: '',
  });

  // 모달 열기 함수들
  const openConfirmModal = (serviceName: string) => {
    setModalState({
      open: true,
      type: ServiceModificationModalType.SERVICE_CHANGE,
      serviceName,
    });
  };

  const openAgeRestrictionModal = () => {
    setModalState({
      open: true,
      type: ServiceModificationModalType.AGE_RESTRICTION,
    });
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalState((prev: typeof modalState) => ({ ...prev, open: false }));
  };

  // 요금제 변경 확인 처리 함수
  const handleConfirmModal = () => {
    // 요금제 변경 로직 처리
    if (tempSelectedService) {
      setSelectedService(selectedCustomerId, selectedContractId, tempSelectedService);
    }

    // 모달 닫기
    closeModal();
  };

  return (
    <RootContainer>
      <ServiceRowContainer>
        <LeftSectionContainer>
          <TitleTypography variant='subtitle1'>변경할 요금제</TitleTypography>
          <AutocompleteContainer>
            <Autocomplete
              fullWidth
              value={selectedPlan}
              options={sortedServicePlans}
              freeSolo={false}
              multiple={false}
              getOptionLabel={(option) => {
                return (option as ServicePlan).name;
              }}
              isOptionEqualToValue={(option, value) => {
                return (option as ServicePlan).id === (value as ServicePlan).id;
              }}
              disabled={!isServiceModifiable}
              slotProps={{
                listbox: {
                  style: {
                    maxHeight: '190px',
                    scrollbarWidth: 'thin',
                  },
                },
              }}
              renderOption={(props, option) => (
                <Box
                  component='li'
                  {...props}
                  sx={{
                    padding: '0 !important',
                    '&:hover, &.Mui-focused': {
                      backgroundColor: '#EBF0F5',
                    },
                  }}
                >
                  <Box
                    data-testid='service-option'
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '12px 16px',
                    }}
                  >
                    <Typography>{(option as ServicePlan).name}</Typography>
                    <ServicePrice>{(option as ServicePlan).price.toLocaleString()}</ServicePrice>
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <MuiTextField
                  {...params}
                  placeholder={isServiceModifiable ? '요금제 선택' : '요금제 검색'}
                  size='small'
                  sx={isServiceModifiable ? serviceTextFieldStyle : disabledTextFieldStyle}
                  data-testid='service-select-box'
                />
              )}
              onChange={handlePlanChange}
              size='small'
            />
          </AutocompleteContainer>
        </LeftSectionContainer>

        <PriceContainer>
          <PriceTypography variant='subtitle1' data-testid='selected-service-price'>
            {selectedService ? `${selectedService.serviceValue.toLocaleString()}원` : '0원'}
          </PriceTypography>

          {showRevertButton && (
            <RevertButton
              variant='outlined'
              color='primary'
              size='small'
              onClick={handleRevertToPreviousService}
              data-testid='revert-service-button'
            >
              이전 요금제로 되돌리기
            </RevertButton>
          )}
        </PriceContainer>
      </ServiceRowContainer>

      {/* 금일 요금제 변경으로 인한 안내 메시지 */}
      {isRollbackAvailable && !isServiceModifiable && (
        <WarningContainer>
          <ErrorIcon />
          <WarningMessage>
            금일 요금제 변경으로 인해 이전 요금제로 되돌리기만 가능합니다.
          </WarningMessage>
        </WarningContainer>
      )}

      {/* 모달 컴포넌트 */}
      <ServiceModificationBlockModal
        open={modalState.open}
        type={modalState.type}
        serviceName={modalState.serviceName}
        onClose={closeModal}
        onConfirm={handleConfirmModal}
      />
    </RootContainer>
  );
};

export default ModifiedServiceSelect;
