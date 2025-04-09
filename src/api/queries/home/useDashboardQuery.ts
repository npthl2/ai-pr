import { useQuery } from '@tanstack/react-query';
import dashboardService from '@api/services/dashboardService';

export const DASHBOARD_QUERY_KEYS = {
  DAILY_WEEKLY: 'dashboard-daily-weekly',
  MONTHLY: 'dashboard-monthly',
};

// cache times
const TEN_MINUTE_CACHE_TIME = 10 * 60 * 1000; // 10 minutes for daily/weekly stats
const ONE_DAY_CACHE_TIME = 24 * 60 * 60 * 1000; // 1 day for monthly stats

export const useDailyWeeklyStatisticsQuery = (memberId: string) => {
  return useQuery({
    queryKey: [DASHBOARD_QUERY_KEYS.DAILY_WEEKLY, memberId],
    queryFn: async () => {
      const response = await dashboardService.getDailyWeeklyStatistics();
      if (!response.data || typeof response.data === 'string' || response.successOrNot === 'N') {
        throw new Error('일별/주별 API 호출 실패');
      }
      return response.data;
    },
    staleTime: TEN_MINUTE_CACHE_TIME,
  });
};

export const useMonthlyStatisticsQuery = (memberId: string) => {
  return useQuery({
    queryKey: [DASHBOARD_QUERY_KEYS.MONTHLY, memberId],
    queryFn: async () => {
      const response = await dashboardService.getMonthlyStatistics();
      if (
        !response.data ||
        typeof response.data === 'string' ||
        response.successOrNot === 'N' ||
        response.data.length === 0
      ) {
        throw new Error('월별 API 호출 실패');
      }

      return response.data;
    },

    staleTime: ONE_DAY_CACHE_TIME,
  });
};
