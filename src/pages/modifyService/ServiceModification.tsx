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
import ServiceModificationBlockModal from './modification/components/ServiceModificationBlockModal';
import { ServiceModificationModalType } from './modification/constants/modalConstants';
import useCustomerStore from '@stores/CustomerStore';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import { TabInfo } from '@constants/CommonConstant';
import {
  useCheckServiceModifiableQuery,
  Service,
} from '@api/queries/modifyService/useModifyServiceQuery';
// 변경요청 컴포넌트(저장버튼 동작)
import ModificationRequest from './ModificationRequest';

interface NewContractProps {
  contractTabId: string;
}

const ServiceModification = ({ contractTabId }: NewContractProps) => {
  // 변경요청 컴포넌트(저장버튼 동작)
  const [isSaveRequested, setIsSaveRequested] = useState(false);

  // 모달 상태 관리
  const [modalState, setModalState] = useState<{
    open: boolean;
    type: ServiceModificationModalType;
  }>({
    open: false,
    type: ServiceModificationModalType.MONTHLY_RESTRICTION,
  });

  // 요금제 수정 상태 관리 - ModifyServiceStore에서 필요한 함수 가져오기
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
  const customers = useCustomerStore((state) => state.customers);
  const isCustomer = useCustomerStore((state) => state.isCustomer);
  const customerTabs = useCustomerStore((state) => state.customerTabs);

  // 컴포넌트 마운트 시 상태 업데이트
  useEffect(() => {
    setServiceModificationMounted(true);
    // 계약 탭 ID에 대한 스토어 정보 생성
    createModifyServiceInfo(contractTabId);
    return () => {
      setServiceModificationMounted(false);
    };
  }, [setServiceModificationMounted, createModifyServiceInfo, contractTabId]);

  // TODO CurrentServiceStore에서 가져오는거로 수정 필요!
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
    // !!contractId && isServiceModificationTabActive,
    true,
  );

  /**
   * 컴포넌트 마운트 시 요금제 변경 가능 여부와 현재 서비스 정보 설정
   *
   * ModifyServiceStore에 요금제 변경 가능 여부와 당일 변경 여부를 저장하고,
   * 요금제 변경이 불가능한 경우에만 모달을 표시합니다.
   */
  useEffect(() => {
    if (!isLoading && contractId && modifiableData && isServiceModificationTabActive) {
      setServiceModifiable(contractTabId, modifiableData.isModifiable);
      setIsRollbackAvailable(contractTabId, modifiableData.isRollbackAvailable || false);

      // 백엔드에서 전달 받은 이전 서비스 정보가 있는 경우 저장
      if (modifiableData.isRollbackAvailable && modifiableData.previousService) {
        // 백엔드에서 받은 정보를 Service 타입으로 변환
        const prevService: Service = {
          serviceId: modifiableData.previousService.serviceId,
          serviceName: modifiableData.previousService.serviceName || '이전 요금제',
          serviceValue: modifiableData.previousService.serviceValue || 0,
          serviceValueType: modifiableData.previousService.serviceValueType || '원정액',
          releaseDate: '', // 기본값 설정 (API에서 제공하지 않는 값이므로)
        };
        setPreviousService(contractTabId, prevService);
        // 초기 상태 저장
        setInitialStates(
          contractTabId,
          modifiableData.isRollbackAvailable || false,
          modifiableData.isModifiable,
          prevService,
        );
      } else {
        setPreviousService(contractTabId, null);
        // 초기 상태 저장
        setInitialStates(
          contractTabId,
          modifiableData.isRollbackAvailable || false,
          modifiableData.isModifiable,
          null,
        );
      }

      // 완료 페이지 상태가 아닐 때만 모달 표시
      if (!modifiableData.isModifiable && !isSaveRequested) {
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
    setInitialStates,
    isServiceModificationTabActive,
    isSaveRequested,
    contractTabId,
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

  // 저장 완료 상태가 되면 모달 닫기
  useEffect(() => {
    if (isSaveRequested) {
      // isModifiable 값을 true로 설정하여 모달이 더 이상 표시되지 않도록 함
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

  // 변경요청 컴포넌트(저장버튼 동작)
  if (isSaveRequested) {
    return <ModificationRequest contractTabId={contractTabId} />;
  }

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
