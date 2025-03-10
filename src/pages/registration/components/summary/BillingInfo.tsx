import { InvoiceInfo as BaseInvoiceInfo } from '@model/RegistrationInfo';
import { 
  InfoSection, 
  InfoRow, 
  InfoLabel, 
  InfoValue, 
  SubSectionTitle 
} from '../SummaryInfo.styled';

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
          <InfoValue>{invoiceInfo.payerName || '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>납부방법</InfoLabel>
          <InfoValue>{invoiceInfo.paymentMethod || '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>납부일</InfoLabel>
          <InfoValue>{invoiceInfo.paymentDay || '-'}</InfoValue>
        </InfoRow>
      </InfoSection>
    </>
  );
};

export default BillingInfo; 