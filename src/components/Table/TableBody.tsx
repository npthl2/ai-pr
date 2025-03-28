import React from 'react';
import { useReactQuery } from '@hooks/useReactQuery';
import TableRow from './TableRow';
import TableCell from './TableCell';

interface TableBodyProps<T> {
  queryKey: string[];
  queryFn: () => Promise<T[]>;
  columns: {
    key: string;
    label: string;
    render?: (item: T) => React.ReactNode;
  }[];
  emptyMessage?: string;
}

function TableBody<T>({
  queryKey,
  queryFn,
  columns,
  emptyMessage = '데이터가 없습니다.',
}: TableBodyProps<T>) {
  const { data, isLoading, isError } = useReactQuery({
    queryKey,
    queryFn,
  });

  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} style={{ textAlign: 'center' }}>
            로딩 중...
          </td>
        </tr>
      </tbody>
    );
  }

  if (isError) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} style={{ textAlign: 'center' }}>
            데이터를 불러오는데 실패했습니다.
          </td>
        </tr>
      </tbody>
    );
  }

  if (!data || data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} style={{ textAlign: 'center' }}>
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((item, index) => (
        <TableRow key={index}>
          {columns.map((column) => (
            <TableCell key={column.key}>
              {column.render ? column.render(item) : (item as any)[column.key]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </tbody>
  );
}

export default TableBody;
