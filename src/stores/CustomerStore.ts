import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { DEFAULT_TABS, MAX_CUSTOMERS } from '@constants/CommonConstant';
import { Customer } from '@model/Customer';

interface Tab {
  id: number;
  label: string;
  closeable: boolean;
}

interface CustomerState {
  customers: Customer[];
  selectedCustomerId: string | null;
  customerTabs: {
    [id: string]: {
      tabs: Tab[];
      activeTab: number;
    };
  };
  addCustomer: (customer: Customer) => boolean;
  removeCustomer: (id: string) => void;
  selectCustomer: (id: string) => void;
  getCustomerName: (id: string) => string;
  setCustomerTabs: (id: string, tabs: Tab[]) => void;
  setActiveTab: (id: string, tabId: number) => void;
  closeCustomerTab: (id: string, tabId: number) => void;
  closeAllCustomerTabs: (id: string) => void;
}

const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: [],
  selectedCustomerId: null,
  customerTabs: {},

  addCustomer: (customer: Customer) => {
    const { customers } = get();
    // 고객이 이미 존재하는지 확인 (id 기준)
    const exists = customers.some((c) => c.id === customer.id);
    if (exists) {
      // 기존 고객이면 활성화 업데이트
      set((state) => ({
        ...state,
        selectedCustomerId: customer.id,
      }));
      return true;
    }

    // 이미 10명의 고객이 존재하면 신규 추가하지 않고 false 반환
    if (customers.length >= MAX_CUSTOMERS) {
      return false;
    }

    set((state) => ({
      ...state,
      customers: [...state.customers, customer],
      selectedCustomerId: customer.id,
      customerTabs: {
        ...state.customerTabs,
        [customer.id]: { tabs: [...DEFAULT_TABS], activeTab: 0 },
      },
    }));
    return true;
  },
  removeCustomer: (id) =>
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: removed, ...remainingTabs } = state.customerTabs;
      return {
        customers: state.customers.filter((c) => c.id !== id),
        selectedCustomerId: state.selectedCustomerId === id ? null : state.selectedCustomerId,
        customerTabs: remainingTabs,
      };
    }),

  selectCustomer: (id) => set({ selectedCustomerId: id }),

  getCustomerName: (id) => {
    const customer = get().customers.find((c) => c.id === id);
    return customer?.name || '';
  },

  setCustomerTabs: (id, tabs) =>
    set((state) => ({
      customerTabs: {
        ...state.customerTabs,
        [id]: { ...state.customerTabs[id], tabs },
      },
    })),

  setActiveTab: (id, tabId) =>
    set((state) => ({
      customerTabs: {
        ...state.customerTabs,
        [id]: { ...state.customerTabs[id], activeTab: tabId },
      },
    })),

  closeCustomerTab: (id, tabId) =>
    set((state) => {
      const customerTab = state.customerTabs[id];
      if (!customerTab) return state;

      const newTabs = customerTab.tabs.filter((tab) => tab.id !== tabId);
      const currentTabIndex = customerTab.tabs.findIndex((tab) => tab.id === tabId);
      const currentActiveIndex = customerTab.tabs.findIndex(
        (tab) => tab.id === customerTab.activeTab,
      );

      let newActiveTab = customerTab.activeTab;
      if (tabId === customerTab.activeTab) {
        if (currentTabIndex > 0) {
          newActiveTab = customerTab.tabs[currentTabIndex - 1].id;
        } else if (newTabs.length > 0) {
          newActiveTab = newTabs[0].id;
        }
      } else if (currentTabIndex < currentActiveIndex) {
        const newActiveIndex =
          customerTab.tabs.findIndex((tab) => tab.id === customerTab.activeTab) - 1;
        newActiveTab = newTabs[newActiveIndex].id;
      }

      return {
        customerTabs: {
          ...state.customerTabs,
          [id]: { tabs: newTabs, activeTab: newActiveTab },
        },
      };
    }),

  closeAllCustomerTabs: (id) =>
    set((state) => ({
      customerTabs: {
        ...state.customerTabs,
        [id]: {
          tabs: DEFAULT_TABS.filter((tab) => !tab.closeable),
          activeTab: 0,
        },
      },
    })),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Customer Store', useCustomerStore);
}

export default useCustomerStore;
