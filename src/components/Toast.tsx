import { Snackbar } from '@mui/material';
import useToastStore from '@stores/ToastStore';
export const Toast = () => {
  const { message, open, closeToast } = useToastStore();

  const onClose = () => {
    closeToast();
  };

  return (
    <Snackbar
      id='Toast'
      data-testid='toast'
      className='toast'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      onClose={onClose}
      autoHideDuration={3000}
      message={message}
    />
  );
};
