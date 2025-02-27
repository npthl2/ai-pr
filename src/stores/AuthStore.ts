import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { MemberInfo } from '@model/Auth';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  memberInfo: MemberInfo | null;
  setAccessToken: (token: string, memberInfo: MemberInfo) => void;
  setAuth: (memberInfo: MemberInfo) => void;
  logout: () => void;
}

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  memberInfo: null,
};

// localStorage에서 상태 확인
const checkStoredState = () => {
  try {
    const storedData = localStorage.getItem('auth-storage');
    if (!storedData) return initialState;

    const { state } = JSON.parse(storedData);

    // 상태가 불완전하면 초기화
    if (state.isAuthenticated && (!state.accessToken || !state.memberInfo)) {
      localStorage.removeItem('auth-storage');
      return initialState;
    }

    return state;
  } catch (error) {
    console.error('Error checking stored state:', error);
    localStorage.removeItem('auth-storage');
    return initialState;
  }
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...checkStoredState(),
      setAccessToken: (token: string, memberInfo: MemberInfo) => {
        if (!token || !memberInfo) {
          set(initialState);
          return;
        }
        set({
          accessToken: token,
          memberInfo,
          isAuthenticated: true,
        });
      },
      setAuth: (memberInfo: MemberInfo) => {
        if (!memberInfo) {
          set(initialState);
          return;
        }
        set((state) => ({
          ...state,
          memberInfo,
          isAuthenticated: Boolean(state.accessToken),
        }));
      },
      logout: () => {
        set(initialState);
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        memberInfo: state.memberInfo,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

if (import.meta.env.DEV) {
  mountStoreDevtool('Auth Store', useAuthStore);
}

export default useAuthStore;
