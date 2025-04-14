import { Typography } from '@mui/material';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import React from 'react';
interface DetailInfoTableRowCellPair {
  headerCellContent: string;
  cellContent: React.ReactNode;
}

interface DetailInfoTableRowProps {
  cellPairs: DetailInfoTableRowCellPair[];
}

const DetailInfoTableRow: React.FC<DetailInfoTableRowProps> = ({ cellPairs }) => {
  return (
    <TableRow size='small' disableEffect={true}>
      {cellPairs.length === 1 ? (
        <>
          <TableCell variant='head'>
            <Typography>{cellPairs[0].headerCellContent}</Typography>
          </TableCell>
          <TableCell colSpan={3}>{cellPairs[0].cellContent}</TableCell>
        </>
      ) : (
        cellPairs.map((pair) => (
          <React.Fragment key={pair.headerCellContent}>
            <TableCell variant='head'>
              <Typography>{pair.headerCellContent}</Typography>
            </TableCell>
            <TableCell>{pair.cellContent}</TableCell>
          </React.Fragment>
        ))
      )}
    </TableRow>
  );
};

export default DetailInfoTableRow;
