import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { MemberInfo } from '@model/Auth';
import { createJSONStorage, persist } from 'zustand/middleware';

interface MemberState {
  memberInfo: MemberInfo | null;
  setMemberInfo: (info: MemberInfo) => void;
  clearMemberInfo: () => void;
}

const useMemberStore = create<MemberState>()(
  persist(
    (set) => ({
      memberInfo: null,
      setMemberInfo: (info: MemberInfo) => set({ memberInfo: info }),
      clearMemberInfo: () => set({ memberInfo: null }),
    }),
    {
      name: 'member-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        memberInfo: state.memberInfo,
      }),
    },
  ),
);

if (import.meta.env.DEV) {
  mountStoreDevtool('Member Store', useMemberStore);
}

export default useMemberStore;
