import { SalesInfo as BaseSalesInfo } from '@model/RegistrationInfo';
import { 
  InfoSection, 
  InfoRow, 
  InfoLabel, 
  InfoValue, 
  SubSectionTitle 
} from '../SummaryInfo.styled';

interface SalesInfo extends Partial<BaseSalesInfo> {
  [key: string]: any;
}

interface SubscriptionInfoProps {
  salesInfo: SalesInfo;
}

const SubscriptionInfo = ({ salesInfo }: SubscriptionInfoProps) => {
  return (
    <>
      <SubSectionTitle>가입정보</SubSectionTitle>
      <InfoSection>
        <InfoRow>
          <InfoLabel>전화번호</InfoLabel>
          <InfoValue>{salesInfo.phoneNumber || '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>개통요금제</InfoLabel>
          <InfoValue>{salesInfo.planName || '-'}</InfoValue>
        </InfoRow>
      </InfoSection>
    </>
  );
};

export default SubscriptionInfo; 