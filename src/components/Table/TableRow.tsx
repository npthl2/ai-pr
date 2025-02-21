import { TableRow as MuiTableRow, TableRowProps as MuiTableRowProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export type TableRowSize = 'medium' | 'small';
export type TableRowVariant = 'body' | 'head';

interface CustomTableCellRowProps extends MuiTableRowProps {
  size?: 'small' | 'medium';
  variant?: TableRowVariant;
  disableEffect?: boolean;
}

const StyledTableHeadRow = styled(MuiTableRow, {
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size: TableRowSize }>(({ theme, size }) => ({
  padding: 0,
  margin: 0,
  backgroundColor: theme.palette.grey[50],
  height: {
    small: 33,
    medium: 37,
  }[size],

  '& .MuiTypography-root': {
    color: theme.palette.text.secondary,
    fontSize: 14,
    weight: 600,
  },
}));

const StyledTableCellRow = styled(MuiTableRow, {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'disableEffect',
})<{ size: TableRowSize; disableEffect: boolean }>(({ theme, size, disableEffect }) => ({
  padding: 0,
  margin: 0,
  backgroundColor: 'inherit',
  height: {
    small: 33,
    medium: 37,
  }[size],

  ...(disableEffect === false && {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.action.selected,
    },
  }),

  '& .MuiTypography-root': {
    color: theme.palette.text.primary,
    fontSize: 14,
    weight: 400,
  },
}));

const TableCellRow = ({
  children,
  size = 'medium',
  disableEffect = false,
  variant = 'body',
  ...props
}: CustomTableCellRowProps) => {
  return (
    <>
      {variant === 'head' ? (
        <StyledTableHeadRow size={size} {...props}>
          {children}
        </StyledTableHeadRow>
      ) : (
        <StyledTableCellRow size={size} disableEffect={disableEffect} {...props}>
          {children}
        </StyledTableCellRow>
      )}
    </>
  );
};

export default TableCellRow;
