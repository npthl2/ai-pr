import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'dark',
      toggleMode: () =>
        set((state) => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-storage',
    },
  ),
);

if (import.meta.env.DEV) {
  mountStoreDevtool('Theme Store', useThemeStore); // 개발도구에 노출될 적절한 문자열을 지정해 주세요.
}

export default useThemeStore;
