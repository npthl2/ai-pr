import {
  Typography,
  Box,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
  TableSortLabel,
} from '@mui/material';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';

import { ServiceValue, ServicePrice, ServiceItemContainer } from '../ServiceModification.styled';
import { useState, useEffect, useRef } from 'react';
import useCustomerStore from '@stores/CustomerStore';
import { useContractServiceQuery } from '@api/queries/contract/useContractServiceQuery';

import useCurrentServiceStore from '@stores/CurrentServiceStore';
import { ContractServiceResponse } from '@model/Contract';

const ConcurrentService = () => {
  const customerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  const selectedCustomerId = useRef(customerId).current;
  const [orderBy, setOrderBy] = useState<'name' | 'price'>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const selectedContractId = useCurrentServiceStore(
    (state) => state.selectedContractIds[selectedCustomerId] || '',
  );

  const { setCurrentService } = useCurrentServiceStore();
  const currentService = useCurrentServiceStore(
    (state) => state.service[selectedCustomerId] || null,
  );

  // 계약 상품 조회
  const { data: contractServiceData } = useContractServiceQuery(selectedContractId, {
    enabled: !!selectedContractId,
  });

  useEffect(() => {
    if (contractServiceData && selectedContractId && selectedCustomerId === customerId) {
      const data = contractServiceData as ContractServiceResponse;

      // API 데이터를 스토어 형식으로 변환 (CurrentServiceStore의 Service 타입에 맞춤)
      const storeService = {
        contractId: selectedContractId,
        serviceId: data.serviceId || '',
        serviceName: data.serviceName || '',
        serviceType: data.serviceType || '',
        serviceValue: data.serviceValue,
        additionalService: Array.isArray(data.additionalService)
          ? data.additionalService.map((service) => ({
              contractId: selectedContractId,
              serviceId: service.serviceId || '',
              serviceName: service.serviceName || '',
              serviceType: service.serviceType || '',
              serviceValue: service.serviceValue,
            }))
          : [],
      };

      setCurrentService(selectedCustomerId, storeService);
    }
  }, [contractServiceData, customerId]);

  // 정렬 핸들러
  const handleRequestSort = (property: 'name' | 'price') => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property === 'name' ? 'name' : 'price');
  };

  // 부가서비스 데이터 정렬
  const sortedAdditionalServices = currentService?.additionalService
    ? [...currentService.additionalService].sort((a, b) => {
        if (orderBy === 'name') {
          return order === 'asc'
            ? a.serviceName.localeCompare(b.serviceName)
            : b.serviceName.localeCompare(a.serviceName);
        } else {
          return order === 'asc'
            ? a.serviceValue - b.serviceValue
            : b.serviceValue - a.serviceValue;
        }
      })
    : [];

  // 부가서비스 금액 합계 계산
  const additionalServiceTotal =
    currentService?.additionalService.reduce((sum, service) => sum + service.serviceValue, 0) || 0;

  return (
    <Box sx={{ margin: '20px' }}>
      <Box>
        <ServiceItemContainer sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <ServiceValue variant='h4'>현재 요금제</ServiceValue>
            <ServiceValue variant='h2'>{currentService?.serviceName}</ServiceValue>
          </Box>
          <ServicePrice variant='h2'>
            {currentService?.serviceValue.toLocaleString()}원
          </ServicePrice>
        </ServiceItemContainer>
      </Box>

      <Box sx={{ marginTop: '30px' }}>
        <Box>
          <ServiceValue variant='h4'>
            현재 부가서비스{' '}
            <Typography
              variant='h4'
              component='span'
              color='text.secondary'
              sx={{ display: 'inline' }}
            >
              {currentService?.additionalService.length}
            </Typography>
          </ServiceValue>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ boxShadow: 'none', maxHeight: 300, overflow: 'auto' }}
        >
          <Table size='small' stickyHeader>
            <TableHead>
              <TableRow
                variant='head'
                sx={(theme) => ({ backgroundColor: theme.palette.grey[50] })}
              >
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    부가서비스명
                  </TableSortLabel>
                </TableCell>
                <TableCell align='right'>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <TableSortLabel
                      active={orderBy === 'price'}
                      direction={orderBy === 'price' ? order : 'asc'}
                      onClick={() => handleRequestSort('price')}
                    >
                      요금(원)
                    </TableSortLabel>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAdditionalServices.map((item) => (
                <TableRow key={item.serviceId}>
                  <TableCell>{item.serviceName}</TableCell>
                  <TableCell align='right'>{item.serviceValue.toLocaleString()}원</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#DEE5EE' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>합계</TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {additionalServiceTotal.toLocaleString()}원
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ConcurrentService;
