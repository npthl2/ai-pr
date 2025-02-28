import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';
import { LoginRequestParams } from '@model/Auth';
import { LoginError } from '../Login.model';

describe('LoginForm 컴포넌트', () => {
  let mockOnChange: ReturnType<typeof vi.fn>;
  let mockOnBlur: ReturnType<typeof vi.fn>;
  let mockOnSubmit: ReturnType<typeof vi.fn>;
  let defaultProps: {
    formData: LoginRequestParams;
    isLoading: boolean;
    errors: LoginError;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  };

  beforeEach(() => {
    mockOnChange = vi.fn();
    mockOnBlur = vi.fn();
    mockOnSubmit = vi.fn();

    defaultProps = {
      formData: { loginId: '', password: '' },
      isLoading: false,
      errors: { loginId: '', password: '' },
      onSubmit: mockOnSubmit,
      onChange: mockOnChange,
      onBlur: mockOnBlur,
    };
  });

  it('초기 렌더링 시 입력 필드와 버튼이 존재해야 한다.', () => {
    render(<LoginForm {...defaultProps} />);
    
    expect(screen.getByLabelText('ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('로그인')).toBeInTheDocument();
  });

  it('입력값 변경 시 onChange 핸들러가 호출되어야 한다.', () => {
    render(<LoginForm {...defaultProps} />);

    const idInput = screen.getByLabelText('ID');
    const pwInput = screen.getByLabelText('Password');

    fireEvent.change(idInput, { target: { value: 'testUser' } });
    fireEvent.change(pwInput, { target: { value: 'securePass' } });

    expect(mockOnChange).toHaveBeenCalledTimes(2);
  });

  it('입력 필드에서 포커스를 잃을 때 onBlur 핸들러가 호출되어야 한다.', () => {
    render(<LoginForm {...defaultProps} />);

    const idInput = screen.getByLabelText('ID');
    fireEvent.blur(idInput);

    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('로그인 버튼 클릭 시 onSubmit 핸들러가 호출되어야 한다.', () => {
    render(<LoginForm {...defaultProps} />);

    const loginButton = screen.getByTestId('login');
    fireEvent.click(loginButton);

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('로그인 중일 때 입력 필드와 버튼이 비활성화 되어야 한다.', () => {
    render(<LoginForm {...defaultProps} isLoading={true} />);

    expect(screen.getByLabelText('ID')).toBeDisabled();
    expect(screen.getByLabelText('Password')).toBeDisabled();
    expect(screen.getByTestId('login')).toBeDisabled();
  });

  it('비밀번호 보기 토글 버튼을 누르면 비밀번호가 보였다가 숨겨져야 한다.', () => {
    render(<LoginForm {...defaultProps} />);
    
    const passwordInput = screen.getByLabelText('Password');
    const toggleButton = screen.getByLabelText('비밀번호 보기 토글');

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('입력값에 오류가 있을 경우 helperText가 표시되어야 한다.', () => {
    const errorProps = {
      ...defaultProps,
      errors: { loginId: 'ID를 입력해주세요.', password: '비밀번호를 입력해주세요.' },
    };
    render(<LoginForm {...errorProps} />);

    expect(screen.getByText('ID를 입력해주세요.')).toBeInTheDocument();
    expect(screen.getByText('비밀번호를 입력해주세요.')).toBeInTheDocument();
  });
});
