import React from 'react';
import { Button, Typography } from '@mui/material';
import { Toast } from '@components/Toast';
import useToastStore from '@stores/ToastStore';
import { ToastExampleContainer } from './ToastExmple.styled';

const ToastExample: React.FC = () => {
  const { openToast } = useToastStore();

  const handleShowToast = (message: string) => {
    openToast(message);
  };

  return (
    <ToastExampleContainer>
      <Typography variant='h4' gutterBottom>
        Toast 컴포넌트 예시
      </Typography>
      <Button variant='outlined' onClick={() => handleShowToast('This is a toast message!')}>
        Show Toast
      </Button>
      <Toast />
    </ToastExampleContainer>
  );
};

export default ToastExample;
