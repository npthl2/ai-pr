import React from 'react';
import { Typography } from '@mui/material';
import DetailInfoTableRow from './DetailInfoTableRow';
import {
  SectionContainer,
  StyledTableContainer,
  StyledTable,
} from './TodayContractsDetailInfo.styled';
import { Service, ServiceItem } from '@pages/customer/detail/components/information/types';
import {
  formatCurrencyKRW,
  renderInfoList,
  renderSharedColGroup,
} from './TodayContractsDetailInfo';
import { CONTRACT_SERVICE_TYPE_CODE } from '@pages/customer/detail/CustomerDetailConstant';

interface ServiceInfoSectionProps {
  serviceInfo: ServiceItem | null;
}

export const renderServiceInfo = ({ serviceInfo }: { serviceInfo: ServiceItem | null }) => {
  if (!serviceInfo?.serviceList?.length) return null;

  return serviceInfo.serviceList
    .filter((service) => service.serviceType === CONTRACT_SERVICE_TYPE_CODE)
    .map((service) =>
      renderInfoList([service.serviceName, formatCurrencyKRW(service.serviceValue)]),
    );
};

export const calculateAdditionalServices = (serviceList: Service[]) => {
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

const ServiceInfoSection: React.FC<ServiceInfoSectionProps> = ({ serviceInfo }) => {
  const { paidCount, freeCount, totalValue } = calculateAdditionalServices(
    serviceInfo?.serviceList ?? [],
  );

  return (
    <SectionContainer>
      <Typography variant='h3' data-testid='service-info-title'>
        상세정보
      </Typography>
      <StyledTableContainer>
        <StyledTable>
          {renderSharedColGroup()}
          <tbody>
            {[
              [{ headerCellContent: '약정정보', cellContent: serviceInfo?.engagementType }],
              [
                { headerCellContent: '약정일자', cellContent: serviceInfo?.engagementDate },
                { headerCellContent: '요금할인종료일', cellContent: serviceInfo?.discountEndDate },
              ],
              [
                { headerCellContent: '경과/실사용일', cellContent: serviceInfo?.elapsedDays },
                {
                  headerCellContent: '총할인반환금',
                  cellContent:
                    serviceInfo?.totalDiscountRefundAmount &&
                    formatCurrencyKRW(serviceInfo.totalDiscountRefundAmount),
                },
              ],
              [
                {
                  headerCellContent: '기기정보',
                  cellContent: renderInfoList([
                    serviceInfo?.deviceModelName,
                    serviceInfo?.deviceModelNameAlias,
                    serviceInfo?.deviceSerialNumber,
                  ]),
                },
              ],
              [
                {
                  headerCellContent: 'SIM정보',
                  cellContent: renderInfoList([
                    serviceInfo?.simModelName,
                    serviceInfo?.simSerialNumber,
                  ]),
                },
              ],
              [
                {
                  headerCellContent: '잔여대금',
                  cellContent:
                    serviceInfo?.remainingPayment &&
                    formatCurrencyKRW(serviceInfo.remainingPayment),
                },
                { headerCellContent: '잔여분납', cellContent: serviceInfo?.remainingInstallment },
              ],
              [
                {
                  headerCellContent: '요금제',
                  cellContent: renderServiceInfo({ serviceInfo }),
                },
              ],
              [
                {
                  headerCellContent: '부가서비스',
                  cellContent: serviceInfo?.serviceList?.length ? (
                    <>
                      유료: {paidCount}, 무료: {freeCount} / {formatCurrencyKRW(totalValue)}
                    </>
                  ) : null,
                },
              ],
              [{ headerCellContent: '단말기보험', cellContent: '-' }],
            ].map((row, index) => (
              <DetailInfoTableRow key={index} cellPairs={row} />
            ))}
          </tbody>
        </StyledTable>
      </StyledTableContainer>
    </SectionContainer>
  );
};

export default ServiceInfoSection;
