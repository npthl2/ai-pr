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
import useModifyServiceStore from '@stores/ModifyServiceStore';
import useCustomerStore from '@stores/CustomerStore';
import Autocomplete from '@components/Autocomplete';
// import Tooltip from '@components/Tooltip';
import ServiceModificationBlockModal, {
  ServiceModificationModalType,
} from '../../modal/ServiceModificationBlockModal';
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

// 타입 정의: 서비스 플랜(요금제) 데이터 구조
// 선택 가능한 서비스 항목의 데이터 형식을 정의합니다.
export interface ServicePlan {
  id: string; // 서비스 ID
  name: string; // 서비스 이름 (표시용)
  price: number; // 서비스 가격
  releaseDate: string; // 출시일 (최신출시순 정렬을 위한 필드)
}

/**
 * 서비스 선택 컴포넌트
 * 요금제 목록을 조회하고 사용자가 선택한 요금제를 Zustand 스토어에 저장합니다.
 */
const SelectService = () => {
  // Zustand 스토어에서 서비스 선택 관련 상태와 액션 가져오기
  const {
    selectedService,
    setSelectedService,
    isServiceModifiable,
    previousService,
    isRollbackAvailable,
    revertToPreviousService,
    setRevertButtonClickedDate,
  } = useModifyServiceStore();

  // 고객 정보
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId);
  const customers = useCustomerStore((state) => state.customers);
  const isCustomer = useCustomerStore((state) => state.isCustomer);

  // 현재 선택된 고객 찾기
  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);
  // 고객의 나이 정보 가져오기 (Customer 타입에서 age는 number 타입)
  const customerAge =
    selectedCustomer && isCustomer(selectedCustomer) ? String(selectedCustomer.age) : '';

  // API에서 서비스 목록을 가져옵니다 (useServicesQuery 훅 사용)
  const { data: services = [] } = useServicesQuery();

  // 서비스 데이터를 ServicePlan 형식으로 변환
  // API 응답 데이터를 컴포넌트에서 사용하기 적합한 형태로 매핑합니다.
  const servicePlans: ServicePlan[] = services.map((service: Service) => ({
    id: service.serviceId,
    name: service.serviceName,
    price: service.serviceValue,
    releaseDate: service.releaseDate || '1970-01-01', // 빈 문자열인 경우 기본값 제공
  }));

  // 임시 선택된 서비스 정보 (확인 모달용)
  const [tempSelectedService, setTempSelectedService] = useState<Service | null>(null);

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

  // 나이 제한을 위한 상태 관리
  const [serviceAgeCheckParams, setServiceAgeCheckParams] = useState<{
    age: string;
    serviceId: string;
  }>({
    age: customerAge,
    serviceId: '',
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
  const handleConfirmChange = () => {
    // 요금제 변경 로직 처리
    if (tempSelectedService) {
      setSelectedService(tempSelectedService);
    }

    // 모달 닫기
    closeModal();
  };

  // 나이 제한 확인 쿼리
  const { data: ageRestrictionData } = useCheckServiceAgeRestrictionQuery(
    serviceAgeCheckParams.age,
    serviceAgeCheckParams.serviceId,
    !!serviceAgeCheckParams.age && !!serviceAgeCheckParams.serviceId, // 두 값이 모두 있을 때만 쿼리 활성화
  );

  // 사용자가 서비스를 선택했을 때 실행되는 핸들러
  const handlePlanChange = (
    _: SyntheticEvent,
    newValue: NonNullable<string | ServicePlan> | (string | ServicePlan)[] | null,
  ) => {
    // ServicePlan 객체인 경우 (단일 선택)
    if (newValue && typeof newValue === 'object' && !Array.isArray(newValue) && 'id' in newValue) {
      if (!customerAge || !isServiceModifiable) {
        // 고객 나이 정보가 없거나 서비스 변경 불가능한 경우 처리
        return;
      }

      // 선택한 요금제 정보 찾기
      const selectedServiceData =
        services.find((service: Service) => service.serviceId === newValue.id) || null;

      if (selectedServiceData) {
        // 임시 저장
        setTempSelectedService(selectedServiceData);

        // 나이 제한 확인 API 호출 - 파라미터 설정으로 쿼리 자동 실행
        setServiceAgeCheckParams({
          age: customerAge,
          serviceId: selectedServiceData.serviceId,
        });
      }
    } else {
      // 선택되지 않은 경우 또는 지원하지 않는 값 형식인 경우
      setSelectedService(null);
    }
  };

  // 이전 요금제로 되돌리기 핸들러
  const handleRevertToPreviousService = () => {
    revertToPreviousService();
    // 되돌리기 버튼 클릭 시점의 날짜 저장
    setRevertButtonClickedDate(new Date().toISOString());
  };

  // 나이 제한 확인 결과 처리
  useEffect(() => {
    if (ageRestrictionData && tempSelectedService) {
      // 타입 확인 및 안전한 처리
      const data = ageRestrictionData;

      // 실제 ServiceAgeCheckResponse 타입으로 처리
      if ('isAvailable' in data) {
        if (data.isAvailable) {
          if (tempSelectedService === previousService) {
            // 이전 요금제로 되돌리기인 경우 바로 적용
            revertToPreviousService();
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

  // 요금제 변경 불가 시 표시할 툴팁 메시지
  // const disabledTooltipMessage = '요금제 변경은 월 1회만 가능합니다. 다음 달에 다시 시도해 주세요.';

  // 이전 요금제가 있고, 당일 변경되었으며, 요금제 변경이 불가능한 상태인 경우에만 되돌리기 버튼 표시
  const showRevertButton = previousService && isRollbackAvailable && !isServiceModifiable;

  return (
    <RootContainer>
      <ServiceRowContainer>
        <LeftSectionContainer>
          {/* 제목 */}
          <TitleTypography variant='subtitle1'>
            변경할 요금제
            {/* {!isServiceModifiable && (
              <Tooltip title={disabledTooltipMessage} placement='right'>
                <InfoIcon />
              </Tooltip>
            )} */}
          </TitleTypography>

          {/* Autocomplete 컴포넌트: 검색 가능한 드롭다운 선택 UI */}
          <AutocompleteContainer>
            <Autocomplete
              fullWidth
              value={selectedPlan}
              options={sortedServicePlans}
              freeSolo={false}
              multiple={false}
              getOptionLabel={(option) => {
                // option은 string | ServicePlan 타입이지만
                // freeSolo={false}로 설정하면 실제로는 항상 ServicePlan 타입입니다
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
                />
              )}
              onChange={handlePlanChange}
              size='small'
            />
          </AutocompleteContainer>
        </LeftSectionContainer>

        {/* 선택한 요금제의 요금 및 되돌리기 버튼 */}
        <PriceContainer>
          <PriceTypography variant='subtitle1'>
            {selectedService ? `${selectedService.serviceValue.toLocaleString()}원` : '0원'}
          </PriceTypography>

          {showRevertButton && (
            <RevertButton
              variant='outlined'
              color='primary'
              size='small'
              // iconComponent={<RestoreIcon />}
              // iconPosition='left'
              onClick={handleRevertToPreviousService}
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
        onConfirm={handleConfirmChange}
      />
    </RootContainer>
  );
};

export default SelectService;
