export interface LoginError {
    field: 'username' | 'password' | 'general';
    message: string;
} 