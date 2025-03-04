import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { MemberInfo } from '@model/Auth';

interface MemberState {
  memberInfo: MemberInfo | null;
  setMemberInfo: (info: MemberInfo) => void;
  clearMemberInfo: () => void;
}

const useMemberStore = create<MemberState>((set) => ({
  memberInfo: null,
  setMemberInfo: (info: MemberInfo) => set({ memberInfo: info }),
  clearMemberInfo: () => set({ memberInfo: null })
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Member Store', useMemberStore);
}

export default useMemberStore;
