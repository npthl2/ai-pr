import { FormContainer } from './common/SectionCommon.styled';
import { useState, useEffect, useMemo } from 'react';
import useRegistrationCustomerStore, {
  RegistrationCustomerInfo,
} from '@stores/registration/RegistrationCustomerStore';
import { useAvailableCustomerContractQuery } from '@api/queries/contract/useAvailableCustomerContractQuery';
import CustomerInfo from './customer/CustomerInfo';
import CustomerVerification from './customer/CustomerVerification';
import CustomerDialog from './customer/CustomerDialog';

interface CustomerSectionProps {
  contractTabId: string;
  onComplete: () => void;
  completed?: boolean;
}

const CustomerSection = ({ contractTabId, onComplete, completed }: CustomerSectionProps) => {
  const { getRegistrationCustomerInfo, setRegistrationCustomerInfo } =
    useRegistrationCustomerStore();
  const [customer, setCustomer] = useState<RegistrationCustomerInfo>(
    getRegistrationCustomerInfo(contractTabId) || {
      name: '',
      rrno: '',
      isConsentPersonalInfo: false,
      rrnoIssueDate: '',
      isConsentIdentityVerification: false,
    },
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNameVerified, setIsNameVerified] = useState(false);

  const [callAvailableContract, setCallAvailableContract] = useState(false);
  const { data: availableContractCount, refetch: refetchAvailableContract } =
    useAvailableCustomerContractQuery(customer.customerId || '', {
      enabled: !!customer.customerId && callAvailableContract,
    });

  useEffect(() => {
    if (availableContractCount) {
      setCustomer({
        ...customer,
        availableContractCount: availableContractCount,
      });

      setRegistrationCustomerInfo(contractTabId, customer);
      if (availableContractCount > 0 && callAvailableContract) {
        onComplete();
      }
    }
  }, [availableContractCount]);

  const handleOnClick = () => {
    // TO-DO : 추후 삭제
    // setRegistrationCustomerInfo(contractTabId, {
    //   customerId: 'C-0000000000',
    //   name: customer.name,
    //   rrno: customer.rrno,
    //   isConsent: customer.isConsent,
    // });
    // onComplete();
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setCustomer({
      ...customer,
      customerId: undefined,
      customerNameVerificationHistoryId: undefined,
      verificationResult: undefined,
      organization: undefined,
    });

    setIsDialogOpen(false);
  };

  const handleVerificationComplete = () => {
    setIsNameVerified(true);
    setIsDialogOpen(false);
  };

  const handleCheckAvailableContract = () => {
    if (customer.customerId) {
      setCallAvailableContract(true);
      if (callAvailableContract) {
        refetchAvailableContract();
      }
    }
  };

  const isVerificationCompleted = useMemo(() => {
    return customer.verificationResult !== undefined;
  }, [customer.verificationResult]);

  return (
    <FormContainer completed={completed}>
      <CustomerInfo
        isDialogOpen={isDialogOpen}
        customer={customer}
        setCustomer={setCustomer}
        isVerificationCompleted={isVerificationCompleted}
        isNameVerified={isNameVerified}
        handleOnClick={handleOnClick}
      />
      {isNameVerified && isVerificationCompleted && !isDialogOpen && (
        <CustomerVerification
          verificationResult={customer.verificationResult || false}
          availableContractCount={availableContractCount}
          handleCheckAvailableContract={handleCheckAvailableContract}
        />
      )}
      <CustomerDialog
        isOpen={isDialogOpen}
        customer={customer}
        setCustomer={setCustomer}
        isVerificationCompleted={isVerificationCompleted}
        handleClose={handleDialogClose}
        handleVerificationComplete={handleVerificationComplete}
      />
    </FormContainer>
  );
};

export default CustomerSection;
