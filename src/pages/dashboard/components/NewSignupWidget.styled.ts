import { styled } from '@mui/material/styles';
import { Box, Typography, InputBase } from '@mui/material';

export const WidgetContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  backgroundColor: '#ffffff',
  width: '100%',
});

export const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '32px',
});

export const TitleContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const Title = styled(Typography)({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '1.5em',
  color: '#05151F',
});

export const SignupCount = styled(Typography)({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '1.5em',
  color: '#05151F',
});

export const SearchContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const SearchInput = styled(InputBase)({
  width: '200px',
  height: '32px',
  padding: '0 12px',
  backgroundColor: '#FFFFFF',
  border: '1px solid #D1D6DA',
  borderRadius: '4px',
  '& input': {
    fontFamily: 'Pretendard',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '1.5em',
    color: '#868F99',
    '&::placeholder': {
      color: '#868F99',
      opacity: 1,
    },
  },
});

export const CarouselContainer = styled(Box)({
  display: 'flex',
  gap: '16px',
  height: '258px',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 8px',
});

export const SignupCard = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '24px 32px',
  gap: '36px',
  minWidth: '320px',
  backgroundColor: '#FFFFFF',
  borderRadius: '16px',
  '&:hover': {
    backgroundColor: '#272E35',
    opacity: 0.8,
    '& *': {
      color: '#FFFFFF',
    },
  },
});

export const CardContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const CustomerInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const CustomerName = styled(Typography)({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '1.5em',
  color: '#05151F',
});

export const ServiceName = styled(Typography)({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '1.5em',
  color: '#37434B',
});

export const DetailButton = styled(Typography)({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '1.5em',
  color: '#272E35',
  alignSelf: 'flex-end',
  cursor: 'pointer',
});

export const Divider = styled(Box)({
  width: '100%',
  height: '1px',
  backgroundColor: '#E5E8EB',
});

export const EmptyContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '24px',
  height: '258px',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: '1px dashed rgba(112, 121, 142, 0.16)',
  borderRadius: '16px',
  width: '100%',
});

export const EmptyTitle = styled(Typography)({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '1.5em',
  color: '#272E35',
  textAlign: 'center',
});

export const EmptyDescription = styled(Typography)({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '1.5em',
  color: '#6E7782',
  textAlign: 'center',
  whiteSpace: 'pre-line',
});

export const NoResultContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '258px',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: '1px dashed rgba(112, 121, 142, 0.16)',
  borderRadius: '16px',
  width: '100%',
});

export const NoResultText = styled(Typography)({
  fontFamily: 'Pretendard',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '1.5em',
  color: '#000000',
  textAlign: 'center',
});
