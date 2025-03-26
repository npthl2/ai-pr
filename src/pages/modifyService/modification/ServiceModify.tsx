// src/pages/modifyService/modification/ServiceModify.tsx
import { Box, Button } from '@mui/material';
import { useMemo, useState } from 'react';
import SelectService from './sections/ModifiedServiceSelect';
import AdditionalServiceList from './sections/AdditionalServiceList';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import useCustomerStore from '@stores/CustomerStore';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
import { useAdditionalServicesWithExclusiveQuery } from '@api/queries/modifyService/useModifyServiceQuery';
import SelectedAdditionalServiceList from './sections/SelectedAdditionalServiceList';
import { Container, Section, ButtonGroup, WarningMessage, InfoIcon } from './ServiceModify.styled';
import ServiceModificationBlockModal from './components/ServiceModificationBlockModal';
import { ServiceModificationModalType } from './constants/modalConstants';
interface ServiceModifyProps {
  // props 정의
}

const ServiceModify: React.FC<ServiceModifyProps> = () => {
  // 스토어에서 필요한 정보 가져오기
  const {
    resetAll,
    selectedService,
    serviceModificationMounted,
    selectedAdditionalServices,
    currentAdditionalServices,
    revertButtonClickedDate,
    removedCurrentAdditionalServices,
  } = useModifyServiceStore();

  // CustomerStore에서 현재 선택된 고객 정보 가져오기
  const { customers, selectedCustomerId } = useCustomerStore();

  // CurrentServiceStore에서 초기 서비스 정보 가져오기
  const currentService = useCurrentServiceStore((state) => state.currentService);

  // 현재 선택된 고객 찾기
  const selectedCustomer = useMemo(() => {
    return customers.find((customer) => customer.id === selectedCustomerId);
  }, [customers, selectedCustomerId]);

  // 현재 고객의 나이
  const customerAge = useMemo(() => {
    if (!selectedCustomer) return null;
    return 'age' in selectedCustomer ? Number(selectedCustomer.age) : null;
  }, [selectedCustomer]);

  // 현재 사용할 서비스 ID (선택된 서비스 또는 현재 서비스)
  const currentServiceId = useMemo(() => {
    return selectedService?.serviceId || currentService?.serviceId || '';
  }, [selectedService, currentService]);

  // 부가서비스 목록 조회 API 호출
  const { data: additionalServices = [] } = useAdditionalServicesWithExclusiveQuery(
    customerAge || 0,
    currentServiceId,
    serviceModificationMounted,
  );

  // 나이 제한으로 인해 제거해야 하는 서비스가 있는지 확인
  const hasRestrictedServices = currentAdditionalServices.some((service) => {
    // API에서 받아온 부가서비스 목록에서 해당 서비스 찾기
    const apiService = additionalServices.find(
      (apiService) => apiService.serviceId === service.serviceId,
    );

    // API에서 받아온 hasAgeRestriction과 exclusive 값 사용
    return apiService?.hasAgeRestriction || apiService?.exclusive || false;
  });

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

  // 변경사항이 있는지 확인 (요금제 변경 또는 부가서비스 변경)
  const hasChanges = useMemo(() => {
    // 요금제 변경 확인
    const hasServiceChange = selectedService !== null;

    // 부가서비스 변경 확인
    const hasAdditionalServicesChange =
      selectedAdditionalServices.length > 0 || removedCurrentAdditionalServices.length > 0;

    return hasServiceChange || hasAdditionalServicesChange;
  }, [selectedService, selectedAdditionalServices, removedCurrentAdditionalServices]);

  // 저장 버튼 클릭 시 호출되는 핸들러
  const handleSave = () => {
    // 모든 부가서비스 (현재 부가서비스 + 새로 선택된 부가서비스)
    const allAdditionalServices = [...currentAdditionalServices, ...selectedAdditionalServices];

    // 해지 필요 서비스 확인 (나이 제한 또는 베타 관계)
    const hasTerminationRequiredServices = allAdditionalServices.some((service) => {
      // API에서 받아온 부가서비스 목록에서 해당 서비스 찾기
      const apiService = additionalServices.find(
        (apiService) => apiService.serviceId === service.serviceId,
      );

      // API에서 받아온 hasAgeRestriction과 exclusive 값 사용
      const hasAgeRestriction = apiService?.hasAgeRestriction || false;
      const isExclusive = apiService?.exclusive || false;

      const needsTermination = hasAgeRestriction || isExclusive;

      return needsTermination;
    });

    if (hasTerminationRequiredServices) {
      // 해지 필요 서비스가 있는 경우 -> 상품 변경 불가 알림
      setModalState({
        open: true,
        type: ServiceModificationModalType.TERMINATION_REQUIRED,
      });
      return;
    }

    // 이전 요금제로 되돌리기 만료 여부 확인
    const isRollbackExpired = (() => {
      if (!revertButtonClickedDate) return false;

      const today = new Date();
      const revertDate = new Date(revertButtonClickedDate);

      // 년/월/일 전체를 비교
      return today.toDateString() !== revertDate.toDateString();
    })();

    if (isRollbackExpired) {
      setModalState({
        open: true,
        type: ServiceModificationModalType.ROLLBACK_EXPIRED,
      });
      return;
    }

    // 변경사항 유형에 따른 모달 표시
    const hasServiceChange = selectedService !== null;
    const hasAdditionalServicesChange = allAdditionalServices.length > 0;

    if (hasServiceChange && hasAdditionalServicesChange) {
      // 요금제와 부가서비스 모두 변경
      setModalState({
        open: true,
        type: ServiceModificationModalType.CONFIRM_CHANGE,
        serviceName: selectedService?.serviceName,
        additionalServicesCount: allAdditionalServices.length,
      });
    } else if (hasServiceChange) {
      // 요금제만 변경
      setModalState({
        open: true,
        type: ServiceModificationModalType.CONFIRM_SERVICE_CHANGE,
        serviceName: selectedService?.serviceName,
      });
    } else if (hasAdditionalServicesChange) {
      // 부가서비스만 변경
      setModalState({
        open: true,
        type: ServiceModificationModalType.CONFIRM_ADDITIONAL_SERVICES_CHANGE,
        additionalServicesCount: allAdditionalServices.length,
      });
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
  };

  // 모달 확인 핸들러
  const handleConfirmModal = () => {
    // TODO: 실제 저장 API 호출 및 완료 화면으로 전환
    handleCloseModal();
  };

  // 저장 버튼 비활성화 조건
  const isSaveDisabled = !hasChanges;

  // 초기화 버튼 클릭 시 호출되는 핸들러
  const handleReset = () => {
    resetAll();
  };

  // 변경사항이 없는 경우 초기화 버튼 비활성화
  const isResetDisabled = !hasChanges;

  return (
    <Container>
      {/* 1. 요금제 선택 영역 */}
      <Section>
        <SelectService />
      </Section>

      {/* 2. 부가서비스 목록 영역 */}
      <Section>
        <AdditionalServiceList additionalServices={additionalServices} />
      </Section>

      {/* 3. 선택된 부가서비스 영역 */}
      <Section>
        <SelectedAdditionalServiceList additionalServices={additionalServices} />
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
          {hasRestrictedServices && (
            <WarningMessage>
              <InfoIcon fontSize='small' sx={{ mr: 1 }} />
              나이 제한 또는 베타 서비스로 인해 해지가 필요한 서비스가 있습니다.
            </WarningMessage>
          )}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant='outlined' onClick={handleReset} disabled={isResetDisabled}>
              초기화
            </Button>
            <Button variant='contained' onClick={handleSave} disabled={isSaveDisabled}>
              저장
            </Button>
          </Box>
        </Box>
      </ButtonGroup>
    </Container>
  );
};

export default ServiceModify;
