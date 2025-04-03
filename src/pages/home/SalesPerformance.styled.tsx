import { Box, styled } from '@mui/material';

export const SalesPerformanceContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '12px',
}));

export const SalesPerformanceLayout = styled(Box)(() => ({
  display: 'flex',
}));

export const SalesPerformanceWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '309px',
  backgroundColor: theme.palette.common.white,
  borderTopLeftRadius: '16px',
  borderBottomLeftRadius: '16px',
}));

export const SignupStatsContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '24px',
  padding: '24px 24px 0 24px',
}));

export const SignupStatsBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '150px',
}));

export const SignupStatsHeader = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}));

export const Divider = styled(Box)(() => ({
  width: '1px',
  height: '56px',
  backgroundColor: 'rgba(112, 121, 142, 0.16)',
}));

export const SurveyContainer = styled(Box)(() => ({
  backgroundColor: '#F7F9FA',
  padding: '24px 24px 12px 0',
  marginTop: '12px',
  borderTopRightRadius: '16px',
}));

export const ChartContainer = styled(Box)(() => ({
  flex: 1,
  backgroundColor: '#ffffff',
  borderTopRightRadius: '16px',
  borderBottomRightRadius: '16px',
  borderBottomLeftRadius: '16px',
}));
