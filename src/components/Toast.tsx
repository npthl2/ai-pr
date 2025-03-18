import { Snackbar, useTheme } from '@mui/material';
import useToastStore from '@stores/ToastStore';
export const Toast = () => {
  const { message, open, closeToast, status } = useToastStore();
  const theme = useTheme();

  const onClose = () => {
    closeToast();
  };

  return (
    <Snackbar
      id='Toast'
      className='toast'
      sx={{ zIndex: 3000 }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      onClose={onClose}
      autoHideDuration={4000}
      message={message}
      ContentProps={{
        sx: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          backgroundColor: status === 'error' ? theme.palette.error.main : '',
        },
      }}
    />
  );
};
