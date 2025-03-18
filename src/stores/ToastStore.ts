import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

type ToastStatus = 'error' | 'default';
interface ToastStore {
  message: string;
  open: boolean;
  status: ToastStatus;
  openToast: (message: string, status?: ToastStatus) => void;
  closeToast: () => void;
}

const useToastStore = create<ToastStore>((set) => ({
  message: '',
  open: false,
  status: 'default',
  openToast: (message: string, status?: ToastStatus) =>
    set((state) => ({ ...state, message, status, open: true })),
  closeToast: () => set((state) => ({ ...state, message: '', status: 'default', open: false })),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Toast Store', useToastStore); // 개발도구에 노출될 적절한 문자열을 지정해 주세요.
}

export default useToastStore;
