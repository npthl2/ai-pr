import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('로그인 페이지에 최초 진입 할 때', () => {
  it('LoginForm 컴포넌트가 렌더링 되어야 한다.', () => {
    render(
      <LoginForm 
        formData={{ emailAddress: '', password: '' }}
        isLoading={false}
        onSubmit={() => {}}
        onChange={() => {}}
      />
    );
    const loginButtonText = screen.getByText(/로그인/i);

    // 내부 구현 검증을 피하고 최종 사용자가 육안으로 확인 할 수 있는 요소로 테스트 하는 것을 권장
    expect(loginButtonText).toBeInTheDocument();
  });
});
