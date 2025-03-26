import { Box, Typography, TableBody, TableHead } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import { AdditionalService } from '@model/modifyService/ModifyServiceModel';
import TableRow from '@components/Table/TableRow';
import TableCell from '@components/Table/TableCell';
import TextField from '@components/TextField';
import Tooltip from '@components/Tooltip';
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
  InfoIcon,
  StyledTableBlankCell,
} from './AdditionalServiceList.styled';
import { ArrowDownward } from '@mui/icons-material';

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

// 정렬 방향 타입 정의
type SortDirection = 'asc' | 'desc' | null;

// 정렬 필드 타입 정의
type SortField = 'serviceName' | 'serviceValue' | null;

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

  // 정렬 상태
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

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

  // 정렬 핸들러
  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        // 같은 필드를 다시 클릭하면 정렬 방향 토글
        setSortDirection(
          sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc',
        );
        if (sortDirection === 'desc') {
          setSortField(null);
        }
      } else {
        // 다른 필드를 클릭하면 해당 필드 오름차순 정렬
        setSortField(field);
        setSortDirection('asc');
      }
    },
    [sortField, sortDirection],
  );

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
      // 정렬 적용
      .sort((a, b) => {
        // 정렬 필드와 방향이 설정된 경우 적용
        if (sortField && sortDirection) {
          if (sortField === 'serviceName') {
            const nameA = a.serviceName.toLowerCase();
            const nameB = b.serviceName.toLowerCase();
            return sortDirection === 'asc'
              ? nameA.localeCompare(nameB)
              : nameB.localeCompare(nameA);
          } else if (sortField === 'serviceValue') {
            return sortDirection === 'asc'
              ? a.serviceValue - b.serviceValue
              : b.serviceValue - a.serviceValue;
          }
        }

        // 기본 정렬 (최신출시순)
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
    sortField,
    sortDirection,
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
  const handleSearchChange = useCallback((value: string) => {
    setSearchKeyword(value);
  }, []);

  // 나이 제한 메시지 생성 함수
  const getRestrictionMessage = useCallback((_service: FilteredServiceItem) => {
    if (_service.isAgeRestricted) {
      return '나이 제한으로 인해 가입이 불가능합니다.';
    }
    if (_service.isExclusive) {
      return '요금제 제한으로 인해 가입이 불가능합니다.';
    }
    return '';
  }, []);

  // 정렬 아이콘 렌더링 함수
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <ArrowDownward
          sx={{ verticalAlign: 'middle', marginLeft: '4px', fontSize: '16px', opacity: 0.3 }}
        />
      );
    }
    return (
      <ArrowDownward
        sx={{
          verticalAlign: 'middle',
          marginLeft: '4px',
          fontSize: '16px',
          transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'none',
        }}
      />
    );
  };

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
          <StyledTableBlankCell width='10px'>
            {isRestricted && <InfoIcon color='error' sx={{ verticalAlign: 'middle' }} />}
          </StyledTableBlankCell>
          <TableCell sx={{ maxWidth: '300px' }}>
            {isRestricted && (
              <Tooltip title={getRestrictionMessage(service)}>
                <Typography>{service.serviceName}</Typography>
              </Tooltip>
            )}
            {!isRestricted && <Typography>{service.serviceName}</Typography>}
          </TableCell>
          <TableCell align='right' sx={{ width: '150px' }}>
            <Typography>{service.serviceValue.toLocaleString()}</Typography>
          </TableCell>
          <StyledTableBlankCell width='95px'>
            <AddButton
              variant='outlined'
              size='small'
              iconComponent={<AddIcon />}
              iconPosition='right'
              onClick={() => handleAddService(service, isRestricted)}
              disabled={isRestricted}
            >
              추가
            </AddButton>
          </StyledTableBlankCell>
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

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            value={searchKeyword}
            onChange={handleSearchChange}
            placeholder='부가서비스명 검색'
            suffix={<SearchIcon sx={{ fontSize: '14px' }} />}
            size='small'
            sx={{
              '& .MuiInputBase-input::placeholder': {
                fontSize: '12px',
              },
            }}
          />
        </Box>
      </HeaderContainer>

      <ListContainer>
        <StyledTable stickyHeader>
          <TableHead>
            <TableRow variant='head'>
              <StyledTableBlankCell width='10px'></StyledTableBlankCell>
              <StyledTableHeaderCell
                onClick={() => handleSort('serviceName')}
                sx={{ cursor: 'pointer' }}
              >
                <Typography>
                  부가서비스명
                  {renderSortIcon('serviceName')}
                </Typography>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell
                align='right'
                onClick={() => handleSort('serviceValue')}
                sx={{ width: '150px', cursor: 'pointer' }}
              >
                <Typography>
                  요금 (원)
                  {renderSortIcon('serviceValue')}
                </Typography>
              </StyledTableHeaderCell>
              <StyledTableBlankCell width='100px'></StyledTableBlankCell>
            </TableRow>
          </TableHead>
        </StyledTable>

        <ScrollableTableContainer>
          <StyledTable>
            <TableBody>
              {tableRows}
              {filteredServices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align='center' sx={{ py: 4 }}>
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
