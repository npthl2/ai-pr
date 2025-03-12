import { InvoiceInfo as BaseInvoiceInfo } from '@model/RegistrationInfo';
import { 
  InfoSection, 
  InfoRow, 
  InfoLabel, 
  InfoValue, 
  SubSectionTitle 
} from '../SummaryInfo.styled';
import { Box } from '@mui/material';

interface InvoiceInfo extends Partial<BaseInvoiceInfo> {
  [key: string]: any;
}

interface BillingInfoProps {
  invoiceInfo: InvoiceInfo;
}

const BillingInfo = ({ invoiceInfo }: BillingInfoProps) => {
  return (
    <>
      <SubSectionTitle>청구정보</SubSectionTitle>
      <InfoSection>
        <InfoRow>
          <InfoLabel>납부자명</InfoLabel>
          <InfoValue>{invoiceInfo.paymentName || '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>납부방법</InfoLabel>
          <InfoValue>
            {invoiceInfo.paymentMethod || '-'}
            {invoiceInfo.paymentMethod === 'BANK' && (
              <Box sx={{ mt: 1 }}>
                {invoiceInfo.bankCompany} / {invoiceInfo.bankAccount}
              </Box>
            )}
            {invoiceInfo.paymentMethod === 'CARD' && (
              <Box sx={{ mt: 1 }}>
                {invoiceInfo.cardCompany} / {invoiceInfo.cardNumber}
              </Box>
            )}
          </InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>납부일</InfoLabel>
          <InfoValue>{invoiceInfo.paymentDate || '-'}</InfoValue>
        </InfoRow>
      </InfoSection>
    </>
  );
};

export default BillingInfo; 