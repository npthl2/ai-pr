import {
  Table,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogContent,
} from '@mui/material';
import Button from '@components/Button';
import Radio from '@components/Radio';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  ModalContainer,
  ModalTitle,
  ContentWrapper,
  ButtonContainer,
  TableHeaderTitle,
} from './ContractServiceList.styled';
import { CustomerContract } from '@model/Contract';
import useCurrentServiceStore from '@stores/CurrentServiceStore';
import useCustomerStore from '@stores/CustomerStore';
import { useState, useEffect } from 'react';

interface ContractServiceListProps {
  open: boolean;
  onClose: () => void;
  contracts: CustomerContract[];
}

const ContractServiceList = ({ open, onClose, contracts }: ContractServiceListProps) => {
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId) || '';
  const selectedContractId = useCurrentServiceStore(
    (state) => state.selectedContractIds[selectedCustomerId],
  );
  const { setSelectedContractId } = useCurrentServiceStore();
  const [tempSelectedContractId, setTempSelectedContractId] = useState<string>('');

  useEffect(() => {
    if (open) {
      setTempSelectedContractId(
        selectedContractId || (contracts.length > 0 ? contracts[0].contractId : ''),
      );
    }
  }, [open, selectedContractId, contracts]);

  const handleSelect = () => {
    if (tempSelectedContractId) {
      setSelectedContractId(selectedCustomerId, tempSelectedContractId);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      aria-labelledby='contract-service-list-modal'
      slotProps={{
        backdrop: {
          style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        },
        paper: {
          style: {
            borderRadius: '8px',
            width: '596px',
            minHeight: '278px',
            padding: 0,
            margin: 0,
            overflowY: 'visible',
          },
        },
      }}
      data-testid='contract-service-list-modal'
    >
      <DialogContent sx={{ padding: 0 }}>
        <ModalContainer sx={{ position: 'static', transform: 'none', top: 'auto', left: 'auto' }}>
          <ModalTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='h6'>서비스 번호 선택</Typography>
              <Button
                variant='text'
                size='small'
                onClick={onClose}
                sx={{
                  minWidth: 28,
                  width: 28,
                  height: 28,
                  padding: 0,
                  borderRadius: '2px',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: 16 }} />
              </Button>
            </Box>
          </ModalTitle>
          <ContentWrapper>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='h3'>서비스 번호 목록</Typography>
              <Typography variant='h4'>{contracts.length}</Typography>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table size='small' data-testid='contract-service-list-table'>
                <TableHead>
                  <TableRow variant='head'>
                    <TableCell width={48}></TableCell>
                    <TableCell>
                      <TableHeaderTitle>전화번호</TableHeaderTitle>
                    </TableCell>
                    <TableCell>
                      <TableHeaderTitle>요금제</TableHeaderTitle>
                    </TableCell>
                    <TableCell>
                      <TableHeaderTitle>기기정보</TableHeaderTitle>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow
                      key={contract.contractId}
                      data-testid={`contract-service-list-table-row-${contract.contractId}`}
                    >
                      <TableCell>
                        <Radio
                          size='small'
                          checked={contract.contractId === tempSelectedContractId}
                          onChange={() => setTempSelectedContractId(contract.contractId)}
                          data-testid={`contract-service-list-table-row-${contract.contractId}-radio`}
                        />
                      </TableCell>
                      <TableCell>{contract.maskingPhoneNumber}</TableCell>
                      <TableCell>{contract.serviceName}</TableCell>
                      <TableCell>{contract.maskingImei}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ContentWrapper>
          <ButtonContainer>
            <Button
              variant='outlined'
              size='small'
              color='grey'
              onClick={onClose}
              data-testid='contract-service-list-cancel-button'
            >
              취소
            </Button>
            <Button
              variant='contained'
              size='small'
              onClick={handleSelect}
              iconPosition='left'
              iconComponent={<CheckIcon />}
              data-testid='contract-service-list-confirm-button'
            >
              선택
            </Button>
          </ButtonContainer>
        </ModalContainer>
      </DialogContent>
    </Dialog>
  );
};

export default ContractServiceList;
