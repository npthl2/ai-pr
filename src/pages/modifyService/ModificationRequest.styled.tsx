import { Box, styled, Typography as MuiTypography, Theme } from '@mui/material';

export const ModificationRequestContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 16,
});

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'left',
  width: '100%',
  marginBottom: theme.spacing(2),
}));

export const SummaryContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: theme.palette.grey[50],
}));

export const FavoriteIcon = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '1.5rem',
  cursor: 'pointer',
}));

export const ContentContainer = styled(Box)({
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 40,
});

export const StatusMessageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const CompletedGifContainer = styled('img')({
  width: 140,
  height: 120,
});

export const PendingGifContainer = styled('img')({
  width: 100,
  height: 100,
});

export const InfoContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));

export const SectionContent = styled(Box)({
  padding: 8,
});

export const StatusIndicator = styled(Box)<{ isActive: boolean }>(({ theme, isActive }) => ({
  display: 'inline-block',
  width: 16,
  height: 16,
  borderRadius: '50%',
  backgroundColor: isActive ? theme.palette.success.main : theme.palette.grey[500],
  marginLeft: 8,
}));

export const EmailFormContainer = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
});

export const EmailSeparator = styled('span')({
  paddingTop: 8,
});

export const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  gap: 16,
  marginTop: 40,
});

export const Typography = styled(MuiTypography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.text.primary,
}));

export const PageTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontWeight: 700,
  fontSize: 18,
  color: theme.palette.text.primary,
  alignSelf: 'left',
}));

export const SectionHeader = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontWeight: 600,
  fontSize: 18,
  color: theme.palette.text.primary,
}));

export const StatusMessage = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontWeight: 250,
  fontSize: '24px',
  color: theme.palette.text.primary,
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: 250,
  fontSize: '24px',
}));

export const AdditionalServicesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '0 0 8px 8px',
}));
