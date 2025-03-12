import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { persist, createJSONStorage } from 'zustand/middleware';
import useMemberStore from './MemberStore';

interface AuthState {
  isAuthenticated: boolean;
  setAuth: () => void;
  logout: () => void;
}

const initialState = {
  isAuthenticated: false,
};

const STORE_VERSION = 1;
const STORE_KEY = 'auth-storage';
const STORE_NAME = 'Auth Store';

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setAuth: () => {
        set({
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ isAuthenticated: false });
        useMemberStore.getState().clearMemberInfo();
      },
    }),
    {
      name: STORE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: STORE_VERSION,
      migrate: (persistedState, persistedVersion) => {
        if (persistedVersion < STORE_VERSION) {
          return initialState;
        }
        return persistedState as AuthState;
      },
    },
  ),
);

if (import.meta.env.DEV) {
  mountStoreDevtool(STORE_NAME, useAuthStore);
}

export default useAuthStore;
