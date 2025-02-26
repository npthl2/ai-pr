import { DEFAULT_TABS, MAX_CUSTOMERS } from '@constants/CommonConstant';
import { create } from 'zustand';

interface Customer {
  id: string;
  name: string;
}

interface Tab {
  id: number;
  label: string;
  closeable: boolean;
}

interface CustomerState {
  customers: Customer[];
  selectedCustomerId: string | null;
  customerTabs: {
    [customerId: string]: {
      tabs: Tab[];
      activeTab: number;
    };
  };
  addCustomer: (customer: Customer) => void;
  removeCustomer: (id: string) => void;
  selectCustomer: (id: string) => void;
  getCustomerName: (id: string) => string;
  setCustomerTabs: (customerId: string, tabs: Tab[]) => void;
  setActiveTab: (customerId: string, tabId: number) => void;
  closeCustomerTab: (customerId: string, tabId: number) => void;
  closeAllCustomerTabs: (customerId: string) => void;
}

const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: [],
  // TO-DO : 추후수정
  selectedCustomerId: 'module-customer-id',
  customerTabs: {},

  addCustomer: (customer) =>
    set((state) => {
      const newCustomers = [customer, ...state.customers];
      if (newCustomers.length > MAX_CUSTOMERS) {
        newCustomers.pop();
      }
      return {
        customers: newCustomers,
        selectedCustomerId: customer.id,
        customerTabs: {
          ...state.customerTabs,
          [customer.id]: { tabs: [...DEFAULT_TABS], activeTab: 0 },
        },
      };
    }),

  removeCustomer: (id) =>
    set((state) => {
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

  setCustomerTabs: (customerId, tabs) =>
    set((state) => ({
      customerTabs: {
        ...state.customerTabs,
        [customerId]: { ...state.customerTabs[customerId], tabs },
      },
    })),

  setActiveTab: (customerId, tabId) =>
    set((state) => ({
      customerTabs: {
        ...state.customerTabs,
        [customerId]: { ...state.customerTabs[customerId], activeTab: tabId },
      },
    })),

  closeCustomerTab: (customerId, tabId) =>
    set((state) => {
      const customerTab = state.customerTabs[customerId];
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
          [customerId]: { tabs: newTabs, activeTab: newActiveTab },
        },
      };
    }),

  closeAllCustomerTabs: (customerId) =>
    set((state) => ({
      customerTabs: {
        ...state.customerTabs,
        [customerId]: {
          tabs: DEFAULT_TABS.filter((tab) => !tab.closeable),
          activeTab: 0,
        },
      },
    })),
}));

export default useCustomerStore;
