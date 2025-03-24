import { InfoSection, InfoRow, InfoLabel, InfoValue, SubSectionTitle } from '../SummaryInfo.styled';
import { Box } from '@mui/material';
import { RegistrationInvoiceInfo } from '@stores/registration/RegistrationInvoiceStore';

interface BillingInfoProps {
  invoiceInfo: RegistrationInvoiceInfo;
}

const BillingInfo = ({ invoiceInfo }: BillingInfoProps) => {
  return (
    <>
      <SubSectionTitle>청구정보</SubSectionTitle>
      <InfoSection>
        <InfoRow>
          <InfoLabel>납부고객명</InfoLabel>
          <InfoValue>{invoiceInfo.paymentName || '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>납부방법</InfoLabel>
          <InfoValue>
            {invoiceInfo.paymentMethod === '은행계좌 자동이체' && (
              <>
                <Box>은행계좌 자동이체</Box>
                <Box sx={{ mt: 1 }}>
                  {invoiceInfo.bankCompany} / {invoiceInfo.bankAccount}
                </Box>
              </>
            )}
            {invoiceInfo.paymentMethod === '카드' && (
              <>
                <Box>카드</Box>
                <Box sx={{ mt: 1 }}>
                  {invoiceInfo.cardCompany} / {invoiceInfo.cardNumber}
                </Box>
              </>
            )}
            {invoiceInfo.paymentMethod === '지로' && (
              <>
                <Box>지로</Box>
              </>
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
