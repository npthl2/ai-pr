import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import { useCallback, useMemo } from 'react';

// 스타일 컴포넌트
const RootContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const ServiceHeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  marginBottom: '16px',
});

const TitleTypography = styled(Typography)({
  fontWeight: 500,
  whiteSpace: 'nowrap',
  marginRight: '16px',
});

const CountTypography = styled(Typography)({
  fontWeight: 400,
});

const ListContainer = styled(Box)({
  width: '100%',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  overflow: 'hidden',
  marginBottom: '16px',
});

const StyledTableContainer = styled(TableContainer)({
  maxHeight: '200px', // 목록 그리드 높이 고정
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
});

const StyledTableHeaderCell = styled(TableCell)({
  backgroundColor: '#f5f6f8',
  fontWeight: 500,
});

const ServiceName = styled(Typography)({
  fontWeight: 400,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '500px',
});

const PriceCell = styled(TableCell)({
  textAlign: 'right',
  whiteSpace: 'nowrap',
});

const StatusCell = styled(TableCell)({
  color: '#1976d2',
});

const DeleteButton = styled(Button)({
  minWidth: '80px',
  whiteSpace: 'nowrap',
});

/**
 * 선택된 부가서비스 목록 컴포넌트
 * 사용자가 선택한 부가서비스 목록을 보여주고 삭제 기능을 제공합니다.
 */
const SelectedServiceList: React.FC = () => {
  // Zustand 스토어에서 선택된 부가서비스 목록과 삭제 액션 가져오기
  const selectedAdditionalServices = useModifyServiceStore(state => state.selectedAdditionalServices);
  const removeAdditionalService = useModifyServiceStore(state => state.removeAdditionalService);

  // 부가서비스 삭제 핸들러
  const handleRemoveService = useCallback((serviceId: string) => {
    removeAdditionalService(serviceId);
  }, [removeAdditionalService]);

  // 헤더 섹션 메모이제이션
  const headerSection = useMemo(
    () => (
      <ServiceHeaderContainer>
        <TitleTypography variant='subtitle1'>선택된 부가서비스</TitleTypography>
        <CountTypography>{selectedAdditionalServices.length}</CountTypography>
      </ServiceHeaderContainer>
    ),
    [selectedAdditionalServices.length]
  );

  // 테이블 컨텐츠 메모이제이션
  const tableContent = useMemo(
    () => (
      <TableBody>
        {selectedAdditionalServices.map((service) => (
          <TableRow key={service.serviceId} hover>
            <TableCell>
              <ServiceName>{service.serviceName}</ServiceName>
            </TableCell>
            <StatusCell align='center'>가입중</StatusCell>
            <PriceCell>{service.serviceValue.toLocaleString()}</PriceCell>
            <TableCell align='center'>
              <DeleteButton
                variant='outlined'
                size='small'
                color='error'
                startIcon={<DeleteIcon />}
                onClick={() => handleRemoveService(service.serviceId)}
              >
                삭제
              </DeleteButton>
            </TableCell>
          </TableRow>
        ))}
        {selectedAdditionalServices.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} align='center' sx={{ py: 2 }}>
              <Typography color='text.secondary'>선택된 부가서비스가 없습니다.</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    ),
    [selectedAdditionalServices, handleRemoveService]
  );

  return (
    <RootContainer>
      {headerSection}
      <ListContainer>
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeaderCell>서비스명</StyledTableHeaderCell>
                <StyledTableHeaderCell align='center' width='100px'>상태</StyledTableHeaderCell>
                <StyledTableHeaderCell align='right' width='100px'>요금 (원)</StyledTableHeaderCell>
                <StyledTableHeaderCell align='center' width='100px'></StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            {tableContent}
          </Table>
        </StyledTableContainer>
      </ListContainer>
    </RootContainer>
  );
};

export default SelectedServiceList;
