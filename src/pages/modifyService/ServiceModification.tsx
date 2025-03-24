import React, { useEffect, useState } from 'react';
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
import ServiceModificationBlockModal, {
  ServiceModificationModalType,
} from './modal/ServiceModificationBlockModal';
import useCustomerStore from '@stores/CustomerStore';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import { TabInfo } from '@constants/CommonConstant';
import { useCheckServiceModifiableQuery, Service } from '@api/queries/modifyService/useModifyServiceQuery';

const ServiceModification: React.FC = () => {
  // 모달 상태 관리
  const [modalState, setModalState] = useState<{
    open: boolean;
    type: ServiceModificationModalType;
  }>({
    open: false,
    type: ServiceModificationModalType.MONTHLY_RESTRICTION,
  });

  // 요금제 수정 상태 관리 - ModifyServiceStore에서 필요한 함수 가져오기
  const { setServiceModifiable, setIsRollbackAvailable, setPreviousService } = useModifyServiceStore();

  // 고객 스토어에서 필요한 정보 가져오기
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId);
  const customers = useCustomerStore((state) => state.customers);
  const isCustomer = useCustomerStore((state) => state.isCustomer);
  const customerTabs = useCustomerStore((state) => state.customerTabs);

  // 현재 선택된 고객의 계약 ID 가져오기
  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);
  const contractId =
    selectedCustomer && isCustomer(selectedCustomer) ? selectedCustomer.contractId : '';

  // 현재 활성화된 탭이 ServiceModification 탭인지 확인
  const isServiceModificationTabActive = (() => {
    // 고객 ID가 없거나 해당 고객의 탭 정보가 없으면 false 반환
    if (!selectedCustomerId || !customerTabs[selectedCustomerId]) return false;

    // 현재 활성화된 탭 ID 가져오기
    const activeTabId = customerTabs[selectedCustomerId].activeTab;

    // 활성화된 탭 객체 찾기
    const activeTab = customerTabs[selectedCustomerId].tabs.find((tab) => tab.id === activeTabId);

    // 활성화된 탭이 SERVICE_MODIFICATION 탭인지 확인
    return activeTab?.id === TabInfo.SERVICE_MODIFICATION.id;
  })();

  //요금제 변경 가능 여부 확인 API 호출
  const { data: modifiableData, isLoading } = useCheckServiceModifiableQuery(
    contractId,
    !!contractId && isServiceModificationTabActive,
  );

  /**
   * 컴포넌트 마운트 시 요금제 변경 가능 여부와 현재 서비스 정보 설정
   *
   * ModifyServiceStore에 요금제 변경 가능 여부와 당일 변경 여부를 저장하고,
   * 요금제 변경이 불가능한 경우에만 모달을 표시합니다.
   */
  useEffect(() => {
    if (!isLoading && contractId && modifiableData && isServiceModificationTabActive) {
      setServiceModifiable(modifiableData.isModifiable);
      setIsRollbackAvailable(modifiableData.isRollbackAvailable || false);

      // 백엔드에서 전달 받은 이전 서비스 정보가 있는 경우 저장
      if (modifiableData.isRollbackAvailable && modifiableData.previousService) {
        // previousService 정보를 Service 타입으로 변환하여 저장
        const prevService: Service = {
          serviceId: modifiableData.previousService.serviceId,
          serviceName: modifiableData.previousService.serviceName,
          serviceValue: Number(modifiableData.previousService.serviceValue),
          serviceValueType: modifiableData.previousService.serviceValueType,
          releaseDate: '', // 기본값 설정 (API에서 제공하지 않는 값이므로)
        };
        setPreviousService(prevService);
      } else {
        setPreviousService(null);
      }

      if (!modifiableData.isModifiable) {
        // 모달 표시
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
    isServiceModificationTabActive,
  ]);

  /**
   * 현재 서비스 정보가 있으면 이전 요금제로 설정
   *
   * API에서 받아온 서비스 정보를 ModifyServiceStore에 저장합니다.
   * 이전 요금제로 되돌리기 기능을 위해 필요합니다.
   */

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
  };

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

  return (
    <Box
      sx={{
        height: 'calc(100vh - 100px)', // Adjust based on your header/footer height
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Container>
        <ContentContainer>
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

          <ServicesContainer>
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

            <NewServiceContainer>
              <ServiceModify />
            </NewServiceContainer>
            <ServiceModificationBlockModal
              open={modalState.open}
              type={modalState.type}
              onClose={handleCloseModal}
            />
          </ServicesContainer>
        </ContentContainer>
      </Container>
    </Box>
  );
};

export default ServiceModification;
