import { useState } from 'react';
import { useLoginMutation } from '@api/queries/auth/useLoginMutation';
import { LoginRequestParams } from '@model/Auth';
import { LoginContainer } from './Login.styled';
import LoginForm from './components/LoginForm';
import { AxiosError } from 'axios';
import { LoginError } from './Login.model';

const Login = () => {
    // 로그인 폼 데이터 상태
    const [formData, setFormData] = useState<LoginRequestParams>({
        loginId: '',
        password: '',
    });
    // 각 필드별 및 일반 오류 메시지를 관리하는 상태
    const [errors, setErrors] = useState<LoginError>({});

    const loginMutation = useLoginMutation();

    // 입력값 변경 시 해당 필드의 오류 및 일반 오류를 초기화
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
    };

    // 입력 필드에서 포커스 아웃 시, 값이 없으면 해당 필드의 오류 메시지를 설정
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!value) {
            setErrors((prev) => ({
                ...prev,
                [name]: name === 'loginId' ? 'ID를 입력해주세요.' : 'Password를 입력해주세요.',
            }));
        }
    };

    // 로그인 버튼 클릭 시 실행되는 핸들러
    const handleLogin = async () => {
        // 값이 비어 있는 경우 일반 오류 메시지 설정
        if (!formData.loginId || !formData.password) {
            setErrors({ general: 'ID와 Password를 모두 입력해주세요.' });
            return;
        }

        try {
            await loginMutation.mutateAsync(formData);
            // 로그인 성공 후의 처리는 useLoginMutation 내부에서 처리됨
            // - accessToken 저장
            // - memberInfo 저장
            // - 페이지 이동
        } catch (err) {
            if (err instanceof AxiosError) {
                setErrors({
                    general: err.response?.data?.message || err.message || '로그인에 실패했습니다.',
                });
            } else {
                setErrors({
                    general: '로그인에 실패했습니다.',
                });
            }
        }
    };

    return (
        <LoginContainer>
            <LoginForm
                formData={formData}
                isLoading={loginMutation.isPending}
                errors={errors}
                onSubmit={handleLogin}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </LoginContainer>
    );
};

export default Login;
