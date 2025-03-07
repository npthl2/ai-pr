import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogActions, Button, Box } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 8,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'relative',
}));

export const StyledTableContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 4,
  maxHeight: 400,
  overflow: 'auto',
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
}));

export const SelectButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  padding: theme.spacing(1, 3),
  borderRadius: 4,
  '&:hover': {
    backgroundColor: '#333',
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey[500],
  },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: theme.spacing(1, 3),
  borderRadius: 4,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));
