import { Box, Typography, TableBody, TableHead, Table } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, useCallback, useMemo } from 'react';
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
  ScrollableTableContainer,
  StyledTableHeaderCell,
  AddButton,
  InfoIcon,
  StyledTableBlankCell,
  EllipsisTypography,
  TextContainer,
} from './AdditionalServiceList.styled';
import { ArrowDownward } from '@mui/icons-material';
import useAdditionalServiceSorting, {
  SortField,
} from '@hooks/modifyService/useAdditionalServiceSorting';
import useCustomerStore from '@stores/CustomerStore';
import useCurrentServiceStore from '@stores/CurrentServiceStore';

// 필터링된 부가서비스 목록 아이템 타입
interface FilteredAdditionalService extends AdditionalService {
  isRemovedCurrentService?: boolean;
  isAgeRestricted?: boolean;
  isExclusive?: boolean;
}

// 컴포넌트 props 타입 정의
interface AdditionalServiceListProps {
  additionalServices: AdditionalService[];
}

const AdditionalServiceList = ({ additionalServices }: AdditionalServiceListProps) => {
  // 스토어에서 필요한 정보 가져오기
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  const selectedContractId = useCurrentServiceStore(
    (state) => state.selectedContractIds[selectedCustomerId] || '',
  );

  // Zustand 스토어에서 필요한 함수와 데이터 가져오기
  const { addAdditionalService, getModifyServiceInfo } = useModifyServiceStore();
  const modifyServiceInfo = getModifyServiceInfo(selectedCustomerId, selectedContractId);

  // 계약 탭에 대한 정보가 없으면 기본값 제공
  const selectedAdditionalServices = modifyServiceInfo?.selectedAdditionalServices || [];
  const currentAdditionalServices = modifyServiceInfo?.currentAdditionalServices || [];
  const removedCurrentAdditionalServices =
    modifyServiceInfo?.removedCurrentAdditionalServices || [];

  // 정렬 기능
  const { sortField, sortDirection, handleSort, getSortIconProps, sortAdditionalServices } =
    useAdditionalServiceSorting();

  // 정렬 아이콘 렌더링 함수
  const renderSortIcon = (field: SortField) => {
    const iconProps = getSortIconProps(field);
    return <ArrowDownward sx={iconProps.style} data-testid={iconProps.testId} />;
  };

  // 검색어 상태
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState('');

  // 검색어로 필터링된 부가서비스 목록 상태
  const [filteredAdditionalServices, setFilteredAdditionalServices] = useState<
    FilteredAdditionalService[]
  >([]);

  // 검색어 변경 핸들러
  const handleSearchChange = useCallback((value: string) => {
    setSearchKeyword(value);
  }, []);

  // 검색어 디바운싱 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKeyword(searchKeyword);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchKeyword]);

  // 검색어나 부가서비스 목록이 변경될 때마다 필터링된 목록 업데이트
  useEffect(() => {
    if (!additionalServices.length) {
      setFilteredAdditionalServices([]);
      return;
    }

    // 이미 선택된 부가서비스 ID 목록
    const selectedAdditionalServiceIds = selectedAdditionalServices.map(
      (additionalService) => additionalService.serviceId,
    );

    // 현재 사용 중인 부가서비스 ID 목록
    const currentAdditionalServiceIds = currentAdditionalServices.map(
      (additionalService) => additionalService.serviceId,
    );

    // 모든 제외할 서비스 ID 목록 (현재 사용중이면서 제거되지 않은 것 + 이미 선택된 것)
    const excludedAdditionalServiceIds = [
      ...selectedAdditionalServiceIds,
      ...currentAdditionalServiceIds,
    ];

    // 필터링할 서비스 목록 (API에서 가져온 서비스 + 제거된 현재 서비스)
    const allAdditionalServices = [...additionalServices, ...removedCurrentAdditionalServices];

    // 중복 서비스 ID 추적을 위한 Set
    const processedAdditionalServiceIds = new Set<string>();

    // 제외되지 않은 서비스 중 검색어에 맞는 서비스만 필터링
    const filtered = allAdditionalServices
      .filter((additionalService) => {
        // 이미 처리된 서비스는 제외 (중복 방지)
        if (processedAdditionalServiceIds.has(additionalService.serviceId)) {
          return false;
        }

        // 검색어와 제외 조건 적용
        const include =
          !excludedAdditionalServiceIds.includes(additionalService.serviceId) &&
          additionalService.serviceName
            .toLowerCase()
            .includes(debouncedSearchKeyword.trim().toLowerCase());

        // 포함된다면 ID 추적에 추가
        if (include) {
          processedAdditionalServiceIds.add(additionalService.serviceId);
        }

        return include;
      })

      // 추가 정보 매핑
      .map((additionalService) => {
        return {
          ...additionalService,
          isRemovedCurrentAdditionalService: removedCurrentAdditionalServices.some(
            (removed) => removed.serviceId === additionalService.serviceId,
          ),
          // 백엔드에서 받은 값 사용
          isAgeRestricted: additionalService.hasAgeRestriction || false,
          isExclusive: additionalService.exclusive || false,
        };
      });

    // 정렬 적용
    const sortedAdditionalServices = sortAdditionalServices(filtered);

    setFilteredAdditionalServices(sortedAdditionalServices);
  }, [
    debouncedSearchKeyword,
    additionalServices,
    selectedAdditionalServices,
    currentAdditionalServices,
    removedCurrentAdditionalServices,
    sortAdditionalServices,
    sortField,
    sortDirection,
  ]);

  // 부가서비스 추가 핸들러
  const handleAddAdditionalService = useCallback(
    (additionalService: AdditionalService, isAgeRestricted: boolean) => {
      if (isAgeRestricted) {
        return;
      }
      addAdditionalService(selectedCustomerId, selectedContractId, additionalService);
    },
    [addAdditionalService, selectedCustomerId, selectedContractId],
  );

  // 나이 제한 메시지 생성 함수
  const getRestrictionMessage = useCallback(
    (filteredAdditionalService: FilteredAdditionalService) => {
      if (filteredAdditionalService.isAgeRestricted) {
        return '나이 제한으로 인해 가입이 불가능합니다.';
      }
      if (filteredAdditionalService.isExclusive) {
        return '요금제 제한으로 인해 가입이 불가능합니다.';
      }
      return '';
    },
    [],
  );

  // 렌더링 테이블 컨텐츠 메모이제이션
  const tableContent = useMemo(() => {
    return filteredAdditionalServices.map((additionalService) => {
      const isRestricted =
        additionalService.isAgeRestricted || additionalService.isExclusive || false;

      return (
        <TableRow
          key={additionalService.serviceId}
          hover
          sx={isRestricted ? { backgroundColor: '#ffebee' } : {}}
          data-testid='additional-service-list'
        >
          <StyledTableBlankCell width='10px' sx={{ paddingRight: '0px' }}>
            {isRestricted && (
              <InfoIcon
                color='error'
                sx={{ verticalAlign: 'middle' }}
                data-testid='restricted-icon'
              />
            )}
          </StyledTableBlankCell>
          <TableCell>
            <Box sx={{ width: '500px', alignItems: 'left' }}>
              <Box display='flex' alignItems='left'>
                <TextContainer>
                  {isRestricted && (
                    <Tooltip
                      title={getRestrictionMessage(additionalService)}
                      arrow
                      placement='bottom'
                    >
                      <EllipsisTypography
                        data-testid={`service-name-${additionalService.serviceId}`}
                      >
                        {additionalService.serviceName}
                      </EllipsisTypography>
                    </Tooltip>
                  )}
                  {!isRestricted && (
                    <EllipsisTypography>{additionalService.serviceName}</EllipsisTypography>
                  )}
                </TextContainer>
              </Box>
            </Box>
          </TableCell>

          <TableCell align='right' sx={{ width: '150px' }}>
            <Typography>{additionalService.serviceValue.toLocaleString()}</Typography>
          </TableCell>
          <StyledTableBlankCell width='95px'>
            <AddButton
              variant='outlined'
              size='small'
              iconComponent={<AddIcon />}
              iconPosition='right'
              onClick={() => handleAddAdditionalService(additionalService, isRestricted)}
              disabled={isRestricted}
              data-testid='add-button'
            >
              추가
            </AddButton>
          </StyledTableBlankCell>
        </TableRow>
      );
    });
  }, [filteredAdditionalServices, handleAddAdditionalService, getRestrictionMessage]);

  return (
    <RootContainer>
      <HeaderContainer>
        <TitleSection>
          <TitleTypography variant='subtitle1'>부가서비스 목록</TitleTypography>
          <CountTypography>{filteredAdditionalServices.length}</CountTypography>
        </TitleSection>

        <Box sx={{ display: 'flex', alignItems: 'center' }} data-testid='additional-service-search'>
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
        <Table stickyHeader>
          <TableHead>
            <TableRow variant='head'>
              <StyledTableBlankCell width='10px'></StyledTableBlankCell>
              <StyledTableHeaderCell onClick={() => handleSort('serviceName')}>
                <Typography>
                  부가서비스명
                  {renderSortIcon('serviceName')}
                </Typography>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell
                align='right'
                onClick={() => handleSort('serviceValue')}
                sx={{ width: '150px' }}
              >
                <Typography>
                  요금 (원)
                  {renderSortIcon('serviceValue')}
                </Typography>
              </StyledTableHeaderCell>
              <StyledTableBlankCell width='100px'></StyledTableBlankCell>
            </TableRow>
          </TableHead>
        </Table>

        <ScrollableTableContainer>
          <Table>
            <TableBody>
              {tableContent}
              {filteredAdditionalServices.length === 0 && (
                <TableRow sx={{ border: 'none' }}>
                  <TableCell
                    colSpan={4}
                    align='center'
                    sx={{ py: 0, height: '220px', border: 'none' }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <Typography color='text.secondary'>표시할 데이터가 없습니다.</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollableTableContainer>
      </ListContainer>
    </RootContainer>
  );
};

export default AdditionalServiceList;
