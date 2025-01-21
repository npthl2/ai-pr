import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormContainer } from '../Login.styled';
import { useState } from 'react';

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginFormProps {
  formData: LoginFormData;
  isLoading: boolean;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm = ({ formData, isLoading, onSubmit, onChange }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormContainer>
      <TextField
        label='아이디'
        name='username'
        value={formData.username}
        onChange={onChange}
        disabled={isLoading}
        fullWidth
      />
      <TextField
        label='비밀번호'
        name='password'
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={onChange}
        disabled={isLoading}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='비밀번호 보기 토글'
                  onClick={handleTogglePassword}
                  edge='end'
                  disabled={isLoading}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Button variant='contained' onClick={onSubmit} disabled={isLoading} fullWidth>
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>
    </FormContainer>
  );
};

export default LoginForm;
