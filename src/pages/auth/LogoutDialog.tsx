import { useEffect, useState } from 'react';
import { DialogLayout } from './LogoutDialogLayout';
import { Snackbar, Box, Typography } from '@mui/material';
import Button from '@components/Button';

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

  useEffect(() => {
    if (isCompleteOpen) {
      setOpenSnackbar(true);
      const timer = setTimeout(() => {
        setOpenSnackbar(false);
        onCompleteClose();
      }, 3000); // 3초 후 자동 닫힘

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
      >
        로그아웃 하시겠습니까?
      </DialogLayout>

      {/* 로그아웃 완료 스낵바 (커스텀 스타일 적용) */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSnackbar(false);
          onCompleteClose();
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '300px',
          backgroundColor: '#333', // 검정 배경
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: 3,
          padding: '16px 24px',
        }}
      >
        {/* ✅ 텍스트를 Typography로 감싸 해결 */}
        <Box>
          <Typography sx={{ color: '#fff', fontSize: '16px' }}>
            로그아웃 되었습니다.
          </Typography>
        </Box>
      </Snackbar>
    </>
  );
};

export default LogoutDialog;
