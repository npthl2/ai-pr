import { Typography, Radio, RadioGroup, FormControlLabel, Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import useRegistrationDeviceStore from '@stores/registration/RegistrationDeviceStore';
import useRegistrationContractStore from '@stores/registration/RegistrationContractStore';
import registrationContractService from '@api/services/registrationContractService';
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
  const [engagementPeriod, setEngagementPeriod] = useState('12');
  const [deviceEngagementType, setDeviceEngagementType] = useState<
    'PUBLIC_POSTED_SUPPORT' | 'SELECTED'
  >('PUBLIC_POSTED_SUPPORT');
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { setRegistrationDeviceInfo, getRegistrationDeviceInfo } = useRegistrationDeviceStore();
  const { getRegistrationContractInfo } = useRegistrationContractStore();

  // Get contract info to access IMEI and fetch device model
  const contract = getRegistrationContractInfo(contractTabId);
  const [deviceModelId, setDeviceModelId] = useState('');
  const [deviceModelName, setDeviceModelName] = useState('');
  const [deviceModelNameAlias, setDeviceModelNameAlias] = useState('');
  const [deviceSalesPrice, setDeviceSalesPrice] = useState(0);

  // Fetch device model when contract IMEI changes
  useEffect(() => {
    const fetchDeviceModel = async () => {
      if (contract?.imei) {
        try {
          const deviceModel = await registrationContractService.getDeviceModelByIMEI(contract.imei);
          setDeviceModelId(deviceModel.deviceModelId);
          setDeviceModelName(deviceModel.deviceModelName);
          setDeviceModelNameAlias(deviceModel.deviceModelNameAlias);
          setDeviceSalesPrice(deviceModel.sellingPrice);
        } catch (error) {
          console.error('Failed to fetch device model:', error);
        }
      }
    };

    fetchDeviceModel();
  }, [contract?.imei]);

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
    const newTotalPrice = deviceSalesPrice - discountPrice;
    setTotalPrice(newTotalPrice);
  }, [discountPrice, deviceSalesPrice]);

  const handleEngagementTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceEngagementType(event.target.value as 'PUBLIC_POSTED_SUPPORT' | 'SELECTED');
  };

  const handleConfirm = () => {
    setRegistrationDeviceInfo(contractTabId, {
      deviceId: deviceModelId,
      deviceName: deviceModelName,
      deviceNameAlias: deviceModelNameAlias,
      devicePaymentType: 'immediate',
      deviceSponsorName: '통합스폰서',
      deviceEngagementType,
      deviceEngagementPeriod: Number(engagementPeriod),
      deviceEngagementName:
        deviceEngagementType === 'PUBLIC_POSTED_SUPPORT' ? '공시지원금' : '선택약정',
      deviceSalesPrice: deviceSalesPrice,
      deviceDiscountPrice: discountPrice,
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
        <Box sx={{ maxWidth: '100%' }} data-testid="device-payment-modal-immediate">
          <DeviceInfoContainer>
            <InfoRow>
              <DeviceInfoLabel>단말기</DeviceInfoLabel>
              <DeviceInfoValue data-testid="device-payment-modal-immediate-device-name">{deviceModelName}</DeviceInfoValue>
            </InfoRow>
            <InfoRow>
              <DeviceInfoLabel>요금제</DeviceInfoLabel>
              <DeviceInfoValue>{contract?.service?.serviceName || ''}</DeviceInfoValue>
            </InfoRow>
          </DeviceInfoContainer>

          <SectionTitle>단말기 스폰서 정보</SectionTitle>
          <InfoRow sx={{ mb: 0.8 }}>
            <SponsorTypeLabel>스폰서 유형</SponsorTypeLabel>
            <SponsorTypeValue>통합스폰서</SponsorTypeValue>
          </InfoRow>

          <Box sx={{ mb: 0.1, display: 'flex', alignItems: 'center' }}>
            <RequiredFieldLabel sx={{ width: '123px' }}>
              <Box
                component='span'
                sx={{ color: '#272E35', display: 'inline-flex', alignItems: 'center' }}
              >
                약정기간
                <RequiredMark>*</RequiredMark>
              </Box>
            </RequiredFieldLabel>
            <RadioGroupContainer>
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
                  data-testid="device-payment-modal-immediate-engagement-period-12"
                />
                <FormControlLabel
                  value='24'
                  control={<Radio size='small' />}
                  label={<Typography variant='body2'>24개월</Typography>}
                  data-testid="device-payment-modal-immediate-engagement-period-24"
                />
              </RadioGroup>
            </RadioGroupContainer>
          </Box>

          <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', width: '470px' }}>
            <RequiredFieldLabel sx={{ width: '123px' }}>
              <Box
                component='span'
                sx={{ color: '#272E35', display: 'inline-flex', alignItems: 'center' }}
              >
                지원금 선택
                <RequiredMark>*</RequiredMark>
              </Box>
            </RequiredFieldLabel>
            <RadioGroupContainer>
              <RadioGroup
                value={deviceEngagementType}
                onChange={handleEngagementTypeChange}
                row
                sx={{
                  '& .MuiFormControlLabel-root': { mr: 2 },
                  display: 'flex',
                  flexWrap: 'nowrap',
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value='PUBLIC_POSTED_SUPPORT'
                  control={<Radio size='small' />}
                  label={
                    <Typography variant='body2' noWrap>
                      공시지원금
                    </Typography>
                  }
                  data-testid="device-payment-modal-immediate-support-type-public-posted-support"
                />
                <FormControlLabel
                  value='SELECTED'
                  control={<Radio size='small' />}
                  label={
                    <Typography variant='body2' noWrap>
                      선택약정 (요금제의 25% 할인)
                    </Typography>
                  }
                  data-testid="device-payment-modal-immediate-support-type-selected"
                />
              </RadioGroup>
            </RadioGroupContainer>
          </Box>

          <SectionTitle sx={{ mt: 0.25, mb: 0.25 }}>단말기 금액 정보</SectionTitle>
          <PriceInfoContainer>
            <InfoRow>
              <PriceLabel>
                <Box component='span' sx={{ color: '#272E35', paddingLeft: '10px', gap: '16px' }}>
                  {' '}
                  단말출고가{' '}
                </Box>
              </PriceLabel>
              <PriceValue  data-testid="device-payment-modal-immediate-device-sales-price">{deviceSalesPrice.toLocaleString()} 원</PriceValue>
            </InfoRow>
            <InfoRow>
              <PriceLabel>- 공시지원금</PriceLabel>
              <DiscountValue data-testid="device-payment-modal-immediate-discount-price">{discountPrice.toLocaleString()} 원</DiscountValue>
            </InfoRow>
            <PriceDivider />
            <InfoRow>
              <TotalPriceLabel variant='subtitle2'>총금액</TotalPriceLabel>
              <TotalPriceValue variant='subtitle2' data-testid="device-payment-modal-immediate-total-price">
                {totalPrice.toLocaleString()} 원
              </TotalPriceValue>
            </InfoRow>
          </PriceInfoContainer>
        </Box>
      </ContentWrapper>
      <ButtonContainer>
        <Button variant='outlined' onClick={onClose} data-testid="device-payment-modal-immediate-close-button">
          취소
        </Button>
        <Button variant='contained' onClick={handleConfirm} data-testid="device-payment-modal-immediate-confirm-button">
          확인
        </Button>
      </ButtonContainer>
    </>
  );
};

export default DevicePaymentImmediate;
