import { Box, Typography, styled } from '@mui/material';
import { Theme } from '@mui/material/styles';

// 전체 컨테이너 스타일
export const Container = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '100%',
  height: '100%',
  maxWidth: 1828,
  maxHeight: 759,
  borderRight: '1px solid',
  borderBottom: '1px solid',
  borderLeft: '1px solid',
  paddingTop: 16,
  paddingRight: 16,
  paddingBottom: 16,
  paddingLeft: 16,
  borderColor: theme.palette.grey[200],
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

// 컨텐츠 컨테이너 스타일
export const ContentContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  overflow: 'hidden',
}));

// 회선 정보 컨테이너 스타일
export const LineInfoContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 12px',
  borderRadius: 4,
  flexShrink: 0,
}));

// 회선 정보 상세 컨테이너 스타일
export const LineInfoDetailsContainer = styled(Box)(() => ({
  width: 'calc(100% - 120px)',
  maxWidth: 1200,
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  flexWrap: 'wrap',
}));

// 서비스 정보 컨테이너 스타일
export const ServicesContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  flex: 1,
  overflow: 'hidden',
  minHeight: 0,
}));

// 현재 서비스 컨테이너 스타일
export const CurrentServiceContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  borderRight: `1px solid ${theme.palette.grey[200]}`,
  borderTopLeftRadius: 8,
  borderBottomLeftRadius: 8,
  padding: 16,
  backgroundColor: theme.palette.grey[200],
  overflow: 'hidden',
}));

// 새로운 서비스 컨테이너 스타일
export const NewServiceContainer = styled(Box)(() => ({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  overflow: 'hidden',
}));

// 서비스 값 스타일
export const ServiceValue = styled(Typography)(() => ({
  fontFamily: 'Pretendard, sans-serif',
  fontWeight: 400,
  fontSize: 13,
  lineHeight: '140%',
  letterSpacing: '0px',
}));

// 서비스 가격 스타일
export const ServicePrice = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

// 서비스 라벨 스타일
export const ServiceLabel = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontFamily: 'Pretendard, sans-serif',
  fontSize: 13,
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '0px',
  color: theme.palette.text.secondary,
}));

// 서비스 아이템 컨테이너 스타일
export const ServiceItemContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px 0',
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
}));

// 총액 컨테이너 스타일
export const TotalContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  borderTop: `1px solid ${theme.palette.grey[200]}`,
}));

// 총액 라벨 스타일
export const TotalLabel = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

// 총액 가격 스타일
export const TotalPrice = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

export const ButtonContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
}));

export const WarningMessage = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: 11,
  fontWeight: 400,
  color: theme.palette.error.main,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

export const ServiceSearchContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 8,
  padding: '6px 12px',
  backgroundColor: theme.palette.grey[50],
  borderRadius: 4,
}));
