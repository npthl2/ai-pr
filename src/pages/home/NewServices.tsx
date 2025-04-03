import { Box, Typography, Card, Stack, Chip, alpha } from '@mui/material';
import { TitleWrapper, TitleBox } from './Home.styled';
import MailIcon from '@mui/icons-material/Mail';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import StorageIcon from '@mui/icons-material/Storage';
import { NewServicesContainer } from './NewSerivces.styled';

const NewServices = () => {
  return (
    <NewServicesContainer>
      <TitleWrapper>
        <TitleBox>
          <Typography variant='h2'>새로나온 요금제/부가서비스</Typography>
        </TitleBox>
      </TitleWrapper>
      <Card
        sx={{
          width: '398px',
          height: '307px',
          bgcolor: '#E3F2FD',
          border: '1px solid #90CAF9',
          borderRadius: 2,

          p: '20px 24px',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Stack spacing={2.5}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Stack direction='row' spacing={1}>
              <Chip
                label='요금제 | 5G 초이스'
                sx={{
                  bgcolor: alpha('#90CAF9', 0.5),
                  borderRadius: 4,
                  '& .MuiChip-label': {
                    px: 1.5,
                    py: 0.5,
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#05151F',
                  },
                }}
              />
              <Chip
                label='19세 이상'
                sx={{
                  bgcolor: alpha('#90CAF9', 0.5),
                  borderRadius: 4,
                  '& .MuiChip-label': {
                    px: 1.5,
                    py: 0.5,
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#05151F',
                  },
                }}
              />
            </Stack>
            <Stack direction='row' spacing={1}>
              {[true, false, false].map((active, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: active ? '#1E88E5' : alpha('#90CAF9', 0.5),
                    transition: 'background-color 0.2s',
                  }}
                />
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography variant='h6' fontWeight={700} color='#05151F' gutterBottom>
              5G 초이스 요금제
            </Typography>
            <Typography variant='body2' color='#37434B'>
              무제한 데이터와 함께 다양한 혜택을 누려보세요
            </Typography>
          </Box>
          <Stack direction='row' spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneInTalkIcon sx={{ color: '#1E88E5' }} />
              <Typography variant='body2' color='#37434B'>
                음성통화 무제한
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StorageIcon sx={{ color: '#1E88E5' }} />
              <Typography variant='body2' color='#37434B'>
                데이터 무제한
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MailIcon sx={{ color: '#1E88E5' }} />
              <Typography variant='body2' color='#37434B'>
                문자 무제한
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Card>
    </NewServicesContainer>
  );
};

export default NewServices;
