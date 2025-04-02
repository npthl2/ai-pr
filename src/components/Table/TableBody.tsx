import React from 'react';
import TableRow from './TableRow';
import TableCell from './TableCell';
import { TableBody as MuiTableBody } from '@mui/material';
interface TableBodyProps<T> {
  content: T[];
  columns: {
    key: string;
    label: string;
    render?: (item: T) => React.ReactNode;
  }[];
  emptyMessage?: string;
}

function TableBody<T>({
  content,
  columns,
  emptyMessage = '데이터가 없습니다.',
}: TableBodyProps<T>) {

  if (!content || content.length === 0) {
    return (
      <MuiTableBody>
        <TableRow>
          <TableCell colSpan={columns.length} style={{ textAlign: 'center' }}>
            {emptyMessage}
          </TableCell>
        </TableRow>
      </MuiTableBody>
    );
  }

  return (
    <MuiTableBody>
      {content.map((item, index) => (
        <TableRow key={index}>
          {columns.map((column) => (
            <TableCell key={column.key}>
              {column.render ? column.render(item) : (item as any)[column.key]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </MuiTableBody>
  );
}

export default TableBody;
