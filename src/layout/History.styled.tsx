import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

export const HistoryContainer = styled(Box)(({ theme }) => ({
  width: 320,
  height: '255px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  boxShadow: theme.shadows[3],
  overflow: 'hidden',
  zIndex: 1,
}));

export const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 24px',
});

export const EmptyContent = styled(Box)({
  padding: '16px',
  minHeight: 200,
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ContentWrapper = styled(Box)({
  width: '100%',
  height: '190px',
  overflow: 'auto',
});

export const Content = styled(Box)({
  minHeight: 36,
  borderBottom: `1px solid ${grey[50]}`,
  padding: '8px 24px',
  display: 'flex',
  justifyContent: 'space-between',
});

export const ContentStatus = styled(Box)({
  width: '234px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

type StatusType = 'success' | 'error' | 'info';

interface StatusProps {
  status: StatusType;
}

export const StatusTypography = styled(Box)<StatusProps>(({ theme, status }) => ({
  width: '42px',
  fontSize: '0.75rem',
  lineHeight: 1.5,
  color: theme.palette[status].main,
}));
