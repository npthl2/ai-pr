// src/pages/modifyService/modification/ServiceModify.tsx
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import ModifiedServiceSelect from './sections/ModifiedServiceSelect';
import AdditionalServiceList from './sections/AdditionalServiceList';
import useModifyServiceStore from '@stores/ModifyServiceStoreRefact';
import useCustomerStore from '@stores/CustomerStore';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
import { useAdditionalServicesWithExclusiveQuery } from '@api/queries/modifyService/useModifyServiceQuery';
import SelectedAdditionalServiceList from './sections/SelectedAdditionalServiceList';
import { Container, Section, ButtonGroup, WarningMessage, InfoIcon } from './ServiceModify.styled';
import ServiceModificationBlockModal from './components/ServiceModificationBlockModal';
import {
  ServiceModificationModalType,
  MODAL_PRIORITY,
  MODAL_CONDITIONS,
  ModalConditionInputs,
} from './constants/modalConstants';
import { useServiceModificationMutation } from '@api/queries/modifyService/useServiceModificationMutation';
import {
  AdditionalService,
  ServiceModificationRequest,
  ServiceModificationResponseData,
} from '@model/modifyService/ModifyServiceModel';
import { CommonResponse } from '@model/common/CommonResponse';
import useToastStore from '@stores/ToastStore';

interface ServiceModifyProps {
  setIsSaveRequested: (isSaveRequested: boolean) => void;
}

