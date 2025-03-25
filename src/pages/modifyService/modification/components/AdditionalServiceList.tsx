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
import { useAdditionalServicesQuery } from '@api/queries/modifyService/useModifyServiceQuery';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import useCustomerStore from '@stores/CustomerStore';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
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
}

/**
 * 부가서비스 목록 컴포넌트
 * 최신출시순으로 정렬된 부가서비스 목록을 보여주고 추가 기능을 제공합니다.
 */
const AdditionalServiceList: React.FC = () => {
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

  // CustomerStore에서 현재 선택된 고객 정보 가져오기
  const { customers, selectedCustomerId } = useCustomerStore();

  // CurrentServiceStore에서 초기 서비스 정보 가져오기
  const currentService = useCurrentServiceStore((state) => state.currentService);

  // ModifyServiceStore에서 필요한 정보 가져오기
  const selectedServiceId = useModifyServiceStore((state) => state.selectedService?.serviceId);
  const serviceModificationMounted = useModifyServiceStore(
    (state) => state.serviceModificationMounted,
  );

  // 현재 선택된 고객 찾기
  const selectedCustomer = useMemo(() => {
    return customers.find((customer) => customer.id === selectedCustomerId);
  }, [customers, selectedCustomerId]);

  // 현재 고객의 나이
  const customerAge = useMemo(() => {
    if (!selectedCustomer) return null;
    return 'age' in selectedCustomer ? Number(selectedCustomer.age) : null;
  }, [selectedCustomer]);

  // API에서 부가서비스 목록을 가져옵니다
  const { data: additionalServices = [] } = useAdditionalServicesQuery(
    customerAge || 0,
    selectedServiceId || currentService?.serviceId || '', // 요금제 선택 후에는 selectedServiceId, 선택 전에는 currentService.serviceId 사용
    serviceModificationMounted, // ServiceModification 컴포넌트가 마운트된 후에만 API 호출
  );

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
      // 나이 제한 체크 추가
      .map((service) => {
        const ageMin = service.availableAgeMin ? parseInt(service.availableAgeMin) : null;
        const ageMax = service.availableAgeMax ? parseInt(service.availableAgeMax) : null;

        // 나이 제한 여부 확인
        let isAgeRestricted = false;
        if (
          customerAge !== null &&
          ((ageMin !== null && customerAge < ageMin) || (ageMax !== null && customerAge > ageMax))
        ) {
          isAgeRestricted = true;
        }

        return {
          ...service,
          isAgeRestricted,
          isRemovedCurrentService: removedCurrentAdditionalServices.some(
            (removed) => removed.serviceId === service.serviceId,
          ),
        };
      });

    setFilteredServices(filtered);
  }, [
    debouncedSearchKeyword,
    additionalServices,
    selectedAdditionalServices,
    currentAdditionalServices,
    removedCurrentAdditionalServices,
    customerAge,
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
  const getAgeRestrictionMessage = useCallback((service: FilteredServiceItem) => {
    const ageMin = service.availableAgeMin ? parseInt(service.availableAgeMin) : null;
    const ageMax = service.availableAgeMax ? parseInt(service.availableAgeMax) : null;

    if (ageMin !== null && ageMax !== null) {
      return `이 서비스는 ${ageMin}세~${ageMax}세 고객만 이용 가능합니다.`;
    } else if (ageMin !== null) {
      return `이 서비스는 ${ageMin}세 이상 고객만 이용 가능합니다.`;
    } else if (ageMax !== null) {
      return `이 서비스는 ${ageMax}세 이하 고객만 이용 가능합니다.`;
    }

    return '';
  }, []);

  // 렌더링 최적화를 위해 테이블 행 메모이제이션
  const tableRows = useMemo(() => {
    return filteredServices.map((service) => {
      return (
        <TableRow
          key={service.serviceId}
          hover
          sx={service.isAgeRestricted ? { backgroundColor: '#ffebee' } : {}}
        >
          <TableCell sx={{ maxWidth: '500px' }}>
            {service.serviceName}
            {service.isAgeRestricted && (
              <Tooltip title={getAgeRestrictionMessage(service)} arrow>
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
              color={service.isAgeRestricted ? 'error' : 'primary'}
              size='small'
              iconComponent={service.isAgeRestricted ? <WarningIcon /> : <AddIcon />}
              iconPosition='left'
              onClick={() => handleAddService(service, service.isAgeRestricted || false)}
              disabled={service.isAgeRestricted}
              sx={
                service.isAgeRestricted
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
              {service.isAgeRestricted ? '나이제한' : '추가'}
            </AddButton>
          </TableCell>
        </TableRow>
      );
    });
  }, [filteredServices, handleAddService, getAgeRestrictionMessage]);

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

export default AdditionalServiceList;
