import { Box } from '@mui/material';
import { InvoiceInfo, DeviceInfo, ContractInfo, SalesAgentInfo } from '@model/RegistrationInfo';
import { StyledDivider, VerticalDivider } from './SummaryInfo.styled';
import BillingInfo from './summary/BillingInfo';
import SalesInfo from './summary/SalesInfo';
import SubscriptionInfo from './summary/SubscriptionInfo';
import DevicePaymentInfo from './summary/DevicePaymentInfo';
interface SummaryInfoProps {
  invoiceInfo: InvoiceInfo;
  deviceInfo: DeviceInfo;
  contractInfo: ContractInfo;
  salesAgentInfo?: SalesAgentInfo;
}

const SummaryInfo = ({
  invoiceInfo,
  deviceInfo,
  contractInfo,
  salesAgentInfo,
}: SummaryInfoProps) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', width: '100%', gap: 3 }}>
      {/* 왼쪽 컬럼 */}
      <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
        <BillingInfo invoiceInfo={invoiceInfo} />

        <StyledDivider />

        <SalesInfo salesAgentInfo={salesAgentInfo} />

        <StyledDivider />

        <SubscriptionInfo contractInfo={contractInfo} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
        <VerticalDivider orientation='vertical' flexItem />
      </Box>

      {/* 오른쪽 컬럼 */}
      <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
        <DevicePaymentInfo deviceInfo={deviceInfo} />
      </Box>
    </Box>
  );
};

export default SummaryInfo;
