import { styled } from '@mui/material/styles';
import { Box, Typography, InputBase, IconButton } from '@mui/material';
import Slider from 'react-slick';

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

export const StyledSlider = styled(Slider)({
  width: '100%',
  '& .slick-track': {
    display: 'flex',
    margin: '0',
    gap: '16px',
  },
  '& .slick-list': {
    margin: '0 24px',
    padding: '0',
    overflow: 'hidden',
  },
  '& .slick-slide': {
    height: 'auto',
    margin: '0',
    '& > div': {
      height: '100%',
    },
  },
  '& .slick-arrow': {
    zIndex: 1,
    '&::before': {
      display: 'none',
    },
  },
  '& .slick-prev': {
    left: '-24px',
  },
  '& .slick-next': {
    right: '-24px',
  },
  '& .slick-disabled': {
    opacity: 0,
    cursor: 'default',
  },
});

export const SignupCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '24px 32px',
  width: '219px',
  height: '258px',
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: '16px',
}));

export const CardContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  height: '204px',
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
  transition: 'color 0.2s ease-in-out',
});

export const ServiceName = styled(Typography)({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '1.5em',
  color: '#37434B',
  transition: 'color 0.2s ease-in-out',
});

export const DetailButton = styled(Typography)({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '1.5em',
  color: '#272E35',
  alignSelf: 'flex-end',
  cursor: 'pointer',
  transition: 'color 0.2s ease-in-out',
});

export const Divider = styled(Box)({
  width: '100%',
  height: '1px',
  backgroundColor: '#E5E8EB',
  transition: 'all 0.2s ease-in-out',
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

export const ArrowButton = styled(IconButton)<{ $isNext?: boolean; $show?: boolean }>(
  ({ $isNext = false, $show = true }) => ({
    width: '36px',
    height: '36px',
    minWidth: '36px',
    minHeight: '36px',
    position: 'absolute',
    [!$isNext ? 'left' : 'right']: '-24px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#FFFFFF',
    border: '1px solid rgba(5, 21, 31, 0.5)',
    borderRadius: '99px',
    opacity: $show ? 1 : 0,
    visibility: $show ? 'visible' : 'hidden',
    transition: 'opacity 0.2s, visibility 0.2s',
    padding: 0,
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
    '&.slick-disabled': {
      display: 'none',
      cursor: 'default',
    },
    '&:before': {
      display: 'none',
    },
  }),
);
