import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { Member } from '@model/Auth';

interface MemberState {
  memberInfo: Member | null;
  setMemberInfo: (info: Member) => void;
  clearMemberInfo: () => void;
}

const useMemberStore = create<MemberState>((set) => ({
  memberInfo: null,
  setMemberInfo: (info: Member) => set({ memberInfo: info }),
  clearMemberInfo: () => set({ memberInfo: null })
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Member Store', useMemberStore);
}

export default useMemberStore;
