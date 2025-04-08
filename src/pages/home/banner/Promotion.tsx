import { Typography, Card } from '@mui/material';
import { TitleWrapper, TitleBox } from '../Home.styled';
import { PromotionContainer } from './Promotion.styled';
import { useState } from 'react';
import PromotionDialog from './PromotionDialog';

const Promotion = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <PromotionContainer>
      <TitleWrapper>
        <TitleBox>
          <Typography variant='h2'>프로모션</Typography>
        </TitleBox>
      </TitleWrapper>

      <Card
        elevation={0}
        onClick={handleOpenDialog}
        sx={{
          background: `url(/images/promotion-banner.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '261px',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            cursor: 'pointer',
          },
          padding: '21px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
        data-testid='promotion-banner'
      />

      <PromotionDialog open={isDialogOpen} onClose={handleCloseDialog} />
    </PromotionContainer>
  );
};

export default Promotion;
