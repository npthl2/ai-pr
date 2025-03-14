import { DeviceInfo } from '@model/RegistrationInfo';
import {
  InfoSection,
  InfoRow,
  InfoLabel,
  InfoValue,
  SubSectionTitle,
  StyledDivider,
} from '../SummaryInfo.styled';
interface DevicePaymentInfoProps {
  deviceInfo: DeviceInfo;
}

const DevicePaymentInfo = ({ deviceInfo }: DevicePaymentInfoProps) => {
  return (
    <>
      <SubSectionTitle>단말기결제 정보</SubSectionTitle>
      <InfoSection>
        <InfoRow>
          <InfoLabel>스폰서정책</InfoLabel>
          <InfoValue>{deviceInfo.deviceSponsorName || '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>스폰서옵션</InfoLabel>
          <InfoValue>
            {deviceInfo.deviceEngagementName || '-'}(
            {deviceInfo.deviceEngagementPeriod ? `${deviceInfo.deviceEngagementPeriod}개월` : '-'})
          </InfoValue>
        </InfoRow>
        <StyledDivider />

        <InfoRow>
          <InfoLabel>출고가</InfoLabel>
          <InfoValue sx={{ fontWeight: 'bold' }}>
            {deviceInfo.deviceSalesPrice
              ? `${deviceInfo.deviceSalesPrice.toLocaleString()} 원`
              : '-'}
          </InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>공시지원금</InfoLabel>
          <InfoValue>
            {deviceInfo.deviceDiscountPrice && deviceInfo.deviceDiscountPrice > 0
              ? `${deviceInfo.deviceDiscountPrice.toLocaleString()} 원`
              : '-'}
          </InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>선납금</InfoLabel>
          <InfoValue>
            {deviceInfo.devicePrepaidPrice && deviceInfo.devicePrepaidPrice > 0
              ? `${deviceInfo.devicePrepaidPrice.toLocaleString()} 원`
              : '-'}
          </InfoValue>
        </InfoRow>

        <StyledDivider />

        <InfoRow>
          <InfoLabel>할부원금</InfoLabel>
          <InfoValue>
            {deviceInfo.deviceInstallmentAmount
              ? `${deviceInfo.deviceInstallmentAmount.toLocaleString()} 원`
              : '-'}
          </InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>총 할부수수료</InfoLabel>
          <InfoValue>
            {deviceInfo.deviceInstallmentFee
              ? `${deviceInfo.deviceInstallmentFee.toLocaleString()} 원`
              : '-'}
          </InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>총 금액</InfoLabel>
          <InfoValue sx={{ fontWeight: 'bold' }}>
            {deviceInfo.deviceTotalPriceAmout
              ? `${deviceInfo.deviceTotalPriceAmout.toLocaleString()} 원`
              : '-'}
          </InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel sx={{ fontSize: '18px', fontWeight: 'bold' }}>월 할부금</InfoLabel>
          <InfoValue sx={{ fontSize: '18px', fontWeight: 'bold' }}>
            {deviceInfo.monthlyInstallmentPrice && deviceInfo.deviceInstallmentPeriod
              ? `${deviceInfo.monthlyInstallmentPrice.toLocaleString()} 원 / ${deviceInfo.deviceInstallmentPeriod}개월`
              : '-'}
          </InfoValue>
        </InfoRow>
      </InfoSection>
    </>
  );
};

export default DevicePaymentInfo;
