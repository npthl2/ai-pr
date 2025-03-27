import { InvoiceItem, MaskedTarget } from './types';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import { TableWrapper } from './InfoTable.styled';
import MaskingInfo from './MaskingInfo';

import { Paper, Table, TableBody, TableContainer, Typography, Box } from '@mui/material';

interface InvoiceInfoProps {
  invoiceInfoParam: InvoiceItem | null;
  maskingParam: MaskedTarget;
}

const defaultInvoiceInfo: InvoiceItem = {
  paymentId: '',
  paymentName: '',
  paymentNameEncrypted: '',
  recipient: '',
  recipientEncrypted: '',
  paymentMethod: '',
  paymentDate: '',
  account: '',
  accountEncrypted: '',
  card: '',
  cardEncrypted: '',
  invoiceType: '',
  invoiceNumber: '',
  invoiceNumberEncrypted: '',
  invoiceAddress: '',
  invoiceAddressEncrypted: '',
};

// 상수 정의
const CELL_WIDTH = 200;

// MaskingInfo를 사용하는 부분을 별도의 함수로 분리
const renderMaskingInfo = (
  maskingParam: MaskedTarget,
  originalInfo: string,
  encryptedInfo: string,
  maskingType: string,
) => (
  <MaskingInfo
    originalInfo={originalInfo}
    encryptedInfo={encryptedInfo}
    maskingParam={{
      ...maskingParam,
      maskingType: maskingType,
    }}
  />
);

const InvoiceInfo: React.FC<InvoiceInfoProps> = ({
  invoiceInfoParam,
  maskingParam,
}: InvoiceInfoProps) => {
  const invoiceInfo = invoiceInfoParam ?? defaultInvoiceInfo;
  return (
    <TableWrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '27px',
          gap: '16px',
        }}
      >
        <Typography variant='h3'>납부정보</Typography>
        {invoiceInfo.paymentId && (
          <Typography sx={{ gap: '8px', display: 'flex', alignItems: 'center' }}>
            <Typography variant='body2' data-testid='information-invoice-id'>
              청구번호
            </Typography>
            <Typography variant='h6' color='text.secondary'>
              {invoiceInfo.paymentId}
            </Typography>
          </Typography>
        )}
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table>
          <TableBody>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                <Typography>납부고객</Typography>
              </TableCell>
              <TableCell sx={{ flex: 1 }}>
                {renderMaskingInfo(
                  maskingParam,
                  invoiceInfo.paymentName,
                  invoiceInfo.paymentNameEncrypted,
                  'paymentName',
                )}
              </TableCell>
              <TableCell variant='head' width={CELL_WIDTH}>
                <Typography>수령인</Typography>
              </TableCell>
              <TableCell sx={{ flex: 1 }}>
                {renderMaskingInfo(
                  maskingParam,
                  invoiceInfo.recipient,
                  invoiceInfo.recipientEncrypted,
                  'recipient',
                )}
              </TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                <Typography>납부방법</Typography>
              </TableCell>
              <TableCell sx={{ flex: 1 }}>{invoiceInfo.paymentMethod}</TableCell>
              <TableCell variant='head' width={CELL_WIDTH}>
                <Typography>납부일</Typography>
              </TableCell>
              <TableCell sx={{ flex: 1 }}>{invoiceInfo.paymentDate}</TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                <Typography>계좌/카드</Typography>
              </TableCell>
              <TableCell colSpan={3}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {renderMaskingInfo(
                    maskingParam,
                    invoiceInfo.account,
                    invoiceInfo.accountEncrypted,
                    'account',
                  )}
                  {invoiceInfo.card && (
                    <>
                      <span>/</span>
                      {renderMaskingInfo(
                        maskingParam,
                        invoiceInfo.card,
                        invoiceInfo.cardEncrypted,
                        'card',
                      )}
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                <Typography>청구유형</Typography>
              </TableCell>
              <TableCell colSpan={3}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div>{invoiceInfo.invoiceType}</div>
                  {invoiceInfo.invoiceNumber && (
                    <>
                      <span>/</span>
                      {renderMaskingInfo(
                        maskingParam,
                        invoiceInfo.invoiceNumber,
                        invoiceInfo.invoiceNumberEncrypted,
                        'invoiceNumber',
                      )}
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
            <TableRow size='small' disableEffect={true}>
              <TableCell variant='head' width={CELL_WIDTH}>
                <Typography>청구주소</Typography>
              </TableCell>
              <TableCell colSpan={3}>
                {renderMaskingInfo(
                  maskingParam,
                  invoiceInfo.invoiceAddress,
                  invoiceInfo.invoiceAddressEncrypted,
                  'invoiceAddress',
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

export default InvoiceInfo;
