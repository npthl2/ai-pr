import { useNavigate } from 'react-router-dom';
import { Button, TextField, Alert } from '@mui/material';
import useAuthStore from '../../stores/AuthStore';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

const LoginContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
});

const FormContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '300px',
}));

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleLogin = () => {
        if (!formData.username || !formData.password) {
            setError('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }
        login();
        navigate('/', { replace: true });
    };

    return (
        <LoginContainer>
            <FormContainer>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    label="아이디"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="비밀번호"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                />
                <Button
                    variant="contained"
                    onClick={handleLogin}
                    fullWidth
                >
                    로그인
                </Button>
            </FormContainer>
        </LoginContainer>
    );
};

export default Login; 