const ServiceModify = ({ setIsSaveRequested }: ServiceModifyProps) => {
  // 스토어에서 필요한 정보 가져오기
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  const selectedContractId = useCurrentServiceStore(
    (state) => state.selectedContractIds[selectedCustomerId] || '',
  );

  const { resetAll, setModificationBusinessProcessId } = useModifyServiceStore();

  const modifyServiceInfo = useModifyServiceStore((state) =>
    state.getModifyServiceInfo(selectedCustomerId, selectedContractId),
  );

  // 계약 탭에 대한 정보가 없으면 기본값 제공
  const selectedService = modifyServiceInfo?.selectedService || null;
  const selectedAdditionalServices = modifyServiceInfo?.selectedAdditionalServices || [];
  const currentAdditionalServices = modifyServiceInfo?.currentAdditionalServices || [];
  const revertButtonClickedDate = modifyServiceInfo?.revertButtonClickedDate || null;
  const removedCurrentAdditionalServices =
    modifyServiceInfo?.removedCurrentAdditionalServices || [];

  // 부가서비스 목록 조회 API 호출
  // 고객 나이 확인
  const customers = useCustomerStore((state) => state.customers);
  const selectedCustomer = customers.find((customer) => customer.id === selectedCustomerId);
  const customerAge = selectedCustomer
    ? 'age' in selectedCustomer
      ? Number(selectedCustomer.age)
      : 0
    : 0;

  // 현재 서비스 ID 확인
  const currentService =
    useCurrentServiceStore((state) => state.getCurrentService(selectedCustomerId)) || null;
  const currentServiceId = selectedService?.serviceId || currentService?.serviceId || '';

  const { data: additionalServices = [] } = useAdditionalServicesWithExclusiveQuery(
    customerAge,
    currentServiceId,
    true,
  );

  // 변경사항이 있는지 확인
  const hasChanges =
    !!selectedService ||
    selectedAdditionalServices.length > 0 ||
    removedCurrentAdditionalServices.length > 0;

  // 모달 상태 관리
  const [modalState, setModalState] = useState<{
    open: boolean;
    type: ServiceModificationModalType;
    serviceName?: string;
    additionalServicesCount?: number;
  }>({
    open: false,
    type: ServiceModificationModalType.CONFIRM_CHANGE,
  });

  // 조건에 따른 모달 화면 관리
  const showModal = (
    type: ServiceModificationModalType,
    data: {
      serviceName?: string;
      additionalServicesCount?: number;
    } = {},
  ) => {
    setModalState({
      open: true,
      type,
      ...data,
    });
  };

  // 서비스 제한 상태 확인 함수
  const checkServiceRestrictions = (services: AdditionalService[]) => {
    return services.some((service) => {
      const apiService = additionalServices.find(
        (apiService) => apiService.serviceId === service.serviceId,
      );

      return apiService?.hasAgeRestriction || apiService?.exclusive || false;
    });
  };

  // 이전 요금제로 되돌리기 만료 확인 함수
  const checkRollbackExpiration = () => {
    if (!revertButtonClickedDate) return false;

    const today = new Date();
    const revertDate = new Date(revertButtonClickedDate);

    // 년/월/일 전체를 비교
    return today.toDateString() !== revertDate.toDateString();
  };

  // 저장 버튼 클릭 시 호출되는 핸들러
  const handleSave = () => {
    // 모든 부가서비스 (현재 부가서비스 + 새로 선택된 부가서비스)
    const allAdditionalServices = [...currentAdditionalServices, ...selectedAdditionalServices];

    // 모달 표시 조건 데이터 준비
    const conditionInputs: ModalConditionInputs = {
      hasTerminationRequiredServices: checkServiceRestrictions(allAdditionalServices),
      isRollbackExpired: checkRollbackExpiration(),
      hasServiceChange: selectedService !== null,
      hasAdditionalServicesChange:
        allAdditionalServices.length > 0 || removedCurrentAdditionalServices.length > 0,
    };

    // 우선순위에 따라 모달 타입 결정
    for (const modalType of MODAL_PRIORITY) {
      const condition = MODAL_CONDITIONS[modalType];
      if (condition(conditionInputs)) {
        // 모달 데이터 준비
        const modalData = {
          serviceName: conditionInputs.hasServiceChange ? selectedService?.serviceName : undefined,
          additionalServicesCount: conditionInputs.hasAdditionalServicesChange
            ? allAdditionalServices.length
            : undefined,
        };

        // 부가서비스만 제거된 경우 (모든 부가서비스 제거)
        if (
          modalType === ServiceModificationModalType.CONFIRM_ADDITIONAL_SERVICES_CHANGE &&
          allAdditionalServices.length === 0 &&
          removedCurrentAdditionalServices.length > 0
        ) {
          showModal(modalType, {
            additionalServicesCount: 0, // 모든 부가서비스 제거
          });
          return;
        }

        showModal(modalType, modalData);
        return;
      }
    }

    // 부가서비스만 제거된 경우
    if (removedCurrentAdditionalServices.length > 0) {
      showModal(ServiceModificationModalType.CONFIRM_ADDITIONAL_SERVICES_CHANGE, {
        additionalServicesCount:
          currentAdditionalServices.length - removedCurrentAdditionalServices.length,
      });
    }
  };

  // 서비스 변경 요청 mutation 사용
  const serviceModificationMutation = useServiceModificationMutation();

  // 모달 확인 핸들러
  const handleConfirmModal = () => {
    if (!modifyServiceInfo) {
      return;
    }

    // 부가서비스 배열 생성 (선택된 부가서비스와 유지할 현재 부가서비스)
    // 제거된 현재 부가서비스는 제외해야 함
    const currentServicesToKeep = currentAdditionalServices.filter(
      (currentService) =>
        !removedCurrentAdditionalServices.some(
          (removed) => removed.serviceId === currentService.serviceId,
        ),
    );

    const allAdditionalServices = [...currentServicesToKeep, ...(selectedAdditionalServices || [])];

    // additionalServices는 빈 배열이라도 정의되어야 함 (모든 부가서비스 제거를 명시적으로 전달하기 위함)
    const additionalServicesRequest = allAdditionalServices.map((service) => ({
      serviceId: service.serviceId,
      serviceName: service.serviceName,
      serviceValue: service.serviceValue,
      serviceValueType: service.serviceValueType || '',
    }));

    const modificationInfo: ServiceModificationRequest = {
      gTrId: '',
      customerId: selectedCustomerId || '',
      contractId: selectedContractId || '',
      service: selectedService
        ? {
            serviceId: selectedService.serviceId,
            serviceName: selectedService.serviceName,
            serviceValue: selectedService.serviceValue,
            serviceValueType: selectedService.serviceValueType,
          }
        : null,
      additionalServices: additionalServicesRequest,
    };

    serviceModificationMutation.mutate(modificationInfo, {
      onSuccess: (response: CommonResponse<ServiceModificationResponseData>) => {
        if (
          response.data &&
          typeof response.data === 'object' &&
          'businessProcessId' in response.data
        ) {
          const businessProcessId = response.data?.businessProcessId;

          if (!businessProcessId) {
            const { openToast } = useToastStore();
            openToast('businessProcessId 저장을 완료할 수 없습니다. 다시 시도해 주세요.');

            // 저장 상태 진입 안 함
            return;
          }

          setModificationBusinessProcessId(
            selectedCustomerId,
            selectedContractId,
            businessProcessId,
          );

          setIsSaveRequested(true);
        }
      },
    });

    // 모달 닫기
    handleCloseModal();
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
  };

  // 초기화 버튼 클릭 시 호출되는 핸들러
  const handleReset = () => {
    resetAll(selectedCustomerId, selectedContractId);
  };

  return (
    <Container>
      {/* 1. 요금제 선택 영역 */}
      <Section>
        <ModifiedServiceSelect />
      </Section>

      {/* 2. 부가서비스 목록 영역 */}
      <Section>
        <AdditionalServiceList
          additionalServices={additionalServices}
          _contractTabId={selectedCustomerId}
          contractTabId={selectedCustomerId}
        />
      </Section>

      {/* 3. 선택된 부가서비스 영역 */}
      <Section>
        <SelectedAdditionalServiceList
          additionalServices={additionalServices}
          contractTabId={selectedCustomerId}
        />
      </Section>

      {/* 모달 컴포넌트 */}
      <ServiceModificationBlockModal
        open={modalState.open}
        type={modalState.type}
        serviceName={modalState.serviceName}
        additionalServicesCount={modalState.additionalServicesCount}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />

      {/* 버튼 영역 */}
      <ButtonGroup>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box sx={{ flex: 1 }} data-testid='additional-service-disabled-message'>
            <WarningMessage>
              <InfoIcon fontSize='small' sx={{ mr: 1 }} />
              빨간색으로 음영 처리된 부가서비스는 가입이 불가능합니다.
            </WarningMessage>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
            <Button
              variant='outlined'
              onClick={handleReset}
              disabled={!hasChanges}
              data-testid='reset-button'
            >
              초기화
            </Button>
            <Button
              variant='contained'
              onClick={handleSave}
              disabled={!hasChanges}
              data-testid='save-button'
            >
              저장
            </Button>
          </Box>
        </Box>
      </ButtonGroup>
    </Container>
  );
};

export default ServiceModify;
