import Dialog from '@components/Dialog';
import { Box, Typography, Table, TableBody, TableHead } from '@mui/material';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import Radio from '@components/Radio';
import { Invoice } from '@model/registration/Invoice';
import { paymentMethodOptions } from '.././invoiceSection.model';
import { useState } from 'react';

interface InvoiceListModalProps {
  open: boolean;
  invoiceList: Invoice[];
  onClose: () => void;
  onConfirm: (invoice: Invoice) => void;
}

const InvoiceListModal = ({ open, onClose, onConfirm, invoiceList }: InvoiceListModalProps) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  return (
    <Dialog
      title='청구정보조회'
      size='medium-large'
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
              {invoiceList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: 'center' }}>
                    <Typography>청구정보가 없습니다.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                invoiceList.map((invoice) => (
                  <TableRow key={invoice.invoiceId}>
                    <TableCell sx={{ width: '5%' }}>
                      <Radio
                        size='small'
                        checked={selectedInvoice?.invoiceId === invoice.invoiceId}
                        onChange={() => setSelectedInvoice(invoice)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography>{invoice.invoiceId}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{invoice.recipient}</Typography>
                    </TableCell>
                    <TableCell>
                      {invoice.paymentMethod === paymentMethodOptions[0].label && (
                        <Typography>{`${invoice.paymentMethod} / ${invoice.bankCompany} / ${invoice.bankAccount}`}</Typography>
                      )}
                      {invoice.paymentMethod === paymentMethodOptions[1].label && (
                        <Typography>{`${invoice.paymentMethod} / ${invoice.cardCompany} / ${invoice.cardNumber}`}</Typography>
                      )}
                      {invoice.paymentMethod === paymentMethodOptions[2].label && (
                        <Typography>{invoice.paymentMethod}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      }
      onClose={onClose}
      onConfirm={() => {
        if (selectedInvoice) {
          onConfirm(selectedInvoice);
        }
      }}
      open={open}
    />
  );
};

export default InvoiceListModal;
