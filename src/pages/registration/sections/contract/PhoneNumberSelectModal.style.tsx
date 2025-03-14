import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogActions, Box } from '@mui/material';
import TableCell from '@components/Table/TableCell';

export const StyledDialog = styled(Dialog)(({}) => ({
  '& .MuiDialog-paper': {
    borderRadius: 8,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    margin: '32px',
    maxWidth: '600px',
    width: '100%',
  },
  '& .MuiDialog-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 3,
}));

export const StyledTableContainer = styled(Box)(({}) => ({
  width: 552,
  height: 249,
  overflow: 'auto',
  '& .MuiTableCell-root': {
    padding: 0,
  },
}));

export const StyledDialogActions = styled(DialogActions)(({}) => ({
  width: 600,
  height: 68,
  gap: 8,
  paddingTop: 12,
  paddingRight: 24,
  paddingBottom: 24,
  paddingLeft: 24,
}));

export const RadioIcon = styled(Box)`
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 50%;
`;

export const CheckedRadioIcon = styled(Box)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
  }
`;

export const StyledTableHeaderCell = styled(TableCell)(({}) => ({
  backgroundColor: '#f5f5f5',
  fontWeight: 500,
}));
