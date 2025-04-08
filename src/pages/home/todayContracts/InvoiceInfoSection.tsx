import React from 'react';
import { Typography } from '@mui/material';
import DetailInfoTableRow from './DetailInfoTableRow';
import {
  SectionContainer,
  SectionTitleContainer,
  StyledTableContainer,
  StyledTable,
  SubtitleContainer,
} from './TodayContractsDetailInfo.styled';
import { InvoiceItem } from '@pages/customer/detail/components/information/types';
import { renderInfoList, renderSharedColGroup } from './TodayContractsDetailInfo';

interface InvoiceInfoSectionProps {
  invoiceInfo: InvoiceItem | null;
}

const InvoiceInfoSection: React.FC<InvoiceInfoSectionProps> = ({ invoiceInfo }) => (
  <SectionContainer>
    <SectionTitleContainer>
      <Typography variant='h3'>납부정보</Typography>
      {invoiceInfo?.paymentId && (
        <SubtitleContainer>
          <Typography variant='body2' color='text.secondary'>
            청구번호
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            {invoiceInfo.paymentId}
          </Typography>
        </SubtitleContainer>
      )}
    </SectionTitleContainer>
    <StyledTableContainer>
      <StyledTable>
        {renderSharedColGroup()}
        <tbody>
          {[
            [
              { headerCellContent: '납부고객', cellContent: invoiceInfo?.paymentName },
              { headerCellContent: '수령인', cellContent: invoiceInfo?.recipient },
            ],
            [
              { headerCellContent: '납부방법', cellContent: invoiceInfo?.paymentMethod },
              { headerCellContent: '납부일', cellContent: invoiceInfo?.paymentDate },
            ],
            [
              {
                headerCellContent: '계좌/카드',
                cellContent: renderInfoList([invoiceInfo?.account, invoiceInfo?.card]),
              },
            ],
            [
              {
                headerCellContent: '청구유형',
                cellContent: renderInfoList([invoiceInfo?.invoiceType, invoiceInfo?.invoiceNumber]),
              },
            ],
            [{ headerCellContent: '청구주소', cellContent: invoiceInfo?.invoiceAddress }],
          ].map((row, index) => (
            <DetailInfoTableRow key={index} cellPairs={row} />
          ))}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
  </SectionContainer>
);

export default InvoiceInfoSection;
