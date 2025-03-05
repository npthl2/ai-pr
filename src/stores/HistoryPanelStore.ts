import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface HistoryPanelStore {
  open: boolean;
  toggleOpen: () => void;
}

export const useHistoryPanelStore = create<HistoryPanelStore>((set) => ({
  open: false,
  toggleOpen: () => set((state) => ({ ...state, open: !state.open })),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('HistoryPanel Store', useHistoryPanelStore); // 개발도구에 노출될 적절한 문자열을 지정해 주세요.
}
