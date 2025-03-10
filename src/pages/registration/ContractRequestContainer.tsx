import { Suspense } from 'react';
import ContractRequest from './ContractRequest';

interface ContractRequestContainerProps {
  contractTabId?: string;
}

const ContractRequestContainer = ({ contractTabId }: ContractRequestContainerProps) => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <ContractRequest contractTabId={contractTabId} />
    </Suspense>
  );
};

export default ContractRequestContainer; 