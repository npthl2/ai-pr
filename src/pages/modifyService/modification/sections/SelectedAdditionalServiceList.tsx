import { Typography, TableBody, TableHead, Box, Table } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useModifyServiceStore from '@stores/ModifyServiceStoreRefact';
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
}

const SelectedAdditionalServiceList = ({
  additionalServices,
}: SelectedAdditionalServiceListProps) => {
  // 스토어에서 필요한 정보 가져오기
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  const selectedContractId = useCurrentServiceStore(
    (state) => state.selectedContractIds[selectedCustomerId] || '',
  );

  // Zustand 스토어에서 필요한 함수와 데이터 가져오기
  const {
    removeAdditionalService,
    removeCurrentAdditionalService,
    setCurrentAdditionalServices,
    setHasRestrictedServices,
    getModifyServiceInfo,
  } = useModifyServiceStore();

  const modifyServiceInfo = getModifyServiceInfo(selectedCustomerId, selectedContractId);

  // 계약 탭에 대한 정보가 없으면 기본값 제공
  const selectedAdditionalServices = modifyServiceInfo?.selectedAdditionalServices || [];
  const currentAdditionalServices = modifyServiceInfo?.currentAdditionalServices || [];
  const removedCurrentAdditionalServices =
    modifyServiceInfo?.removedCurrentAdditionalServices || [];

  // 현재 사용중인 서비스 정보 가져오기
  const currentService =
    useCurrentServiceStore((state) => state.getCurrentService(selectedCustomerId)) || null;

  // 나이 제한으로 인해 제거해야 하는 서비스가 있는지 확인
  const hasRestrictedAdditionalServices = currentAdditionalServices.some((additionalService) => {
    const additionalServiceByApi = additionalServices.find(
      (additionalServiceByApi) => additionalServiceByApi.serviceId === additionalService.serviceId,
    );

    return additionalServiceByApi?.hasAgeRestriction || additionalServiceByApi?.exclusive || false;
  });

  // 나이 제한 상태가 변경될 때마다 스토어 업데이트
  useEffect(() => {
    setHasRestrictedServices(
      selectedCustomerId,
      selectedContractId,
      hasRestrictedAdditionalServices,
    );
  }, [
    hasRestrictedAdditionalServices,
    setHasRestrictedServices,
    selectedCustomerId,
    selectedContractId,
  ]);

  const { sortField, sortDirection, handleSort, getSortIconProps, sortAdditionalServices } =
    useAdditionalServiceSorting();

  const renderSortIcon = (field: SortField, componentName: string) => {
    const iconProps = getSortIconProps(field, componentName);
    return <ArrowDownward sx={iconProps.style} data-testid={iconProps.testId} />;
  };

  // 전체 서비스 목록 상태
  const [allSelectedAdditionalServices, setAllSelectedAdditionalServices] = useState<
    AdditionalService[]
  >([]);

  // CurrentServiceStore의 AdditionalService 데이터 보정
  const mapToModifyAdditionalServices = (
    currentAdditionalServices: AdditionalService[],
  ): AdditionalService[] => {
    return currentAdditionalServices.map((currentAdditionalService) => {
      const filteredAdditionalServices = additionalServices.find(
        (s) => s.serviceId === currentAdditionalService.serviceId,
      );
      return {
        ...currentAdditionalService,
        serviceValueType: filteredAdditionalServices?.serviceValueType || '유료',
        exclusiveServiceIds: filteredAdditionalServices?.exclusiveServiceIds || [],
        releaseDate:
          filteredAdditionalServices?.releaseDate ||
          filteredAdditionalServices?.validStartDateTime ||
          '',
      };
    });
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
        setCurrentAdditionalServices(
          selectedCustomerId,
          selectedContractId,
          modifyAdditionalServices,
        );
      }
    }
  }, [
    currentService,
    currentAdditionalServices.length,
    removedCurrentAdditionalServices.length,
    setCurrentAdditionalServices,
    selectedCustomerId,
    selectedContractId,
  ]);

  // 상태 변경시 서비스 목록 업데이트 (정렬 포함)
  useEffect(() => {
    // 모든 서비스 합치기 (현재 사용중 유지 + 새로 선택된 서비스)
    let allSelectedAdditionalServices = [
      ...currentAdditionalServices,
      ...selectedAdditionalServices,
    ];

    const sortedSelectedAdditionalServices = sortAdditionalServices(allSelectedAdditionalServices);

    setAllSelectedAdditionalServices(sortedSelectedAdditionalServices);
  }, [
    currentAdditionalServices,
    selectedAdditionalServices,
    sortField,
    sortDirection,
    additionalServices,
    sortAdditionalServices,
  ]);

  // 부가서비스 삭제 핸들러
  const handleRemoveService = useCallback(
    (additionalService: AdditionalService, isCurrentAdditionalService: boolean) => {
      if (isCurrentAdditionalService) {
        // 현재 가입중인 서비스 삭제
        removeCurrentAdditionalService(selectedCustomerId, selectedContractId, additionalService);
      } else {
        // 새로 추가한 서비스 삭제
        removeAdditionalService(
          selectedCustomerId,
          selectedContractId,
          additionalService.serviceId,
        );
      }
    },
    [
      removeAdditionalService,
      removeCurrentAdditionalService,
      selectedCustomerId,
      selectedContractId,
    ],
  );

  // 부가서비스 총 요금 계산 (요금제 + 부가서비스)
  const totalPrice = [...selectedAdditionalServices, ...currentAdditionalServices].reduce(
    (sum, additionalService) => sum + additionalService.serviceValue,
    0,
  );

  // 테이블 컨텐츠 메모이제이션
  const tableContent = useMemo(
    () => (
      <>
        {allSelectedAdditionalServices.map((additionalService) => {
          // 현재 사용중인 서비스인지 확인
          const isCurrentAdditionalService = currentAdditionalServices.some(
            (currentAdditionalService) =>
              currentAdditionalService.serviceId === additionalService.serviceId,
          );

          // API에서 받아온 부가서비스 목록에서 해당 서비스 찾기
          const apiAdditionalService = additionalServices.find(
            (apiAdditionalService) =>
              apiAdditionalService.serviceId === additionalService.serviceId,
          );

          // 제한 여부 확인 (나이 제한 또는 베타 서비스)
          const isRestricted =
            apiAdditionalService?.hasAgeRestriction || apiAdditionalService?.exclusive || false;

          return (
            <TableRow
              key={additionalService.serviceId}
              hover
              sx={isCurrentAdditionalService && isRestricted ? { backgroundColor: '#ffebee' } : {}}
              data-testid='selected-additional-service-list'
            >
              <TableCell align='left' width='100px'>
                {isCurrentAdditionalService && isRestricted ? (
                  <RestrictedStatusBadge>해지필요</RestrictedStatusBadge>
                ) : isCurrentAdditionalService ? (
                  <CurrentStatusBadge>가입</CurrentStatusBadge>
                ) : (
                  <SubscribeStatusBadge>가입중</SubscribeStatusBadge>
                )}
              </TableCell>
              <TableCell width='500px'>
                <TextContainer>
                  <EllipsisTypography>{additionalService.serviceName}</EllipsisTypography>
                </TextContainer>
              </TableCell>
              <TableCell align='right' sx={{ width: '150px' }}>
                <Typography>{additionalService.serviceValue.toLocaleString()}</Typography>
              </TableCell>
              <StyledTableBlankCell width='95px'>
                <DeleteButton
                  variant='outlined'
                  size='small'
                  iconComponent={<CloseIcon />}
                  iconPosition='right'
                  onClick={() => handleRemoveService(additionalService, isCurrentAdditionalService)}
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
    [
      allSelectedAdditionalServices,
      currentAdditionalServices,
      handleRemoveService,
      additionalServices,
    ],
  );

  return (
    <RootContainer>
      <HeaderContainer>
        <TitleSection>
          <TitleTypography variant='subtitle1'>선택된 부가서비스</TitleTypography>
          <CountTypography>{allSelectedAdditionalServices.length}</CountTypography>
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
              {allSelectedAdditionalServices.length === 0 && (
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
