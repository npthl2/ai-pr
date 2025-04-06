import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px 8px 0 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const PriceChangeContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

export const PriceDifferenceText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: '14px',
}));

export const PriceComparisonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginTop: '8px',
});

export const PriceColumn = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
});

export const PriceTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '14px',
  fontWeight: 400,
}));

export const PriceText = styled(Typography)<{ isAfter?: boolean }>(({ theme, isAfter }) => ({
  fontSize: '18px',
  fontWeight: 700,
  color: isAfter ? theme.palette.info.main : theme.palette.primary.main,
}));

export const ArrowContainer = styled(Box)({
  padding: '0 24px',
});

export const MonthlyText = styled(Typography)({
  fontSize: '24px',
  marginRight: '4px',
});
