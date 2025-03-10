import { DeviceInfo as BaseDeviceInfo } from '@model/RegistrationInfo';
import { 
  InfoSection, 
  InfoRow, 
  InfoLabel, 
  InfoValue, 
  SubSectionTitle,
  StyledDivider
} from '../SummaryInfo.styled';

interface DeviceInfo extends Partial<BaseDeviceInfo> {
  [key: string]: any;
}

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
          <InfoValue>{deviceInfo.sponsorName || '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>스폰서 옵션</InfoLabel>
          <InfoValue>{deviceInfo.sponsorOption || '-'}</InfoValue>
        </InfoRow>
        
        <StyledDivider />
        
        <InfoRow>
          <InfoLabel>총고가</InfoLabel>
          <InfoValue>{deviceInfo.totalPrice ? `${deviceInfo.totalPrice.toLocaleString()} 원` : '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>공시지원금</InfoLabel>
          <InfoValue>{deviceInfo.subsidy && deviceInfo.subsidy > 0 ? `${deviceInfo.subsidy.toLocaleString()} 원` : '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>선납금</InfoLabel>
          <InfoValue>{deviceInfo.prepayment && deviceInfo.prepayment > 0 ? `${deviceInfo.prepayment.toLocaleString()} 원` : '-'}</InfoValue>
        </InfoRow>
        
        <StyledDivider />
        
        <InfoRow>
          <InfoLabel>할부원금</InfoLabel>
          <InfoValue>{deviceInfo.installmentPrincipal ? `${deviceInfo.installmentPrincipal.toLocaleString()} 원` : '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>총 할부수수료</InfoLabel>
          <InfoValue>{deviceInfo.installmentFee ? `${deviceInfo.installmentFee.toLocaleString()} 원` : '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>총 금액</InfoLabel>
          <InfoValue>{deviceInfo.totalAmount ? `${deviceInfo.totalAmount.toLocaleString()} 원` : '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>월 할부금</InfoLabel>
          <InfoValue>
            {deviceInfo.monthlyInstallment && deviceInfo.installmentPeriod 
              ? `${deviceInfo.monthlyInstallment.toLocaleString()} 원 / ${deviceInfo.installmentPeriod}개월` 
              : '-'}
          </InfoValue>
        </InfoRow>
      </InfoSection>
    </>
  );
};

export default DevicePaymentInfo; 