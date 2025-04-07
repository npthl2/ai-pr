import { Typography, Box } from '@mui/material';
import {
  SurveyCard,
  Container,
  StyledRightIcon,
  SecondaryTypography,
} from './SatisfactionSurvey.styled';
import { useState } from 'react';
import { SurveyResponseModal } from './satisfactionSurvey/SurveyResponseModal';
import { useSatisfactionSurveyResponseQuery } from '@api/queries/satisfactionSurvey/useSatisfactionSurveyQuery';
import useMemberStore from '@stores/MemberStore';
import { SurveyResponseSearchRequestParams } from '@model/SatisfactionSurvey';

const SatisfactionSurvey = () => {
  const today = new Date();
  const currentSurveyPeriod: SurveyResponseSearchRequestParams = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  };

  const memberId = useMemberStore((state) => state.memberInfo?.memberId);
  const { data: surveyResponseStatus } = useSatisfactionSurveyResponseQuery(
    memberId ?? '',
    currentSurveyPeriod,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (_e: React.MouseEvent) => {
    if (isOpen) return;
    setIsOpen(true);
  };

  return (
    <SurveyCard
      completed={surveyResponseStatus?.alreadyRespondedYn}
      onClick={surveyResponseStatus?.alreadyRespondedYn === 'Y' ? undefined : handleCardClick}
    >
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Typography variant='h2'>{currentSurveyPeriod.month}월 시스템 만족도 조사</Typography>
          <StyledRightIcon />
        </Box>
        <SecondaryTypography variant='body1'>
          {surveyResponseStatus?.alreadyRespondedYn === 'Y'
            ? '참여해주셔서 감사합니다:)'
            : '소중한 의견을 남겨주세요.'}
        </SecondaryTypography>
      </Container>
      <Typography variant='body1' sx={{ position: 'absolute', top: '108px', left: '27px' }}>
        {surveyResponseStatus?.totalResponseCount ?? ''}명 참여완료!
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
