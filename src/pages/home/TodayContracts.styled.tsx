import { Box, IconButton, styled, Typography, Card } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import TextField from '@components/TextField';
import Slider from 'react-slick';
import { Stack } from '@mui/material';

export const TodayContractsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(4),
}));

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  height: '32px',
  width: '200px',
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
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
  cursor: 'pointer',
  '.hover-active &': {
    color: theme.palette.primary.contrastText,
  },
}));

export const Divider = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '1px',
  backgroundColor: theme.palette.grey[100],
}));

export const EmptyContractContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(3),
  height: '258px',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: '1px dashed rgba(112, 121, 142, 0.16)',
  borderRadius: '16px',
  width: '100%',
}));

export const EmptyContractText = styled(Typography)(({}) => ({
  textAlign: 'center',
}));

export const EmptyDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  whiteSpace: 'pre-line',
}));

export const ArrowButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== '$isNext' && prop !== '$show',
})<{ $isNext?: boolean; $show?: boolean }>(({ $isNext = false, $show = true, theme }) => ({
  width: '36px',
  height: '36px',
  minWidth: '36px',
  minHeight: '36px',
  position: 'absolute',
  [!$isNext ? 'left' : 'right']: '-18px',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.primary.contrastText,
  border: '1px solid rgba(5, 21, 31, 0.5)',
  borderRadius: '99px',
  opacity: $show ? 1 : 0,
  visibility: $show ? 'visible' : 'hidden',
  transition: 'opacity 0.2s, visibility 0.2s',
  padding: 0,
  zIndex: 2,
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
  },
  '&.slick-disabled': {
    display: 'none',
    cursor: 'default',
  },
  '&:before': {
    display: 'none',
  },
}));

export const ContractsStack = styled(Stack)(({}) => ({
  height: '258px',
  flexDirection: 'row',
}));

export const arrowIconStyle: SxProps<Theme> = {
  width: '16px',
  height: '16px',
  color: (theme) => theme.palette.primary.main,
};
