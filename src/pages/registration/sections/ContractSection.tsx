import { Typography, Button } from '@mui/material';
import { FormContainer, FormWrapper } from './common/SectionCommon.styled';
import ContractSectionComponent from './contract/ContractSectionComponent';
import { useEffect } from 'react';

interface ContractSectionProps {
  contractTabId: string;
  onComplete: () => void;
  completed?: boolean;
}

const ContractSection = ({ contractTabId, onComplete, completed }: ContractSectionProps) => {
  useEffect(() => {
    console.log(`ContractSection mounted with tabId: ${contractTabId}`);

    return () => {
      console.log(`ContractSection unmounted with tabId: ${contractTabId}`);
    };
  }, [contractTabId]);

  return (
    // completed 가 true 이면 outline 활성화, fales 일 경우 비활성화
    <FormContainer completed={completed}>
      <FormWrapper>
        <ContractSectionComponent contractTabId={contractTabId} onComplete={onComplete} />
      </FormWrapper>
    </FormContainer>
  );
};

export default ContractSection;
