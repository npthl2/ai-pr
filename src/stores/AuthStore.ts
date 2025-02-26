import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { MemberInfo } from '@model/Auth';
import { persist, createJSONStorage } from 'zustand/middleware';
import authService from '@api/services/authService';

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    memberInfo: MemberInfo | null;
    setAccessToken: (token: string) => void;
    setAuth: (memberInfo: MemberInfo) => void;
    logout: (onLogout?: () => void) => Promise<void>;
    terminateSession: (onTerminate?: () => void) => void;
}

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    memberInfo: null,
};

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            ...initialState,
            setAccessToken: (token: string) => {
                if (!token) {
                    set(initialState);
                    return;
                }
                console.log('Setting access token:', token);
                set({ accessToken: token, isAuthenticated: true });
            },
            setAuth: (memberInfo: MemberInfo) => {
                if (!memberInfo) {
                    set(initialState);
                    return;
                }
                console.log('Setting member info:', memberInfo);
                set({ memberInfo, isAuthenticated: true });
            },
            logout: async (onLogout?: () => void) => {
                console.log('Logging out');
                try {
                    // API 호출로 서버 세션 종료
                    await authService.logout();
                } catch (error) {
                    console.error('Logout API error:', error);
                } finally {
                    // 로컬 상태 초기화 (API 성공/실패 여부와 관계없이)
                    set(initialState);
                    localStorage.removeItem('auth-storage');
                    if (onLogout) {
                        onLogout();
                    }
                }
            },
            terminateSession: (onTerminate?: () => void) => {
                console.log('Terminating session');
                set(initialState);
                localStorage.clear(); // 모든 저장소 초기화
                if (onTerminate) {
                    onTerminate();
                }
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
            onRehydrateStorage: () => {
                // 상태 검증을 위한 핸들러 반환
                return (state) => {
                    if (!state) return;
                    
                    // localStorage에서 직접 상태 확인
                    const storedData = localStorage.getItem('auth-storage');
                    if (!storedData) return;

                    try {
                        const { state: storedState } = JSON.parse(storedData);
                        // 저장된 상태가 로그아웃 상태면 그대로 사용
                        if (!storedState.isAuthenticated) return;
                        
                        // 인증 상태인데 필요한 데이터가 없으면 localStorage 초기화
                        if (!storedState.accessToken || !storedState.memberInfo) {
                            localStorage.removeItem('auth-storage');
                        }
                    } catch (error) {
                        console.error('Error checking stored state:', error);
                        localStorage.removeItem('auth-storage');
                    }
                };
            },
        }
    )
);

if (import.meta.env.DEV) {
    mountStoreDevtool('Auth Store', useAuthStore);
}

export default useAuthStore;
