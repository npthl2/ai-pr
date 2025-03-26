import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ServiceModificationModal from './ServiceModificationBlockModal';
import { ServiceModificationModalType } from '../constants/modalConstants';

describe('ServiceModificationModal 컴포넌트', () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();

  const defaultProps = {
    open: true,
    serviceName: '5G 스페셜',
    additionalServicesCount: 3,
    onClose: mockOnClose,
    onConfirm: mockOnConfirm,
  };

  it('CONFIRM_CHANGE 타입일 때 title과 content가 올바르게 렌더링되어야 한다', () => {
    render(
      <ServiceModificationModal
        {...defaultProps}
        type={ServiceModificationModalType.CONFIRM_CHANGE}
      />,
    );

    expect(screen.getByText('상품 변경 확인')).toBeInTheDocument();
    expect(
      screen.getByText('[5G 스페셜]요금제, 부가서비스 3개로 변경하시겠습니까?'),
    ).toBeInTheDocument();
  });

  it('AGE_RESTRICTION 타입일 때 취소 버튼이 없어야 하고, 안내 문구가 보여야 한다', () => {
    render(
      <ServiceModificationModal
        {...defaultProps}
        type={ServiceModificationModalType.AGE_RESTRICTION}
      />,
    );

    expect(screen.getByText('나이 제한으로 인한 불가 알림')).toBeInTheDocument();
    expect(
      screen.getByText('상품 변경이 불가능합니다. 나이 제한으로 인한 불가입니다.'),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('service-modification-cancel-button')).not.toBeInTheDocument();
  });

  it('TERMINATION_REQUIRED 타입일 때 취소 버튼 없이 확인 버튼만 동작해야 한다', () => {
    render(
      <ServiceModificationModal
        {...defaultProps}
        type={ServiceModificationModalType.TERMINATION_REQUIRED}
      />,
    );

    expect(
      screen.getByText('상품 변경이 불가능합니다. 해지 필요한 부가서비스를 삭제한 후 다시 시도해 주세요.'),
    ).toBeInTheDocument();

    // 취소 버튼 없어야 함
    expect(screen.queryByTestId('service-modification-cancel-button')).not.toBeInTheDocument();

    // 확인 버튼 클릭
    fireEvent.click(screen.getByTestId('service-modification-confirm-button'));
    expect(mockOnClose).toHaveBeenCalled(); // showCancel: false → confirm도 onClose 실행됨
  });

  it('확인 버튼 클릭 시 onConfirm이 호출되어야 한다 (showCancel: true)', () => {
    render(
      <ServiceModificationModal
        {...defaultProps}
        type={ServiceModificationModalType.CONFIRM_SERVICE_CHANGE}
      />,
    );

    fireEvent.click(screen.getByTestId('service-modification-confirm-button'));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('취소 버튼 클릭 시 onClose가 호출되어야 한다 (showCancel: true)', () => {
    render(
      <ServiceModificationModal
        {...defaultProps}
        type={ServiceModificationModalType.CONFIRM_SERVICE_CHANGE}
      />,
    );

    fireEvent.click(screen.getByTestId('service-modification-cancel-button'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('닫기 아이콘 클릭 시 onClose가 호출되어야 한다', () => {
    render(
      <ServiceModificationModal
        {...defaultProps}
        type={ServiceModificationModalType.CONFIRM_SERVICE_CHANGE}
      />,
    );

    const closeButton = screen.getByRole('button', { name: '' }); // IconButton에 label 없을 수 있음
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
