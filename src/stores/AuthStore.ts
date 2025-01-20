import { create } from 'zustand';
import { AuthState } from '../model/auth';

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    login: () => set({ isAuthenticated: true }),
    logout: () => set({ isAuthenticated: false }),
}));

export default useAuthStore; 