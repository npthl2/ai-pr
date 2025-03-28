// src/pages/modifyService/modification/ServiceModify.tsx
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import SelectService from './sections/ModifiedServiceSelect';
import AdditionalServiceList from './sections/AdditionalServiceList';
import useModifyServiceStore from '@stores/ModifyServiceStore';
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

interface ServiceModifyProps {
  // props 정의
  setIsSaveRequested?: (isSaveRequested: boolean) => void;
  contractTabId: string;
}

const ServiceModify = ({ setIsSaveRequested, contractTabId }: ServiceModifyProps) => {
  // 스토어에서 필요한 정보 가져오기
  const modifyServiceInfo = useModifyServiceStore((state) =>
    state.getModifyServiceInfo(contractTabId),
  );
  const { resetAll, serviceModificationMounted } = useModifyServiceStore();

  // 계약 탭에 대한 정보가 없으면 기본값 제공
  const selectedService = modifyServiceInfo?.selectedService || null;
  const selectedAdditionalServices = modifyServiceInfo?.selectedAdditionalServices || [];
  const currentAdditionalServices = modifyServiceInfo?.currentAdditionalServices || [];
  const revertButtonClickedDate = modifyServiceInfo?.revertButtonClickedDate || null;
  const removedCurrentAdditionalServices =
    modifyServiceInfo?.removedCurrentAdditionalServices || [];

  // CustomerStore에서 현재 선택된 고객 정보 가져오기
  const { customers, selectedCustomerId } = useCustomerStore();

  // CurrentServiceStore에서 초기 서비스 정보 가져오기
  const currentService = useCurrentServiceStore((state) => state.currentService);

  // 서비스 변경 요청 mutation 사용
  const serviceModificationMutation = useServiceModificationMutation();

  // 현재 선택된 고객 찾기 - 단순 find 연산으로 변경
  const selectedCustomer = customers.find((customer) => customer.id === selectedCustomerId);

  // 현재 고객의 나이 - 단순 계산으로 변경
  const customerAge = selectedCustomer
    ? 'age' in selectedCustomer
      ? Number(selectedCustomer.age)
      : null
    : null;

  // 현재 사용할 서비스 ID (선택된 서비스 또는 현재 서비스) - 단순 계산으로 변경
  const currentServiceId = selectedService?.serviceId || currentService?.serviceId || '';

  // 부가서비스 목록 조회 API 호출
  const { data: additionalServices = [] } = useAdditionalServicesWithExclusiveQuery(
    customerAge || 0,
    currentServiceId,
    serviceModificationMounted,
  );

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

  // 변경사항이 있는지 확인
  const hasChanges =
    selectedService !== null ||
    selectedAdditionalServices.length > 0 ||
    removedCurrentAdditionalServices.length > 0;

  // 서비스 제한 상태 확인 함수
  const checkServiceRestrictions = (services: any[]) => {
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

  // 모달 표시 함수
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

        // 부가서비스만 제거된 경우 (allAdditionalServices.length가 0이고 removedCurrentAdditionalServices.length > 0)
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

    // 어떤 모달 조건에도 해당하지 않지만 변경사항이 있는 경우 (부가서비스 제거만 있는 경우)
    if (removedCurrentAdditionalServices.length > 0) {
      showModal(ServiceModificationModalType.CONFIRM_ADDITIONAL_SERVICES_CHANGE, {
        additionalServicesCount:
          currentAdditionalServices.length - removedCurrentAdditionalServices.length,
      });
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
  };

  // 모달 확인 핸들러
  const handleConfirmModal = async () => {
    // ModifyServiceStore에서 선택된 서비스 정보 가져오기
    const modifyServiceInfo = useModifyServiceStore.getState().getModifyServiceInfo(contractTabId);
    if (!modifyServiceInfo) {
      return;
    }

    // CurrentServiceStore에서 현재 계약 ID 가져오기
    const currentService = useCurrentServiceStore.getState().currentService;
    const contractId = currentService?.contractId;

    // CustomerStore에서 고객 ID 가져오기
    const selectedCustomerId = useCustomerStore.getState().selectedCustomerId;

    // 선택된 서비스 및 부가서비스 정보 추출
    const {
      selectedService,
      selectedAdditionalServices,
      currentAdditionalServices,
      removedCurrentAdditionalServices,
    } = modifyServiceInfo;

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
    }));

    // 요청 데이터 구성 및 API 호출
    await serviceModificationMutation.mutateAsync({
      customerId: selectedCustomerId || '',
      contractId: contractId || '',
      // selectedService가 없을 경우 null 전달 (요금제 변경 없음)
      service: selectedService ? { serviceId: selectedService.serviceId } : null,
      // 빈 배열이라도 그대로 전달 (모든 부가서비스 제거를 의미)
      additionalServices: additionalServicesRequest,
    });

    // 요청 성공 시 저장 요청 상태를 true로 설정하여 부모 컴포넌트에 알림
    if (setIsSaveRequested) {
      setIsSaveRequested(true);
    }
    handleCloseModal();
  };

  // 저장 버튼 비활성화 조건
  const isSaveDisabled = !hasChanges;

  // 초기화 버튼 클릭 시 호출되는 핸들러
  const handleReset = () => {
    resetAll(contractTabId);
  };

  // 변경사항이 없는 경우 초기화 버튼 비활성화
  const isResetDisabled = !hasChanges;

  return (
    <Container>
      {/* 1. 요금제 선택 영역 */}
      <Section>
        <SelectService contractTabId={contractTabId} />
      </Section>

      {/* 2. 부가서비스 목록 영역 */}
      <Section>
        <AdditionalServiceList
          additionalServices={additionalServices}
          _contractTabId={contractTabId}
          contractTabId={contractTabId}
        />
      </Section>

      {/* 3. 선택된 부가서비스 영역 */}
      <Section>
        <SelectedAdditionalServiceList
          additionalServices={additionalServices}
          contractTabId={contractTabId}
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
        contractTabId={contractTabId}
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
              disabled={isResetDisabled}
              data-testid='reset-button'
            >
              초기화
            </Button>
            <Button
              variant='contained'
              onClick={handleSave}
              disabled={isSaveDisabled}
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
