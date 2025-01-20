// 테마 관련 인터페이스
export interface ThemeState {
    mode: 'light' | 'dark';
    toggleMode: () => void;
} 