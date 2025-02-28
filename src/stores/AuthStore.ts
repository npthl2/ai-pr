import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { MemberInfo } from '@model/Auth';
interface AuthState {
  isAuthenticated: boolean;
  memberInfo: MemberInfo | null;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  // TO-DO : 추후수정
  //   isAuthenticated: false,
  //   memberInfo: null,
  isAuthenticated: true,
  memberInfo: {
    memberId: 'module-member-id',
    memberName: '체리',
    classOfPosition: 'module-class-of-position',
    memberGroup: 'module-member-group',
    authorities: ['module-authority'],
  },
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Auth Store', useAuthStore); // 개발도구에 노출될 적절한 문자열을 지정해 주세요.
}

export default useAuthStore;
