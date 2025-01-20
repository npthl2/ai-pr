import { useNavigate } from 'react-router-dom';
import useAuthStore from '@stores/AuthStore';
import { useState } from 'react';
import AuthService from '@/services/AuthService';
import { LoginContainer } from './components/LoginStyles';
import LoginAlert from './components/LoginAlert';
import LoginForm from './components/LoginForm';
import { LoginError } from '@model/auth';

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState<LoginError | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(null);
    };

    const handleLogin = async () => {
        if (!formData.username || !formData.password) {
            setError({ field: 'general', message: '아이디와 비밀번호를 모두 입력해주세요.' });
            return;
        }

        try {
            setIsLoading(true);
            await AuthService.login(formData);
            login();
            navigate('/', { replace: true });
        } catch (err: any) {
            setError({ field: 'general', message: err.response?.data?.message || '로그인에 실패했습니다.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginContainer>
            <LoginAlert error={error} />
            <LoginForm
                formData={formData}
                isLoading={isLoading}
                onSubmit={handleLogin}
                onChange={handleChange}
            />
        </LoginContainer>
    );
};

export default Login; 