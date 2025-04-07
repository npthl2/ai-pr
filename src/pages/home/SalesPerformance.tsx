import { Typography } from '@mui/material';
import { TitleWrapper, TitleBox } from './Home.styled';
import {
  SalesPerformanceContainer,
  SalesPerformanceLayout,
  SalesPerformanceWrapper,
  SignupStatsContainer,
  Divider,
  SurveyContainer,
  ChartContainer,
} from './SalesPerformance.styled';
import SatisfactionSurvey from './SatisfactionSurvey';
import MonthlyChart from './performance/MonthlyChart';
import { useDailyWeeklyStatisticsQuery } from '@api/queries/home/useDashboardQuery';
import { useEffect } from 'react';
import useMemberStore from '@stores/MemberStore';
import StatsBox from './performance/StatsBox';

const SalesPerformance = () => {
  // MemberStore에서 memberId 가져오기
  const memberInfo = useMemberStore((state) => state.memberInfo);
  const memberId = memberInfo?.memberId || '';

  // 일간/주간 통계 데이터 가져오기
  const { data: dailyWeeklyData, refetch } = useDailyWeeklyStatisticsQuery(memberId);

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    if (memberId) {
      refetch();
    }
  }, [memberId, refetch]);

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
            <StatsBox
              title='오늘 가입 건수'
              date={dailyWeeklyData?.today || ''}
              count={dailyWeeklyData?.contractCountToday || 0}
            />
            <Divider />
            <StatsBox
              title='이번주 가입 건수'
              date={`${dailyWeeklyData?.weekStart || ''} ~ ${dailyWeeklyData?.weekEnd || ''}`}
              count={dailyWeeklyData?.contractCountThisWeek || 0}
            />
          </SignupStatsContainer>
          <SurveyContainer>
            <SatisfactionSurvey />
          </SurveyContainer>
        </SalesPerformanceWrapper>
        <ChartContainer>
          <MonthlyChart />
        </ChartContainer>
      </SalesPerformanceLayout>
    </SalesPerformanceContainer>
  );
};

export default SalesPerformance;
