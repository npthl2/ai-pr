import useRegistrationInvoiceStore from '@stores/registration/RegistrationInvoiceStore';
import useRegistrationContractStore from '@stores/registration/RegistrationContractStore';
import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';
import useRegistrationDeviceStore from '@stores/registration/RegistrationDeviceStore';
import useRegistrationSalesStore from '@stores/registration/RegistrationSalesStore';

export const useRegistration = () => {
  const { removeRegistrationCustomerInfo } = useRegistrationCustomerStore();
  const { removeRegistrationContractInfo } = useRegistrationContractStore();
  const { removeRegistrationInvoiceInfo } = useRegistrationInvoiceStore();
  const { removeRegistrationDeviceInfo } = useRegistrationDeviceStore();
  const { removeRegistrationSalesInfo } = useRegistrationSalesStore();

  const handleRemoveAllRegistrationInfo = (customerId: string) => {
    removeRegistrationCustomerInfo(customerId);
    removeRegistrationContractInfo(customerId);
    removeRegistrationInvoiceInfo(customerId);
    removeRegistrationDeviceInfo(customerId);
    removeRegistrationSalesInfo(customerId);
  };

  return { handleRemoveAllRegistrationInfo };
};
