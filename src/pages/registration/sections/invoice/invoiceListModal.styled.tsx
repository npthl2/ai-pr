import { TableContainer, Table, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const InvoiceListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  marginTop: '10px',
});

export const TableTitleWrapper = styled(Box)({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});

export const InvoiceListTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: '233px',
  minHeight: '233px',
  overflowY: 'auto',
  position: 'relative',

  '& .MuiTableHead-root': {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
  },
}));

export const InvoiceListTable = styled(Table)(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: 0,

  '& .MuiTableCell-root': {
    borderBottom: 'none',
  },
  '& .MuiTableHead-root': {
    '& .MuiTableCell-root': {
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
    },
  },
  '& .MuiTableBody-root': {
    '& .MuiTableRow-root': {
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      '&:last-child': {
        borderBottom: 'none',
      },
    },
  },
}));
