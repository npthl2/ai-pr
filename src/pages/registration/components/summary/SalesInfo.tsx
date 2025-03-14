import { InfoSection, InfoRow, InfoLabel, InfoValue, SubSectionTitle } from '../SummaryInfo.styled';
import { SalesInfo as BaseSalesInfo } from '@model/RegistrationInfo';

interface SalesInfo extends Partial<BaseSalesInfo> {
  [key: string]: any;
}

interface SalesInfoProps {
  salesInfo?: SalesInfo;
}

const SalesInfo = ({ salesInfo = {} }: SalesInfoProps) => {
  return (
    <>
      <SubSectionTitle>판매정보</SubSectionTitle>
      <InfoSection>
        <InfoRow>
          <InfoLabel>판매채널정보</InfoLabel>
          <InfoValue>{salesInfo.salesDepartment}</InfoValue>
        </InfoRow>
      </InfoSection>
    </>
  );
};

export default SalesInfo;
