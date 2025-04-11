import { Box, styled } from '@mui/material';

export const TitleWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const TitleBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

export const HomeContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.grey[50],
  justifyItems: 'center',
}));

export const ContentWrapper = styled(Box)({
  padding: '32px 40px 24px 40px',
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  height: '899px',
  margin: '0 auto',
  maxWidth: '1528px',
  width: '100%',
});

export const MainContent = styled(Box)({
  gap: '32px',
  display: 'flex',
  flexDirection: 'column',
});

export const ContentLayout = styled(Box)({
  display: 'flex',
  gap: '32px',
  width: '100%',
});

export const LeftColumn = styled(Box)({
  flex: 3,
  minWidth: '0px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});

export const RightColumn = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});

export const UserName = styled('span')({
  fontWeight: 700,
});
