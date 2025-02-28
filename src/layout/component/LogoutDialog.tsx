import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
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
  return (
    <>
      {/* 로그아웃 확인 팝업 */}
      <Dialog
        open={isConfirmOpen}
        onClose={onCancel}
        aria-labelledby="logout-dialog-title"
      >
        <DialogTitle id="logout-dialog-title">로그아웃</DialogTitle>
        <DialogContent>
          <DialogContentText>
            로그아웃 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={onCancel}>
            취소
          </Button>
          <Button variant="contained" onClick={onConfirm} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>

      {/* 로그아웃 완료 팝업 */}
      <Dialog
        open={isCompleteOpen}
        onClose={onCompleteClose}
        aria-labelledby="logout-complete-dialog-title"
      >
        <DialogTitle id="logout-complete-dialog-title">알림</DialogTitle>
        <DialogContent>
          <DialogContentText>
            로그아웃 되었습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onCompleteClose} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutDialog; 