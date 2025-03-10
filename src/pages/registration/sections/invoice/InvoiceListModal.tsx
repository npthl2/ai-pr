import Dialog from '@components/Dialog';
import { Container, Box, Typography, Table, TableBody, TableHead } from '@mui/material';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import Radio from '@components/Radio';

const InvoiceListModal = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Dialog
      title='청구정보조회'
      size='large'
      content={
        <Box>
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Typography variant='h3'>청구정보 목록</Typography>
            <Typography variant='h4' color='text.secondary'>
              2
            </Typography>
          </Box>
          <Table>
            <TableHead>
              <TableRow variant='head'>
                <TableCell sx={{ width: '5%' }}>
                  <Radio disabled size='small' />
                </TableCell>
                <TableCell>
                  <Typography>청구번호</Typography>
                </TableCell>
                <TableCell>
                  <Typography>수령인</Typography>
                </TableCell>
                <TableCell>
                  <Typography>납부방법</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: '5%' }}>
                  <Radio size='small' />
                </TableCell>
                <TableCell>
                  <Typography>청구번호</Typography>
                </TableCell>
                <TableCell>
                  <Typography>수령인</Typography>
                </TableCell>
                <TableCell>
                  <Typography>납부방법</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      }
      onClose={onClose}
      onConfirm={onConfirm}
      open={open}
    />
  );
};

export default InvoiceListModal;
