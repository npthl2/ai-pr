import { Dialog, DialogContent, DialogTitle, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { createPortal } from 'react-dom';
import { DialogLayoutProps } from '@model/dialog';

const DialogStyled = styled(Dialog, {
    shouldForwardProp: (prop) => prop !== 'isTopmost'
})<{ isTopmost: boolean }>(({ theme, isTopmost }) => ({
    '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        display: isTopmost ? 'block' : 'none',
        transition: 'none',
    },
    '& .MuiDialog-paper': {
        transition: 'none',
        backgroundColor: theme.palette.background.paper,
        backgroundImage: 'none',
    },
    '& .MuiDialogTitle-root, & .MuiDialogContent-root': {
        backgroundColor: 'inherit',
        color: theme.palette.text.primary,
    }
}));

const DialogTitleStyled = styled(DialogTitle)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    margin: 0,
});

const CloseButton = styled(IconButton)({
    position: 'absolute',
    right: 8,
    top: 8,
});

const DialogActionsStyled = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
}));

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
    cancelText = '취소'
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
                        <Button variant="contained" onClick={handleClose}>
                            {confirmText}
                        </Button>
                    </DialogActionsStyled>
                );
            case 'confirm':
                return (
                    <DialogActionsStyled>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                onCancel?.();
                                onClose();
                            }}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            variant="contained"
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
            maxWidth="sm"
            fullWidth
            isTopmost={isTopmost}
            TransitionProps={{
                enter: false,
                exit: false
            }}
            slotProps={{
                backdrop: {
                    timeout: 0,
                }
            }}
        >
            <DialogTitleStyled>
                {title}
                <CloseButton aria-label="close" onClick={handleClose}>
                    <CloseIcon />
                </CloseButton>
            </DialogTitleStyled>
            <DialogContent>{children}</DialogContent>
            {renderActions()}
        </DialogStyled>,
        modalRoot
    );
}; 