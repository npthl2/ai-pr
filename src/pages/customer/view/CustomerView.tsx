/* eslint-disable no-console */
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

interface CustomerViewProps {
  customerId: string;
}

const CustomerView = ({ customerId }: CustomerViewProps) => {
  useEffect(() => {
    console.log(`CustomerView mounted for customer ID: ${customerId}`);

    return () => {
      console.log(`CustomerView unmounted for customer ID: ${customerId}`);
    };
  }, [customerId]);

  return (
    <Box p={3}>
      <Typography variant='h4'>고객조회</Typography>
      <Typography variant='body1'>고객 ID: {customerId}</Typography>
      {/* 고객 상세 정보 컴포넌트들 추가 예정 */}
    </Box>
  );
};

export default CustomerView;
