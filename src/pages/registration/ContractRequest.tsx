import { Box, Typography } from '@mui/material';

const ContractRequest = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Typography variant='h3'>가입정보 저장 완료</Typography>
    </Box>
  );
};

export default ContractRequest;
