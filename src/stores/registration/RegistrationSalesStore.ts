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
}

export interface RegistrationSalesState {
  sales: Record<string, Sales>;
  getRegistrationSalesInfo: (tabId: string) => Sales | undefined;
  addRegistrationSalesInfo: (
    tabId: string,
    sales: {
      salesDepartment: string;
      salesContractPoint: string;
      finalSeller: string;
      supporter: string;
    },
  ) => void;
  updateRegistrationSalesInfo: (tabId: string, updates: Partial<Sales>) => void;
  removeRegistrationSalesInfo: (tabId: string) => void;
}

const useRegistrationSalesStore = create<RegistrationSalesState>((set, get) => ({
  sales: {},

  getRegistrationSalesInfo: (tabId: string) => {
    return get().sales[tabId];
  },

  addRegistrationSalesInfo: (tabId, sales) => {
    const existingSales = get().sales[tabId];
    if (existingSales) {
      console.log(`Sales with tabId: ${tabId} already exists.`);
      return;
    }

    set((state) => ({
      sales: {
        ...state.sales,
        [tabId]: {
          id: tabId,
          salesDepartment: sales.salesDepartment,
          salesContractPoint: sales.salesContractPoint,
          finalSeller: sales.finalSeller,
          supporter: sales.supporter,
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
      console.log('removeRegistrationSalesInfo - tabId', tabId);
      const updatedSales = { ...state.sales };
      delete updatedSales[tabId];

      return {
        ...state,
        sales: updatedSales,
      };
    });
  },
}));
export default useRegistrationSalesStore;
