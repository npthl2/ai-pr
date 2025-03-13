import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionButtons from './ActionButtons';
import { REGISTRATION_STATUS } from '@constants/RegistrationConstants';

describe('ActionButtons 컴포넌트', () => {
  // Given-When-Then 패턴으로 테스트 작성

  it('홈으로 이동 버튼이 항상 표시되어야 한다', () => {
    // Given: 진행중 상태와 콜백 함수가 주어졌을 때
    const status = REGISTRATION_STATUS.PENDING;
    const onGoHome = vi.fn();
    const onGoCustomerSearch = vi.fn();

    // When: 컴포넌트를 렌더링하면
    render(
      <ActionButtons status={status} onGoHome={onGoHome} onGoCustomerSearch={onGoCustomerSearch} />,
    );

    // Then: 홈으로 이동 버튼이 표시되어야 함
    expect(screen.getByText('홈으로 이동')).toBeInTheDocument();
  });

  it('진행중 상태일 때 고객조회로 이동 버튼이 표시되지 않아야 한다', () => {
    // Given: 진행중 상태와 콜백 함수가 주어졌을 때
    const status = REGISTRATION_STATUS.PENDING;
    const onGoHome = vi.fn();
    const onGoCustomerSearch = vi.fn();

    // When: 컴포넌트를 렌더링하면
    render(
      <ActionButtons status={status} onGoHome={onGoHome} onGoCustomerSearch={onGoCustomerSearch} />,
    );

    // Then: 고객조회로 이동 버튼이 표시되지 않아야 함
    expect(screen.queryByText('고객조회로 이동')).not.toBeInTheDocument();
  });

  it('실패 상태일 때 고객조회로 이동 버튼이 표시되지 않아야 한다', () => {
    // Given: 실패 상태와 콜백 함수가 주어졌을 때
    const status = REGISTRATION_STATUS.FAILED;
    const onGoHome = vi.fn();
    const onGoCustomerSearch = vi.fn();

    // When: 컴포넌트를 렌더링하면
    render(
      <ActionButtons status={status} onGoHome={onGoHome} onGoCustomerSearch={onGoCustomerSearch} />,
    );

    // Then: 고객조회로 이동 버튼이 표시되지 않아야 함
    expect(screen.queryByText('고객조회로 이동')).not.toBeInTheDocument();
  });

  it('완료 상태일 때 고객조회로 이동 버튼이 표시되어야 한다', () => {
    // Given: 완료 상태와 콜백 함수가 주어졌을 때
    const status = REGISTRATION_STATUS.COMPLETED;
    const onGoHome = vi.fn();
    const onGoCustomerSearch = vi.fn();

    // When: 컴포넌트를 렌더링하면
    render(
      <ActionButtons status={status} onGoHome={onGoHome} onGoCustomerSearch={onGoCustomerSearch} />,
    );

    // Then: 고객조회로 이동 버튼이 표시되어야 함
    expect(screen.getByText(/고객조회로 이동/)).toBeInTheDocument();
  });

  it('홈으로 이동 버튼 클릭 시 onGoHome 콜백이 호출되어야 한다', () => {
    // Given: 상태와 콜백 함수가 주어졌을 때
    const status = REGISTRATION_STATUS.COMPLETED;
    const onGoHome = vi.fn();
    const onGoCustomerSearch = vi.fn();

    // When: 컴포넌트를 렌더링하고 홈으로 이동 버튼을 클릭하면
    render(
      <ActionButtons status={status} onGoHome={onGoHome} onGoCustomerSearch={onGoCustomerSearch} />,
    );

    fireEvent.click(screen.getByText('홈으로 이동'));

    // Then: onGoHome 콜백이 호출되어야 함
    expect(onGoHome).toHaveBeenCalledTimes(1);
  });

  it('고객조회로 이동 버튼 클릭 시 onGoCustomerSearch 콜백이 호출되어야 한다', () => {
    // Given: 완료 상태와 콜백 함수가 주어졌을 때
    const status = REGISTRATION_STATUS.COMPLETED;
    const onGoHome = vi.fn();
    const onGoCustomerSearch = vi.fn();

    // When: 컴포넌트를 렌더링하고 고객조회로 이동 버튼을 클릭하면
    render(
      <ActionButtons status={status} onGoHome={onGoHome} onGoCustomerSearch={onGoCustomerSearch} />,
    );

    fireEvent.click(screen.getByText(/고객조회로 이동/));

    // Then: onGoCustomerSearch 콜백이 호출되어야 함
    expect(onGoCustomerSearch).toHaveBeenCalledTimes(1);
  });
});
