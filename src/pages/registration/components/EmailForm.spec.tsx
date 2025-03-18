import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmailForm from './EmailForm';
import { REGISTRATION_STATUS } from '@constants/RegistrationConstants';

// TextField와 Select 컴포넌트 모킹
vi.mock('@components/TextField', () => ({
  default: ({ value, onChange, onBlur, placeholder, disabled, error, helperText }: any) => (
    <div>
      <input
        data-testid={placeholder || 'text-field'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error}
      />
      {helperText && <span>{helperText}</span>}
    </div>
  ),
}));

vi.mock('@components/Select', () => ({
  default: ({ value, onChange, onBlur, disabled, error, children }: any) => (
    <div>
      <select
        data-testid='domain-select'
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={error}
      >
        {children}
      </select>
    </div>
  ),
}));

vi.mock('@components/Button', () => ({
  default: ({ onClick, disabled, children }: any) => (
    <button data-testid='send-button' onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

describe('EmailForm 컴포넌트', () => {
  let onSendEmailMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onSendEmailMock = vi.fn();
  });

  it('완료 상태가 아닐 때 입력 필드가 비활성화되어야 한다', () => {
    // Given: 진행중 상태와 활성화된 이메일 발송 기능이 주어졌을 때
    const status = REGISTRATION_STATUS.PENDING;
    const isEnabled = true;

    // When: 컴포넌트를 렌더링하면
    render(<EmailForm status={status} onSendEmail={onSendEmailMock} isEnabled={isEnabled} />);

    // Then: 입력 필드가 비활성화되어야 함
    expect(screen.getByTestId('이메일 주소')).toBeDisabled();
    expect(screen.getByTestId('domain-select')).toBeDisabled();
    expect(screen.getByTestId('send-button')).toBeDisabled();
  });

  it('완료 상태이지만 이메일 발송 기능이 비활성화되었을 때 입력 필드가 비활성화되어야 한다', () => {
    // Given: 완료 상태와 비활성화된 이메일 발송 기능이 주어졌을 때
    const status = REGISTRATION_STATUS.COMPLETED;
    const isEnabled = false;

    // When: 컴포넌트를 렌더링하면
    render(<EmailForm status={status} onSendEmail={onSendEmailMock} isEnabled={isEnabled} />);

    // Then: 입력 필드가 비활성화되어야 함
    expect(screen.getByTestId('이메일 주소')).toBeDisabled();
    expect(screen.getByTestId('domain-select')).toBeDisabled();
    expect(screen.getByTestId('send-button')).toBeDisabled();
  });

  it('완료 상태이고 이메일 발송 기능이 활성화되었을 때 입력 필드가 활성화되어야 한다', () => {
    // Given: 완료 상태와 활성화된 이메일 발송 기능이 주어졌을 때
    const status = REGISTRATION_STATUS.COMPLETED;
    const isEnabled = true;

    // When: 컴포넌트를 렌더링하면
    render(<EmailForm status={status} onSendEmail={onSendEmailMock} isEnabled={isEnabled} />);

    // Then: 입력 필드가 활성화되어야 함
    expect(screen.getByTestId('이메일 주소')).not.toBeDisabled();
    expect(screen.getByTestId('domain-select')).not.toBeDisabled();
  });

  it('이메일 주소와 도메인이 입력되지 않았을 때 발송 버튼이 비활성화되어야 한다', () => {
    // Given: 완료 상태와 활성화된 이메일 발송 기능이 주어졌을 때
    const status = REGISTRATION_STATUS.COMPLETED;
    const isEnabled = true;

    // When: 컴포넌트를 렌더링하면
    render(<EmailForm status={status} onSendEmail={onSendEmailMock} isEnabled={isEnabled} />);

    // Then: 발송 버튼이 비활성화되어야 함
    expect(screen.getByTestId('send-button')).toBeDisabled();
  });

  it('이메일 주소와 도메인이 모두 입력되었을 때 발송 버튼이 활성화되어야 한다', async () => {
    // Given: 완료 상태와 활성화된 이메일 발송 기능이 주어졌을 때
    const status = REGISTRATION_STATUS.COMPLETED;
    const isEnabled = true;

    // When: 컴포넌트를 렌더링하고 이메일 주소와 도메인을 입력하면
    render(<EmailForm status={status} onSendEmail={onSendEmailMock} isEnabled={isEnabled} />);

    // 이메일 주소 입력
    const emailInput = screen.getByTestId('이메일 주소');
    fireEvent.change(emailInput, { target: { value: 'test' } });

    // 도메인 선택
    const domainSelect = screen.getByTestId('domain-select');
    fireEvent.change(domainSelect, { target: { value: 'gmail.com' } });

    // Then: 발송 버튼이 활성화되어야 함
    await waitFor(() => {
      expect(screen.getByTestId('send-button')).not.toBeDisabled();
    });
  });

  it('로딩 중일 때 발송 버튼이 비활성화되어야 한다', async () => {
    // Given: 완료 상태, 활성화된 이메일 발송 기능, 로딩 상태가 주어졌을 때
    const status = REGISTRATION_STATUS.COMPLETED;
    const isEnabled = true;
    const isLoading = true;

    // When: 컴포넌트를 렌더링하고 이메일 주소와 도메인을 입력하면
    render(
      <EmailForm
        status={status}
        onSendEmail={onSendEmailMock}
        isEnabled={isEnabled}
        isLoading={isLoading}
      />,
    );

    // 이메일 주소 입력
    const emailInput = screen.getByTestId('이메일 주소');
    fireEvent.change(emailInput, { target: { value: 'test' } });

    // 도메인 선택
    const domainSelect = screen.getByTestId('domain-select');
    fireEvent.change(domainSelect, { target: { value: 'gmail.com' } });

    // Then: 발송 버튼이 비활성화되어야 함
    expect(screen.getByTestId('send-button')).toBeDisabled();
  });
});
