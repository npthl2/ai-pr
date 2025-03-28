import { styled } from '@mui/material/styles';
import { Box, Typography, Theme } from '@mui/material';

export const LineInfoDetailsContainer = styled(Box)(() => ({
  width: 'calc(100% - 120px)',
  maxWidth: 1200,
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  flexWrap: 'wrap',
}));

export const ServiceValue = styled(Typography)(({ variant }) => ({
  fontFamily: 'Pretendard, sans-serif',
  ...(variant === undefined && {
    fontWeight: 400,
    fontSize: 13,
    lineHeight: '140%',
    letterSpacing: '0px',
  }),
}));

export const ServiceLabel = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontFamily: 'Pretendard, sans-serif',
  fontSize: 13,
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '0px',
  color: theme.palette.text.secondary,
}));
