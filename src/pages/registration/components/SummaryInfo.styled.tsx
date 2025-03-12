import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SummaryContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1021,
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
}));

export const SubSectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
  color: theme.palette.text.primary,
}));

export const InfoSection = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.background.default,
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
  // padding: theme.spacing(3),
  // marginBottom: theme.spacing(3),
}));

export const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(1),
}));

export const InfoLabel = styled(Typography)(({ theme }) => ({
  width: '120px',
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));

export const InfoValue = styled(Typography)(({ theme }) => ({
  flex: 1,
  fontWeight: 400,
  color: theme.palette.text.primary,
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(3, 0),
}));

export const VerticalDivider = styled(Divider)(({ theme }) => ({
  height: 'auto',
  margin: theme.spacing(0, 2),
})); 