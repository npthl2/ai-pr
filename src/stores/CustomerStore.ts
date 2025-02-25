import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface CustomerStore {
  activeCustomerId: string | null;
}

const useCustomerStore = create<CustomerStore>((set) => ({
  // TO-DO: 추후 수정
  activeCustomerId: '1234567890',
  setActiveCustomerId: (id: string) => set({ activeCustomerId: id }),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Customer Store', useCustomerStore); // 개발도구에 노출될 적절한 문자열을 지정해 주세요.
}

export default useCustomerStore;
