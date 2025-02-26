import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

type DialogSize = 'small' | 'medium' | 'large';

interface DialogProps extends MuiDialogProps {
  size?: DialogSize;
  title: string;
  content: string;
  closeLabel?: string;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const StyledDialog = styled(MuiDialog, { shouldForwardProp: (prop) => prop !== 'size' })<{
  size: DialogSize;
}>(({ theme, size }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.background.paper,
    width: {
      small: 400,
      medium: 600,
      large: 1000,
    }[size],
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  padding: '16px 24px',
});

const StyledButton = styled(Button)({
  padding: '5px 8px',
});

const StyledDialogContent = styled(DialogContent)({
  padding: '10px 24px',
});

const StyledDialogActions = styled(DialogActions)({
  padding: '18px 24px',
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: '24px',
  top: '16px',
  padding: 0,
  color: theme.palette.grey[500],
  ['& .MuiSvgIcon-root']: {
    fontSize: '16px',
  },
}));

const Dialog = ({
  open,
  size = 'medium',
  title,
  content,
  closeLabel = '취소',
  confirmLabel = '확인',
  onClose,
  onConfirm,
}: DialogProps) => {
  return (
    <StyledDialog open={open} size={size} onClose={onClose}>
      <StyledDialogTitle>
        <Typography variant='h6' sx={(theme) => ({ color: theme.palette.text.primary })}>
          {title}
        </Typography>
        <StyledIconButton onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <Typography variant='body1' sx={(theme) => ({ color: theme.palette.text.primary })}>
          {content}
        </Typography>
      </StyledDialogContent>
      <StyledDialogActions>
        {closeLabel && (
          <StyledButton
            onClick={onClose}
            variant='outlined'
            sx={(theme) => ({ borderColor: theme.palette.grey[200] })}
          >
            <Typography variant='body1' sx={(theme) => ({ color: theme.palette.text.primary })}>
              {closeLabel}
            </Typography>
          </StyledButton>
        )}
        {onConfirm && (
          <StyledButton onClick={onConfirm} color='primary' variant='contained'>
            <Typography
              variant='body1'
              sx={(theme) => ({ color: theme.palette.primary.contrastText })}
            >
              {confirmLabel}
            </Typography>
          </StyledButton>
        )}
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default Dialog;
