import baseService from './baseService';
import { CommonResponse } from '@model/common/CommonResponse';
import { DailyWeeklyResponseDto, MonthlyResponseDto } from '@model/Dashboard';

const dashboardService = {
  getDailyWeeklyStatistics(): Promise<CommonResponse<DailyWeeklyResponseDto>> {
    return baseService.get('/stg-be/v1/dashboard/statistics/contracts/daily-weekly');
  },
  getMonthlyStatistics(): Promise<CommonResponse<MonthlyResponseDto[]>> {
    return baseService.get('/stg-be/v1/dashboard/statistics/contracts/monthly');
  },
};

export default dashboardService;
