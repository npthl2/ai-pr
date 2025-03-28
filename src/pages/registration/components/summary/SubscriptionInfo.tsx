import { Contract } from '@stores/registration/RegistrationContractStore';
import { InfoSection, InfoRow, InfoLabel, InfoValue, SubSectionTitle } from '../SummaryInfo.styled';

interface SubscriptionInfoProps {
  contractInfo: Contract;
}

const SubscriptionInfo = ({ contractInfo }: SubscriptionInfoProps) => {
  return (
    <>
      <SubSectionTitle>가입정보</SubSectionTitle>
      <InfoSection>
        <InfoRow>
          <InfoLabel>전화번호</InfoLabel>
          <InfoValue>{contractInfo.phoneNumber || '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>개통요금제</InfoLabel>
          <InfoValue>{contractInfo.service?.serviceName || '-'}</InfoValue>
        </InfoRow>
      </InfoSection>
    </>
  );
};

export default SubscriptionInfo;
