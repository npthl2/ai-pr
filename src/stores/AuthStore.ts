import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Auth Store', useAuthStore); // 개발도구에 노출될 적절한 문자열을 지정해 주세요.
}

export default useAuthStore;
