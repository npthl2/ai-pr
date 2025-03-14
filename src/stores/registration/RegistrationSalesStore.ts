import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

export interface Sales {
  // 가입대리점(판매부서)
  salesDepartment: string;
  // 접점
  salesContractPoint: string;
  // 판매자(최종판매자)
  finalSeller: string;
  // 서포터
  supporter: string;

  // 필요한 필드가 다 채워졌는지 확인
  isValidated: boolean;
}

export interface RegistrationSalesState {
  sales: Record<string, Sales>;
  getRegistrationSalesInfo: (tabId: string) => Sales | undefined;
  addRegistrationSalesInfo: (tabId: string) => void;
  updateRegistrationSalesInfo: (tabId: string, updates: Partial<Sales>) => void;
  removeRegistrationSalesInfo: (tabId: string) => void;
  updateRegistrationSalesValidationFlag: (tabId: string) => void;
  getRegistrationSalesValidationFlag: (tabId: string) => boolean;
}

const useRegistrationSalesStore = create<RegistrationSalesState>((set, get) => ({
  sales: {},

  getRegistrationSalesInfo: (tabId: string) => {
    return get().sales[tabId];
  },

  addRegistrationSalesInfo: (tabId) => {
    const existingSales = get().sales[tabId];
    if (existingSales) {
      return;
    }

    set((state) => ({
      sales: {
        ...state.sales,
        [tabId]: {
          id: tabId,
          salesDepartment: '',
          salesContractPoint: '',
          finalSeller: '',
          supporter: '',
          isValidated: false,
        },
      },
    }));
  },

  updateRegistrationSalesInfo: (tabId, updates) => {
    set((state) => ({
      sales: {
        ...state.sales,
        [tabId]: {
          ...state.sales[tabId],
          ...updates,
        },
      },
    }));
  },

  removeRegistrationSalesInfo: (tabId: string) => {
    set((state) => {
      // 불변성을 유지하기 위해 새로운 객체 생성
      const updatedSales = { ...state.sales };
      delete updatedSales[tabId];

      return {
        ...state,
        sales: updatedSales,
      };
    });
  },

  updateRegistrationSalesValidationFlag: (tabId: string) => {
    set((state) => {
      const existingSales = state.sales[tabId];
      // 필요한 필드 다 값이 있는지 확인 후 validationFlag 업데이트
      const validationFlag = existingSales.salesDepartment !== '' ? true : false;

      return {
        sales: {
          ...state.sales,
          [tabId]: { ...existingSales, isValidated: validationFlag },
        },
      };
    });
  },

  getRegistrationSalesValidationFlag: (tabId: string) => {
    return get().sales[tabId]?.isValidated ?? false;
  },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('RegistrationSales Store', useRegistrationSalesStore);
}

export default useRegistrationSalesStore;
