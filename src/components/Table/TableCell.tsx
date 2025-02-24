import { TableCell as MuiTableCell, TableCellProps as MuiTableCellProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomTableCellProps extends MuiTableCellProps {
  hideborder?: boolean;
}

const StyledTableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) => prop !== 'hideborder',
})<{ hideborder: boolean }>(({ theme, hideborder }) => ({
  margin: 0,
  paddingTop: 0,
  paddingBottom: 0,
  borderBottom: hideborder ? 'none' : `1px solid ${theme.palette.grey[200]}`,
  borderTop: hideborder ? 'none' : `1px solid ${theme.palette.grey[200]}`,

  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.grey[50],
    '& .MuiTypography-root': {
      color: theme.palette.text.secondary,
      fontSize: 14,
      fontWeight: 600,
    },
  },
  '&.MuiTableCell-body': {
    backgroundColor: 'inherit',
  },
}));

const TableCell = ({
  children,
  variant = 'body',
  align = 'left',
  hideborder = false,
  ...props
}: CustomTableCellProps) => {
  return (
    <StyledTableCell variant={variant} hideborder={hideborder} align={align} {...props}>
      {children}
    </StyledTableCell>
  );
};

export default TableCell;
