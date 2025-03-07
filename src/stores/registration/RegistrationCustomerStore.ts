import { create } from 'zustand';

export interface RegistrationCustomerInfo {
  customerId?: string;
  name: string;
  rrno: string;
  isConsent: boolean;
}

export interface RegistrationCustomers {
  [contractTapId: string]: RegistrationCustomerInfo;
}

export interface RegistrationCustomerState {
  registrationCustomers: RegistrationCustomers;
  getRegistrationCustomerInfo: (contractTapId: string) => RegistrationCustomerInfo | undefined;
  setRegistrationCustomerInfo: (contractTapId: string, info: RegistrationCustomerInfo) => void;
  getRegistrationCustomerId: (contractTapId: string) => string | undefined;
  setRegistrationCustomerId: (contractTapId: string, customerId: string) => void;
  removeRegistrationCustomerInfo: (contractTapId: string) => void;
  clearRegistrationCustomerInfo: () => void;
}

const useRegistrationCustomerStore = create<RegistrationCustomerState>((set, get) => ({
  registrationCustomers: {},

  getRegistrationCustomerInfo: (contractTapId: string) => {
    return get().registrationCustomers[contractTapId] || null;
  },

  setRegistrationCustomerInfo: (id: string, info: RegistrationCustomerInfo) => {
    set((state) => ({
      registrationCustomers: {
        ...state.registrationCustomers,
        [id]: info,
      },
    }));
  },

  getRegistrationCustomerId: (contractTapId: string) => {
    return get().registrationCustomers[contractTapId]?.customerId;
  },

  setRegistrationCustomerId: (contractTapId: string, customerId: string) => {
    set((state) => ({
      registrationCustomers: {
        ...state.registrationCustomers,
        [contractTapId]: {
          ...state.registrationCustomers[contractTapId],
          customerId,
        },
      },
    }));
  },

  removeRegistrationCustomerInfo: (contractTapId: string) => {
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [contractTapId]: removed, ...rest } = state.registrationCustomers;
      return { registrationCustomers: rest };
    });
  },

  clearRegistrationCustomerInfo: () => {
    set(() => ({ registrationCustomers: {} }));
  },
}));

export default useRegistrationCustomerStore;
