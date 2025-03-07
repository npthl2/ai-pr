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
  // 요금제 정보
  service: Service;
  // 부가서비스 리스트
  additionalServices: Service[];
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
    contract: { subscriptionType: string; salesType: string },
  ) => void;
  updateRegistrationContractInfo: (tabId: string, updates: Partial<Contract>) => void;
  removeRegistrationContractInfo: (tabId: string) => void;
}

const useRegistrationContractStore = create<RegistrationContractStoreState>((set, get) => ({
  contracts: {},

  getRegistrationContractInfo: (tabId: string) => {
    return get().contracts[tabId];
  },

  addRegistrationContractInfo: (tabId, contract) => {
    const existingContract = get().contracts[tabId];
    if (existingContract) {
      console.log(`Contract with tabId: ${tabId} already exists.`);
      return;
    }

    set((state) => ({
      contracts: {
        ...state.contracts,
        [tabId]: {
          id: tabId,
          // 필드 매핑
          contractType: contract.subscriptionType,
          sellType: contract.salesType,
          // 기본값 설정
          phoneNumber: '',
          sim: '',
          imei: '',
          service: {
            serviceId: '',
            serviceName: '',
            serviceValueType: '',
            serviceValue: 0,
          },
          additionalServices: [],
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
      console.log('removeRegistrationContractInfo - tabId', tabId);
      const updatedContracts = { ...state.contracts };
      delete updatedContracts[tabId];

      return {
        ...state,
        contracts: updatedContracts,
      };
    });
  },
}));

export default useRegistrationContractStore;
