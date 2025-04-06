import {
  Typography,
  Box,
  Paper,
  InputBase,
  IconButton,
  Stack,
  Card,
  alpha,
  CardContent,
  Button,
  Divider,
} from '@mui/material';
import { TitleWrapper, TitleBox } from './Home.styled';
import { TodayContractsContainer } from './TodayContracts.styled';
import SearchIcon from '@mui/icons-material/Search';

const TodayContracts = () => {
  return (
    <TodayContractsContainer>
      <TitleWrapper>
        <TitleBox>
          <Typography variant='h2'>오늘의 신규가입</Typography>
          <Typography variant='h2'>7</Typography>
        </TitleBox>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', height: '32px' }}>
          <Paper
            component='form'
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 200,
              height: '32px',
              border: '1px solid #D1D6DA',
              borderRadius: 1,
              transition: 'border-color 0.2s',
              '&:hover': {
                borderColor: '#90CAF9',
              },
            }}
          >
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                '& input::placeholder': {
                  color: '#6E7782',
                  opacity: 1,
                },
              }}
              placeholder='이름 검색'
              inputProps={{ 'aria-label': '이름 검색' }}
            />
            <IconButton
              type='button'
              sx={{
                p: '10px',
                color: '#37434B',
                transition: 'color 0.2s',
                '&:hover': {
                  color: '#1E88E5',
                },
              }}
              aria-label='search'
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </TitleWrapper>
      <Stack direction='row' spacing={2} height={'258px'}>
        {[1, 2, 3].map((index) => (
          <Card
            key={index}
            sx={{
              width: '219px',
              borderRadius: 2,
              bgcolor: index === 2 ? alpha('#272E35', 0.8) : '#FFFFFF',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <CardContent sx={{ p: '24px 32px' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                <Stack
                  direction='column'
                  spacing={2}
                  alignItems='center'
                  divider={
                    <Divider
                      orientation='vertical'
                      flexItem
                      sx={{
                        borderColor: index === 2 ? 'rgba(255,255,255,0.2)' : '#E5E8EB',
                      }}
                    />
                  }
                >
                  <Typography
                    variant='subtitle1'
                    fontWeight={700}
                    color={index === 2 ? '#FFFFFF' : '#05151F'}
                  >
                    홍길* 고객님
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    fontWeight={700}
                    color={index === 2 ? '#FFFFFF' : '#05151F'}
                  >
                    010-{index}1**-*777
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    fontWeight={700}
                    color={index === 2 ? '#FFFFFF' : '#37434B'}
                  >
                    유튜브 프리미엄 초이스
                  </Typography>
                </Stack>
                <Box sx={{ alignSelf: 'flex-end' }}>
                  <Button
                    variant='text'
                    sx={{
                      color: index === 2 ? '#FFFFFF' : '#272E35',
                      transition: 'color 0.2s',
                      '&:hover': {
                        bgcolor: 'transparent',
                        color: '#1E88E5',
                      },
                    }}
                    endIcon={<span>→</span>}
                  >
                    상세 정보 보기
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </TodayContractsContainer>
  );
};

export default TodayContracts;
