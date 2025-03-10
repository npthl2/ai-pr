import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogActions, Box } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 8,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    margin: '32px',
    maxWidth: '648px',
    width: '100%',
  },
  '& .MuiDialog-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  width: 600,
  height: 60,
  paddingTop: 16,
  paddingRight: 24,
  paddingBottom: 16,
  paddingLeft: 24,
}));

export const StyledTableContainer = styled(Box)(({ theme }) => ({
  width: 552,
  height: 249,
  '& .MuiTableCell-root': {
    padding: 0,
  },
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  width: 600,
  height: 68,
  gap: 8,
  paddingTop: 12,
  paddingRight: 24,
  paddingBottom: 24,
  paddingLeft: 24,
}));
