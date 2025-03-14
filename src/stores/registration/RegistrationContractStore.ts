import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

export interface Contract {
  // 가입유형
  contractType: string;
  // 판매유형
  sellType: string;
  // 전화번호
  phoneNumber: string;
  // SIM 정보
  sim: string;
  // IMEI 정보
  imei: string;
  // 단말기 모델명
  deviceModelName: string;
  // 요금제 정보
  service: Service;
  // 부가서비스 리스트
  additionalServices: Service[];

  // 필요한 필드가 다 채워졌는지 확인
  isValidated: boolean;
}

export interface Service {
  serviceId: string;
  serviceName: string;
  serviceValueType: string;
  serviceValue: number;
}

export interface RegistrationContractStoreState {
  contracts: Record<string, Contract>;
  getRegistrationContractInfo: (tabId: string) => Contract | undefined;
  addRegistrationContractInfo: (
    tabId: string,
    contract: { subscriptionType: string; sellType: string },
  ) => void;
  updateRegistrationContractInfo: (tabId: string, updates: Partial<Contract>) => void;
  removeRegistrationContractInfo: (tabId: string) => void;
  updateRegistarationContractValidationFlag: (tabId: string) => void;
  getRegistarationContractValidationFlag: (tabId: string) => boolean;
}

const useRegistrationContractStore = create<RegistrationContractStoreState>((set, get) => ({
  contracts: {},

  getRegistrationContractInfo: (tabId: string) => {
    return get().contracts[tabId];
  },

  addRegistrationContractInfo: (tabId, contract) => {
    const existingContract = get().contracts[tabId];
    if (existingContract) {
      return;
    }

    set((state) => ({
      contracts: {
        ...state.contracts,
        [tabId]: {
          id: tabId,
          // 필드 매핑
          contractType: contract.subscriptionType,
          sellType: contract.sellType,
          // 기본값 설정
          phoneNumber: '',
          sim: '',
          imei: '',
          deviceModelName: '',
          service: {
            serviceId: '',
            serviceName: '',
            serviceValueType: '',
            serviceValue: 0,
          },
          additionalServices: [],
          isValidated: false,
        },
      },
    }));
  },

  updateRegistrationContractInfo: (tabId, updates) => {
    set((state) => ({
      contracts: {
        ...state.contracts,
        [tabId]: {
          ...state.contracts[tabId],
          ...updates,
        },
      },
    }));
  },

  removeRegistrationContractInfo: (tabId: string) => {
    set((state) => {
      // 불변성을 유지하기 위해 새로운 객체 생성
      const updatedContracts = { ...state.contracts };
      delete updatedContracts[tabId];

      return {
        ...state,
        contracts: updatedContracts,
      };
    });
  },

  updateRegistarationContractValidationFlag: (tabId: string) => {
    set((state) => {
      const existingContract = state.contracts[tabId];
      // 필요한 필드 다 값이 있는지 확인 후 isValidated 업데이트
      const validationFlag =
        existingContract.contractType !== '' &&
        existingContract.sellType !== '' &&
        existingContract.phoneNumber !== '' &&
        existingContract.sim !== '' &&
        existingContract.imei !== '' &&
        existingContract.deviceModelName !== '' &&
        existingContract?.service?.serviceId
          ? true
          : false;

      return {
        contracts: {
          ...state.contracts,
          [tabId]: { ...existingContract, isValidated: validationFlag },
        },
      };
    });
  },

  getRegistarationContractValidationFlag: (tabId: string) => {
    return get().contracts[tabId]?.isValidated ?? false;
  },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('RegistrationContract Store', useRegistrationContractStore);
}

export default useRegistrationContractStore;
