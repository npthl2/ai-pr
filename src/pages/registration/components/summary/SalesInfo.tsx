import { Sales } from '@stores/registration/RegistrationSalesStore';
import { InfoSection, InfoRow, InfoLabel, InfoValue, SubSectionTitle } from '../SummaryInfo.styled';

interface SalesInfoProps {
  salesInfo?: Sales;
}

const SalesInfo = ({ salesInfo }: SalesInfoProps) => {
  return (
    <>
      <SubSectionTitle>판매정보</SubSectionTitle>
      <InfoSection>
        <InfoRow>
          <InfoLabel>판매채널정보</InfoLabel>
          <InfoValue>{salesInfo?.salesDepartment}</InfoValue>
        </InfoRow>
      </InfoSection>
    </>
  );
};

export default SalesInfo;
