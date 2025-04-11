import { Box, styled, Typography, Card, Divider } from '@mui/material';

export const CardWrapper = styled(Card)(({ theme }) => ({
  width: '219px',
  height: '100%',
  borderRadius: '16px',
  backgroundColor: theme.palette.primary.contrastText,
  boxShadow: 'none',
  padding: '24px 32px',
  '&:hover, &.hover-active': {
    backgroundColor: theme.palette.grey[900],
  },
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
}));

export const CardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0px',
  gap: theme.spacing(2),
  height: '204px',
  '&:hover, &.hover-active': {
    backgroundColor: theme.palette.grey[900],
  },
}));

export const CustomerInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const CustomerName = styled(Typography)(({ theme }) => ({
  '.hover-active &': {
    color: theme.palette.primary.contrastText,
  },
}));

export const PhoneNumber = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  '.hover-active &': {
    color: theme.palette.primary.contrastText,
  },
}));

export const ServiceName = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  '.hover-active &': {
    color: theme.palette.primary.contrastText,
  },
}));

export const DetailInfo = styled(Box)({
  marginTop: 'auto',
  alignSelf: 'flex-end',
});

export const DetailButton = styled(Typography)(({ theme }) => ({
  '.hover-active &': {
    color: theme.palette.primary.contrastText,
  },
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  width: '100%',
  borderColor: theme.palette.grey[100],
  '.hover-active &': {
    borderColor: theme.palette.primary.contrastText,
    opacity: 0.3,
  },
}));
