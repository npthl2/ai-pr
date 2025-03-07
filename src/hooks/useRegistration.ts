import useRegistrationBillingStore from '@stores/registration/RegistrationBillingStore';
import useRegistrationContractStore from '@stores/registration/RegistrationContractStore';
import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';
import useRegistrationDeviceStore from '@stores/registration/RegistrationDeviceStore';
import useRegistrationSalesStore from '@stores/registration/RegistrationSalesStore';

export const useRegistration = () => {
  const { removeRegistrationCustomerInfo } = useRegistrationCustomerStore();
  const { removeRegistrationContractInfo } = useRegistrationContractStore();
  const { removeRegistrationBillingInfo } = useRegistrationBillingStore();
  const { removeRegistrationDeviceInfo } = useRegistrationDeviceStore();
  const { removeRegistrationSalesInfo } = useRegistrationSalesStore();

  const handleRemoveAllRegistrationInfo = (customerId: string) => {
    removeRegistrationCustomerInfo(customerId);
    removeRegistrationContractInfo(customerId);
    removeRegistrationBillingInfo(customerId);
    removeRegistrationDeviceInfo(customerId);
    removeRegistrationSalesInfo(customerId);
  };

  return { handleRemoveAllRegistrationInfo };
};
