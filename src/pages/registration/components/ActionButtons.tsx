import Button from '@components/Button';
import { Box } from '@mui/material';
import { REGISTRATION_STATUS, RegistrationStatusType } from '@constants/RegistrationConstants';
import CheckIcon from '@mui/icons-material/Check';
interface ActionButtonsProps {
  status: RegistrationStatusType;
  onGoHome: () => void;
  onGoCustomerSearch: () => void;
}

const ActionButtons = ({ status, onGoHome, onGoCustomerSearch }: ActionButtonsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        mt: 2,
        width: '100%',
      }}
    >
      <Button variant='outlined' onClick={onGoHome} size='small' data-testid='go-home-button'>
        홈으로 이동
      </Button>
      {status === REGISTRATION_STATUS.COMPLETED && (
        <Button
          variant='outlined'
          onClick={onGoCustomerSearch}
          size='small'
          data-testid='go-customer-search-button'
        >
          <CheckIcon sx={{ mr: 0.5 }} /> 고객조회로 이동
        </Button>
      )}
    </Box>
  );
};

export default ActionButtons;
