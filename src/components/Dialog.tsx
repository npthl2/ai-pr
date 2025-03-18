import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  Button,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
type DialogSize = 'small' | 'medium' | 'medium-large' | 'large';

interface DialogProps extends Omit<MuiDialogProps, 'content'> {
  size?: DialogSize;
  title: string;
  content: string | React.ReactNode;
  closeLabel?: string;
  confirmLabel?: string;
  confirmIcon?: React.ReactNode;
  isConfirmDisabled?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}
const StyledDialog = styled(MuiDialog, { shouldForwardProp: (prop) => prop !== 'size' })<{
  size: DialogSize;
}>(({ theme, size }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.background.paper,
    minWidth: {
      small: 400,
      medium: 600,
      'medium-large': 800,
      large: 1000,
    }[size],
  },
}));
const StyledDialogTitle = styled(Box)({
  padding: '16px 24px',
  position: 'relative',
});
const StyledButton = styled(Button)({
  padding: '5px 8px',
});
const StyledDialogContent = styled(DialogContent)({
  padding: '10px 24px',
  whiteSpace: 'pre-line', // content 내에 줄바꿈 허용
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
  confirmIcon,
  onClose,
  onConfirm,
  isConfirmDisabled = false,
  ...props
}: DialogProps) => {
  return (
    <StyledDialog open={open} size={size} onClose={onClose} {...props}>
      <StyledDialogTitle>
        <Typography
          variant='h6'
          sx={(theme) => ({ color: theme.palette.text.primary })}
          data-testid='component-dialog-title'
        >
          {title}
        </Typography>
        <StyledIconButton onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
      </StyledDialogTitle>
      <StyledDialogContent data-testid='component-dialog-content'>{content}</StyledDialogContent>
      <StyledDialogActions>
        {closeLabel && (
          <StyledButton
            onClick={onClose}
            variant='outlined'
            sx={(theme) => ({ borderColor: theme.palette.grey[200] })}
            data-testid='component-dialog-close-button'
          >
            <Typography variant='body1' sx={(theme) => ({ color: theme.palette.text.primary })}>
              {closeLabel}
            </Typography>
          </StyledButton>
        )}
        {onConfirm && (
          <StyledButton
            onClick={onConfirm}
            color='primary'
            variant='contained'
            disabled={isConfirmDisabled}
            data-testid='component-dialog-confirm-button'
          >
            <Typography
              variant='body1'
              sx={(theme) => ({
                color: theme.palette.primary.contrastText,
                display: 'flex',
                alignItems: 'center',
              })}
            >
              {confirmIcon && confirmIcon}
              {confirmLabel}
            </Typography>
          </StyledButton>
        )}
      </StyledDialogActions>
    </StyledDialog>
  );
};
export default Dialog;
