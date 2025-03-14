import { Typography, Radio, RadioGroup, FormControlLabel, Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import useRegistrationDeviceStore from '@stores/registration/RegistrationDeviceStore';
import {
  InfoRow,
  SectionTitle,
  ContentWrapper,
  DeviceInfoContainer,
  DeviceInfoLabel,
  DeviceInfoValue,
  SponsorTypeLabel,
  SponsorTypeValue,
  RequiredFieldLabel,
  RequiredMark,
  RadioGroupContainer,
  PriceInfoContainer,
  PriceDivider,
  PriceLabel,
  PriceValue,
  DiscountValue,
  TotalPriceLabel,
  TotalPriceValue,
  ButtonContainer,
} from './DeviceImmediate.styled';

interface DevicePaymentImmediateProps {
  onClose: () => void;
  onDevicePayment: (
    installmentPeriod: number,
    deviceEngagementName: string,
    engagementPeriod: number,
  ) => void;
  contractTabId: string;
}

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
          <DeviceInfoContainer>
            <InfoRow>
              <DeviceInfoLabel variant='body2'>단말기</DeviceInfoLabel>
              <DeviceInfoValue variant='body2'>SM-F711NK</DeviceInfoValue>
            </InfoRow>
            <InfoRow>
              <DeviceInfoLabel variant='body2'>요금제</DeviceInfoLabel>
              <DeviceInfoValue variant='body2'>넷플릭스 초이스 스페셜</DeviceInfoValue>
            </InfoRow>
          </DeviceInfoContainer>

          <SectionTitle sx={{ gap: '1px' }}>단말기 스폰서 정보</SectionTitle>
          <InfoRow sx={{ mb: 0.1 }}>
            <SponsorTypeLabel variant='body2' sx={{ width: '120px' }}>
              스폰서 유형
            </SponsorTypeLabel>
            <SponsorTypeValue variant='body2'>통합스폰서</SponsorTypeValue>
          </InfoRow>

          <Box sx={{ mb: 0.1, display: 'flex', alignItems: 'center' }}>
            <RequiredFieldLabel variant='body2'>
              <Box component='span' sx={{ color: '#272E35' }}>
                약정기간
              </Box>
              <RequiredMark sx={{ display: 'inline' }}>*</RequiredMark>
            </RequiredFieldLabel>
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
            <RequiredFieldLabel variant='body2'>
              <Box component='span' sx={{ color: '#272E35', display: 'inline' }}>
                지원금 선택
              </Box>
              <RequiredMark sx={{ display: 'inline' }}>*</RequiredMark>
            </RequiredFieldLabel>
            <RadioGroupContainer>
              <RadioGroup
                value={deviceEngagementType}
                onChange={handleEngagementTypeChange}
                row
                sx={{ display: 'flex', flexWrap: 'nowrap', width: '120px' }}
              >
                <FormControlLabel
                  value='PUBLIC_POSTED_SUPPORT'
                  control={<Radio size='small' />}
                  label={
                    <Typography variant='body2' noWrap>
                      공시지원금
                    </Typography>
                  }
                  sx={{ minWidth: 'auto', marginRight: '8px' }}
                />
                <FormControlLabel
                  value='SELECTED'
                  control={<Radio size='small' />}
                  label={
                    <Typography variant='body2' noWrap>
                      선택약정 (요금제의 25% 할인)
                    </Typography>
                  }
                  sx={{ minWidth: 'auto' }}
                />
              </RadioGroup>
            </RadioGroupContainer>
          </Box>

          <SectionTitle sx={{ mt: 0.25, mb: 0.25 }}>단말기 금액 정보</SectionTitle>
          <PriceInfoContainer>
            <InfoRow sx={{ width: '390px', height: '21px' }}>
              <PriceLabel variant='body2'>
                <Box component='span' sx={{ color: '#272E35', paddingLeft: '10px', gap: '16px' }}>
                  {' '}
                  단말출고가{' '}
                </Box>
              </PriceLabel>
              <PriceValue variant='body2'>1,155,000 원</PriceValue>
            </InfoRow>
            <InfoRow>
              <PriceLabel variant='body2'>- 공시지원금</PriceLabel>
              <DiscountValue variant='body2'>{discountPrice.toLocaleString()} 원</DiscountValue>
            </InfoRow>
            <PriceDivider />
            <InfoRow>
              <TotalPriceLabel variant='subtitle2'>총금액</TotalPriceLabel>
              <TotalPriceValue variant='subtitle2'>
                {totalPrice.toLocaleString()} 원
              </TotalPriceValue>
            </InfoRow>
          </PriceInfoContainer>
        </Box>
      </ContentWrapper>
      <ButtonContainer>
        <Button variant='outlined' onClick={onClose}>
          취소
        </Button>
        <Button variant='contained' onClick={handleConfirm}>
          확인
        </Button>
      </ButtonContainer>
    </>
  );
};

export default DevicePaymentImmediate;
