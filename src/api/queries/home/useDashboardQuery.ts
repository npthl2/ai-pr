import { useQuery, useQueryClient } from '@tanstack/react-query';
import dashboardService from '@api/services/dashboardService';
import { CommonResponse } from '@model/common/CommonResponse';
import { DailyWeeklyResponseDto, MonthlyResponseDto } from '@model/Dashboard';

export const DASHBOARD_QUERY_KEYS = {
  DAILY_WEEKLY: 'dashboard-daily-weekly',
  MONTHLY: 'dashboard-monthly',
};

// Cache times
const TEN_MINUTE_CACHE_TIME = 10 * 60 * 1000; // 10 minutes for daily/weekly stats
const ONE_DAY_CACHE_TIME = 24 * 60 * 60 * 1000; // 1 day for monthly stats

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

export const useDailyWeeklyStatisticsQuery = (memberId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [DASHBOARD_QUERY_KEYS.DAILY_WEEKLY, memberId],
    queryFn: () => dashboardService.getDailyWeeklyStatistics(),
    select: (response: CommonResponse<DailyWeeklyResponseDto>) => {
      // 데이터 가공
      if (!response.data || typeof response.data === 'string' || response.successOrNot === 'N') {
        // 응답 실패 기록
        queryClient.setQueryData([DASHBOARD_QUERY_KEYS.DAILY_WEEKLY, memberId, 'error'], {
          timestamp: new Date().getTime(),
          message: response.statusCode || 'API_FAILURE',
        });

        // 성공 시 에러 플래그 제거
        queryClient.removeQueries({
          queryKey: [DASHBOARD_QUERY_KEYS.DAILY_WEEKLY, memberId, 'error'],
        });

        // 실패시 기본값 반환
        return getDefaultDailyWeeklyData();
      }

      return response.data;
    },
    staleTime: TEN_MINUTE_CACHE_TIME,
    gcTime: TEN_MINUTE_CACHE_TIME,
  });
};

// 기본 월별 데이터 생성
const getDefaultMonthlyData = (): MonthlyResponseDto[] => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11

  // 월 이름 약어
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // 최근 12개월 데이터 생성 (현재 월 포함)
  const monthlyData: MonthlyResponseDto[] = [];

  for (let i = 0; i < 12; i++) {
    // i개월 전의 날짜 계산
    const targetDate = new Date(currentYear, currentMonth - i, 1);
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth(); // 0-11

    // YYYY-MM 형식
    const monthStr = `${targetYear}-${String(targetMonth + 1).padStart(2, '0')}`;

    monthlyData.push({
      month: monthStr,
      monthName: monthNames[targetMonth],
      count: 0,
    });
  }

  return monthlyData;
};

export const useMonthlyStatisticsQuery = (memberId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [DASHBOARD_QUERY_KEYS.MONTHLY, memberId],
    queryFn: () => dashboardService.getMonthlyStatistics(),
    select: (response: CommonResponse<MonthlyResponseDto[]>) => {
      if (!response.data || typeof response.data === 'string' || response.successOrNot === 'N') {
        // 응답 실패 기록
        queryClient.setQueryData([DASHBOARD_QUERY_KEYS.MONTHLY, memberId, 'error'], {
          timestamp: new Date().getTime(),
          message: response.statusCode || 'API_FAILURE',
        });

        return getDefaultMonthlyData();
      }

      // 성공 시 에러 플래그 제거
      queryClient.removeQueries({ queryKey: [DASHBOARD_QUERY_KEYS.MONTHLY, memberId, 'error'] });

      // 데이터가 빈 배열인 경우 기본값 반환
      if (response.data.length === 0) {
        return getDefaultMonthlyData();
      }

      return response.data;
    },
    staleTime: ONE_DAY_CACHE_TIME,
    gcTime: ONE_DAY_CACHE_TIME,
  });
};
