import { useEffect, useState } from 'react';
import { DialogLayout } from '../LogoutDialogLayout';
import { StyledSnackbar, SnackbarContentBox, SnackbarText } from '../LogoutSnackbar.styled';

interface LogoutDialogProps {
  isConfirmOpen: boolean;
  isCompleteOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onCompleteClose: () => void;
}

const LogoutDialogForm = ({
  isConfirmOpen,
  isCompleteOpen,
  onConfirm,
  onCancel,
  onCompleteClose,
}: LogoutDialogProps) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (isCompleteOpen) {
      setOpenSnackbar(true);
      const timer = setTimeout(() => {
        setOpenSnackbar(false);
        onCompleteClose();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isCompleteOpen, onCompleteClose]);

  return (
    <>
      {/* 로그아웃 확인 팝업 */}
      <DialogLayout
        open={isConfirmOpen}
        onClose={onCancel}
        type="confirm"
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmText="확인"
        cancelText="취소"
        isTopmost={false}
        data-testid="logout-dialog"
      >
        <div data-testid="logout-dialog-message">로그아웃 하시겠습니까?</div>
      </DialogLayout>

      {/* 로그아웃 완료 스낵바 */}
      <StyledSnackbar
        open={openSnackbar}
        autoHideDuration={10000}
        onClose={() => {
          setOpenSnackbar(false);
          onCompleteClose();
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        data-testid="logout-snackbar"
      >
        <SnackbarContentBox>
          <SnackbarText data-testid="logout-snackbar-message">로그아웃 되었습니다.</SnackbarText>
        </SnackbarContentBox>
      </StyledSnackbar>
    </>
  );
};

export default LogoutDialogForm;
