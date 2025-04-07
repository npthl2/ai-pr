import React from 'react';
import { Box, Paper, Table, TableBody, TableContainer, Typography } from '@mui/material';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import { CONTRACT_SERVICE_TYPE_CODE } from '@pages/customer/detail/CustomerDetailConstant';
import {
  ContractItem,
  InvoiceItem,
  ServiceItem,
} from '@pages/customer/detail/components/information/types';

interface TodayContractsDetailInfoProps {
  contractInfo: ContractItem | null;
  invoiceInfo: InvoiceItem | null;
  serviceInfo: ServiceItem | null;
}

const CELL_WIDTH = 200;

// 통화 단위 변환 함수
const formatCurrencyKRW = (value: number | string) => {
  const numberValue = typeof value === 'number' ? value : Number(value);
  if (isNaN(numberValue)) return '';

  return numberValue.toLocaleString('ko-KR') + '원';
};

const calculateAddOnServices = (serviceList: ServiceItem['serviceList']) => {
  const addOnServices = serviceList.filter(
    (service) => service.serviceType !== CONTRACT_SERVICE_TYPE_CODE,
  );

  const paidCount = addOnServices.filter((service) => parseFloat(service.serviceValue) > 0).length;
  const freeCount = addOnServices.filter(
    (service) => parseFloat(service.serviceValue) === 0,
  ).length;
  const totalValue = addOnServices.reduce(
    (sum, service) => sum + parseFloat(service.serviceValue),
    0,
  );

  return {
    paidCount,
    freeCount,
    totalValue,
  };
};

const TodayContractsDetailInfo: React.FC<TodayContractsDetailInfoProps> = ({
  contractInfo,
  invoiceInfo,
  serviceInfo,
}) => {
  const { paidCount, freeCount, totalValue } = calculateAddOnServices(
    serviceInfo?.serviceList ?? [],
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Contract Info Section */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant='h3'>계약정보</Typography>
          {contractInfo?.contractId && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='body2' color='text.secondary'>
                서비스계약번호
              </Typography>
              <Typography variant='h6' color='text.secondary'>
                {contractInfo.contractId}
              </Typography>
            </Box>
          )}
        </Box>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table>
            <TableBody>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>가입유형</Typography>
                </TableCell>
                <TableCell>{contractInfo?.contractType}</TableCell>
              </TableRow>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>담당부서</Typography>
                </TableCell>
                <TableCell>{contractInfo?.assigneeDepartment}</TableCell>
              </TableRow>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>판매처</Typography>
                </TableCell>
                <TableCell>{contractInfo?.salesDepartment}</TableCell>
              </TableRow>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>최종매장</Typography>
                </TableCell>
                <TableCell>{contractInfo?.finalSeller}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Invoice Info Section */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant='h3'>납부정보</Typography>
          {invoiceInfo?.paymentId && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='body2'>청구번호</Typography>
              <Typography variant='h6' color='text.secondary'>
                {invoiceInfo.paymentId}
              </Typography>
            </Box>
          )}
        </Box>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table>
            <TableBody>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>납부고객</Typography>
                </TableCell>
                <TableCell sx={{ flex: 1 }}>{invoiceInfo?.paymentName}</TableCell>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>수령인</Typography>
                </TableCell>
                <TableCell sx={{ flex: 1 }}>{invoiceInfo?.recipient}</TableCell>
              </TableRow>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>납부방법</Typography>
                </TableCell>
                <TableCell sx={{ flex: 1 }}>{invoiceInfo?.paymentMethod}</TableCell>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>납부일</Typography>
                </TableCell>
                <TableCell sx={{ flex: 1 }}>{invoiceInfo?.paymentDate}</TableCell>
              </TableRow>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>계좌/카드</Typography>
                </TableCell>
                <TableCell colSpan={3}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {invoiceInfo?.account}
                    {invoiceInfo?.card && (
                      <>
                        <span>/</span>
                        <span>{invoiceInfo.card}</span>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>청구유형</Typography>
                </TableCell>
                <TableCell colSpan={3}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <div>{invoiceInfo?.invoiceType}</div>
                    {invoiceInfo?.invoiceNumber && (
                      <>
                        <span>/</span>
                        <span>{invoiceInfo.invoiceNumber}</span>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>청구주소</Typography>
                </TableCell>
                <TableCell colSpan={3}>{invoiceInfo?.invoiceAddress}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Service Info Section */}
      <Box>
        <Typography variant='h3' sx={{ mb: 1 }}>
          상세정보
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table>
            <TableBody>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>약정정보</Typography>
                </TableCell>
                <TableCell colSpan={3}>{serviceInfo?.engagementType}</TableCell>
              </TableRow>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>약정일자</Typography>
                </TableCell>
                <TableCell sx={{ flex: 1 }}>{serviceInfo?.engagementDate}</TableCell>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>요금할인종료일</Typography>
                </TableCell>
                <TableCell sx={{ flex: 1 }}>{serviceInfo?.discountEndDate}</TableCell>
              </TableRow>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>경과/실사용일</Typography>
                </TableCell>
                <TableCell sx={{ flex: 1 }}>{serviceInfo?.elapsedDays}</TableCell>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>총할인반환금</Typography>
                </TableCell>
                <TableCell sx={{ flex: 1 }}>
                  {serviceInfo?.totalDiscountRefundAmount &&
                    formatCurrencyKRW(serviceInfo.totalDiscountRefundAmount)}
                </TableCell>
              </TableRow>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>잔여대금</Typography>
                </TableCell>
                <TableCell sx={{ flex: 1 }}>
                  {serviceInfo?.remainingPayment && formatCurrencyKRW(serviceInfo.remainingPayment)}
                </TableCell>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>잔여분납</Typography>
                </TableCell>
                <TableCell sx={{ flex: 1 }}>{serviceInfo?.remainingInstallment}</TableCell>
              </TableRow>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>요금제</Typography>
                </TableCell>
                <TableCell colSpan={3}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                    {serviceInfo?.serviceList &&
                      serviceInfo.serviceList.length > 0 &&
                      serviceInfo.serviceList
                        .filter(
                          (service: ServiceItem['serviceList'][0]) =>
                            service.serviceType === CONTRACT_SERVICE_TYPE_CODE,
                        )
                        .map((service: ServiceItem['serviceList'][0], index) => (
                          <Box key={index} sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                            <span>{service.serviceName}</span>
                            <span>/</span>
                            <span>{formatCurrencyKRW(service.serviceValue)}</span>
                          </Box>
                        ))}
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>부가서비스</Typography>
                </TableCell>
                <TableCell colSpan={3}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {serviceInfo?.serviceList && serviceInfo.serviceList.length > 0 && (
                      <>
                        <span>유료: {paidCount},</span>
                        <span>무료: {freeCount}</span>
                        <span>/</span>
                        <span>{formatCurrencyKRW(totalValue)}</span>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow size='small' disableEffect={true}>
                <TableCell variant='head' width={CELL_WIDTH}>
                  <Typography>단말기보험</Typography>
                </TableCell>
                <TableCell colSpan={3}>-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TodayContractsDetailInfo;
