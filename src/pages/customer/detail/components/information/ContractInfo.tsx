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
          <Typography sx={{ gap: '8px', display: 'flex', alignItems: 'center' }}>
            <Typography
              variant='body2'
              color='text.secondary'
              data-testid='information-service-contract-id'
            >
              서비스계약번호
            </Typography>
            <Typography variant='h6' color='text.secondary'>
              {contractInfo.contractId}
            </Typography>
          </Typography>
        )}
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table>
          <TableBody>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={200}>
                <Typography>가입유형</Typography>
              </TableCell>
              <TableCell>{contractInfo.contractType}</TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={200}>
                <Typography>담당부서</Typography>
              </TableCell>
              <TableCell>{contractInfo.assigneeDepartment}</TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={200}>
                <Typography>판매처</Typography>
              </TableCell>
              <TableCell>{contractInfo.salesDepartment}</TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={200}>
                <Typography>최종매장</Typography>
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

export default ContractInfo;
