import { 
  InfoSection, 
  InfoRow, 
  InfoLabel, 
  InfoValue, 
  SubSectionTitle 
} from '../SummaryInfo.styled';

interface SalesInfo {
  salesChannel?: string;
  salesPerson?: string;
  salesCode?: string;
  salesDate?: string;
  promotionCode?: string;
  referralCode?: string;
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
          <InfoValue>{salesInfo.salesChannel || 'IT전략2담당(일반)'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>판매자</InfoLabel>
          <InfoValue>{salesInfo.salesPerson || '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>판매코드</InfoLabel>
          <InfoValue>{salesInfo.salesCode || '-'}</InfoValue>
        </InfoRow>
      </InfoSection>
    </>
  );
};

export default SalesInfo; 