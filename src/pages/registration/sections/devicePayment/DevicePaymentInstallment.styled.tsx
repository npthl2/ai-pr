import { styled } from '@mui/material/styles';
import { Box, Typography, TextField } from '@mui/material';

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
  width: '400px',
  padding: '0px',
  overflow: 'hidden',
});

export const DeviceInfoContainer = styled(Box)({
  maxWidth: '410px',
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
  width: '95px',
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
    marginRight: '16px',
  },
});

export const PriceInfoContainer = styled(Box)({
  width: '400px',
  height: '350px',
  gap: '12px',
  padding: '16px',
  bgcolor: '#F7F9FA',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
});

export const PriceDivider = styled(Box)({
  width: '400px',
  height: '1px',
  borderWidth: '1px',
  border: '1px solid rgba(112, 121, 142, 0.16)',
});

export const FinalPriceDivider = styled(Box)({
  width: '400px',
  height: '1px',
  borderWidth: '1px',
  border: '1px solid #05151F',
});

export const PriceLabel = styled(Typography)({
  flex: 1,
});

export const PriceValue = styled(Typography)({
  width: '168px',
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

export const PrepaidAmountContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

export const PrepaidAmountLabel = styled(Typography)({
  minWidth: '170px',
});

export const PrepaidAmountTextField = styled(TextField)({
  minWidth: '168px',
  height: '28px',
  backgroundColor: '#FFFFFF',
  '& .MuiOutlinedInput-root': {
    height: '28px',
    paddingRight: '12px',
    paddingLeft: '12px',
    borderRadius: '4px',
    '& input': {
      textAlign: 'right',
      padding: '4px 0',
    },
    '& fieldset': {
      borderWidth: '1px',
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2196F3',
    },
  },
});

export const CurrencyUnit = styled(Typography)({
  minWidth: '12px',
  textAlign: 'right',
});

export const InstallmentPeriodLabel = styled(Typography)({
  minWidth: '190px',
  height: '20px',
  gap: '16px',
});

export const InstallmentPeriodContainer = styled(Box)({
  minWidth: '168px',
  height: '21px',
  display: 'flex',
  justifyContent: 'flex-end',
  '& .MuiFormControlLabel-root': {
    marginRight: '8px',
  },
});

export const MonthlyPaymentLabel = styled(Typography)({
  width: '190px',
  height: '21px',
  fontFamily: 'Pretendard',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '21px',
  letterSpacing: '0px',
});

export const MonthlyPaymentValue = styled(Typography)({
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
