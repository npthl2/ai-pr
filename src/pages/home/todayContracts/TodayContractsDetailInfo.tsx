import React from 'react';
import { Container } from './TodayContractsDetailInfo.styled';
import ContractInfoSection from './ContractInfoSection';
import InvoiceInfoSection from './InvoiceInfoSection';
import ServiceInfoSection from './ServiceInfoSection';
import { Info } from '@pages/customer/detail/components/information/types';

interface TodayContractsDetailInfoProps {
  contractData: Info | null;
}

const TodayContractsDetailInfo: React.FC<TodayContractsDetailInfoProps> = ({ contractData }) => (
  <Container>
    <ContractInfoSection contractInfo={contractData?.contract || null} />
    <InvoiceInfoSection invoiceInfo={contractData?.invoice || null} />
    <ServiceInfoSection serviceInfo={contractData?.service || null} />
  </Container>
);

export default TodayContractsDetailInfo;

// Utility functions
export const formatCurrencyKRW = (value: number | string) => {
  const numberValue = typeof value === 'number' ? value : Number(value);
  if (isNaN(numberValue)) return '';
  return numberValue.toLocaleString('ko-KR') + '원';
};

export const renderSharedColGroup = () => {
  const HEADER_CELL_WIDTH = 200;
  const DEFAULT_CELL_WIDTH = `calc((100% - ${HEADER_CELL_WIDTH}px) / 2)`;

  return (
    <colgroup>
      <col style={{ width: HEADER_CELL_WIDTH }} />
      <col style={{ width: DEFAULT_CELL_WIDTH }} />
      <col style={{ width: HEADER_CELL_WIDTH }} />
      <col style={{ width: DEFAULT_CELL_WIDTH }} />
    </colgroup>
  );
};
export const renderInfoList = (items: (string | undefined)[]) => {
  const filteredItems = items.filter(Boolean);
  if (filteredItems.length === 0) return null;

  return (
    <>
      {filteredItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span> / </span>}
          <span>{item}</span>
        </React.Fragment>
      ))}
    </>
  );
};
