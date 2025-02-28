import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LogoutDialogForm from './LogoutDialogForm';

describe('LogoutDialog 컴포넌트', () => {
  let mockOnConfirm: ReturnType<typeof vi.fn>;
  let mockOnCancel: ReturnType<typeof vi.fn>;
  let mockOnCompleteClose: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnConfirm = vi.fn();
    mockOnCancel = vi.fn();
    mockOnCompleteClose = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('로그아웃 확인 팝업이 열리면 텍스트가 표시되어야 한다.', () => {
    render(
      <LogoutDialogForm
        isConfirmOpen={true}
        isCompleteOpen={false}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        onCompleteClose={mockOnCompleteClose}
      />
    );

    expect(screen.getByText('로그아웃 하시겠습니까?')).toBeInTheDocument();
    expect(screen.getByText('확인')).toBeInTheDocument();
    expect(screen.getByText('취소')).toBeInTheDocument();
  });

  it('확인 버튼을 클릭하면 onConfirm 핸들러가 호출되어야 한다.', () => {
    render(
      <LogoutDialogForm
        isConfirmOpen={true}
        isCompleteOpen={false}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        onCompleteClose={mockOnCompleteClose}
      />
    );

    fireEvent.click(screen.getByText('확인'));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('취소 버튼을 클릭하면 onCancel 핸들러가 호출되어야 한다.', () => {
    render(
      <LogoutDialogForm
        isConfirmOpen={true}
        isCompleteOpen={false}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        onCompleteClose={mockOnCompleteClose}
      />
    );

    fireEvent.click(screen.getByText('취소'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('로그아웃 완료 스낵바가 열리면 메시지가 표시되어야 한다.', () => {
    render(
      <LogoutDialogForm
        isConfirmOpen={false}
        isCompleteOpen={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        onCompleteClose={mockOnCompleteClose}
      />
    );

    expect(screen.getByText('로그아웃 되었습니다.')).toBeInTheDocument();
  });

  it('스낵바가 일정 시간 후 자동으로 닫히고 onCompleteClose가 호출되어야 한다.', async () => {
    render(
      <LogoutDialogForm
        isConfirmOpen={false}
        isCompleteOpen={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        onCompleteClose={mockOnCompleteClose}
      />
    );

    expect(screen.getByText('로그아웃 되었습니다.')).toBeInTheDocument();

    // 1000ms 후 onCompleteClose가 호출되었는지 확인
    await waitFor(() => {
      expect(mockOnCompleteClose).toHaveBeenCalled();
    }, { timeout: 1500 });
  });
});
