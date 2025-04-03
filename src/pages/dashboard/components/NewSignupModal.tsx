import Dialog from '@components/Dialog';
import { ContentContainer } from './NewSignupModal.styled';
import { useTodayContracts } from '@api/queries/dashboard/useTodayContracts';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';
import NewSignupDetailInfo from './NewSignupDetailInfo';
import { mapToInfo } from '@api/queries/customerDetail/useCustomerDetail';

interface NewSignupModalProps {
  open: boolean;
  onClose: () => void;
  signupId: string;
}

const NewSignupModal = ({ open, onClose, signupId }: NewSignupModalProps) => {
  const { data: todayContracts, isLoading } = useTodayContracts();

  // Find the selected contract from today's contracts
  const selectedContract = todayContracts?.find((contract) => contract.contractId === signupId);
  const contractInfo = selectedContract ? mapToInfo(selectedContract) : null;

  if (isLoading) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        title='신규가입 상세정보'
        size='large'
        content={
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        }
      />
    );
  }

  if (!selectedContract) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        title='신규가입 상세정보'
        size='large'
        content={
          <Box sx={{ p: 3 }}>
            <Typography color='error'>계약 정보를 찾을 수 없습니다.</Typography>
          </Box>
        }
      />
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title='신규가입 상세정보'
      size='large'
      content={
        <ContentContainer>
          <NewSignupDetailInfo
            contractInfo={contractInfo?.contract || null}
            invoiceInfo={contractInfo?.invoice || null}
            serviceInfo={contractInfo?.service || null}
          />
        </ContentContainer>
      }
    />
  );
};

export default NewSignupModal;
