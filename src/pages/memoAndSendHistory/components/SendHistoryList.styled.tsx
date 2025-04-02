import { TableContainer, Table, Box, Switch, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import AscIcon from '@mui/icons-material/ArrowDownward';

export const SendHistoryBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const SendHistoryTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: '318px',
  minHeight: '318px',
  overflowY: 'auto',
  position: 'relative',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  overflowX: 'hidden',
  marginTop: '4px',
}));

export const HeaderCellWrapper = styled(Box)({
  minWidth: 'auto',
  display: 'flex',
  alignItems: 'center',
  padding: '4px',
  gap: '4px',
});

export const SortIconButton = styled(Box)({
  minWidth: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  '& > svg': {
    fontSize: '16px',
  },
});

export const StyledAscIcon = styled(AscIcon)({
  marginBottom: '-1px',
});

export const SendHistoryTable = styled(Table)(({ theme }) => ({
  width: '825px',
  '& .MuiTableCell-root': {
    borderBottom: 'none',
  },
  '& .MuiTableHead-root': {
    '& .MuiTableRow-root': {
      height: '33px',
      backgroundColor: '#F7F9FA',
    },
    '& .MuiTableCell-root': {
      borderTop: '1px solid #D1D6DA',
      borderBottom: '1px solid #D1D6DA',
      padding: '0 16px',
      '&:hover': {
        backgroundColor: '#F3F4F6',
      },
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

export const HeaderWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  margin-right: 16px;
`;

export const CheckboxContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ToggleContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
});

export const FilterContainer = styled(Box)`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const StyledTablePagination = styled(TablePagination)({
  width: '852px',
  height: '44px',
  padding: '2px 0',
  borderBottom: 'none',
  '& .MuiTablePagination-root': {
    gap: '26px',
  },
});
