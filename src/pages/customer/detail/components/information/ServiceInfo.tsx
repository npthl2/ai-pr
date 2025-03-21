import React from 'react';
import { MaskedTarget, ServiceItem, Service } from './types';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import { TableWrapper } from './InfoTable.styled';

import { Box, Paper, Table, TableBody, TableContainer, Typography } from '@mui/material';
import Button from '@components/Button';
import MaskingInfo from './MaskingInfo';
import { DEFAULT_TABS } from '@constants/CommonConstant';
import { SUBSCRIPTION_MENUS } from '@constants/CommonConstant';
import useCustomerStore from '@stores/CustomerStore';
import useModifyServiceStore from '@stores/ModifyServiceStore';
import { CONTRACT_SERVICE_TYPE_CODE } from '@pages/customer/detail/CustomerDetailConstant';

interface ServiceInfoProps {
  serviceInfoParam: ServiceItem | null;
  maskingParam: MaskedTarget;
}

const defaultServiceInfo: ServiceItem = {
  contractId: '',
  engagementType: '',
  engagementDate: '',
  elapsedDays: '',
  totalDiscountRefundAmount: '',
  deviceModelName: '',
  deviceModelNameAlias: '',
  deviceSerialNumber: '',
  deviceSerialNumberEncrypted: '',
  simModelName: '',
  simSerialNumber: '',
  simSerialNumberEncrypted: '',
  remainingPayment: '',
  remainingInstallment: '',
  serviceList: [],
  discountEndDate: '',
};

const CELL_WIDTH = 200;
const SUB_CELL_WIDTH = 310.5;

const renderMaskingInfo = (
  maskingParam: MaskedTarget,
  originalInfo: string,
  encryptedInfo: string,
  maskingType: string,
) => (
  <MaskingInfo
    originalInfo={originalInfo}
    encryptedInfo={encryptedInfo}
    maskingParam={{
      ...maskingParam,
      maskingType: maskingType,
    }}
  />
);

// 부가서비스 계산 함수
const calculateAddOnServices = (serviceList: Service[]) => {
  const addOnServices = serviceList.filter((service) => service.serviceType === '부가서비스');

  const paidCount = addOnServices.filter((service) => service.serviceValueType === '유료').length;
  const freeCount = addOnServices.filter((service) => service.serviceValueType === '무료').length;

  const totalValue = addOnServices
    .filter((service) => service.serviceValueType === '유료')
    .reduce((sum, service) => sum + parseInt(service.serviceValue.replace(/[^0-9]/g, '')), 0);

  return { paidCount, freeCount, totalValue };
};

// 통화 단위 변환 함수
const formatCurrencyKRW = (value: number | string) => {
  const numberValue = typeof value === 'number' ? value : Number(value);
  if (isNaN(numberValue)) return '';

  return numberValue.toLocaleString('ko-KR') + '원';
};

