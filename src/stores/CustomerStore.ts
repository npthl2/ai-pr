import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { Customer } from '@model/Customer';

interface CustomerState {
  customers: Customer[];
  // 화면에 활성화된(선택된) 고객
  activeCustomerId: string | null;
  // 고객을 추가하거나, 이미 있으면 활성화
  addOrActivateCustomer: (customer: Customer) => boolean;
  // 고객 목록에서 제거
  removeCustomer: (customerId: string) => void;
  // 왼쪽 네비게이션에서 클릭 시 활성 고객 변경
  setActiveCustomer: (customerId: string) => void;
  // 고객이 현재 보고 있는 탭
  //setCustomerActiveTab: string;
}

const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: [],
  activeCustomerId: null,
  addOrActivateCustomer: (customer: Customer) => {
    const { customers } = get();
    // 고객이 이미 존재하는지 확인 (id 기준)
    const exists = customers.some((c) => c.customerId === customer.customerId);
    if (exists) {
      // 기존 고객이거나 새로 추가한 경우, 해당 고객을 활성화
      set({ activeCustomerId: customer.customerId });
      return true;
    }

    if (customers.length >= 10) {
      // 이미 10명의 고객이 존재하면 신규 추가하지 않고 false 반환
      return false;
    }

    // 신규 고객 추가 후 활성화
    set({
      customers: [...customers, customer],
      activeCustomerId: customer.customerId,
    });
    return true;
  },
  removeCustomer: (customerId: string) => {
    const { customers, activeCustomerId } = get();
    set({
      // 지정한 고객을 목록에서 제거
      customers: customers.filter((c) => c.customerId !== customerId),
      // 제거한 고객이 활성 고객이었다면 activeCustomerId를 null로 설정
      activeCustomerId: activeCustomerId === customerId ? null : activeCustomerId,
    });
  },
  setActiveCustomer: (customerId: string) => set({ activeCustomerId: customerId }),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Customer Store', useCustomerStore);
}

export default useCustomerStore;
