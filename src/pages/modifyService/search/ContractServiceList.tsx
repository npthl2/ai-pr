import {
  Modal,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
  Typography,
  Box,
  IconButton,
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
} from './ContractServiceList.styled';
import { CustomerContract } from '@model/Contract';

interface ContractServiceListProps {
  open: boolean;
  onClose: () => void;
  onSelect: (service: CustomerContract) => void;
  contracts: CustomerContract[];
}

const ContractServiceList = ({ open, onClose, onSelect, contracts }: ContractServiceListProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='contract-service-list-modal'
      slotProps={{
        backdrop: {
          style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        },
      }}
    >
      <ModalContainer>
        <ModalTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6'>서비스 번호 선택</Typography>
            <IconButton
              onClick={onClose}
              size='small'
              color='primary'
              sx={{
                width: 28,
                height: 28,
                borderRadius: '2px',
                padding: '2px',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </ModalTitle>
        <ContentWrapper>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='h3'>서비스 번호 목록</Typography>
            <Typography variant='h4'>{contracts.length}</Typography>
          </Box>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table size='small'>
              <TableHead>
                <TableRow variant='head'>
                  <TableCell width={48}></TableCell>
                  <TableCell>전화번호</TableCell>
                  <TableCell>요금제</TableCell>
                  <TableCell>기기정보</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.contractId}>
                    <TableCell>
                      <Radio size='small' checked={true} onChange={() => onSelect(contract)} />
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
          <Button variant='outlined' size='small' color='grey' onClick={onClose}>
            취소
          </Button>
          <Button
            variant='contained'
            size='small'
            onClick={onClose}
            iconPosition='left'
            iconComponent={<CheckIcon />}
          >
            선택
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default ContractServiceList;
