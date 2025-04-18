import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {
  Container,
  ContentContainer,
  LineInfoContainer,
  ServicesContainer,
  CurrentServiceContainer,
  NewServiceContainer,
} from './ServiceModification.styled';
import ServiceModify from './modification/ServiceModify';
import ServiceModificationBlockModal from './modification/components/ServiceModificationBlockModal';
import { ServiceModificationModalType } from './modification/constants/modalConstants';
import useCustomerStore from '@stores/CustomerStore';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
import { TabInfo } from '@constants/CommonConstant';
import {
  useCheckServiceModifiableQuery,
  Service,
} from '@api/queries/modifyService/useModifyServiceQuery';
import ModificationRequest from './ModificationRequest';
import LineInformation from './search/LineInformation';
import ConcurrentService from './search/CurrentService';

// 서비스 변경 메인 컴포넌트
const ServiceModification = () => {
  // 저장 요청 상태 관리
  const [isSaveRequested, setIsSaveRequested] = useState(false);

  // 모달 상태 관리
  const [modalState, setModalState] = useState<{
    open: boolean;
    type: ServiceModificationModalType;
  }>({
    open: false,
    type: ServiceModificationModalType.MONTHLY_RESTRICTION,
  });

  // ModifyServiceStore에서 필요한 함수 가져오기
  const {
    setServiceModifiable,
    setIsRollbackAvailable,
    setPreviousService,
    setInitialStates,
    createModifyServiceInfo,
  } = useModifyServiceStore();

  // 고객 스토어에서 필요한 정보 가져오기
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  const customerTabs = useCustomerStore((state) => state.customerTabs);

  const selectedContractId = useCurrentServiceStore(
    (state) => state.selectedContractIds[selectedCustomerId] || '',
  );

  // 컴포넌트 마운트 시 상태 초기화
  useEffect(() => {
    if (selectedCustomerId && selectedContractId) {
      createModifyServiceInfo(selectedCustomerId, selectedContractId);
    }
  }, [createModifyServiceInfo, selectedCustomerId, selectedContractId]);

  // 현재 활성화된 탭이 ServiceModification 탭인지 확인
  const isServiceModificationTabActive = (() => {
    if (!selectedCustomerId || !customerTabs[selectedCustomerId]) return false;
    const activeTabId = customerTabs[selectedCustomerId].activeTab;
    const activeTab = customerTabs[selectedCustomerId].tabs.find((tab) => tab.id === activeTabId);
    return activeTab?.id === TabInfo.SERVICE_MODIFICATION.id;
  })();

  // 요금제 변경 가능 여부 확인 API 호출
  const { data: modifiableData, isLoading } = useCheckServiceModifiableQuery(selectedContractId);

  // 요금제 변경 가능 여부와 현재 서비스 정보 설정
  useEffect(() => {
    if (
      !isLoading &&
      selectedCustomerId &&
      selectedContractId &&
      modifiableData &&
      isServiceModificationTabActive
    ) {
      setServiceModifiable(selectedCustomerId, selectedContractId, modifiableData.isModifiable);
      setIsRollbackAvailable(
        selectedCustomerId,
        selectedContractId,
        modifiableData.isRollbackAvailable || false,
      );

      if (modifiableData.isRollbackAvailable && modifiableData.previousService) {
        const prevService: Service = {
          serviceId: modifiableData.previousService.serviceId,
          serviceName: modifiableData.previousService.serviceName || '이전 요금제',
          serviceValue: modifiableData.previousService.serviceValue || 0,
          serviceValueType: modifiableData.previousService.serviceValueType || '원정액',
          releaseDate: '',
        };
        setPreviousService(selectedCustomerId, selectedContractId, prevService);
        setInitialStates(
          selectedCustomerId,
          selectedContractId,
          true,
          modifiableData.isModifiable,
          prevService,
        );
      } else {
        setPreviousService(selectedCustomerId, selectedContractId, null);
        setInitialStates(
          selectedCustomerId,
          selectedContractId,
          false,
          modifiableData.isModifiable,
          null,
        );
      }

      if (!modifiableData.isModifiable) {
        setModalState({
          open: true,
          type: ServiceModificationModalType.MONTHLY_RESTRICTION,
        });
      }
    }
  }, [
    isLoading,
    modifiableData,
    selectedCustomerId,
    selectedContractId,
    setServiceModifiable,
    setIsRollbackAvailable,
    setPreviousService,
    setInitialStates,
    isServiceModificationTabActive,
  ]);

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
  };

  if (isSaveRequested) {
    return <ModificationRequest />;
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container>
        <ContentContainer data-testid='service-modification-container'>
          <LineInfoContainer sx={{ flexShrink: 0 }}>
            <LineInformation />
          </LineInfoContainer>

          {selectedContractId && (
            <ServicesContainer>
              <CurrentServiceContainer>
                <ConcurrentService />
              </CurrentServiceContainer>

              {/* 새로운 서비스 선택 */}
              <NewServiceContainer>
                <ServiceModify setIsSaveRequested={setIsSaveRequested} />
              </NewServiceContainer>
              <ServiceModificationBlockModal
                open={modalState.open}
                type={modalState.type}
                onClose={handleCloseModal}
              />
            </ServicesContainer>
          )}
        </ContentContainer>
      </Container>
    </Box>
  );
};

export default ServiceModification;
