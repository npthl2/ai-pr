import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export interface Registration {
  businessProcessId: string;
}

export interface Registrations {
  [contractTapId: string]: Registration;
}

export interface RegistrationStoreState {
  registrationInfo: Registrations;

  getRegistrationInfo: (contractTapId: string) => Registration | undefined;
  setRegistrationInfo: (contractTapId: string, info: Registration) => void;
  getRegistrationBusinessProcessId: (contractTapId: string) => string | undefined;
  setRegistrationBusinessProcessId: (contractTapId: string, businessProcessId: string) => void;
  removeRegistrationInfo: (contractTapId: string) => void;
  clearRegistrationInfo: () => void;
}

// Zustand 상태 생성 및 정의
const useRegistrationStore = create<RegistrationStoreState>((set, get) => ({
  registrationInfo: {}, // 초기 상태는 빈 객체

  getRegistrationInfo: (contractTapId: string) => {
    return get().registrationInfo[contractTapId];
  },

  setRegistrationInfo: (contractTapId: string, info: Registration) => {
    set((state) => ({ registrationInfo: { ...state.registrationInfo, [contractTapId]: info } }));
  },

  getRegistrationBusinessProcessId: (contractTapId: string) => {
    return get().registrationInfo[contractTapId]?.businessProcessId;
  },

  setRegistrationBusinessProcessId: (contractTapId: string, businessProcessId: string) => {
    set((state) => ({
      registrationInfo: {
        ...state.registrationInfo,
        [contractTapId]: { ...state.registrationInfo[contractTapId], businessProcessId },
      },
    }));
  },

  removeRegistrationInfo: (contractTapId: string) => {
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [contractTapId]: removed, ...rest } = state.registrationInfo;
      return { registrationInfo: rest };
    });
  },

  clearRegistrationInfo: () => {
    set(() => ({ registrationInfo: {} }));
  },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Registration Store', useRegistrationStore);
}

export default useRegistrationStore;
