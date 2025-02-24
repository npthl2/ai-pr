import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface ToastStore {
  message: string;
  open: boolean;
  openToast: (message: string) => void;
  closeToast: () => void;
}

const useToastStore = create<ToastStore>((set) => ({
  message: '',
  open: false,
  openToast: (message: string) => set((state) => ({ ...state, message, open: true })),
  closeToast: () => set((state) => ({ ...state, message: '', open: false })),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Toast Store', useToastStore); // 개발도구에 노출될 적절한 문자열을 지정해 주세요.
}

export default useToastStore;
