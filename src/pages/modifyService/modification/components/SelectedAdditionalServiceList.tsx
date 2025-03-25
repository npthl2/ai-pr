import { Typography, TableBody, TableHead, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WarningIcon from '@mui/icons-material/Warning';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
import useCustomerStore from '@stores/CustomerStore';
import { AdditionalService } from '@model/modifyService/ModifyServiceModel';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  HeaderCellContent,
  ServiceName,
  PriceCell,
  StatusBadge,
  DeleteButton,
  TotalRow,
  TotalText,
  TotalAmount,
  WarningContainer,
  WarningMessage,
} from './SelectedAdditionalServiceList.styled';

// 정렬 방향 타입
type SortDirection = 'asc' | 'desc' | null;

// 정렬 필드 타입
type SortField = 'serviceName' | 'serviceValue' | null;

/**
 * 선택된 부가서비스 목록 컴포넌트
 * 사용자가 선택한 부가서비스 목록을 보여주고 삭제 기능을 제공합니다.
 */
const SelectedAdditionalServiceList: React.FC = () => {
  // 정렬 상태 관리
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Zustand 스토어에서 선택된 부가서비스 목록과 삭제 액션 가져오기
  const {
    selectedAdditionalServices,
    removeAdditionalService,
    currentAdditionalServices,
    removedCurrentAdditionalServices,
    removeCurrentAdditionalService,
    setCurrentAdditionalServices,
    setHasAgeRestrictedServices,
  } = useModifyServiceStore();

  const selectedService = useModifyServiceStore((state) => state.selectedService);

  // 현재 사용중인 서비스 정보 가져오기
  const currentService = useCurrentServiceStore((state) => state.currentService);

  // CustomerStore에서 현재 선택된 고객 정보 가져오기
  const { customers, selectedCustomerId } = useCustomerStore();

  // 현재 선택된 고객 찾기
  const selectedCustomer = useMemo(() => {
    return customers.find((customer) => customer.id === selectedCustomerId);
  }, [customers, selectedCustomerId]);

  // 현재 고객의 나이
  const customerAge = useMemo(() => {
    if (!selectedCustomer) return null;
    return 'age' in selectedCustomer ? Number(selectedCustomer.age) : null;
  }, [selectedCustomer]);

  // 나이 제한으로 인해 제거해야 하는 서비스가 있는지 확인
  const hasAgeRestrictedServices = useMemo(() => {
    if (!customerAge) return false;

    return currentAdditionalServices.some((service) => {
      const ageMin = service.availableAgeMin ? parseInt(service.availableAgeMin) : null;
      const ageMax = service.availableAgeMax ? parseInt(service.availableAgeMax) : null;

      return (ageMin !== null && customerAge < ageMin) || (ageMax !== null && customerAge > ageMax);
    });
  }, [currentAdditionalServices, customerAge]);

  // 나이 제한 상태가 변경될 때마다 스토어 업데이트
  useEffect(() => {
    setHasAgeRestrictedServices(hasAgeRestrictedServices);
  }, [hasAgeRestrictedServices, setHasAgeRestrictedServices]);

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

  // 모든 부가서비스 (현재 사용중 + 선택된 새로운 서비스)
  const allServices = useMemo(() => {
    // 모든 서비스 합치기 (현재 사용중 유지 + 새로 선택된 서비스)
    let services = [...currentAdditionalServices, ...selectedAdditionalServices];

    // 정렬 적용
    if (sortField && sortDirection) {
      services = [...services].sort((a, b) => {
        if (sortField === 'serviceName') {
          return sortDirection === 'asc'
            ? a.serviceName.localeCompare(b.serviceName)
            : b.serviceName.localeCompare(a.serviceName);
        } else if (sortField === 'serviceValue') {
          return sortDirection === 'asc'
            ? a.serviceValue - b.serviceValue
            : b.serviceValue - a.serviceValue;
        }
        return 0;
      });
    }

    return services;
  }, [currentAdditionalServices, selectedAdditionalServices, sortField, sortDirection]);

  // 서비스의 나이 제한 여부 확인 함수
  const isServiceRestricted = useCallback(
    (service: AdditionalService) => {
      if (!customerAge) return false;

      // 나이 제한 확인
      const ageMin = service.availableAgeMin ? parseInt(service.availableAgeMin) : null;
      const ageMax = service.availableAgeMax ? parseInt(service.availableAgeMax) : null;
      const isAgeRestricted =
        (ageMin !== null && customerAge < ageMin) || (ageMax !== null && customerAge > ageMax);

      // 베타 서비스 확인
      const isExclusive = service.exclusive || false;

      return isAgeRestricted || isExclusive;
    },
    [customerAge],
  );

  // 제한 메시지 생성 함수
  const getRestrictionMessage = useCallback((service: AdditionalService) => {
    const ageMin = service.availableAgeMin ? parseInt(service.availableAgeMin) : null;
    const ageMax = service.availableAgeMax ? parseInt(service.availableAgeMax) : null;
    const isAgeRestricted =
      (ageMin !== null && ageMax !== null) || ageMin !== null || ageMax !== null;

    if (service.exclusive) {
      return '이 서비스는 베타 서비스입니다.';
    }

    if (isAgeRestricted) {
      if (ageMin !== null && ageMax !== null) {
        return `이 서비스는 ${ageMin}세~${ageMax}세 고객만 이용 가능합니다.`;
      } else if (ageMin !== null) {
        return `이 서비스는 ${ageMin}세 이상 고객만 이용 가능합니다.`;
      } else if (ageMax !== null) {
        return `이 서비스는 ${ageMax}세 이하 고객만 이용 가능합니다.`;
      }
    }

    return '';
  }, []);

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
  const totalPrice = useMemo(() => {
    const additionalServicesTotal = selectedAdditionalServices.reduce(
      (sum, service) => sum + service.serviceValue,
      0,
    );
    const currentServicesTotal = currentAdditionalServices.reduce(
      (sum, service) => sum + service.serviceValue,
      0,
    );
    const servicePrice = selectedService ? selectedService.serviceValue : 0;

    return additionalServicesTotal + currentServicesTotal + servicePrice;
  }, [selectedAdditionalServices, currentAdditionalServices, selectedService]);

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
            (currentService) => currentService.serviceId === service.serviceId,
          );

          // 제한 여부 확인 (나이 제한 또는 베타 서비스)
          const isRestricted = isServiceRestricted(service);

          return (
            <TableRow
              key={service.serviceId}
              hover
              sx={isCurrentService && isRestricted ? { backgroundColor: '#ffebee' } : {}}
            >
              <TableCell align='center'>
                <StatusBadge
                  $isCurrentService={isCurrentService}
                  $isAgeRestricted={isCurrentService && isRestricted}
                >
                  {isCurrentService && isRestricted
                    ? '해지필요'
                    : isCurrentService
                      ? '가입중'
                      : '가입'}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <ServiceName>
                  {service.serviceName}
                  {isCurrentService && isRestricted && (
                    <Tooltip title={getRestrictionMessage(service)} arrow>
                      <WarningIcon
                        color='error'
                        fontSize='small'
                        sx={{ ml: 1, verticalAlign: 'middle' }}
                      />
                    </Tooltip>
                  )}
                </ServiceName>
              </TableCell>
              <PriceCell>{service.serviceValue.toLocaleString()}원</PriceCell>
              <TableCell align='center'>
                <DeleteButton
                  variant='outlined'
                  size='small'
                  color='grey'
                  iconComponent={<CloseIcon fontSize='small' />}
                  onClick={() => handleRemoveService(service, isCurrentService)}
                />
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
    [
      allServices,
      currentAdditionalServices,
      handleRemoveService,
      isServiceRestricted,
      getRestrictionMessage,
    ],
  );

  // 합계 행 메모이제이션
  const totalRow = useMemo(
    () => (
      <TotalRow>
        <TableCell colSpan={2}>
          <TotalText>합계</TotalText>
        </TableCell>
        <PriceCell>
          <TotalAmount>{totalPrice.toLocaleString()}원</TotalAmount>
        </PriceCell>
        <TableCell></TableCell>
      </TotalRow>
    ),
    [totalPrice],
  );

  // 정렬 아이콘 렌더링 함수
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowDropDownIcon sx={{ opacity: 0.3 }} />;
    }
    return (
      <ArrowDropDownIcon sx={{ transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'none' }} />
    );
  };

  return (
    <RootContainer>
      {headerSection}

      {/* 제한된 서비스가 있을 경우 경고 메시지 표시 */}
      {hasAgeRestrictedServices && (
        <WarningContainer>
          <WarningMessage>
            <WarningIcon fontSize='small' sx={{ mr: 1 }} />
            나이 제한 또는 베타 서비스로 인해 해지가 필요한 서비스가 있습니다.
          </WarningMessage>
        </WarningContainer>
      )}

      <ListContainer>
        <StyledTable stickyHeader>
          <TableHead>
            <TableRow variant='head'>
              <StyledTableHeaderCell align='center' width='100px'>
                상태
              </StyledTableHeaderCell>
              <StyledTableHeaderCell onClick={() => handleSort('serviceName')}>
                <HeaderCellContent>
                  부가서비스명
                  {renderSortIcon('serviceName')}
                </HeaderCellContent>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell
                align='right'
                width='120px'
                onClick={() => handleSort('serviceValue')}
              >
                <HeaderCellContent className='right-aligned'>
                  요금 (원)
                  {renderSortIcon('serviceValue')}
                </HeaderCellContent>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell align='center' width='60px'></StyledTableHeaderCell>
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
