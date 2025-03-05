import React from 'react';
import { MaskedTarget, ContractItem } from './types';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import { TableWrapper } from './InfoTable.styled';

import { Box, Paper, Table, TableBody, TableContainer, Typography } from '@mui/material';

interface ContractInfoProps {
  contractInfoParam: ContractItem | null;
  maskingParam: MaskedTarget;
}

const defaultContractInfo: ContractItem = {
  contractId: '',
  contractType: '',
  assignee: '',
  assigneeDepartment: '',
  salesDepartment: '',
  finalSeller: '',
};

const ContractInfo: React.FC<ContractInfoProps> = ({ contractInfoParam }) => {
  const contractInfo = contractInfoParam ?? defaultContractInfo;

  return (
    <TableWrapper>
      <Box sx={boxStyles}>
        <Typography variant='h3' sx={titleStyles}>
          계약정보
        </Typography>
        {contractInfo.contractId && (
          <Typography
            variant='body2'
            sx={subtitleStyles}
            data-testid='information-service-contract-id'
          >
            서비스계약번호:{contractInfo.contractId}
          </Typography>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={200}>
                가입유형
              </TableCell>
              <TableCell>{contractInfo.contractType}</TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={200}>
                담당부서
              </TableCell>
              <TableCell>{contractInfo.assigneeDepartment}</TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={200}>
                판매처
              </TableCell>
              <TableCell>{contractInfo.salesDepartment}</TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={200}>
                최종매장
              </TableCell>
              <TableCell>{contractInfo.finalSeller}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

const boxStyles = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '27px',
  gap: '16px',
};

const titleStyles = {
  gap: 16,
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '27px',
  letterSpacing: '0px',
};

const subtitleStyles = {
  color: '#6E7782',
  fontFamily: 'Pretendard',
  fontWeight: 400,
  fontSize: '13px',
  lineHeight: '19.5px',
  letterSpacing: '0px',
};

export default ContractInfo;
