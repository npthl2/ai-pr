import { useTheme } from '@mui/material/styles';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts';
import {
  ChartWrapper,
  ChartTitleContainer,
  TooltipContainer,
  TooltipText,
} from './MonthlyChart.styled';
import { useMonthlyStatisticsQuery } from '@api/queries/home/useDashboardQuery';
import { useState, useEffect } from 'react';
import useMemberStore from '@stores/MemberStore';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { MonthlyResponseDto } from '@model/Dashboard';

// 메시지 상수 정의
const TOOLTIP_MESSAGES = {
  INCREASED: '지난달 보다 실적 건수가 많아졌네요! 이번달도 화이팅:)',
  DECREASED: '이번달 실적 건수가 조금 아쉽네요. 끝까지 화이팅:)',
  EQUAL: '계속해서 좋은 실적 기대할게요. 화이팅:)',
};

const MonthlyChart = () => {
  const theme = useTheme();

  // MemberStore에서 memberId 가져오기
  const memberInfo = useMemberStore((state) => state.memberInfo);
  const memberId = memberInfo?.memberId || '';

  const { data: monthlyData } = useMonthlyStatisticsQuery(memberId);
  const [chartData, setChartData] = useState<MonthlyResponseDto[]>([]);
  // 툴팁 메시지 상태
  const [tooltipMessage, setTooltipMessage] = useState(TOOLTIP_MESSAGES.INCREASED);

  // 데이터가 변경될 때만 차트 데이터 갱신
  useEffect(() => {
    if (monthlyData) {
      // 최근 2개월 데이터 비교하여 메시지 설정
      if (monthlyData.length >= 2) {
        const lastIndex = monthlyData.length - 1;
        const currentMonth = monthlyData[lastIndex].count;
        const previousMonth = monthlyData[lastIndex - 1].count;

        if (currentMonth > previousMonth) {
          setTooltipMessage(TOOLTIP_MESSAGES.INCREASED);
        } else if (currentMonth === previousMonth) {
          setTooltipMessage(TOOLTIP_MESSAGES.EQUAL);
        } else {
          setTooltipMessage(TOOLTIP_MESSAGES.DECREASED);
        }
      }

      setChartData(monthlyData);
    }
  }, [monthlyData]);

  return (
    <ChartWrapper>
      <ChartTitleContainer>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ color: theme.palette.text.secondary }}>
            월별 실적 추이
          </Typography>
          <TooltipContainer>
            <TooltipText>{tooltipMessage}</TooltipText>
          </TooltipContainer>
        </Box>
      </ChartTitleContainer>

      <ResponsiveContainer width='100%' height={231}>
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 25 }}>
          <defs>
            <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={theme.palette.text.primary} stopOpacity={0.8} />
              <stop offset='95%' stopColor={theme.palette.text.primary} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' vertical={false} stroke={theme.palette.divider} />
          <XAxis
            dataKey='monthName'
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fontFamily: 'Roboto',
              fontWeight: 400,
              textAnchor: 'middle',
              fill: theme.palette.text.secondary,
            }}
            dy={10}
          />
          <YAxis
            domain={[0, 'auto']}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fontFamily: 'Roboto',
              fontWeight: 400,
              textAnchor: 'end',
              fill: theme.palette.text.secondary,
            }}
            width={30}
          />
          <RechartsTooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <TooltipContainer arrow='false'>
                    <TooltipText>
                      {label}: {payload[0].value}건
                    </TooltipText>
                  </TooltipContainer>
                );
              }
              return null;
            }}
            cursor={{ strokeDasharray: '3 3' }}
          />
          <Area
            type='monotone'
            dataKey='count'
            stroke={theme.palette.text.primary}
            strokeWidth={1}
            fillOpacity={0.2}
            fill='url(#colorValue)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default MonthlyChart;
