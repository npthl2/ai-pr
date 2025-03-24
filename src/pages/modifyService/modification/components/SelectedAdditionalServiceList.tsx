import { Typography, TableBody, TableHead } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
import { useCallback, useMemo } from 'react';
import TableRow from '@components/Table/TableRow';
import TableCell from '@components/Table/TableCell';
import {
  RootContainer,
  ServiceHeaderContainer,
  TitleTypography,
  CountTypography,
  ListContainer,
  StyledTable,
  ScrollableTableContainer,
  StyledTableHeaderCell,
  ServiceName,
  PriceCell,
  StatusBadge,
  DeleteButton,
  TotalRow,
  TotalText,
  TotalAmount
} from './SelectedAdditionalServiceList.styled';

/**
 * 선택된 부가서비스 목록 컴포넌트
 * 사용자가 선택한 부가서비스 목록을 보여주고 삭제 기능을 제공합니다.
 */
const SelectedAdditionalServiceList: React.FC = () => {
  // Zustand 스토어에서 선택된 부가서비스 목록과 삭제 액션 가져오기
  const selectedAdditionalServices = useModifyServiceStore(
    (state) => state.selectedAdditionalServices,
  );
  const selectedService = useModifyServiceStore((state) => state.selectedService);
  const removeAdditionalService = useModifyServiceStore((state) => state.removeAdditionalService);
  
  // 현재 사용중인 서비스 정보 가져오기
  const currentService = useCurrentServiceStore((state) => state.currentService);
  const currentAdditionalServices = currentService?.additionalService || [];

  // 모든 부가서비스 (현재 사용중 + 선택된 새로운 서비스)
  const allServices = useMemo(() => {
    // 현재 사용중 서비스는 포함하되, 선택된 서비스에는 없는 항목만 포함
    const currentServicesOnly = currentAdditionalServices.filter(
      service => !selectedAdditionalServices.some(s => s.serviceId === service.serviceId)
    );
    
    // 모든 서비스 합치기 (현재 사용중 + 새로 선택된 서비스)
    return [...currentServicesOnly, ...selectedAdditionalServices];
  }, [currentAdditionalServices, selectedAdditionalServices]);

  // 부가서비스 삭제 핸들러
  const handleRemoveService = useCallback(
    (serviceId: string) => {
      // 현재 사용중인 서비스인지 확인
      const isCurrentService = currentAdditionalServices.some(
        service => service.serviceId === serviceId
      );
      
      // 현재 사용중인 서비스가 아닌 경우에만 삭제 가능
      if (!isCurrentService) {
        removeAdditionalService(serviceId);
      }
    },
    [removeAdditionalService, currentAdditionalServices],
  );

  // 부가서비스 총 요금 계산 (요금제 + 부가서비스)
  const totalPrice = useMemo(() => {
    const additionalServicesTotal = selectedAdditionalServices.reduce(
      (sum, service) => sum + service.serviceValue,
      0,
    );
    const servicePrice = selectedService ? selectedService.serviceValue : 0;

    return additionalServicesTotal + servicePrice;
  }, [selectedAdditionalServices, selectedService]);

  // 헤더 섹션 메모이제이션
  const headerSection = useMemo(
    () => (
      <ServiceHeaderContainer>
        <TitleTypography variant='subtitle1'>선택된 부가서비스</TitleTypography>
        <CountTypography>{allServices.length}</CountTypography>
      </ServiceHeaderContainer>
    ),
    [allServices.length],
  );

  // 테이블 컨텐츠 메모이제이션
  const tableContent = useMemo(
    () => (
      <>
        {allServices.map((service) => {
          // 현재 사용중인 서비스인지 확인
          const isCurrentService = currentAdditionalServices.some(
            currentService => currentService.serviceId === service.serviceId
          );
          
          return (
            <TableRow key={service.serviceId} hover>
              <TableCell>
                <ServiceName>{service.serviceName}</ServiceName>
              </TableCell>
              <TableCell align='center'>
                <StatusBadge isCurrentService={isCurrentService}>
                  {isCurrentService ? '사용중' : '가입중'}
                </StatusBadge>
              </TableCell>
              <PriceCell>{service.serviceValue.toLocaleString()}</PriceCell>
              <TableCell align='center'>
                {!isCurrentService && (
                  <DeleteButton
                    variant='outlined'
                    size='small'
                    color='error'
                    iconComponent={<DeleteIcon />}
                    iconPosition='left'
                    onClick={() => handleRemoveService(service.serviceId)}
                  >
                    삭제
                  </DeleteButton>
                )}
              </TableCell>
            </TableRow>
          );
        })}
        {allServices.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} align='center' sx={{ py: 2 }}>
              <Typography color='text.secondary'>선택된 부가서비스가 없습니다.</Typography>
            </TableCell>
          </TableRow>
        )}
      </>
    ),
    [allServices, currentAdditionalServices, handleRemoveService],
  );

  // 합계 행 메모이제이션
  const totalRow = useMemo(
    () => (
      <TotalRow>
        <TableCell colSpan={2}>
          <TotalText>합계</TotalText>
        </TableCell>
        <PriceCell>
          <TotalAmount>{totalPrice.toLocaleString()}</TotalAmount>
        </PriceCell>
        <TableCell></TableCell>
      </TotalRow>
    ),
    [totalPrice],
  );

  return (
    <RootContainer>
      {headerSection}
      <ListContainer>
        <StyledTable stickyHeader>
          <TableHead>
            <TableRow variant='head'>
              <StyledTableHeaderCell>서비스명</StyledTableHeaderCell>
              <StyledTableHeaderCell align='center' width='100px'>
                상태
              </StyledTableHeaderCell>
              <StyledTableHeaderCell align='right' width='100px'>
                요금 (원)
              </StyledTableHeaderCell>
              <StyledTableHeaderCell align='center' width='100px'></StyledTableHeaderCell>
            </TableRow>
          </TableHead>
        </StyledTable>

        <ScrollableTableContainer>
          <StyledTable>
            <TableBody>{tableContent}</TableBody>
          </StyledTable>
        </ScrollableTableContainer>

        <StyledTable>
          <TableBody>{totalRow}</TableBody>
        </StyledTable>
      </ListContainer>
    </RootContainer>
  );
};

export default SelectedAdditionalServiceList;
