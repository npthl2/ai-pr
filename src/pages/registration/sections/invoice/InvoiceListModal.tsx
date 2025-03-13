import Dialog from '@components/Dialog';
import { Typography, TableBody, TableHead } from '@mui/material';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import Radio from '@components/Radio';
import { Invoice } from '@model/registration/Invoice';
import { paymentMethodOptions } from '.././invoiceSection.model';
import { useState } from 'react';
import {
  InvoiceListContainer,
  TableTitleWrapper,
  InvoiceListTableContainer,
  InvoiceListTable,
} from './invoiceListModal.styled';
interface InvoiceListModalProps {
  open: boolean;
  invoiceList: Invoice[];
  onClose: () => void;
  onConfirm: (invoice: Invoice) => void;
  onConfirmLabel: React.ReactNode;
}

const InvoiceListModal = ({
  open,
  onClose,
  onConfirm,
  invoiceList,
  onConfirmLabel,
}: InvoiceListModalProps) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  return (
    <Dialog
      data-testid='invoice-search-modal'
      title='청구정보조회'
      size='medium-large'
      confirmLabel={onConfirmLabel}
      isConfirmDisabled={!selectedInvoice}
      content={
        <InvoiceListContainer>
          <TableTitleWrapper>
            <Typography variant='h3'>청구정보 목록</Typography>
            <Typography variant='h4' color='text.secondary'>
              {invoiceList.length}
            </Typography>
          </TableTitleWrapper>
          <InvoiceListTableContainer>
            <InvoiceListTable stickyHeader>
              <TableHead>
                <TableRow variant='head'>
                  <TableCell sx={{ width: '5%', paddingLeft: '20px' }}>
                    <Radio disabled size='small' />
                  </TableCell>
                  <TableCell sx={{ width: '20%' }}>
                    <Typography>청구번호</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>수령인</Typography>
                  </TableCell>
                  <TableCell sx={{ width: '45%' }}>
                    <Typography>납부방법</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceList.length > 0 &&
                  invoiceList.map((invoice, index) => (
                    <TableRow key={invoice.invoiceId} data-testid={`invoice-list-item-${index}`}>
                      <TableCell sx={{ width: '5%', paddingLeft: '20px' }}>
                        <Radio
                          size='small'
                          checked={selectedInvoice?.invoiceId === invoice.invoiceId}
                          onChange={() => setSelectedInvoice(invoice)}
                          data-testid={`invoice-list-item-radio-${index}`}
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
                  ))}
              </TableBody>
            </InvoiceListTable>
          </InvoiceListTableContainer>
        </InvoiceListContainer>
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
