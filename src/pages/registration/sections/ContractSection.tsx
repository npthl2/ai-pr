import { FormContainer } from './common/SectionCommon.styled';
import ContractSectionComponent from './contract/ContractSectionComponent';

interface ContractSectionProps {
  contractTabId: string;
  onComplete: () => void;
  completed?: boolean;
}

const ContractSection = ({ contractTabId, onComplete, completed }: ContractSectionProps) => {
  return (
    // completed 가 true 이면 outline 활성화, fales 일 경우 비활성화
    <FormContainer completed={completed} data-testid='contract-section'>
      <ContractSectionComponent contractTabId={contractTabId} onComplete={onComplete} />
    </FormContainer>
  );
};

export default ContractSection;
