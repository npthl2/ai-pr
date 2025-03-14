import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  styled,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import useRegistrationDeviceStore from '@stores/registration/RegistrationDeviceStore';

interface DevicePaymentImmediateProps {
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

const DevicePaymentImmediate = ({
  onClose,
  onDevicePayment,
  contractTabId,
}: DevicePaymentImmediateProps) => {
  const SALES_PRICE = 1155000;

  const [engagementPeriod, setEngagementPeriod] = useState('12');
  const [deviceEngagementType, setDeviceEngagementType] = useState<
    'PUBLIC_POSTED_SUPPORT' | 'SELECTED'
  >('PUBLIC_POSTED_SUPPORT');
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { setRegistrationDeviceInfo, getRegistrationDeviceInfo } = useRegistrationDeviceStore();

  // Load existing device info when component mounts
  useEffect(() => {
    const existingDeviceInfo = getRegistrationDeviceInfo(contractTabId);
    if (existingDeviceInfo && existingDeviceInfo.deviceId) {
      setEngagementPeriod(existingDeviceInfo.deviceEngagementPeriod.toString());
      setDeviceEngagementType(existingDeviceInfo.deviceEngagementType);
      setDiscountPrice(existingDeviceInfo.deviceDiscountPrice);
      setTotalPrice(existingDeviceInfo.deviceTotalPrice);
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

  // Calculate total price when discount changes
  useEffect(() => {
    const newTotalPrice = SALES_PRICE - discountPrice;
    setTotalPrice(newTotalPrice);
  }, [discountPrice]);

  const handleEngagementTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceEngagementType(event.target.value as 'PUBLIC_POSTED_SUPPORT' | 'SELECTED');
  };

  const handleConfirm = () => {
    setRegistrationDeviceInfo(contractTabId, {
      deviceId: 'SM-F711NK',
      deviceName: 'SM-F711NK',
      deviceNameAlias: 'SM-F711NK',
      devicePaymentType: 'immediate',
      deviceSponsorName: '통합스폰서',
      deviceEngagementType,
      deviceEngagementPeriod: Number(engagementPeriod),
      deviceEngagementName:
        deviceEngagementType === 'PUBLIC_POSTED_SUPPORT' ? '공시지원금' : '선택약정',
      deviceSalesPrice: SALES_PRICE,
      deviceDiscountPrice: Number(engagementPeriod) === 12 ? 300000 : 700000,
      devicePrepaidPrice: 0,
      deviceInstallmentAmount: 0,
      deviceInstallmentFee: 0,
      deviceTotalPrice: totalPrice,
      deviceInstallmentPeriod: 0,
      monthlyInstallmentPrice: 0,
      isValidated: true,
    });
    onDevicePayment(
      0,
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
              height: '152px',
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
                총금액
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
                {totalPrice.toLocaleString()} 원
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

export default DevicePaymentImmediate;
