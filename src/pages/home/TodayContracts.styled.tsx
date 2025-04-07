import { Box, IconButton, styled, Typography, Card } from '@mui/material';
import TextField from '@components/TextField';
import Slider from 'react-slick';

export const TodayContractsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

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

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

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
  height: '32px',
  width: '200px',
});

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
    padding: '0 12px',
  },
}));

export const StyledSlider = styled(Slider)({
  width: '100%',
  maxHeight: '258px',
  position: 'relative',
  '& .slick-track': {
    display: 'flex',
    margin: '0',
    gap: '16px',
  },
  '& .slick-list': {
    margin: '0',
    padding: '0',
    overflow: 'hidden',
  },
  '& .slick-slide': {
    height: 'auto',
    margin: '0',
    width: '219px !important',
    '& > div': {
      height: '100%',
      width: '219px !important',
    },
  },
  '& .slick-arrow': {
    zIndex: 1,
    '&::before': {
      display: 'none',
    },
  },
  '& .slick-prev': {
    left: '-18px',
  },
  '& .slick-next': {
    right: '-18px',
  },
  '& .slick-disabled': {
    opacity: 0,
    cursor: 'default',
  },
});

export const CardWrapper = styled(Card)({
  width: '219px',
  height: '100%',
  borderRadius: '16px',
  backgroundColor: '#FFFFFF',
  boxShadow: 'none',
  padding: '24px 32px',
  transition: 'all 0.2s ease-in-out',
  '&:hover, &.hover-active': {
    backgroundColor: '#272E35',
  },
  display: 'flex',
  justifyContent: 'space-between',
});

export const CardContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '0px',
  gap: '16px',
  height: '204px',
});

export const CustomerInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const CustomerName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '1.5em',
  color: theme.palette.text.primary,
  transition: 'color 0.2s ease-in-out',
  '.hover-active &': {
    color: theme.palette.primary.contrastText,
  },
}));

export const PhoneNumber = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '1.5em',
  color: theme.palette.primary.main,
  transition: 'color 0.2s ease-in-out',
  '.hover-active &': {
    color: theme.palette.primary.contrastText,
  },
}));

export const ServiceName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '1.5em',
  color: theme.palette.primary.light,
  transition: 'color 0.2s ease-in-out',
  '.hover-active &': {
    color: theme.palette.primary.contrastText,
  },
}));

export const DetailInfo = styled(Box)({
  marginTop: 'auto',
  alignSelf: 'flex-end',
});

export const DetailButton = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  cursor: 'pointer',
  transition: 'color 0.2s ease-in-out',
  '.hover-active &': {
    color: theme.palette.primary.contrastText,
  },
}));

export const Divider = styled(Box)({
  width: '100%',
  height: '1px',
  backgroundColor: '#E5E8EB',
  transition: 'all 0.2s ease-in-out',
  '.hover-active &': {
    backgroundColor: '#FFFFFF',
  },
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

export const EmptyTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

export const EmptyDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '1.5em',
  color: theme.palette.text.secondary,
  textAlign: 'center',
  whiteSpace: 'pre-line',
}));

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

export const NoResultText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

export const ArrowButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== '$isNext' && prop !== '$show',
})<{ $isNext?: boolean; $show?: boolean }>(({ $isNext = false, $show = true }) => ({
  width: '36px',
  height: '36px',
  minWidth: '36px',
  minHeight: '36px',
  position: 'absolute',
  [!$isNext ? 'left' : 'right']: '-18px',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(5, 21, 31, 0.5)',
  borderRadius: '99px',
  opacity: $show ? 1 : 0,
  visibility: $show ? 'visible' : 'hidden',
  transition: 'opacity 0.2s, visibility 0.2s',
  padding: 0,
  zIndex: 2,
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
}));
