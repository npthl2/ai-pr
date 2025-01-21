import { DialogContent, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createPortal } from 'react-dom';
import { DialogLayoutProps } from './DialogLayout.model';
import {
  DialogStyled,
  DialogTitleStyled,
  CloseButton,
  DialogActionsStyled,
} from './DialogLayout.styled';

export const DialogLayout = ({
  open,
  onClose,
  title = '알림',
  children,
  isTopmost,
  type = 'none',
  onConfirm,
  onCancel,
  onCloseDialog,
  customActions,
  confirmText = '확인',
  cancelText = '취소',
}: DialogLayoutProps) => {
  const modalRoot = document.getElementById('modal');

  if (!modalRoot) return null;

  const handleClose = () => {
    onCloseDialog?.();
    onClose();
  };

  const renderActions = () => {
    switch (type) {
      case 'alert':
        return (
          <DialogActionsStyled>
            <Button variant='contained' onClick={handleClose}>
              {confirmText}
            </Button>
          </DialogActionsStyled>
        );
      case 'confirm':
        return (
          <DialogActionsStyled>
            <Button
              variant='outlined'
              onClick={() => {
                onCancel?.();
                onClose();
              }}
            >
              {cancelText}
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
            >
              {confirmText}
            </Button>
          </DialogActionsStyled>
        );
      case 'custom':
        return <DialogActionsStyled>{customActions}</DialogActionsStyled>;
      default:
        return null;
    }
  };

  return createPortal(
    <DialogStyled
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
      isTopmost={isTopmost}
      TransitionProps={{
        enter: false,
        exit: false,
      }}
      slotProps={{
        backdrop: {
          timeout: 0,
        },
      }}
    >
      <DialogTitleStyled>
        {title}
        <CloseButton aria-label='close' onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
      </DialogTitleStyled>
      <DialogContent>{children}</DialogContent>
      {renderActions()}
    </DialogStyled>,
    modalRoot,
  );
};