const ServiceInfo: React.FC<ServiceInfoProps> = ({ serviceInfoParam, maskingParam }) => {
  const serviceInfo = serviceInfoParam ?? defaultServiceInfo;

  const { paidCount, freeCount, totalValue } = calculateAddOnServices(serviceInfo.serviceList);
  const { selectedCustomerId, customerTabs, setCustomerTabs, setActiveTab } = useCustomerStore();

  // ModifyServiceStore에서 필요한 함수들 가져오기
  const { resetAll } = useModifyServiceStore();

  const handleServiceChange = () => {
    const targetMenu = SUBSCRIPTION_MENUS.find((menu) => menu.id === 'SERVICE_MODIFICATION');
    if (!targetMenu || !selectedCustomerId) return;

    const currentTabs = customerTabs[selectedCustomerId]?.tabs;
    if (!currentTabs) return;

    // 모든 상태 초기화 - ServiceModification 컴포넌트가 처음부터 시작하도록
    resetAll();

    const existingTab = currentTabs.find((tab) => tab.label === targetMenu.name);
    if (existingTab) {
      setActiveTab(selectedCustomerId, existingTab.id);
      return;
    }

    const newTab = {
      id: DEFAULT_TABS.find((tab) => tab.label === targetMenu.name)?.id ?? currentTabs.length,
      label: targetMenu.name,
      closeable: true,
    };

    setCustomerTabs(selectedCustomerId, [...currentTabs, newTab]);
    setActiveTab(selectedCustomerId, newTab.id);
  };

  return (
    <TableWrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '28px',
          gap: '16px',
          paddingBottom: '8px',
        }}
      >
        <Typography variant='h3' sx={{ height: 27, gap: 16 }}>
          상세정보
        </Typography>
        <Button
          variant='outlined'
          size='small'
          color='grey'
          sx={{ height: 28 }}
          onClick={handleServiceChange}
          data-testid='service-info-change-button'
        >
          요금제/부가서비스 변경
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                약정정보
              </TableCell>
              <TableCell colSpan={3}>{serviceInfo.engagementType}</TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                약정일자
              </TableCell>
              <TableCell width={SUB_CELL_WIDTH}>{serviceInfo.engagementDate}</TableCell>
              <TableCell variant='head' width={CELL_WIDTH}>
                요금할인종료일
              </TableCell>
              <TableCell width={SUB_CELL_WIDTH}>{serviceInfo.discountEndDate}</TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                경과/실사용일
              </TableCell>
              <TableCell width={SUB_CELL_WIDTH}>{serviceInfo.elapsedDays}</TableCell>
              <TableCell variant='head' width={CELL_WIDTH}>
                총할인반환금
              </TableCell>
              <TableCell width={SUB_CELL_WIDTH}>
                {serviceInfo.totalDiscountRefundAmount &&
                  formatCurrencyKRW(serviceInfo.totalDiscountRefundAmount)}
              </TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                기기정보
              </TableCell>
              <TableCell colSpan={3}>
                <div style={{ display: 'flex', gap: 8 }}>
                  {serviceInfo.deviceModelName}
                  {serviceInfo.deviceModelNameAlias && (
                    <>
                      <span>/</span>
                      <span>{serviceInfo.deviceModelNameAlias}</span>
                    </>
                  )}
                  {serviceInfo.deviceSerialNumber && (
                    <>
                      /
                      {renderMaskingInfo(
                        maskingParam,
                        serviceInfo.deviceSerialNumber,
                        serviceInfo.deviceSerialNumberEncrypted,
                        'deviceSerialNumber',
                      )}
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                SIM정보
              </TableCell>
              <TableCell colSpan={3}>
                <div style={{ display: 'flex', gap: 8 }}>
                  {serviceInfo.simModelName}
                  {serviceInfo.simSerialNumber && (
                    <>
                      <span>/</span>
                      {renderMaskingInfo(
                        maskingParam,
                        serviceInfo.simSerialNumber,
                        serviceInfo.simSerialNumberEncrypted,
                        'simSerialNumber',
                      )}
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                잔여대금
              </TableCell>
              <TableCell width={SUB_CELL_WIDTH}>
                {serviceInfo.remainingPayment && formatCurrencyKRW(serviceInfo.remainingPayment)}
              </TableCell>
              <TableCell variant='head' width={CELL_WIDTH}>
                잔여분납
              </TableCell>
              <TableCell width={SUB_CELL_WIDTH}>{serviceInfo.remainingInstallment}</TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                요금제
              </TableCell>
              <TableCell colSpan={3}>
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}
                >
                  {serviceInfo.serviceList.length > 0 &&
                    serviceInfo.serviceList
                      .filter(
                        (service: Service) => service.serviceType === CONTRACT_SERVICE_TYPE_CODE,
                      )
                      .map((service: Service, index) => (
                        <div
                          key={index}
                          style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
                        >
                          <span>{service.serviceName}</span>
                          <span>/</span>
                          <span>{formatCurrencyKRW(service.serviceValue)}</span>
                        </div>
                      ))}
                </div>
              </TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                부가서비스
              </TableCell>
              <TableCell colSpan={3}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {serviceInfo.serviceList.length > 0 && (
                    <>
                      <span>유료: {paidCount},</span>
                      <span>무료: {freeCount}</span>
                      <span>/</span>
                      <span>{formatCurrencyKRW(totalValue)}</span>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                단말기보험
              </TableCell>
              <TableCell colSpan={3}>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

export default ServiceInfo;
