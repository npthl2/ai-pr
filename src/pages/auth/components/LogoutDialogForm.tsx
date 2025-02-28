import { useEffect, useState } from 'react';
import { DialogLayout } from '../LogoutDialogLayout';
// import { Snackbar, Box, Typography} from '@mui/material';
import { StyledSnackbar, SnackbarContentBox, SnackbarText } from '../LogoutSnackbar.styled';
interface LogoutDialogProps {
  isConfirmOpen: boolean;
  isCompleteOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onCompleteClose: () => void;
}

const LogoutDialog = ({
  isConfirmOpen,
  isCompleteOpen,
  onConfirm,
  onCancel,
  onCompleteClose,
}: LogoutDialogProps) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // 부모로부터 isCompleteOpen이 true로 전달되면 Snackbar를 오픈
  useEffect(() => {
    // console.log('LogoutDialog: isCompleteOpen changed:', isCompleteOpen);
    if (isCompleteOpen) {
      setOpenSnackbar(true);
    }
  }, [isCompleteOpen]);

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
      >
        로그아웃 하시겠습니까?
      </DialogLayout>

      {/* 로그아웃 완료 스낵바 (커스텀 스타일 적용) */}
      <StyledSnackbar
        open={openSnackbar}
        autoHideDuration={1000} // 원하는 노출 시간(ms)로 설정 (예: 60000ms = 60초)
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

export default LogoutDialog;
