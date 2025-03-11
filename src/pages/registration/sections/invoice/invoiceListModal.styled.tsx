import { TableContainer, Table } from '@mui/material';
import { styled } from '@mui/material/styles';

export const InvoiceListTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: '220px',
  minHeight: '220px',
  overflowY: 'auto',
  position: 'relative',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,

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
