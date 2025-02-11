import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormContainer } from '../LoginExample.styled';
import { useState } from 'react';
import { LoginRequestParams } from '@model/Auth';

interface LoginFormProps {
  formData: LoginRequestParams;
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
        name='emailAddress'
        value={formData.emailAddress}
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
