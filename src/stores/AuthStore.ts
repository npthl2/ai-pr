import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { MemberInfo } from '@model/Auth';
import { persist } from 'zustand/middleware';

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    memberInfo: MemberInfo | null;
    setAccessToken: (token: string) => void;
    setAuth: (memberInfo: MemberInfo) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            accessToken: null,
            memberInfo: null,
            setAccessToken: (token: string) => set({ accessToken: token, isAuthenticated: true }),
            setAuth: (memberInfo: MemberInfo) => set({ memberInfo }),
            logout: () => set({ isAuthenticated: false, accessToken: null, memberInfo: null }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                accessToken: state.accessToken,
                memberInfo: state.memberInfo,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

if (import.meta.env.DEV) {
    mountStoreDevtool('Auth Store', useAuthStore);
}

export default useAuthStore;
