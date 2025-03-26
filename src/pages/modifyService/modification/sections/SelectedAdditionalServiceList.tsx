import { Typography, TableBody, TableHead, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
import { AdditionalService } from '@model/modifyService/ModifyServiceModel';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TableRow from '@components/Table/TableRow';
import TableCell from '@components/Table/TableCell';
import {
  RootContainer,
  TitleTypography,
  CountTypography,
  ListContainer,
  StyledTable,
  ScrollableTableContainer,
  StyledTableHeaderCell,
  SubscribeStatusBadge,
  CurrentStatusBadge,
  RestrictedStatusBadge,
  DeleteButton,
  TotalText,
  HeaderContainer,
  TitleSection,
  StyledTableBlankCell,
} from './SelectedAdditionalServiceList.styled';

// 정렬 방향 타입
type SortDirection = 'asc' | 'desc' | null;

// 정렬 필드 타입
type SortField = 'serviceName' | 'serviceValue' | 'serviceStatus' | null;

/**
 * 선택된 부가서비스 목록 컴포넌트
 * 사용자가 선택한 부가서비스 목록을 보여주고 삭제 기능을 제공합니다.
 */
const SelectedAdditionalServiceList = ({
  additionalServices,
}: {
  additionalServices: AdditionalService[];
}) => {
  // 정렬 상태 관리
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // 전체 서비스 목록 상태
  const [allServices, setAllServices] = useState<AdditionalService[]>([]);

  // Zustand 스토어에서 선택된 부가서비스 목록과 삭제 액션 가져오기
  const {
    selectedAdditionalServices,
    removeAdditionalService,
    currentAdditionalServices,
    removedCurrentAdditionalServices,
    removeCurrentAdditionalService,
    setCurrentAdditionalServices,
    setHasRestrictedServices,
  } = useModifyServiceStore();

  // 현재 사용중인 서비스 정보 가져오기
  const currentService = useCurrentServiceStore((state) => state.currentService);

  // 나이 제한으로 인해 제거해야 하는 서비스가 있는지 확인
  const hasRestrictedServices = currentAdditionalServices.some((service) => {
    // API에서 받아온 부가서비스 목록에서 해당 서비스 찾기
    const apiService = additionalServices.find(
      (apiService) => apiService.serviceId === service.serviceId,
    );

    // API에서 받아온 hasAgeRestriction과 exclusive 값 사용
    return apiService?.hasAgeRestriction || apiService?.exclusive || false;
  });

  // 나이 제한 상태가 변경될 때마다 스토어 업데이트
  useEffect(() => {
    setHasRestrictedServices(hasRestrictedServices);
  }, [hasRestrictedServices, setHasRestrictedServices]);

  // CurrentServiceStore의 AdditionalService 배열을 ModifyServiceStore에서 사용하는 AdditionalService 배열로 변환
  const mapToModifyAdditionalServices = (services: AdditionalService[]): AdditionalService[] => {
    return services.map((service) => ({
      ...service,
      serviceValueType: service.serviceValueType || service.serviceType || '요금',
      exclusiveServiceIds: service.exclusiveServiceIds || [],
      releaseDate: service.releaseDate || service.validStartDateTime || '',
    }));
  };

  // 컴포넌트 마운트 시 현재 부가서비스 목록 초기화
  useEffect(() => {
    if (currentService?.additionalService && currentService.additionalService.length > 0) {
      // 아직 초기화되지 않았고, 제거된 서비스가 없는 경우에만 초기화
      if (currentAdditionalServices.length === 0 && removedCurrentAdditionalServices.length === 0) {
        // 현재 서비스의 AdditionalService를 ModifyServiceStore에서 사용하는 형태로 변환
        const modifyAdditionalServices = mapToModifyAdditionalServices(
          currentService.additionalService,
        );
        setCurrentAdditionalServices(modifyAdditionalServices);
      }
    }
  }, [
    currentService,
    currentAdditionalServices.length,
    removedCurrentAdditionalServices.length,
    setCurrentAdditionalServices,
  ]);

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

  // 상태 변경시 서비스 목록 업데이트 (정렬 포함)
  useEffect(() => {
    // 모든 서비스 합치기 (현재 사용중 유지 + 새로 선택된 서비스)
    let services = [...currentAdditionalServices, ...selectedAdditionalServices];

    // 정렬 적용
    if (sortField && sortDirection) {
      if (sortField === 'serviceName') {
        services.sort((a, b) => {
          const nameA = a.serviceName.toLowerCase();
          const nameB = b.serviceName.toLowerCase();
          return sortDirection === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
      } else if (sortField === 'serviceValue') {
        services.sort((a, b) =>
          sortDirection === 'asc'
            ? a.serviceValue - b.serviceValue
            : b.serviceValue - a.serviceValue,
        );
      } else if (sortField === 'serviceStatus') {
        // 서비스 상태를 기준으로 정렬하는 로직
        services.sort((a, b) => {
          const statusA = getServiceStatusPriority(
            a,
            currentAdditionalServices,
            additionalServices,
          );
          const statusB = getServiceStatusPriority(
            b,
            currentAdditionalServices,
            additionalServices,
          );
          return sortDirection === 'asc' ? statusA - statusB : statusB - statusA;
        });
      }
    }

    setAllServices(services);
  }, [
    currentAdditionalServices,
    selectedAdditionalServices,
    sortField,
    sortDirection,
    additionalServices,
  ]);

  // 서비스 상태에 따른 우선 순위 반환 함수 (정렬에 사용)
  const getServiceStatusPriority = (
    service: AdditionalService,
    currentServices: AdditionalService[],
    apiServices: AdditionalService[],
  ): number => {
    const isCurrentService = currentServices.some(
      (current) => current.serviceId === service.serviceId,
    );
    const apiService = apiServices.find((api) => api.serviceId === service.serviceId);
    const isRestricted = apiService?.hasAgeRestriction || apiService?.exclusive || false;

    if (isCurrentService && isRestricted) return 0; // 해지필요
    if (isCurrentService) return 1; // 가입중
    return 2; // 가입
  };

  // 부가서비스 삭제 핸들러
  const handleRemoveService = useCallback(
    (service: AdditionalService, isCurrentService: boolean) => {
      if (isCurrentService) {
        // 현재 가입중인 서비스 삭제
        removeCurrentAdditionalService(service);
      } else {
        // 새로 추가한 서비스 삭제
        removeAdditionalService(service.serviceId);
      }
    },
    [removeAdditionalService, removeCurrentAdditionalService],
  );

  // 부가서비스 총 요금 계산 (요금제 + 부가서비스)
  const totalPrice =
    selectedAdditionalServices.reduce((sum, service) => sum + service.serviceValue, 0) +
    currentAdditionalServices.reduce((sum, service) => sum + service.serviceValue, 0);

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

  // 테이블 컨텐츠 메모이제이션
  const tableContent = useMemo(
    () => (
      <>
        {allServices.map((service) => {
          // 현재 사용중인 서비스인지 확인
          const isCurrentService = currentAdditionalServices.some(
            (currentService) => currentService.serviceId === service.serviceId,
          );

          // API에서 받아온 부가서비스 목록에서 해당 서비스 찾기
          const apiService = additionalServices.find(
            (apiService) => apiService.serviceId === service.serviceId,
          );

          // 제한 여부 확인 (나이 제한 또는 베타 서비스)
          const isRestricted = apiService?.hasAgeRestriction || apiService?.exclusive || false;

          return (
            <TableRow
              key={service.serviceId}
              hover
              sx={isCurrentService && isRestricted ? { backgroundColor: '#ffebee' } : {}}
            >
              <TableCell align='left' width='100px'>
                {isCurrentService && isRestricted ? (
                  <RestrictedStatusBadge>해지필요</RestrictedStatusBadge>
                ) : isCurrentService ? (
                  <CurrentStatusBadge>가입중</CurrentStatusBadge>
                ) : (
                  <SubscribeStatusBadge>가입</SubscribeStatusBadge>
                )}
              </TableCell>
              <TableCell>
                <Typography>{service.serviceName}</Typography>
              </TableCell>
              <TableCell align='right' sx={{ width: '150px' }}>
                <Typography>{service.serviceValue.toLocaleString()}</Typography>
              </TableCell>
              <StyledTableBlankCell width='95px'>
                <DeleteButton
                  variant='outlined'
                  size='small'
                  iconComponent={<CloseIcon />}
                  iconPosition='right'
                  onClick={() => handleRemoveService(service, isCurrentService)}
                >
                  삭제
                </DeleteButton>
              </StyledTableBlankCell>
            </TableRow>
          );
        })}
      </>
    ),
    [allServices, currentAdditionalServices, handleRemoveService, additionalServices],
  );

  return (
    <RootContainer>
      <HeaderContainer>
        <TitleSection>
          <TitleTypography variant='subtitle1'>선택된 부가서비스</TitleTypography>
          <CountTypography>{allServices.length}</CountTypography>
        </TitleSection>
      </HeaderContainer>

      <ListContainer>
        <StyledTable stickyHeader>
          <TableHead>
            <TableRow variant='head'>
              <StyledTableHeaderCell
                onClick={() => handleSort('serviceStatus')}
                align='left'
                width='100px'
              >
                <Typography>
                  상태
                  {renderSortIcon('serviceStatus')}
                </Typography>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell onClick={() => handleSort('serviceName')}>
                <Typography>
                  부가서비스명
                  {renderSortIcon('serviceName')}
                </Typography>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell
                align='right'
                width='120px'
                onClick={() => handleSort('serviceValue')}
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
              {tableContent}
              {allServices.length === 0 && (
                <TableRow sx={{ border: 'none' }}>
                  <TableCell
                    colSpan={4}
                    align='center'
                    sx={{ py: 0, height: '148px', border: 'none' }}
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
          </StyledTable>
        </ScrollableTableContainer>

        <StyledTable>
          <TableRow variant='head'>
            <TableCell colSpan={2}>
              <TotalText>합계</TotalText>
            </TableCell>
            <StyledTableHeaderCell align='right' width='120px'>
              <Typography variant='subtitle1'>{totalPrice.toLocaleString()}원</Typography>
            </StyledTableHeaderCell>
            <StyledTableBlankCell width='100px'></StyledTableBlankCell>
          </TableRow>
        </StyledTable>
      </ListContainer>
    </RootContainer>
  );
};

export default SelectedAdditionalServiceList;
