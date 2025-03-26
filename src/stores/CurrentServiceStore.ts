import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface ServiceCommon {
  contractId: string;
  serviceId: string;
  serviceName: string;
  serviceType: string;
  serviceValue: number;
}

interface CustomerContract {
  contractId: string;
  statusCode: string;
  customerId: string;
  serviceId: string;
  serviceName: string;
  serviceType: string;
  maskingPhoneNumber: string;
  encryptedPhoneNumber: string;
  maskingImei: string;
  encryptedImei: string;
}

interface AdditionalService extends ServiceCommon {}

export interface Service extends ServiceCommon {
  additionalService: AdditionalService[];
}

interface ServiceState {
  service: {
    [customerId: string]: Service;
  };
  customerContracts: {
    [customerId: string]: CustomerContract[];
  };
  selectedContractIds: {
    [customerId: string]: string;
  };
  setCurrentService: (customerId: string, service: Service) => void;
  getCurrentService: (customerId: string) => Service | null;
  deleteCurrentService: (customerId: string) => void;
  deleteAllServices: () => void;
  setCustomerContracts: (customerId: string, contracts: CustomerContract[]) => void;
  getCustomerContracts: (customerId: string) => CustomerContract[];
  deleteCustomerContracts: (customerId: string) => void;
  deleteAllCustomerContracts: () => void;
  setSelectedContractId: (customerId: string, contractId: string) => void;
  getSelectedContractId: (customerId: string) => string;
  getSelectedCustomerContract: (customerId: string) => CustomerContract | null;
}

const useCurrentServiceStore = create<ServiceState>((set, get) => ({
  service: {},
  customerContracts: {},
  selectedContractIds: {},
  setCurrentService: (customerId: string, service: Service) =>
    set((state) => ({
      service: {
        ...state.service,
        [customerId]: service,
      },
    })),
  getCurrentService: (customerId: string) => get().service[customerId] || null,
  deleteCurrentService: (customerId: string) =>
    set((state) => {
      const newServices = { ...state.service };
      delete newServices[customerId];
      return { service: newServices };
    }),
  deleteAllServices: () => set({ service: {} }),
  setCustomerContracts: (customerId: string, contracts: CustomerContract[]) =>
    set((state) => ({
      customerContracts: {
        ...state.customerContracts,
        [customerId]: contracts,
      },
    })),
  getCustomerContracts: (customerId: string) => get().customerContracts[customerId] || [],
  deleteCustomerContracts: (customerId: string) =>
    set((state) => {
      const contracts = { ...state.customerContracts };
      delete contracts[customerId];
      return { customerContracts: contracts };
    }),
  deleteAllCustomerContracts: () => set({ customerContracts: {} }),
  setSelectedContractId: (customerId: string, contractId: string) =>
    set((state) => ({
      selectedContractIds: {
        ...state.selectedContractIds,
        [customerId]: contractId,
      },
    })),
  getSelectedContractId: (customerId: string) => get().selectedContractIds[customerId] || '',
  getSelectedCustomerContract: (customerId: string) => {
    const contracts = get().customerContracts[customerId] || [];
    const selectedId = get().selectedContractIds[customerId];
    return contracts.find((contract) => contract.contractId === selectedId) || null;
  },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('CurrentService Store', useCurrentServiceStore);
}

export default useCurrentServiceStore;
