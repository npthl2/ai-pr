import Button from '@components/Button';
import { Box } from '@mui/material';
import { RegistrationStatusType } from '@model/RegistrationInfo';

interface ActionButtonsProps {
  status: RegistrationStatusType;
  onGoHome: () => void;
  onGoCustomerSearch: () => void;
}

const ActionButtons = ({ status, onGoHome, onGoCustomerSearch }: ActionButtonsProps) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'flex-end', 
      gap: 2, 
      mt: 2, 
      width: '100%' 
    }}>
      <Button 
        variant="outlined" 
        onClick={onGoHome}
        size="small"
      >
        홈으로 이동
      </Button>
      {status === 'COMPLETED' && (
        <Button 
          variant="outlined" 
          onClick={onGoCustomerSearch}
          size="small"
        >
          고객조회로 이동
        </Button>
      )}
    </Box>
  );
};

export default ActionButtons; 