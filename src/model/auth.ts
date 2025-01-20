// 인증 관련 인터페이스
export interface AuthState {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export interface LoginError {
    field: 'username' | 'password' | 'general';
    message: string;
}

export interface LoginFormData {
    username: string;
    password: string;
}

export interface LoginFormProps {
    formData: LoginFormData;
    isLoading: boolean;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LoginAlertProps {
    error: LoginError | null;
}