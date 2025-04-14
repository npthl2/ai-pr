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
import useCustomerStore from '@stores/CustomerStore';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import useCurrentServiceStore from '@stores/CurrentServiceStore';

import ModificationRequest from './ModificationRequest';
import LineInformation from './search/LineInformation';
import ConcurrentService from './search/CurrentService';

// 서비스 변경 메인 컴포넌트
const ServiceModification = () => {
  // 저장 요청 상태 관리
  const [isSaveRequested, setIsSaveRequested] = useState(false);

  // ModifyServiceStore에서 필요한 함수 가져오기
  const { createModifyServiceInfo } = useModifyServiceStore();

  // 고객 스토어에서 필요한 정보 가져오기
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  // const customerTabs = useCustomerStore((state) => state.customerTabs);

  const selectedContractId = useCurrentServiceStore(
    (state) => state.selectedContractIds[selectedCustomerId] || '',
  );

  // 컴포넌트 마운트 시 상태 초기화
  useEffect(() => {
    if (selectedCustomerId && selectedContractId) {
      createModifyServiceInfo(selectedCustomerId, selectedContractId);
    }
  }, [createModifyServiceInfo, selectedCustomerId, selectedContractId]);

  if (isSaveRequested) {
    return <ModificationRequest />;
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
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
            </ServicesContainer>
          )}
        </ContentContainer>
      </Container>
    </Box>
  );
};

export default ServiceModification;
