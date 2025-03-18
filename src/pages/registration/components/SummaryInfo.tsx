import { Box } from '@mui/material';
import {
  InvoiceInfo,
  DeviceInfo,
  ContractInfo,
  SalesInfo as BaseSalesInfo,
} from '@model/RegistrationInfo';
import { StyledDivider, VerticalDivider } from './SummaryInfo.styled';
import BillingInfo from './summary/BillingInfo';
import SalesInfo from './summary/SalesInfo';
import SubscriptionInfo from './summary/SubscriptionInfo';
import DevicePaymentInfo from './summary/DevicePaymentInfo';

interface SalesInfoType extends Partial<BaseSalesInfo> {
  [key: string]: any;
}

interface SummaryInfoProps {
  invoiceInfo: InvoiceInfo;
  deviceInfo: DeviceInfo;
  contractInfo: ContractInfo;
  salesInfo?: SalesInfoType;
}

const SummaryInfo = ({
  invoiceInfo,
  deviceInfo,
  contractInfo,
  salesInfo = {},
}: SummaryInfoProps) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', width: '100%', gap: 3 }}>
      {/* 왼쪽 컬럼 */}
      <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
        <BillingInfo invoiceInfo={invoiceInfo} />

        <StyledDivider />

        <SalesInfo salesInfo={salesInfo} />

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
