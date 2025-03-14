import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Box,
  styled,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import useRegistrationDeviceStore from '@stores/registration/RegistrationDeviceStore';

interface DevicePaymentInstallmentProps {
  onClose: () => void;
  onDevicePayment: (
    installmentPeriod: number,
    deviceEngagementName: string,
    engagementPeriod: number,
  ) => void;
  contractTabId: string;
}

const InfoRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '2px',
  '& > :first-of-type': {
    marginRight: '16px',
  },
});

const SectionTitle = styled(Typography)({
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

const ContentWrapper = styled(Box)({
  width: '470px',
  padding: '8px',
  overflow: 'hidden',
});

const DevicePaymentInstallment = ({
  onClose,
  onDevicePayment,
  contractTabId,
}: DevicePaymentInstallmentProps) => {
  const SALES_PRICE = 1155000;
  const INSTALLMENT_FEE_RATE = 0.059; // 5.9%

  const [engagementPeriod, setEngagementPeriod] = useState('12');
  const [deviceEngagementType, setDeviceEngagementType] = useState('PUBLIC_POSTED_SUPPORT');
  const [installmentPeriod, setInstallmentPeriod] = useState('24');
  const [prepaidPrice, setPrepaidPrice] = useState('0');
  const [discountPrice, setDiscountPrice] = useState(0);
  const [installmentTotalAmount, setInstallmentTotalAmount] = useState(0);
  const [installmentFee, setInstallmentFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [monthlyInstallmentPrice, setMonthlyInstallmentPrice] = useState(0);

  const { setRegistrationDeviceInfo, getRegistrationDeviceInfo } = useRegistrationDeviceStore();

  // Load existing device info when component mounts
  useEffect(() => {
    const existingDeviceInfo = getRegistrationDeviceInfo(contractTabId);
    if (existingDeviceInfo && existingDeviceInfo.deviceId) {
      setEngagementPeriod(existingDeviceInfo.deviceEngagementPeriod.toString());
      setDeviceEngagementType(existingDeviceInfo.deviceEngagementType);
      setInstallmentPeriod(existingDeviceInfo.deviceInstallmentPeriod.toString());
      setPrepaidPrice(existingDeviceInfo.devicePrepaidPrice.toString());
      setDiscountPrice(existingDeviceInfo.deviceDiscountPrice);
      setInstallmentTotalAmount(existingDeviceInfo.deviceInstallmentAmount);
      setInstallmentFee(existingDeviceInfo.deviceInstallmentFee);
      setTotalPrice(existingDeviceInfo.deviceTotalPrice);
      setMonthlyInstallmentPrice(existingDeviceInfo.monthlyInstallmentPrice);
    }
  }, [contractTabId, getRegistrationDeviceInfo]);

  // Calculate discount price based on engagement type and period
  useEffect(() => {
    if (deviceEngagementType === 'PUBLIC_POSTED_SUPPORT') {
      setDiscountPrice(engagementPeriod === '12' ? 300000 : 700000);
    } else {
      setDiscountPrice(0);
    }
  }, [deviceEngagementType, engagementPeriod]);

  // Calculate all dependent values when relevant inputs change
  useEffect(() => {
    const prepaidPriceNum = parseInt(prepaidPrice) || 0;
    const installmentPeriodNum = parseInt(installmentPeriod) || 1;

    const safeInstallmentTotalAmount = Math.max(0, SALES_PRICE - discountPrice - prepaidPriceNum);

    // Calculate installment fee only if there's an amount to calculate on
    const newInstallmentFee =
      safeInstallmentTotalAmount <= 0
        ? 0
        : Math.floor(safeInstallmentTotalAmount * INSTALLMENT_FEE_RATE);

    const newTotalPrice = safeInstallmentTotalAmount + newInstallmentFee;

    // Ensure we don't divide by zero and the result is not negative
    const newMonthlyInstallmentPrice =
      installmentPeriodNum <= 0 || newTotalPrice <= 0
        ? 0
        : Math.floor(newTotalPrice / installmentPeriodNum);

    setInstallmentTotalAmount(safeInstallmentTotalAmount);
    setInstallmentFee(newInstallmentFee);
    setTotalPrice(newTotalPrice);
    setMonthlyInstallmentPrice(newMonthlyInstallmentPrice);
  }, [discountPrice, prepaidPrice, installmentPeriod]);

  const handlePrepaidPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    setPrepaidPrice(value);
  };

  const handleEngagementTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceEngagementType(event.target.value);
  };

  const handleConfirm = () => {
    setRegistrationDeviceInfo(contractTabId, {
      deviceId: 'SM-F711NK',
      deviceName: 'SM-F711NK',
      deviceNameAlias: 'SM-F711NK',
      devicePaymentType: 'installment',
      deviceSponsorName: '통합스폰서',
      deviceEngagementType:
        deviceEngagementType === 'PUBLIC_POSTED_SUPPORT' ? 'PUBLIC_POSTED_SUPPORT' : 'SELECTED',
      deviceEngagementPeriod: Number(engagementPeriod),
      deviceEngagementName:
        deviceEngagementType === 'PUBLIC_POSTED_SUPPORT' ? '공시지원금' : '선택약정',
      deviceSalesPrice: SALES_PRICE,
      deviceDiscountPrice: discountPrice,
      devicePrepaidPrice: parseInt(prepaidPrice) || 0,
      deviceInstallmentAmount: installmentTotalAmount,
      deviceInstallmentFee: installmentFee,
      deviceTotalPrice: totalPrice,
      deviceInstallmentPeriod: parseInt(installmentPeriod),
      monthlyInstallmentPrice: monthlyInstallmentPrice,
      isValidated: true,
    });
    onDevicePayment(
      Number(installmentPeriod),
      deviceEngagementType === 'PUBLIC_POSTED_SUPPORT' ? '공시지원금' : '선택약정',
      Number(engagementPeriod),
    );
    onClose();
  };

  return (
    <>
      <ContentWrapper>
        <Box sx={{ maxWidth: '100%' }}>
          <Box
            sx={{
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
            }}
          >
            <InfoRow>
              <Typography
                variant='body2'
                sx={{
                  color: '#6E7782',
                  fontFamily: 'Pretendard',
                  fontWeight: '600',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                  width: '37px',
                  height: '21px',
                }}
              >
                단말기
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  width: '128px',
                  height: '21px',
                  fontFamily: 'Pretendard',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                  color: '#272E35',
                  textAlign: 'left',
                }}
              >
                SM-F711NK
              </Typography>
            </InfoRow>
            <InfoRow>
              <Typography
                variant='body2'
                sx={{
                  color: '#6E7782',
                  fontFamily: 'Pretendard',
                  fontWeight: '600',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                  width: '37px',
                  height: '21px',
                }}
              >
                요금제
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  width: '128px',
                  height: '21px',
                  fontFamily: 'Pretendard',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                  color: '#272E35',
                  textAlign: 'left',
                }}
              >
                넷플릭스 초이스 스페셜
              </Typography>
            </InfoRow>
          </Box>

          <SectionTitle sx={{ gap: '1px' }}>단말기 스폰서 정보</SectionTitle>
          <InfoRow sx={{ mb: 0.1 }}>
            <Typography
              variant='body2'
              sx={{
                width: '120px',
                height: '21px',
                fontFamily: 'Pretendard',
                fontWeight: '600',
                fontSize: '14px',
                lineHeight: '21px',
                letterSpacing: '0px',
                color: '#272E35',
              }}
            >
              스폰서 유형
            </Typography>
            <Typography
              variant='body2'
              sx={{
                width: '61px',
                height: '21px',
                fontFamily: 'Pretendard',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '21px',
                letterSpacing: '0px',
                color: '#272E35',
              }}
            >
              통합스폰서
            </Typography>
          </InfoRow>

          <Box sx={{ mb: 0.1, display: 'flex', alignItems: 'center' }}>
            <Typography
              variant='body2'
              sx={{
                width: '120px',
                height: '21px',
                fontFamily: 'Pretendard',
                fontWeight: '600',
                fontSize: '14px',
                lineHeight: '21px',
                letterSpacing: '0px',
                mr: 1.5,
              }}
            >
              <Box component='span' sx={{ color: '#272E35' }}>
                약정기간
              </Box>
              <Box component='span' sx={{ color: '#FE2E36' }}>
                *
              </Box>
            </Typography>
            <RadioGroup
              value={engagementPeriod}
              onChange={(e) => setEngagementPeriod(e.target.value)}
              row
              sx={{ '& .MuiFormControlLabel-root': { mr: 2 } }}
            >
              <FormControlLabel
                value='12'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>12개월</Typography>}
              />
              <FormControlLabel
                value='24'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>24개월</Typography>}
              />
            </RadioGroup>
          </Box>

          <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <Typography
              variant='body2'
              sx={{
                width: '120px',
                fontFamily: 'Pretendard',
                fontWeight: '600',
                fontSize: '14px',
                lineHeight: '21px',
                letterSpacing: '0px',
                mr: 1.5,
              }}
            >
              <Box component='span' sx={{ color: '#272E35' }}>
                지원금 선택
              </Box>
              <Box component='span' sx={{ color: '#FE2E36' }}>
                *
              </Box>
            </Typography>
            <RadioGroup
              value={deviceEngagementType}
              onChange={handleEngagementTypeChange}
              row
              sx={{ '& .MuiFormControlLabel-root': { mr: 1 } }}
            >
              <FormControlLabel
                value='PUBLIC_POSTED_SUPPORT'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>공시지원금</Typography>}
              />
              <FormControlLabel
                value='SELECTED'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>선택약정 (요금제의 25% 할인)</Typography>}
              />
            </RadioGroup>
          </Box>

          <SectionTitle sx={{ mt: 0.25, mb: 0.25 }}>단말기 금액 정보</SectionTitle>
          <Box
            sx={{
              width: '422px',
              height: '350px',
              gap: '12px',
              padding: '16px',
              bgcolor: '#F7F9FA',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <InfoRow sx={{ width: '390px', height: '21px' }}>
              <Typography variant='body2' sx={{ flex: 1 }}>
                <Box component='span' sx={{ color: '#272E35', paddingLeft: '10px', gap: '16px' }}>
                  {' '}
                  단말출고가{' '}
                </Box>
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  width: '164px',
                  height: '21px',
                  fontFamily: 'Pretendard',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                  textAlign: 'right',
                  color: '#272E35',
                }}
              >
                1,155,000 원
              </Typography>
            </InfoRow>
            <InfoRow>
              <Typography variant='body2' sx={{ flex: 1 }}>
                - 공시지원금
              </Typography>
              <Typography variant='body2' sx={{ minWidth: '80px', textAlign: 'right' }}>
                {discountPrice.toLocaleString()} 원
              </Typography>
            </InfoRow>
            <InfoRow sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant='body2' sx={{ minWidth: '170px' }}>
                <Box component='span' sx={{ color: '#272E35' }}>
                  - 선납금
                </Box>
                <Box component='span' sx={{ color: '#FE2E36' }}>
                  *
                </Box>
              </Typography>
              <TextField
                size='small'
                value={prepaidPrice}
                onChange={handlePrepaidPriceChange}
                sx={{
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
                }}
              />
              <Typography variant='body2' sx={{ minWidth: '12px', textAlign: 'right' }}>
                {' '}
                원
              </Typography>
            </InfoRow>
            <Box
              sx={{
                width: '390px',
                height: '1px',
                borderWidth: '1px',
                border: '1px solid rgba(112, 121, 142, 0.16)',
              }}
            />
            <InfoRow>
              <Typography variant='body2' sx={{ flex: 1 }}>
                할부원금
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  width: '164px',
                  height: '21px',
                  fontFamily: 'Pretendard',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                  textAlign: 'right',
                  color: '#272E35',
                }}
              >
                {installmentTotalAmount.toLocaleString()} 원
              </Typography>
            </InfoRow>
            <InfoRow>
              <Typography variant='body2' sx={{ flex: 1 }}>
                + 총 할부수수료 (할부원금의 5.9%)
              </Typography>
              <Typography variant='body2' sx={{ minWidth: '80px', textAlign: 'right' }}>
                {installmentFee.toLocaleString()} 원
              </Typography>
            </InfoRow>
            <Box
              sx={{
                width: '390px',
                height: '1px',
                borderWidth: '1px',
                border: '1px solid rgba(112, 121, 142, 0.16)',
              }}
            />
            <InfoRow>
              <Typography variant='subtitle2' sx={{ flex: 1 }}>
                총금액
              </Typography>
              <Typography
                variant='subtitle2'
                sx={{
                  width: '164px',
                  height: '21px',
                  fontFamily: 'Pretendard',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                  textAlign: 'right',
                  color: '#272E35',
                }}
              >
                {totalPrice.toLocaleString()} 원
              </Typography>
            </InfoRow>
            <InfoRow>
              <Typography variant='body2' sx={{ minWidth: '190px', height: '20px', gap: '16px' }}>
                <Box component='span' sx={{ color: '#272E35' }}>
                  분납개월수
                </Box>
                <Box component='span' sx={{ color: '#FE2E36' }}>
                  *
                </Box>
              </Typography>
              <Box sx={{ width: '168px', height: '21px' }}>
                <RadioGroup
                  value={installmentPeriod}
                  onChange={(e) => setInstallmentPeriod(e.target.value)}
                  row
                  sx={{ gap: '8px' }}
                >
                  <FormControlLabel
                    value='12'
                    control={<Radio size='small' />}
                    label={<Typography variant='body2'>12개월</Typography>}
                  />
                  <FormControlLabel
                    value='24'
                    control={<Radio size='small' />}
                    label={<Typography variant='body2'>24개월</Typography>}
                  />
                </RadioGroup>
              </Box>
            </InfoRow>
            <Box
              sx={{
                width: '390px',
                height: '1px',
                borderWidth: '1px',
                border: '1px solid #05151F',
              }}
            />
            <InfoRow>
              <Typography
                variant='subtitle2'
                sx={{
                  width: '190px',
                  height: '21px',
                  fontFamily: 'Pretendard',
                  fontWeight: '600',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                }}
              >
                월/최종분납금
              </Typography>
              <Typography
                variant='subtitle2'
                sx={{
                  width: '184px',
                  height: '42px',
                  fontFamily: 'Pretendard',
                  fontWeight: '400',
                  fontSize: '28px',
                  lineHeight: '150%',
                  letterSpacing: '0px',
                  textAlign: 'right',
                  color: '#272E35',
                }}
              >
                {monthlyInstallmentPrice.toLocaleString()} 원
              </Typography>
            </InfoRow>
          </Box>
        </Box>
      </ContentWrapper>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, p: 2 }}>
        <Button variant='outlined' onClick={onClose}>
          취소
        </Button>
        <Button variant='contained' onClick={handleConfirm}>
          확인
        </Button>
      </Box>
    </>
  );
};

export default DevicePaymentInstallment;
