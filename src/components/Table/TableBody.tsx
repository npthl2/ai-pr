import React from 'react';
import TableRow from './TableRow';
import TableCell from './TableCell';

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
  // const { data, isLoading, isError } = useReactQuery({
  //   queryKey: ['tableBody', columns, emptyMessage],
  //   queryFn: () => Promise.resolve([]),
  // });

  console.log(content.length);
  console.log(content[0]);

  if (!content || content.length === 0) {
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
      {content.map((item, index) => (
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
