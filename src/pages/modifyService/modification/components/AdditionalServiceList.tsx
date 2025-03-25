import {
  Box,
  Typography,
  TableBody,
  TableHead,
  TextField,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import WarningIcon from '@mui/icons-material/Warning';
import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import { AdditionalService } from '@model/modifyService/ModifyServiceModel';
import TableRow from '@components/Table/TableRow';
import TableCell from '@components/Table/TableCell';
import {
  RootContainer,
  HeaderContainer,
  TitleSection,
  TitleTypography,
  CountTypography,
  ListContainer,
  StyledTable,
  ScrollableTableContainer,
  StyledTableHeaderCell,
  AddButton,
} from './AdditionalServiceList.styled';

// 필터링된 부가서비스 목록 아이템 타입
interface FilteredServiceItem extends AdditionalService {
  isRemovedCurrentService?: boolean;
  isAgeRestricted?: boolean;
  isExclusive?: boolean;
}

// 컴포넌트 props 타입 정의
interface AdditionalServiceListProps {
  additionalServices: AdditionalService[];
}

/**
 * 부가서비스 목록 컴포넌트
 * 최신출시순으로 정렬된 부가서비스 목록을 보여주고 추가 기능을 제공합니다.
 * 
 * @param props - 컴포넌트 props
 * @param props.additionalServices - 부가서비스 목록 배열
 */
const AdditionalServiceList = ({ additionalServices }: AdditionalServiceListProps) => {
  // 검색어 상태
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState('');

  // Zustand 스토어에서 부가서비스 관련 상태와 액션 가져오기
  const {
    selectedAdditionalServices,
    currentAdditionalServices,
    removedCurrentAdditionalServices,
    addAdditionalService,
  } = useModifyServiceStore();

  // 검색어로 필터링된 부가서비스 목록 상태
  const [filteredServices, setFilteredServices] = useState<FilteredServiceItem[]>([]);

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

    // 현재 사용 중인 부가서비스 ID 목록
    const currentServiceIds = currentAdditionalServices.map((service) => service.serviceId);

    // 모든 제외할 서비스 ID 목록 (현재 사용중이면서 제거되지 않은 것 + 이미 선택된 것)
    const excludedServiceIds = [...selectedServiceIds, ...currentServiceIds];

    // 필터링할 서비스 목록 (API에서 가져온 서비스 + 제거된 현재 서비스)
    const allServices = [...additionalServices, ...removedCurrentAdditionalServices];

    // 중복 서비스 ID 추적을 위한 Set
    const processedServiceIds = new Set<string>();

    // 제외되지 않은 서비스 중 검색어에 맞는 서비스만 필터링
    const filtered = allServices
      .filter((service) => {
        // 이미 처리된 서비스는 제외 (중복 방지)
        if (processedServiceIds.has(service.serviceId)) {
          return false;
        }

        // 검색어와 제외 조건 적용
        const include =
          !excludedServiceIds.includes(service.serviceId) &&
          service.serviceName.toLowerCase().includes(debouncedSearchKeyword.toLowerCase());

        // 포함된다면 ID 추적에 추가
        if (include) {
          processedServiceIds.add(service.serviceId);
        }

        return include;
      })
      // 최신출시순 정렬
      .sort((a, b) => {
        // releaseDate가 없는 경우 가장 위에 표시
        if (!a.releaseDate) return -1;
        if (!b.releaseDate) return 1;
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      })
      // 추가 정보 매핑
      .map((service) => {
        return {
          ...service,
          isRemovedCurrentService: removedCurrentAdditionalServices.some(
            (removed) => removed.serviceId === service.serviceId,
          ),
          // 백엔드에서 받은 값 사용
          isAgeRestricted: service.hasAgeRestriction || false,
          isExclusive: service.exclusive || false,
        };
      });

    setFilteredServices(filtered);
  }, [
    debouncedSearchKeyword,
    additionalServices,
    selectedAdditionalServices,
    currentAdditionalServices,
    removedCurrentAdditionalServices,
  ]);

  // 부가서비스 추가 핸들러
  const handleAddService = useCallback(
    (service: AdditionalService, isAgeRestricted: boolean) => {
      if (isAgeRestricted) {
        // 나이 제한으로 추가할 수 없는 경우 처리
        return;
      }
      addAdditionalService(service);
    },
    [addAdditionalService],
  );

  // 검색어 변경 핸들러
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }, []);

  // 나이 제한 메시지 생성 함수
  const getRestrictionMessage = useCallback((_service: FilteredServiceItem) => {
    if (_service.isAgeRestricted) {
      return '이 서비스는 나이 제한으로 인해 추가할 수 없습니다.';
    }
    if (_service.isExclusive) {
      return '이 서비스는 베타 서비스로 인해 추가할 수 없습니다.';
    }
    return '';
  }, []);

  // 렌더링 최적화를 위해 테이블 행 메모이제이션
  const tableRows = useMemo(() => {
    return filteredServices.map((service) => {
      const isRestricted = service.isAgeRestricted || service.isExclusive || false;
      
      return (
        <TableRow
          key={service.serviceId}
          hover
          sx={isRestricted ? { backgroundColor: '#ffebee' } : {}}
        >
          <TableCell sx={{ maxWidth: '500px' }}>
            {service.serviceName}
            {isRestricted && (
              <Tooltip title={getRestrictionMessage(service)} arrow>
                <WarningIcon
                  color='error'
                  fontSize='small'
                  sx={{ ml: 1, verticalAlign: 'middle' }}
                />
              </Tooltip>
            )}
          </TableCell>
          <TableCell align='right'>{service.serviceValue.toLocaleString()}원</TableCell>
          <TableCell align='center'>
            <AddButton
              variant='outlined'
              color={isRestricted ? 'error' : 'primary'}
              size='small'
              iconComponent={isRestricted ? <WarningIcon /> : <AddIcon />}
              iconPosition='left'
              onClick={() => handleAddService(service, isRestricted)}
              disabled={isRestricted}
              sx={
                isRestricted
                  ? {
                      color: '#ffffff',
                      backgroundColor: '#ff5252',
                      borderColor: '#ff5252',
                      '&.Mui-disabled': {
                        color: '#ffffff',
                        backgroundColor: '#ff5252',
                        borderColor: '#ff5252',
                      },
                    }
                  : {}
              }
            >
              {service.isAgeRestricted ? '나이제한' : service.isExclusive ? '베타서비스' : '추가'}
            </AddButton>
          </TableCell>
        </TableRow>
      );
    });
  }, [filteredServices, handleAddService, getRestrictionMessage]);

  return (
    <RootContainer>
      <HeaderContainer>
        <TitleSection>
          <TitleTypography variant='subtitle1'>부가서비스 목록</TitleTypography>
          <CountTypography>{filteredServices.length}</CountTypography>
        </TitleSection>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TextField
            value={searchKeyword}
            onChange={handleSearchChange}
            placeholder='서비스명 검색'
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
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
        <StyledTable stickyHeader>
          <TableHead>
            <TableRow variant='head'>
              <StyledTableHeaderCell>부가서비스명</StyledTableHeaderCell>
              <StyledTableHeaderCell align='right'>금액 (원)</StyledTableHeaderCell>
              <StyledTableHeaderCell align='center' width='120px'></StyledTableHeaderCell>
            </TableRow>
          </TableHead>
        </StyledTable>

        <ScrollableTableContainer>
          <StyledTable>
            <TableBody>
              {tableRows}
              {filteredServices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align='center' sx={{ py: 4 }}>
                    <Typography color='text.secondary'>
                      {searchKeyword
                        ? '검색 결과가 없습니다.'
                        : '선택 가능한 부가서비스가 없습니다.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </StyledTable>
        </ScrollableTableContainer>
      </ListContainer>
    </RootContainer>
  );
};

// PropTypes 정의
AdditionalServiceList.propTypes = {
  additionalServices: PropTypes.array.isRequired,
};

export default AdditionalServiceList;
