import React from 'react';
import { Box } from '@mui/material';

import {
  Container,
  ContentContainer,
  LineInfoContainer,
  ServicesContainer,
  CurrentServiceContainer,
  NewServiceContainer,
} from './ServiceModification.styled';
import ConcurrentService from './search/CurrentService';
import LineInformation from './search/LineInformation';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
import useCustomerStore from '@stores/CustomerStore';
const ServiceModification: React.FC = () => {
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  const selectedContractId = useCurrentServiceStore(
    (state) => state.selectedContractIds[selectedCustomerId] || '',
  );

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
        <ContentContainer data-testid='service-modification-container'>
          <LineInfoContainer sx={{ flexShrink: 0 }}>
            <LineInformation />
          </LineInfoContainer>

          {selectedContractId && (
            <ServicesContainer>
              <CurrentServiceContainer>
                <ConcurrentService />
              </CurrentServiceContainer>

              <NewServiceContainer>부가서비스변경</NewServiceContainer>
            </ServicesContainer>
          )}
        </ContentContainer>
      </Container>
    </Box>
  );
};

export default ServiceModification;
