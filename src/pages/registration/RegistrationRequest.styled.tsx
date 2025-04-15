import { Box, styled, Typography as MuiTypography, Theme } from '@mui/material';

export const RegistrationRequestContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: theme.spacing(3),
}));

export const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 16,
});

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundcolor: theme.palette.grey[50],
}));

export const FavoriteIcon = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '1.5rem',
  cursor: 'pointer',
}));

export const ContentContainer = styled(Box)({
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

export const SectionContainer = styled(Box)({
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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
  justifyContent: 'center',
  gap: 16,
  marginTop: 40,
});

export const Typography = styled(MuiTypography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.text.primary,
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  color: theme.palette.text.primary,
}));

export const PageTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontWeight: 600,
  fontSize: '1.5rem',
  color: theme.palette.text.primary,
}));

export const SectionHeader = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontWeight: 600,
  fontSize: '1.25rem',
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