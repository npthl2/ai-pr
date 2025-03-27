import { Box, Typography, useTheme } from '@mui/material';
import ContractInfo from './ContractInfo';
import InvoiceInfo from './InvoiceInfo';
import ServiceInfo from './ServiceInfo';
import { MaskedTarget } from './types';
import { customerContractsInfoData } from '@api/queries/customerDetail/useCustomerDetail';
import useMemberStore from '@stores/MemberStore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
interface InformationProps {
  customerId: string;
  contractId: string;
}

const Information = ({ customerId, contractId }: InformationProps) => {
  const theme = useTheme();
  const maskingParam: MaskedTarget = {
    customerId: customerId,
    contractId: contractId,
    maskingType: '',
  };

  const memberInfo = useMemberStore((state) => state.memberInfo);
  const isUnmaskable = memberInfo?.authorities.includes('ROLE_UNMASKING');

  // 선택된 계약 데이터 로드
  const selectedInfo = customerContractsInfoData(customerId, contractId);

  return (
    <Box
      sx={{
        flexDirection: 'column',
      }}
    >
      <Box
        data-testid='information'
        sx={{
          gap: '24px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column', // 세로 방향으로 정렬
        }}
      >
        <ContractInfo
          contractInfoParam={selectedInfo?.contract ?? null}
          maskingParam={maskingParam}
        />
        <InvoiceInfo invoiceInfoParam={selectedInfo?.invoice ?? null} maskingParam={maskingParam} />
        <ServiceInfo
          serviceInfoParam={selectedInfo?.service ?? null}
          maskingParam={maskingParam}
          contractId={contractId}
        />
      </Box>
      {isUnmaskable && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
          <InfoOutlinedIcon sx={{ fontSize: '13.33px', color: `${theme.palette.grey[500]}` }} />
          <Typography variant='caption' color='text.secondary'>
            {`'*'와 '고객정보보호'는 [마우스 우클릭→ '마스킹 해제'클릭]하여 데이터를 조회할 수 있습니다.`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Information;
