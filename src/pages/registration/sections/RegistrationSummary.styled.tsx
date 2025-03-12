import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

export const SummaryContainer = styled(Box)({
  gap: 16,
  width: '100%',
  height: '100%',
});

export const SummarySection = styled(Box)({
  padding: '16px 20px',
});

export const SummaryContents = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  borderTop: `1px solid ${theme.palette.grey[200]}`,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '12px 24px',
}));

export const SummaryItem = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: 26,
  padding: '6px 0',
});

export const ButtonContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
  padding: '8px 24px',
});

export const LeftButtonGroup = styled(Box)({
  display: 'flex',
  gap: 8,
  width: '100%',
  '& > button': {
    flex: 1,
  },
});

export const RightButtonGroup = styled(Box)({
  display: 'flex',
  width: '100%',
  '& > button': {
    flex: 1,
  },
});

export const ItemLabel = styled(Typography)({
  fontSize: '14px',
  color: grey[600],
  fontWeight: 500,
});

export const ItemValue = styled(Typography)({
  fontSize: '16px',
  fontWeight: 500,
});