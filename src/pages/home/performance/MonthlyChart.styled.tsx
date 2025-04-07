import { Box, styled, Typography } from '@mui/material';

export const ChartWrapper = styled(Box)({
  width: '100%',
  height: '100%',
  position: 'relative',
});

export const ChartTitleContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '23px',
  marginBottom: '23px',
  position: 'relative',
});

export const TooltipContainer = styled(Box)<{ arrow?: string }>(({ theme, arrow = 'true' }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '4px',
  padding: '4px 8px',
  marginLeft: '8px',
  position: 'relative',
  '&::before': {
    content: arrow === 'true' ? '""' : 'none',
    position: 'absolute',
    left: '-4px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 0,
    height: 0,
    borderTop: '4px solid transparent',
    borderBottom: '4px solid transparent',
    borderRight: `4px solid ${theme.palette.primary.main}`,
  },
}));

export const TooltipText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: '10px',
  lineHeight: '14px',
  letterSpacing: '0px',
  color: theme.palette.primary.contrastText,
}));
