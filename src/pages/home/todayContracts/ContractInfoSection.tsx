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
import { ContractItem } from '@pages/customer/detail/components/information/types';
import { renderSharedColGroup } from './TodayContractsDetailInfo';

interface ContractInfoSectionProps {
  contractInfo: ContractItem | null;
}

const ContractInfoSection: React.FC<ContractInfoSectionProps> = ({ contractInfo }) => (
  <SectionContainer>
    <SectionTitleContainer>
      <Typography variant='h3' data-testid='contract-info-title'>
        계약정보
      </Typography>
      {contractInfo?.contractId && (
        <SubtitleContainer>
          <Typography variant='body2' color='text.secondary'>
            서비스계약번호
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            {contractInfo.contractId}
          </Typography>
        </SubtitleContainer>
      )}
    </SectionTitleContainer>
    <StyledTableContainer>
      <StyledTable>
        {renderSharedColGroup()}
        <tbody>
          {[
            { headerCellContent: '가입유형', cellContent: contractInfo?.contractType },
            { headerCellContent: '담당부서', cellContent: contractInfo?.assigneeDepartment },
            { headerCellContent: '판매처', cellContent: contractInfo?.salesDepartment },
            { headerCellContent: '최종매장', cellContent: contractInfo?.finalSeller },
          ].map((row, index) => (
            <DetailInfoTableRow key={index} cellPairs={[row]} />
          ))}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
  </SectionContainer>
);

export default ContractInfoSection;
