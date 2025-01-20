import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeState } from '../model/theme';

const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            mode: 'dark',
            toggleMode: () => set((state) => ({
                mode: state.mode === 'light' ? 'dark' : 'light'
            })),
        }),
        {
            name: 'theme-storage',
        }
    )
);

export default useThemeStore; 