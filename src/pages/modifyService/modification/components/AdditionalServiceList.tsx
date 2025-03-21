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
  TextField,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  useAdditionalServicesQuery,
  AdditionalService,
} from '@api/queries/modifyService/useModifyServiceQuery';
import useModifyServiceStore from '@stores/ModifyServiceStore';

// 스타일 컴포넌트
const RootContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  marginBottom: '16px',
});

const TitleSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const TitleTypography = styled(Typography)({
  fontWeight: 500,
  whiteSpace: 'nowrap',
  marginRight: '8px',
});

const CountTypography = styled(Typography)({
  fontWeight: 400,
});

const ListContainer = styled(Box)({
  width: '100%',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  overflow: 'hidden',
});

const StyledTableContainer = styled(TableContainer)({
  maxHeight: '300px', // 목록 그리드 높이 고정
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

const AddButton = styled(Button)({
  minWidth: '80px',
  whiteSpace: 'nowrap',
});

/**
 * 부가서비스 목록 컴포넌트
 * 최신출시순으로 정렬된 부가서비스 목록을 보여주고 추가 기능을 제공합니다.
 */
const AdditionalServiceList: React.FC = () => {
  // 검색어 상태
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState('');

  // Zustand 스토어에서 부가서비스 관련 상태와 액션 가져오기
  const { selectedAdditionalServices, addAdditionalService } = useModifyServiceStore();

  // API에서 부가서비스 목록을 가져옵니다
  const { data: additionalServices = [] } = useAdditionalServicesQuery();

  // 검색어로 필터링된 부가서비스 목록 상태
  const [filteredServices, setFilteredServices] = useState<AdditionalService[]>([]);

  // 검색어 디바운싱 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKeyword(searchKeyword);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchKeyword]);

  // 검색어나 부가서비스 목록이 변경될 때마다 필터링된 목록 업데이트
  useEffect(() => {
    if (!additionalServices.length) return;

    // 이미 선택된 부가서비스 ID 목록
    const selectedServiceIds = selectedAdditionalServices.map((service) => service.serviceId);

    // 선택되지 않은 서비스 중 검색어에 맞는 서비스만 필터링
    const filtered = additionalServices
      .filter(
        (service) =>
          !selectedServiceIds.includes(service.serviceId) &&
          service.serviceName.toLowerCase().includes(debouncedSearchKeyword.toLowerCase()),
      )
      // 최신출시순 정렬
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

    setFilteredServices(filtered);
  }, [debouncedSearchKeyword, additionalServices, selectedAdditionalServices]);

  // 부가서비스 추가 핸들러
  const handleAddService = useCallback(
    (service: AdditionalService) => {
      addAdditionalService(service);
    },
    [addAdditionalService],
  );

  // 검색어 변경 핸들러
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }, []);

  // 렌더링 최적화를 위해 테이블 행 메모이제이션
  const tableRows = useMemo(() => {
    return filteredServices.map((service) => (
      <TableRow key={service.serviceId} hover>
        <TableCell sx={{ maxWidth: '500px' }}>{service.serviceName}</TableCell>
        <TableCell align="right">{service.serviceValue.toLocaleString()}</TableCell>
        <TableCell align="center">
          <AddButton
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => handleAddService(service)}
          >
            추가
          </AddButton>
        </TableCell>
      </TableRow>
    ));
  }, [filteredServices, handleAddService]);

  return (
    <RootContainer>
      <HeaderContainer>
        <TitleSection>
          <TitleTypography variant="subtitle1">부가서비스 목록</TitleTypography>
          <CountTypography>{filteredServices.length}</CountTypography>
        </TitleSection>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TextField
            value={searchKeyword}
            onChange={handleSearchChange}
            placeholder="서비스명 검색"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: '250px',
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#FFFFFF',
              },
            }}
          />
        </Box>
      </HeaderContainer>

      <ListContainer>
        <StyledTableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableHeaderCell>서비스명</StyledTableHeaderCell>
                <StyledTableHeaderCell align="right">금액 (원)</StyledTableHeaderCell>
                <StyledTableHeaderCell align="center" width="120px"></StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows}
              {filteredServices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      {searchKeyword
                        ? '검색 결과가 없습니다.'
                        : '선택 가능한 부가서비스가 없습니다.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </ListContainer>
    </RootContainer>
  );
};

export default AdditionalServiceList;
