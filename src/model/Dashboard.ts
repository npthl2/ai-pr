export interface DailyWeeklyResponseDto {
  today: string; // 오늘날짜
  contractCountToday: number; // 오늘 신규가입 수
  weekStart: string; // 주 시작일(월)
  weekEnd: string; // 주 종료일(일)
  contractCountThisWeek: number; // 주 신규가입 수
}

export interface MonthlyResponseDto {
  month: string; // 월(yyyy-mm)
  monthName: string; // 월의 약어
  count: number; // 월별 신규가입 수
}
