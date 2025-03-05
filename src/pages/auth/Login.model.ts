export interface LoginError {
    loginId?: string;
    password?: string;
    general?: string;
}

export interface FieldValidation {
    error: boolean;
    state: 'inactive' | 'active' | 'error';
    helperText: string;
}
