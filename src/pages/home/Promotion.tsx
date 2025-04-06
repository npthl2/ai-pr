import { Typography, Card, Stack, Chip } from '@mui/material';
import { TitleWrapper, TitleBox } from './Home.styled';
import { PromotionContainer } from './Promotion.styled';

const Promotion = () => {
  return (
    <PromotionContainer>
      <TitleWrapper>
        <TitleBox>
          <Typography variant='h2'>프로모션</Typography>
        </TitleBox>
      </TitleWrapper>

      <Card
        sx={{
          borderRadius: 2,
          background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(/images/promotion-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '261px',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Stack spacing={1}>
          <Chip
            label='KT 통신요금'
            sx={{
              height: 'auto',
              p: '2px 8px',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #05151F',
              borderRadius: 4,
              width: 'fit-content',
              '& .MuiChip-label': {
                px: 1,
                fontSize: 13,
                fontWeight: 700,
                color: '#05151F',
              },
            }}
          />
          <Typography
            variant='h4'
            sx={{
              fontWeight: 700,
              color: '#FFFFFF',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            간편계좌이체로 납부하면
            <br />
            100% 경품 증정!
          </Typography>
        </Stack>
      </Card>
    </PromotionContainer>
  );
};

export default Promotion;
