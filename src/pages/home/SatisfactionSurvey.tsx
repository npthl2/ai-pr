import { Typography, Box, Card } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const SatisfactionSurvey = () => {
  return (
    <Card
      sx={{
        width: '411px',
        height: '138px',
        bgcolor: '#ECEFF1',
        borderRadius: 3,
        p: '24px 32px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Typography
            variant='h6'
            sx={{
              fontFamily: 'Pretendard',
              fontSize: '20px',
              fontWeight: 700,
              color: '#05151F',
              lineHeight: 1.5,
            }}
          >
            3월 시스템 만족도 조사
          </Typography>
          <ChevronRightIcon sx={{ color: '#FFFFFF' }} />
        </Box>
        <Typography
          variant='body2'
          sx={{
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 400,
            color: '#6E7782',
            lineHeight: 1.5,
          }}
        >
          소중한 의견을 남겨주세요.
        </Typography>
      </Box>

      <Typography
        variant='body2'
        sx={{
          fontFamily: 'Pretendard',
          fontSize: '14px',
          fontWeight: 400,
          color: '#272E35',
          lineHeight: 1.5,
          mt: '36px',
        }}
      >
        32명 참여완료!
      </Typography>
    </Card>
  );
};

export default SatisfactionSurvey;
