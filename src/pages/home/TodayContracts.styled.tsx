import { Box, IconButton, InputBase, styled, Typography, Card } from '@mui/material';
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
  position: 'relative',
  '& .slick-track': {
    display: 'flex',
    margin: '0',
    gap: '16px',
  },
  '& .slick-list': {
    margin: '0',
    padding: '0 24px',
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
    left: '8px',
  },
  '& .slick-next': {
    right: '8px',
  },
  '& .slick-disabled': {
    opacity: 0,
    cursor: 'default',
  },
});

export const CustomerInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  height: '204px',
});

export const CustomerName = styled(Typography)({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '1.5em',
  color: '#05151F',
  transition: 'color 0.2s ease-in-out',
  '.hover-active &': {
    color: '#FFFFFF',
  },
});

export const PhoneNumber = styled(Typography)({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '1.5em',
  color: '#05151F',
  transition: 'color 0.2s ease-in-out',
  '.hover-active &': {
    color: '#FFFFFF',
  },
});

export const ServiceName = styled(Typography)({
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '1.5em',
  color: '#37434B',
  transition: 'color 0.2s ease-in-out',
  '.hover-active &': {
    color: '#FFFFFF',
  },
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
  '.hover-active &': {
    color: '#FFFFFF',
  },
});

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
    [!$isNext ? 'left' : 'right']: '8px',
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
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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

export const SignupCardWrapper = styled(Card)({
  width: '219px',
  minWidth: '219px',
  height: '258px',
  borderRadius: '8px',
  backgroundColor: '#FFFFFF',
  padding: '24px 32px',
  transition: 'all 0.2s ease-in-out',
  '&:hover, &.hover-active': {
    backgroundColor: '#272E35',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
});
