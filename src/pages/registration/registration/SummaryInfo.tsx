import { Box } from '@mui/material';
import { InvoiceInfo as BaseInvoiceInfo, DeviceInfo as BaseDeviceInfo, SalesInfo as BaseSalesInfo } from '@model/RegistrationInfo';
import { StyledDivider, VerticalDivider } from './SummaryInfo.styled';
import BillingInfo from './summary/BillingInfo';
import SalesInfo from './summary/SalesInfo';
import SubscriptionInfo from './summary/SubscriptionInfo';
import DevicePaymentInfo from './summary/DevicePaymentInfo';

// 더 유연한 타입 정의 (UI 표시용)
interface InvoiceInfo extends Partial<BaseInvoiceInfo> {
  [key: string]: any;
}

interface DeviceInfo extends Partial<BaseDeviceInfo> {
  [key: string]: any;
}

interface SalesInfoType extends Partial<BaseSalesInfo> {
  [key: string]: any;
}

interface SummaryInfoProps {
  invoiceInfo: InvoiceInfo;
  deviceInfo: DeviceInfo;
  salesInfo: SalesInfoType;
}

const SummaryInfo = ({ invoiceInfo, deviceInfo, salesInfo }: SummaryInfoProps) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', width: '100%', gap: 3 }}>
      {/* 왼쪽 컬럼 */}
      <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
        <BillingInfo invoiceInfo={invoiceInfo} />
        
        <StyledDivider />
        
        <SalesInfo />
        
        <StyledDivider />
        
        <SubscriptionInfo salesInfo={salesInfo} />
      </Box>
      
      {/* 세로 구분선 - 모바일에서는 숨김 */}
      <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
        <VerticalDivider orientation="vertical" flexItem />
      </Box>
      
      {/* 오른쪽 컬럼 */}
      <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
        <DevicePaymentInfo deviceInfo={deviceInfo} />
      </Box>
    </Box>
  );
};

export default SummaryInfo; 