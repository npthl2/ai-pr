import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import { Table, TableHead, Typography, TableBody } from '@mui/material';
import { TableExampleContainer, TableWrapper } from './TableExample.styled';

const TableExample = () => {
  const headers = ['Header 1', 'Header 2', 'Header 3'];
  const data = [
    { 'Header 1': 'Row 1 Cell 1', 'Header 2': 'Row 1 Cell 2', 'Header 3': 'Row 1 Cell 3' },
    { 'Header 1': 'Row 2 Cell 1', 'Header 2': 'Row 2 Cell 2', 'Header 3': 'Row 2 Cell 3' },
  ];

  return (
    <TableExampleContainer>
      <Typography variant='h4' gutterBottom>
        Table 컴포넌트 예시
      </Typography>

      <TableWrapper>
        <Typography variant='h6'>테이블 (Medium)</Typography>
        <Table>
          <TableHead>
            <TableRow variant='head'>
              {headers.map((header, index) => (
                <TableCell key={index}>
                  <Typography>{header}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Typography>{row[header as keyof typeof row]}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>

      <TableWrapper>
        <Typography variant='h6'>테이블 (Small)</Typography>
        <Table>
          <TableHead>
            <TableRow variant='head' size='small'>
              {headers.map((header, index) => (
                <TableCell key={index}>
                  <Typography>{header}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} size='small'>
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Typography>{row[header as keyof typeof row]}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>

      <TableWrapper>
        <Typography variant='h6'>가로형 테이블</Typography>
        <Table>
          <TableBody>
            {headers.map((header, index) => (
              <TableRow key={index}>
                <TableCell variant='head'>
                  <Typography>{header}</Typography>
                </TableCell>
                {data.map((row, rowIndex) => (
                  <TableCell key={rowIndex}>
                    <Typography>{row[header as keyof typeof row]}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>

      <TableWrapper>
        <Typography variant='h6'>Hide Border</Typography>
        <Table>
          <TableHead>
            <TableRow variant='head'>
              {headers.map((header, index) => (
                <TableCell key={index} hideborder={true}>
                  <Typography>{header}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex} hideborder={true}>
                    <Typography>{row[header as keyof typeof row]}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>

      <TableWrapper>
        <Typography variant='h6'>Effect Disabled : hover, selected</Typography>
        <Table>
          <TableHead>
            <TableRow variant='head'>
              {headers.map((header, index) => (
                <TableCell key={index}>
                  <Typography>{header}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} disableEffect={true}>
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Typography>{row[header as keyof typeof row]}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </TableExampleContainer>
  );
};

export default TableExample;
