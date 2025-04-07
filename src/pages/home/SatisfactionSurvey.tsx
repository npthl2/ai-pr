import { Typography, Box } from '@mui/material';
import {
  SurveyCard,
  Container,
  StyledRightIcon,
  SecondaryTypography,
} from './SatisfactionSurvey.styled';
import { useState } from 'react';
import { SurveyResponseModal } from './satisfactionSurvey/SurveyResponseModal';

const SatisfactionSurvey = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (_e: React.MouseEvent) => {
    if (isOpen) return;
    setIsOpen(true);
  };
  return (
    <SurveyCard onClick={handleCardClick}>
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Typography variant='h2'>3월 시스템 만족도 조사</Typography>
          <StyledRightIcon />
        </Box>
        <SecondaryTypography variant='body1'>소중한 의견을 남겨주세요.</SecondaryTypography>
      </Container>
      <Typography variant='body1' sx={{ position: 'absolute', top: '108px', left: '27px' }}>
        32명 참여완료!
      </Typography>
      <SurveyResponseModal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </SurveyCard>
  );
};

export default SatisfactionSurvey;
