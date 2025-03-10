import { 
  InfoSection, 
  InfoRow, 
  InfoLabel, 
  InfoValue, 
  SubSectionTitle 
} from '../SummaryInfo.styled';

const SalesInfo = () => {
  return (
    <>
      <SubSectionTitle>판매정보</SubSectionTitle>
      <InfoSection>
        <InfoRow>
          <InfoLabel>판매채널정보</InfoLabel>
          <InfoValue>IT전략2담당(일반)</InfoValue>
        </InfoRow>
      </InfoSection>
    </>
  );
};

export default SalesInfo; 