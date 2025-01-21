import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DialogStyled = styled(Dialog, {
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

export const DialogTitleStyled = styled(DialogTitle)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    margin: 0,
});

export const CloseButton = styled(IconButton)({
    position: 'absolute',
    right: 8,
    top: 8,
});

export const DialogActionsStyled = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
})); 