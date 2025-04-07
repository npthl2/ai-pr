import { Typography, TableBody, TableHead, Box, Table } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
  EllipsisTypography,
  TextContainer,
} from './SelectedAdditionalServiceList.styled';
import useCustomerStore from '@stores/CustomerStore';
import { ArrowDownward } from '@mui/icons-material';
import useAdditionalServiceSorting, {
  SortField,
} from '@hooks/modifyService/useAdditionalServiceSorting';

interface SelectedAdditionalServiceListProps {
  additionalServices: AdditionalService[];
  contractTabId: string;
}

const SelectedAdditionalServiceList = ({
  additionalServices,
  contractTabId: _contractTabId,
}: SelectedAdditionalServiceListProps) => {
  const { sortField, sortDirection, handleSort, getSortIconProps, sortAdditionalServices } =
    useAdditionalServiceSorting();

  // 전체 서비스 목록 상태
  const [allServices, setAllServices] = useState<AdditionalService[]>([]);

  // 스토어에서 필요한 함수 가져오기
  const {
    removeAdditionalService,
    removeCurrentAdditionalService,
    setCurrentAdditionalServices,
    setHasRestrictedServices,
  } = useModifyServiceStore();

  // 해당 계약 탭 ID에 대한 모든 정보 가져오기
  const modifyServiceInfo = useModifyServiceStore((state) =>
    state.getModifyServiceInfo(_contractTabId),
  );

  // 계약 탭에 대한 정보가 없으면 기본값 제공
  const selectedAdditionalServices = modifyServiceInfo?.selectedAdditionalServices || [];
  const currentAdditionalServices = modifyServiceInfo?.currentAdditionalServices || [];
  const removedCurrentAdditionalServices =
    modifyServiceInfo?.removedCurrentAdditionalServices || [];

  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';

  // 현재 사용중인 서비스 정보 가져오기
  const getCurrentService = useCurrentServiceStore((state) => state.getCurrentService);
  const currentService = getCurrentService?.(selectedCustomerId) || null;

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
    setHasRestrictedServices(_contractTabId, hasRestrictedServices);
  }, [hasRestrictedServices, setHasRestrictedServices, _contractTabId]);

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
        setCurrentAdditionalServices(_contractTabId, modifyAdditionalServices);
      }
    }
  }, [
    currentService,
    currentAdditionalServices.length,
    removedCurrentAdditionalServices.length,
    setCurrentAdditionalServices,
    _contractTabId,
  ]);

  // 상태 변경시 서비스 목록 업데이트 (정렬 포함)
  useEffect(() => {
    // 모든 서비스 합치기 (현재 사용중 유지 + 새로 선택된 서비스)
    let services = [...currentAdditionalServices, ...selectedAdditionalServices];

    const sortedServices = sortAdditionalServices(services);

    setAllServices(sortedServices);
  }, [
    currentAdditionalServices,
    selectedAdditionalServices,
    sortField,
    sortDirection,
    additionalServices,
    sortAdditionalServices,
  ]);

  // 서비스 상태에 따른 우선 순위 반환 함수 (정렬에 사용)
  // const getServiceStatusPriority = (
  //   service: AdditionalService,
  //   currentServices: AdditionalService[],
  //   apiServices: AdditionalService[],
  // ): number => {
  //   const isCurrentService = currentServices.some(
  //     (current) => current.serviceId === service.serviceId,
  //   );
  //   const apiService = apiServices.find((api) => api.serviceId === service.serviceId);
  //   const isRestricted = apiService?.hasAgeRestriction || apiService?.exclusive || false;

  //   if (isCurrentService && isRestricted) return 0; // 해지필요
  //   if (isCurrentService) return 1; // 가입중
  //   return 2; // 가입
  // };

  // 부가서비스 삭제 핸들러
  const handleRemoveService = useCallback(
    (service: AdditionalService, isCurrentService: boolean) => {
      if (isCurrentService) {
        // 현재 가입중인 서비스 삭제
        removeCurrentAdditionalService(_contractTabId, service);
      } else {
        // 새로 추가한 서비스 삭제
        removeAdditionalService(_contractTabId, service.serviceId);
      }
    },
    [removeAdditionalService, removeCurrentAdditionalService, _contractTabId],
  );

  // 부가서비스 총 요금 계산 (요금제 + 부가서비스)
  const totalPrice =
    selectedAdditionalServices.reduce((sum, service) => sum + service.serviceValue, 0) +
    currentAdditionalServices.reduce((sum, service) => sum + service.serviceValue, 0);

  // 정렬 아이콘 렌더링 함수
  const renderSortIcon = (field: SortField, componentName: string) => {
    const iconProps = getSortIconProps(field, componentName);
    return <ArrowDownward sx={iconProps.style} data-testid={iconProps.testId} />;
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
              data-testid='selected-additional-service-list'
            >
              <TableCell align='left' width='100px'>
                {isCurrentService && isRestricted ? (
                  <RestrictedStatusBadge>해지필요</RestrictedStatusBadge>
                ) : isCurrentService ? (
                  <CurrentStatusBadge>가입</CurrentStatusBadge>
                ) : (
                  <SubscribeStatusBadge>가입중</SubscribeStatusBadge>
                )}
              </TableCell>
              <TableCell width='500px'>
                <TextContainer>
                  <EllipsisTypography>{service.serviceName}</EllipsisTypography>
                </TextContainer>
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
                  data-testid='remove-button'
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
        <Table stickyHeader>
          <TableHead>
            <TableRow variant='head'>
              <StyledTableHeaderCell align='center' width='92px'>
                <Typography>상태</Typography>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell onClick={() => handleSort('serviceName')}>
                <Typography>
                  부가서비스명
                  {renderSortIcon('serviceName', 'selected-additional-service-')}
                </Typography>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell
                align='right'
                width='120px'
                onClick={() => handleSort('serviceValue')}
              >
                <Typography>
                  요금 (원)
                  {renderSortIcon('serviceValue', 'selected-additional-service-')}
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
          </Table>
        </ScrollableTableContainer>

        <Table>
          <TableRow variant='head'>
            <TableCell colSpan={2}>
              <TotalText>합계</TotalText>
            </TableCell>
            <StyledTableHeaderCell align='right' width='120px'>
              <Typography variant='subtitle1' data-testid='total-amount'>
                {totalPrice.toLocaleString()}원
              </Typography>
            </StyledTableHeaderCell>
            <StyledTableBlankCell width='100px'></StyledTableBlankCell>
          </TableRow>
        </Table>
      </ListContainer>
    </RootContainer>
  );
};

export default SelectedAdditionalServiceList;
