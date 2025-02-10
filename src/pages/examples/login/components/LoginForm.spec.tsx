import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('로그인 페이지에서', () => {
  const mockOnChange = vi.fn();
  const mockOnSubmit = vi.fn();
  const defaultProps = {
    formData: { emailAddress: '', password: '' },
    isLoading: false,
    onSubmit: mockOnSubmit,
    onChange: mockOnChange,
  };

  it('최초 진입할 때 로그인 폼이 렌더링 되어야 한다.', () => {
    render(<LoginForm {...defaultProps} />);
    
    expect(screen.getByLabelText('아이디')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
    expect(screen.getByText('로그인')).toBeInTheDocument();
  });

  it('로그인 중 일때 로그인 중 텍스트가 표시되어야 한다.', () => {
    render(<LoginForm {...defaultProps} isLoading={true} />);
    
    expect(screen.getByText('로그인 중...')).toBeInTheDocument();
    expect(screen.getByLabelText('아이디')).toBeDisabled();
    expect(screen.getByLabelText('비밀번호')).toBeDisabled();
  });

  it('비밀번호 보기 토글 버튼을 눌렀을 때 비밀번호 입력한 비밀번호가 보여야 한다.', () => {
    const passwordText = 'a1234567';
    defaultProps.formData.password = passwordText;
    render(<LoginForm {...defaultProps} />);
    
    const passwordInput = screen.getByLabelText('비밀번호');
    const toggleButton = screen.getByLabelText('비밀번호 보기 토글');

    expect(passwordInput).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should call onChange when input values change', () => {
    render(<LoginForm {...defaultProps} />);
    
    const emailInput = screen.getByLabelText('아이디');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('should call onSubmit when login button is clicked', () => {
    render(<LoginForm {...defaultProps} />);
    
    const loginButton = screen.getByText('로그인');
    fireEvent.click(loginButton);
    
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});

describe('로그인중 일때', () => {
  it('로그인 중 텍스트가 표시되어야 한다.', () => {
    const mockOnChange = vi.fn();
    const mockOnSubmit = vi.fn();
    const defaultProps = {
      formData: { emailAddress: '', password: '' },
      isLoading: false,
      onSubmit: mockOnSubmit,
      onChange: mockOnChange,
    };

    render(<LoginForm {...defaultProps} isLoading={true} />);
    
    expect(screen.getByText('로그인 중...')).toBeInTheDocument();
    expect(screen.getByLabelText('아이디')).toBeDisabled();
    expect(screen.getByLabelText('비밀번호')).toBeDisabled();
  });
});


