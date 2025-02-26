import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormFieldsContainer } from '../Login.styled';
import { useState } from 'react';
import { LoginRequestParams } from '@model/Auth';
import LoginAlert from './LoginAlert';
import { LoginError } from '../Login.model';

interface LoginFormProps {
    formData: LoginRequestParams;
    isLoading: boolean;
    errors: LoginError;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const LoginForm = ({ formData, isLoading, errors, onSubmit, onChange, onBlur }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <FormFieldsContainer>
                <TextField
                    label="ID"
                    name="loginId"
                    autoFocus
                    value={formData.loginId}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={isLoading}
                    fullWidth
                    error={!!errors.loginId}
                    helperText={errors.loginId}
                    data-testid="id"
                />
                <TextField
                    label="Password"
                    name="password"
                    data-testid="pw"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={isLoading}
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="비밀번호 보기 토글"
                                    onClick={handleTogglePassword}
                                    edge="end"
                                    disabled={isLoading}
                                    size="small"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FormFieldsContainer>
            <LoginAlert error={errors} />
            <Button
                variant="contained"
                onClick={onSubmit}
                disabled={isLoading}
                fullWidth
                data-testid="login"
                sx={{
                    height: '36px',
                    backgroundColor: '#050E1F',
                    '&:hover': {
                        backgroundColor: '#050E1F',
                    },
                    textTransform: 'none',
                }}
            >
                {isLoading ? '로그인 중...' : '로그인'}
            </Button>
        </>
    );
};

export default LoginForm;
