import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { DEFAULT_TABS, MAX_CUSTOMERS, TabInfo } from '@constants/CommonConstant';
import { Customer, Work } from '@model/Customer';

interface Tab {
  id: number;
  label: string;
  closeable: boolean;
}

interface CustomerState {
  customers: Customer[] | Work[];
  selectedCustomerId: string | null;
  customerTabs: {
    [id: string]: {
      tabs: Tab[];
      activeTab: number;
    };
  };
  addCustomer: (customer: Customer | Work) => boolean;
  removeCustomer: (id: string) => void;
  selectCustomer: (id: string) => void;
  getCustomerName: (id: string) => string;
  setCustomerTabs: (id: string, tabs: Tab[]) => void;
  setActiveTab: (id: string, tabId: number) => void;
  closeCustomerTab: (id: string, tabId: number) => void;
  updateCustomer: (id: string, partialUpdate: Partial<Customer>) => void;
  reset: () => void;
  isCustomer: (customer: Customer | Work) => customer is Customer;
  isWork: (customer: Customer | Work) => customer is Work;
}

const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: [],
  selectedCustomerId: null,
  customerTabs: {},

  addCustomer: (customer: Customer | Work) => {
    const { customers, selectedCustomerId, isCustomer } = get();
    const isCustomerType = isCustomer(customer);

    const updatedCustomers = selectedCustomerId
      ? customers.map((c) =>
          c.id === selectedCustomerId ? { ...c, unmaskingRrno: '', unmaskingName: '' } : c,
        )
      : customers;

    // 고객이 이미 존재하는지 확인 (id 기준)
    const exists = customers.some((c) => c.id === customer.id);
    if (exists) {
      // 기존 고객이면 활성화 업데이트
      set((state) => ({
        ...state,
        selectedCustomerId: customer.id,
        customers: [...updatedCustomers],
      }));
      return true;
    }

    // 이미 10명의 고객이 존재하면 신규 추가하지 않고 false 반환
    if (customers.length >= MAX_CUSTOMERS) {
      return false;
    }

    set((state) => ({
      ...state,
      customers: [...updatedCustomers, customer],
      selectedCustomerId: customer.id,
      customerTabs: {
        ...state.customerTabs,
        [customer.id]: {
          tabs: isCustomerType
            ? [DEFAULT_TABS[TabInfo.CUSTOMER_SEARCH.id]]
            : [DEFAULT_TABS[TabInfo.NEW_SUBSCRIPTION.id]],
          activeTab: isCustomerType ? TabInfo.CUSTOMER_SEARCH.id : TabInfo.NEW_SUBSCRIPTION.id,
        },
      },
    }));
    return true;
  },
  removeCustomer: (id) =>
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: removed, ...remainingTabs } = state.customerTabs;
      // customers 배열에서 해당 id를 가진 고객 제거
      // 고객 배열에서 해당 id의 인덱스를 찾음
      const index = state.customers.findIndex((c) => c.id === id);

      // 인덱스를 이용해 새로운 배열 생성 (삭제할 요소를 제외)
      const newCustomers =
        index !== -1
          ? [...state.customers.slice(0, index), ...state.customers.slice(index + 1)]
          : state.customers;

      let newSelectedCustomerId = state.selectedCustomerId;

      // 삭제 전 배열에서 삭제할 고객의 인덱스 구하기
      if (newCustomers.length === 0) {
        newSelectedCustomerId = null;
      } else if (index < newCustomers.length) {
        newSelectedCustomerId = newCustomers[index].id;
      } else {
        newSelectedCustomerId = newCustomers[newCustomers.length - 1].id;
      }

      return {
        ...state,
        customers: newCustomers,
        selectedCustomerId: newSelectedCustomerId,
        customerTabs: remainingTabs,
      };
    }),

  selectCustomer: (id) =>
    set((state) => {
      const customer = state.customers.find((c) => c.id === id);
      if (!customer) return state;

      return {
        ...state,
        selectedCustomerId: id,
        customers: state.customers.map((c) =>
          c.id === id ? { ...c, unmaskingRrno: '', unmaskingName: '' } : c,
        ),
      };
    }),

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

  updateCustomer: (id, partialUpdate) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, ...partialUpdate } : customer,
      ),
    })),

  reset: () =>
    set({
      customers: [],
      selectedCustomerId: null,
      customerTabs: {},
    }),

  isCustomer: (customer: Customer | Work): customer is Customer => {
    return 'contractId' in customer;
  },

  isWork: (customer: Customer | Work): customer is Work => {
    return !('contractId' in customer);
  },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Customer Store', useCustomerStore);
}

export default useCustomerStore;
