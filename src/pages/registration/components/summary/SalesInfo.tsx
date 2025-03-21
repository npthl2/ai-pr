import { InfoSection, InfoRow, InfoLabel, InfoValue, SubSectionTitle } from '../SummaryInfo.styled';
import { SalesAgentInfo } from '@model/RegistrationInfo';

interface SalesAgentInfoProps {
  salesAgentInfo?: SalesAgentInfo;
}

const SalesInfo = ({ salesAgentInfo = { isValidated: false } }: SalesAgentInfoProps) => {
  return (
    <>
      <SubSectionTitle>판매정보</SubSectionTitle>
      <InfoSection>
        <InfoRow>
          <InfoLabel>판매채널정보</InfoLabel>
          <InfoValue>{salesAgentInfo.salesDepartment}</InfoValue>
        </InfoRow>
      </InfoSection>
    </>
  );
};

export default SalesInfo;
