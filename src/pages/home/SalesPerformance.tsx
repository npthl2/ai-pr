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
import { useState, useEffect } from 'react';
import useMemberStore from '@stores/MemberStore';
import StatsBox from './performance/StatsBox';
import { DailyWeeklyResponseDto } from '@model/Dashboard';

// 기본값 생성 함수
const getDefaultDailyWeeklyData = (): DailyWeeklyResponseDto => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0(일요일) ~ 6(토요일)

  // 이번 주 월요일 (dayOfWeek가 0이면 -6, 1이면 0, 2이면 -1, ...)
  const monday = new Date(today);
  const daysFromMonday = dayOfWeek === 0 ? -6 : -(dayOfWeek - 1);
  monday.setDate(today.getDate() + daysFromMonday);

  // 이번 주 일요일
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  // 날짜 포맷 (YYYY-MM-DD)
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    today: formatDate(today),
    contractCountToday: 0,
    weekStart: formatDate(monday),
    weekEnd: formatDate(sunday),
    contractCountThisWeek: 0,
  };
};

const SalesPerformance = () => {
  // MemberStore에서 memberId 가져오기
  const memberInfo = useMemberStore((state) => state.memberInfo);
  const memberId = memberInfo?.memberId || '';

  const [performanceData, setPerformanceData] = useState<DailyWeeklyResponseDto>(
    getDefaultDailyWeeklyData(),
  );

  // 일간/주간 통계 데이터 가져오기
  const { data: dailyWeeklyData, isError } = useDailyWeeklyStatisticsQuery(memberId);

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    if (isError) {
      setPerformanceData(getDefaultDailyWeeklyData());
    } else {
      setPerformanceData(dailyWeeklyData || getDefaultDailyWeeklyData());
    }
  }, [dailyWeeklyData, isError]);

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
              date={performanceData.today || ''}
              count={performanceData.contractCountToday || 0}
            />
            <Divider />
            <StatsBox
              title='이번주 가입 건수'
              date={`${performanceData.weekStart || ''} ~ ${performanceData.weekEnd || ''}`}
              count={performanceData.contractCountThisWeek || 0}
              data-testid='this-week-new-registration-count'
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
