import { FormContainer } from './common/SectionCommon.styled';
import SalesSectionComponent from './sales/SalesSectionComponent';

interface SalesSectionProps {
  contractTabId: string;
  onComplete: () => void;
  completed?: boolean;
}

const SalesSection = ({ contractTabId, onComplete, completed }: SalesSectionProps) => {
  return (
    // completed 가 true 이면 outline 활성화, fales 일 경우 비활성화
    <FormContainer completed={completed}  data-testid='sales-section'>
      <SalesSectionComponent tabId={contractTabId} onComplete={onComplete} />
    </FormContainer>
  );
};

export default SalesSection;
