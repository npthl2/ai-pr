import { Box, Typography } from '@mui/material';

const NewSubscription = ({ customerId }: { customerId: string }) => {
  return (
    <Box p={3}>
      <Typography variant='h4'>신규가입 {customerId}</Typography>
      {/* 신규가입 폼 컴포넌트들 추가 예정 */}
    </Box>
  );
};

export default NewSubscription;
