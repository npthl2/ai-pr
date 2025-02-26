import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { User } from '@model/Auth'; // 예: { memberId, memberGroup, classOfPosition } 등

interface MemberState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useMemberStore = create<MemberState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Member Store', useMemberStore);
}

export default useMemberStore;
