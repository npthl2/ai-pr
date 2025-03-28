import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import Button from '@components/Button';

import {
  Container,
  ContentContainer,
  LineInfoContainer,
  LineInfoDetailsContainer,
  ServicesContainer,
  CurrentServiceContainer,
  NewServiceContainer,
  ServiceValue,
  ServicePrice,
  ServiceLabel,
  ServiceItemContainer,
  TotalContainer,
  TotalLabel,
  TotalPrice,
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

interface NewContractProps {
  contractTabId: string;
}

// 서비스 변경 메인 컴포넌트
const ServiceModification = ({ contractTabId }: NewContractProps) => {
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
    setServiceModificationMounted,
    setInitialStates,
    createModifyServiceInfo,
  } = useModifyServiceStore();

  // 고객 스토어에서 필요한 정보 가져오기
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId);
  const customerTabs = useCustomerStore((state) => state.customerTabs);

  // CurrentServiceStore에서 contractId 가져오기
  const currentService = useCurrentServiceStore((state) => state.currentService);
  const contractId = currentService?.contractId || '';

  // 컴포넌트 마운트 시 상태 초기화
  useEffect(() => {
    setServiceModificationMounted(true);
    createModifyServiceInfo(contractTabId);
    return () => {
      setServiceModificationMounted(false);
    };
  }, [setServiceModificationMounted, createModifyServiceInfo, contractTabId]);

  // 현재 활성화된 탭이 ServiceModification 탭인지 확인
  const isServiceModificationTabActive = (() => {
    if (!selectedCustomerId || !customerTabs[selectedCustomerId]) return false;
    const activeTabId = customerTabs[selectedCustomerId].activeTab;
    const activeTab = customerTabs[selectedCustomerId].tabs.find((tab) => tab.id === activeTabId);
    return activeTab?.id === TabInfo.SERVICE_MODIFICATION.id;
  })();

  // 요금제 변경 가능 여부 확인 API 호출
  const { data: modifiableData, isLoading } = useCheckServiceModifiableQuery(contractId, true);

  // 요금제 변경 가능 여부와 현재 서비스 정보 설정
  useEffect(() => {
    if (!isLoading && contractId && modifiableData && isServiceModificationTabActive) {
      setServiceModifiable(contractTabId, modifiableData.isModifiable);
      setIsRollbackAvailable(contractTabId, modifiableData.isRollbackAvailable || false);

      if (modifiableData.isRollbackAvailable && modifiableData.previousService) {
        const prevService: Service = {
          serviceId: modifiableData.previousService.serviceId,
          serviceName: modifiableData.previousService.serviceName || '이전 요금제',
          serviceValue: modifiableData.previousService.serviceValue || 0,
          serviceValueType: modifiableData.previousService.serviceValueType || '원정액',
          releaseDate: '',
        };
        setPreviousService(contractTabId, prevService);
        setInitialStates(
          contractTabId,
          modifiableData.isRollbackAvailable || false,
          modifiableData.isModifiable,
          prevService,
        );
      } else {
        setPreviousService(contractTabId, null);
        setInitialStates(
          contractTabId,
          modifiableData.isRollbackAvailable || false,
          modifiableData.isModifiable,
          null,
        );
      }

      if (!modifiableData.isModifiable && !isSaveRequested) {
        setModalState({
          open: true,
          type: ServiceModificationModalType.MONTHLY_RESTRICTION,
        });
      }
    }
  }, [
    isLoading,
    modifiableData,
    contractId,
    setServiceModifiable,
    setIsRollbackAvailable,
    setPreviousService,
    setInitialStates,
    isServiceModificationTabActive,
    isSaveRequested,
    contractTabId,
  ]);

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
  };

  // 저장 완료 상태가 되면 모달 닫기
  useEffect(() => {
    if (isSaveRequested) {
      setServiceModifiable(contractTabId, true);
    }
  }, [isSaveRequested, setServiceModifiable, contractTabId]);

  // 현재 요금제 데이터
  const currentServiceDataMock = {
    name: '넷플릭스 초이스 스페셜',
    price: 110000,
    items: [
      { id: 1, name: '부가서비스 1', price: 10000 },
      { id: 2, name: '부가서비스 2', price: 10000 },
      { id: 3, name: '부가서비스 3', price: 10000 },
      { id: 4, name: '부가서비스 4', price: 10000 },
    ],
    totalPrice: 45000,
  };

  // 저장 요청 상태일 때 변경 요청 컴포넌트 렌더링
  if (isSaveRequested) {
    return <ModificationRequest contractTabId={contractTabId} />;
  }

  return (
    <Box
      sx={{
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Container>
        <ContentContainer>
          {/* 회선 정보 섹션 */}
          <LineInfoContainer sx={{ flexShrink: 0 }}>
            <Typography variant='h3' sx={{ mr: 2, fontWeight: 700, fontSize: '1.1rem' }}>
              회선정보
            </Typography>
            <LineInfoDetailsContainer>
              <Box display='flex' alignItems='center' sx={{ minWidth: '200px', flexGrow: 0 }}>
                <ServiceLabel sx={{ mr: 1 }}>전화번호</ServiceLabel>
                <ServiceValue>010-297-*964</ServiceValue>
                <Button
                  size='small'
                  variant='outlined'
                  color='grey'
                  sx={{ ml: 1, minWidth: 'auto', height: 22, px: 1, fontSize: '0.75rem' }}
                >
                  번호 선택
                </Button>
              </Box>
              <Box display='flex' alignItems='center' sx={{ minWidth: '180px', flexGrow: 0 }}>
                <ServiceLabel sx={{ mr: 1 }}>담당 지점</ServiceLabel>
                <ServiceValue>서울시 서울자치 무역길 5번길</ServiceValue>
              </Box>
              <Box display='flex' alignItems='center' sx={{ minWidth: '160px', flexGrow: 0 }}>
                <ServiceLabel sx={{ mr: 1 }}>가입일자</ServiceLabel>
                <ServiceValue>AR214-113-1257</ServiceValue>
              </Box>
              <Box display='flex' alignItems='center' sx={{ minWidth: '160px', flexGrow: 0 }}>
                <ServiceLabel sx={{ mr: 1 }}>고객식별코드</ServiceLabel>
                <ServiceValue>WRT42-887F2</ServiceValue>
              </Box>
            </LineInfoDetailsContainer>
          </LineInfoContainer>

          {/* 서비스 정보 섹션 */}
          <ServicesContainer>
            {/* 현재 서비스 정보 */}
            <CurrentServiceContainer>
              <Box sx={{ flexShrink: 0 }}>
                <ServiceValue>현재 요금제</ServiceValue>
                <ServiceItemContainer sx={{ borderBottom: 'none', marginTop: 0.5, py: 0.5 }}>
                  <ServiceValue>{currentServiceDataMock.name}</ServiceValue>
                  <ServicePrice>{currentServiceDataMock.price.toLocaleString()}원</ServicePrice>
                </ServiceItemContainer>
              </Box>

              <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
                <ServiceValue>현재 부가서비스 ({currentServiceDataMock.items.length})</ServiceValue>
                {currentServiceDataMock.items.map((item) => (
                  <ServiceItemContainer key={item.id} sx={{ py: 0.5 }}>
                    <ServiceLabel>{item.name}</ServiceLabel>
                    <ServicePrice>{item.price.toLocaleString()}원</ServicePrice>
                  </ServiceItemContainer>
                ))}
              </Box>

              <Box sx={{ flexShrink: 0 }}>
                <TotalContainer>
                  <TotalLabel>합계</TotalLabel>
                  <TotalPrice>{currentServiceDataMock.totalPrice.toLocaleString()}원</TotalPrice>
                </TotalContainer>
              </Box>
            </CurrentServiceContainer>

            {/* 새로운 서비스 선택 */}
            <NewServiceContainer>
              <ServiceModify
                contractTabId={contractTabId}
                setIsSaveRequested={setIsSaveRequested}
              />
            </NewServiceContainer>
            <ServiceModificationBlockModal
              open={modalState.open}
              type={modalState.type}
              onClose={handleCloseModal}
              contractTabId={contractTabId}
            />
          </ServicesContainer>
        </ContentContainer>
      </Container>
    </Box>
  );
};

export default ServiceModification;
