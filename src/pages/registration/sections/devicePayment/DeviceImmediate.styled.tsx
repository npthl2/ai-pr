import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const InfoRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '2px',
  '& > :first-of-type': {
    marginRight: '16px',
  },
});

export const SectionTitle = styled(Typography)({
  width: '133px',
  height: '27px',
  marginBottom: '12px',
  marginTop: '12px',
  fontFamily: 'Pretendard',
  fontWeight: '700',
  fontSize: '18px',
  lineHeight: '27px',
  letterSpacing: 0,
  color: '#272E35',
});

export const ContentWrapper = styled(Box)({
  width: '422px',
  padding: '8px',
  overflow: 'hidden',
});

export const DeviceInfoContainer = styled(Box)({
  maxWidth: '100%',
  height: '66px',
  gap: '2px',
  paddingTop: '8px',
  paddingRight: '16px',
  paddingBottom: '8px',
  paddingLeft: '16px',
  borderRadius: '4px',
  background:
    'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(0deg, #2196F3, #2196F3)',
  display: 'flex',
  flexDirection: 'column',
});

export const DeviceInfoLabel = styled(Typography)({
  color: '#6E7782',
  fontFamily: 'Pretendard',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '21px',
  letterSpacing: '0px',
  width: '37px',
  height: '21px',
});

export const DeviceInfoValue = styled(Typography)({
  width: '128px',
  height: '21px',
  fontFamily: 'Pretendard',
  fontWeight: '700',
  fontSize: '14px',
  lineHeight: '21px',
  letterSpacing: '0px',
  color: '#272E35',
  textAlign: 'left',
});

export const SponsorTypeLabel = styled(Typography)({
  width: '120px',
  height: '21px',
  fontFamily: 'Pretendard',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '21px',
  letterSpacing: '0px',
  color: '#272E35',
});

export const SponsorTypeValue = styled(Typography)({
  width: '61px',
  height: '21px',
  fontFamily: 'Pretendard',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '21px',
  letterSpacing: '0px',
  color: '#272E35',
});

export const RequiredFieldLabel = styled(Typography)({
  width: '120px',
  height: '21px',
  fontFamily: 'Pretendard',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '21px',
  letterSpacing: '0px',
  marginRight: '12px',
});

export const RequiredMark = styled(Box)({
  color: '#FE2E36',
});

export const RadioGroupContainer = styled(Box)({
  '& .MuiFormControlLabel-root': {
    marginRight: '8px',
  },
});

export const PriceInfoContainer = styled(Box)({
  width: '422px',
  height: '152px',
  gap: '12px',
  padding: '16px',
  bgcolor: '#F7F9FA',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
});

export const PriceDivider = styled(Box)({
  width: '390px',
  height: '1px',
  borderWidth: '1px',
  border: '1px solid #05151F',
});

export const PriceLabel = styled(Typography)({
  flex: 1,
});

export const PriceValue = styled(Typography)({
  width: '164px',
  height: '21px',
  fontFamily: 'Pretendard',
  fontWeight: '700',
  fontSize: '14px',
  lineHeight: '21px',
  letterSpacing: '0px',
  textAlign: 'right',
  color: '#272E35',
});

export const DiscountValue = styled(Typography)({
  minWidth: '80px',
  textAlign: 'right',
});

export const TotalPriceLabel = styled(Typography)({
  width: '190px',
  height: '21px',
  fontFamily: 'Pretendard',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '21px',
  letterSpacing: '0px',
});

export const TotalPriceValue = styled(Typography)({
  width: '184px',
  height: '42px',
  fontFamily: 'Pretendard',
  fontWeight: '400',
  fontSize: '28px',
  lineHeight: '150%',
  letterSpacing: '0px',
  textAlign: 'right',
  color: '#272E35',
});

export const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  padding: '16px',
});
