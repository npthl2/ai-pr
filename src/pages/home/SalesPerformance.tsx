import { Typography } from '@mui/material';
import { TitleWrapper, TitleBox } from './Home.styled';
import {
  SalesPerformanceContainer,
  SalesPerformanceLayout,
  SalesPerformanceWrapper,
  SignupStatsContainer,
  SignupStatsBox,
  SignupStatsHeader,
  Divider,
  SurveyContainer,
  ChartContainer,
} from './SalesPerformance.styled';
import SatisfactionSurvey from './SatisfactionSurvey';

const SalesPerformance = () => {
  return (
    <SalesPerformanceContainer>
      <TitleWrapper>
        <TitleBox>
          <Typography variant='h2'>내 실적</Typography>
        </TitleBox>
      </TitleWrapper>
      <SalesPerformanceLayout>
        <SalesPerformanceWrapper>
          <SignupStatsContainer>
            <SignupStatsBox>
              <SignupStatsHeader>
                <Typography sx={{ color: '#6E7782', fontWeight: 700, fontSize: 16 }}>
                  오늘 가입 건수
                </Typography>
                <Typography sx={{ color: '#6E7782', fontSize: 12 }}>2025-03-17</Typography>
              </SignupStatsHeader>
              <Typography sx={{ fontSize: 28, textAlign: 'right' }}>7건</Typography>
            </SignupStatsBox>
            <Divider />
            <SignupStatsBox>
              <SignupStatsHeader>
                <Typography sx={{ color: '#6E7782', fontWeight: 700, fontSize: 16 }}>
                  이번주 가입 건수
                </Typography>
                <Typography sx={{ color: '#6E7782', fontSize: 12 }}>
                  2025-03-16 ~ 2025-03-22
                </Typography>
              </SignupStatsHeader>
              <Typography sx={{ fontSize: 28, textAlign: 'right' }}>100건</Typography>
            </SignupStatsBox>
          </SignupStatsContainer>
          <SurveyContainer>
            <SatisfactionSurvey />
          </SurveyContainer>
        </SalesPerformanceWrapper>
        <ChartContainer>
          <Typography variant='h2'>차트</Typography>
        </ChartContainer>
      </SalesPerformanceLayout>
    </SalesPerformanceContainer>
  );
};

export default SalesPerformance;
