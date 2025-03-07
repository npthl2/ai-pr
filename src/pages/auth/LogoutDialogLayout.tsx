import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createPortal } from 'react-dom';
import { DialogLayoutProps } from './LogoutDialogLayout.model';
import {
  DialogStyled,
  DialogTitleStyled,
  CloseButton,
  DialogActionsStyled,
  // DialogContentStyled,
  DialogContentWrapper,
} from './LogoutDialogLayout.styled';

export const DialogLayout = ({
  open,
  onClose,
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
              data-testid='logout-cancel-button'
            >
              {cancelText}
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
              data-testid='logout-confirm-button'
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
      data-testid='logout-dialog'
    >
      <DialogTitleStyled>
        <CloseButton aria-label='close' onClick={handleClose} data-testid='logout-close-button'>
          <CloseIcon />
        </CloseButton>
      </DialogTitleStyled>
      <DialogContentWrapper>{children}</DialogContentWrapper>
      {renderActions()}
    </DialogStyled>,
    modalRoot,
  );
};
