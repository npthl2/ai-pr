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
  FinalPriceDivider,
  PriceLabel,
  PriceValue,
  DiscountValue,
  PrepaidAmountContainer,
  PrepaidAmountLabel,
  PrepaidAmountTextField,
  CurrencyUnit,
  InstallmentPeriodLabel,
  InstallmentPeriodContainer,
  MonthlyPaymentLabel,
  MonthlyPaymentValue,
  ButtonContainer,
} from './DevicePaymentInstallment.styled';

interface DevicePaymentInstallmentProps {
  onClose: () => void;
  onDevicePayment: (
    installmentPeriod: number,
    deviceEngagementName: string,
    engagementPeriod: number,
  ) => void;
  contractTabId: string;
}

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
      // Set installmentPeriod to '24' if it's 0 or invalid
      setInstallmentPeriod(
        existingDeviceInfo.deviceInstallmentPeriod > 0
          ? existingDeviceInfo.deviceInstallmentPeriod.toString()
          : '24',
      );
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
      deviceId: deviceModelId,
      deviceName: deviceModelName,
      deviceNameAlias: deviceModelNameAlias,
      devicePaymentType: 'installment',
      deviceSponsorName: '통합스폰서',
      deviceEngagementType:
        deviceEngagementType === 'PUBLIC_POSTED_SUPPORT' ? 'PUBLIC_POSTED_SUPPORT' : 'SELECTED',
      deviceEngagementPeriod: Number(engagementPeriod),
      deviceEngagementName:
        deviceEngagementType === 'PUBLIC_POSTED_SUPPORT' ? '공시지원금' : '선택약정',
      deviceSalesPrice: deviceSalesPrice,
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
        <Box sx={{ maxWidth: '100%' }} data-testid="device-payment-modal-installment">
          <DeviceInfoContainer>
            <InfoRow>
              <DeviceInfoLabel>단말기</DeviceInfoLabel>
              <DeviceInfoValue data-testid="device-payment-modal-installment-device-name">{deviceModelName}</DeviceInfoValue>
            </InfoRow>
            <InfoRow>
              <DeviceInfoLabel>요금제</DeviceInfoLabel>
              <DeviceInfoValue>{contract?.service?.serviceName || ''} </DeviceInfoValue>
            </InfoRow>
          </DeviceInfoContainer>

          <SectionTitle>단말기 스폰서 정보</SectionTitle>
          <InfoRow sx={{ mb: 0.8 }}>
            <SponsorTypeLabel>스폰서 유형</SponsorTypeLabel>
            <SponsorTypeValue>통합스폰서</SponsorTypeValue>
          </InfoRow>

          <Box sx={{ mb: 0.1, display: 'flex', alignItems: 'center' }}>
            <RequiredFieldLabel sx={{ width: '98px' }}>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEngagementPeriod(e.target.value)
                }
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
            </RadioGroupContainer>
          </Box>

          <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', width: '470px' }}>
            <RequiredFieldLabel sx={{ width: '98px' }}>
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
                />
                <FormControlLabel
                  value='SELECTED'
                  control={<Radio size='small' />}
                  label={
                    <Typography variant='body2' noWrap>
                      선택약정 (요금제의 25% 할인)
                    </Typography>
                  }
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
              <PriceValue data-testid="device-payment-modal-installment-device-sales-price">{deviceSalesPrice.toLocaleString()} 원</PriceValue>
            </InfoRow>
            <InfoRow>
              <PriceLabel>- 공시지원금</PriceLabel>
              <DiscountValue data-testid="device-payment-modal-installment-discount-price">{discountPrice.toLocaleString()} 원</DiscountValue>
            </InfoRow>
            <PrepaidAmountContainer>
              <PrepaidAmountLabel>
                <Box
                  component='span'
                  sx={{ color: '#272E35', display: 'inline-flex', alignItems: 'center' }}
                >
                  - 선납금
                  <RequiredMark>*</RequiredMark>
                </Box>
              </PrepaidAmountLabel>
              <PrepaidAmountTextField
                size='small'
                value={prepaidPrice}
                onChange={handlePrepaidPriceChange}
                data-testid="device-payment-modal-installment-prepaid-price-input"
              />
              <CurrencyUnit> 원</CurrencyUnit>
            </PrepaidAmountContainer>
            <PriceDivider />
            <InfoRow>
              <PriceLabel>할부원금</PriceLabel>
              <PriceValue data-testid="device-payment-modal-installment-installment-total-amount">{installmentTotalAmount.toLocaleString()} 원</PriceValue>
            </InfoRow>
            <InfoRow>
              <PriceLabel>+ 총 할부수수료 (할부원금의 5.9%)</PriceLabel>
              <DiscountValue data-testid="device-payment-modal-installment-installment-fee">{installmentFee.toLocaleString()} 원</DiscountValue>
            </InfoRow>
            <PriceDivider />
            <InfoRow>
              <Typography variant='subtitle2' sx={{ flex: 1 }}>
                총금액
              </Typography>
              <PriceValue data-testid="device-payment-modal-installment-total-price">{totalPrice.toLocaleString()} 원</PriceValue>
            </InfoRow>
            <InfoRow>
              <InstallmentPeriodLabel>
                <Box
                  component='span'
                  sx={{ color: '#272E35', display: 'inline-flex', alignItems: 'center' }}
                >
                  분납개월수
                  <RequiredMark>*</RequiredMark>
                </Box>
              </InstallmentPeriodLabel>
              <InstallmentPeriodContainer>
                <RadioGroup
                  value={installmentPeriod}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInstallmentPeriod(e.target.value)
                  }
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
              </InstallmentPeriodContainer>
            </InfoRow>
            <FinalPriceDivider />
            <InfoRow>
              <MonthlyPaymentLabel>월/최종분납금</MonthlyPaymentLabel>
              <MonthlyPaymentValue data-testid="device-payment-modal-installment-monthly-payment-price">
                {monthlyInstallmentPrice.toLocaleString()} 원
              </MonthlyPaymentValue>
            </InfoRow>
          </PriceInfoContainer>
        </Box>
      </ContentWrapper>
      <ButtonContainer>
        <Button variant='outlined' onClick={onClose} data-testid="device-payment-modal-installment-close-button">
          취소
        </Button>
        <Button variant='contained' onClick={handleConfirm} data-testid="device-payment-modal-installment-confirm-button">
          확인
        </Button>
      </ButtonContainer>
    </>
  );
};

export default DevicePaymentInstallment;
