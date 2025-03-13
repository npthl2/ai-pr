import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ p: 2 }} data-testid='home-content'>
      <Typography variant='h6'>홈 화면 입니다.</Typography>
    </Box>
  );
};

export default Home;
