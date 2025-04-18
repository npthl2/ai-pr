import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusMessage from './StatusMessage';
import { REGISTRATION_STATUS } from '@constants/RegistrationConstants';

describe('StatusMessage 컴포넌트', () => {
  // Given-When-Then 패턴으로 테스트 작성

  it('진행중 상태일 때 처리중 메시지와 이미지를 표시해야 한다', () => {
    // Given: 진행중 상태와 고객명이 주어졌을 때
    const customerName = '홍길동';
    const status = REGISTRATION_STATUS.PENDING;

    // When: 컴포넌트를 렌더링하면
    render(<StatusMessage status={status} customerName={customerName} type='REGISTRATION' />);

    // Then: 처리중 메시지와 이미지가 표시되어야 함
    expect(screen.getByText(`${customerName} 고객님의 가입이 처리중입니다.`)).toBeInTheDocument();
    expect(screen.getByAltText('처리중')).toBeInTheDocument();
  });

  it('완료 상태일 때 완료 메시지와 이미지를 표시해야 한다', () => {
    // Given: 완료 상태와 고객명이 주어졌을 때
    const customerName = '홍길동';
    const status = REGISTRATION_STATUS.COMPLETED;

    // When: 컴포넌트를 렌더링하면
    render(<StatusMessage status={status} customerName={customerName} type='REGISTRATION' />);

    // Then: 완료 메시지와 이미지가 표시되어야 함
    expect(
      screen.getByText(`${customerName} 고객님의 가입이 처리 완료되었습니다.`),
    ).toBeInTheDocument();
    expect(screen.getByAltText('완료')).toBeInTheDocument();
  });

  it('실패 상태일 때 실패 메시지를 표시해야 한다', () => {
    // Given: 실패 상태와 고객명이 주어졌을 때
    const customerName = '홍길동';
    const status = REGISTRATION_STATUS.FAILED;

    // When: 컴포넌트를 렌더링하면
    render(<StatusMessage status={status} customerName={customerName} type='REGISTRATION' />);

    // Then: 실패 메시지가 표시되어야 함
    expect(screen.getByText(`${customerName} 고객님의 가입을 실패하였습니다.`)).toBeInTheDocument();
    // 기본 실패 사유가 표시되어야 함
    expect(screen.getByText('가입한도')).toBeInTheDocument();
    expect(screen.getByText('초과')).toBeInTheDocument();
  });
});
