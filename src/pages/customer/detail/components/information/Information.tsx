import { Box, Typography } from '@mui/material';
import ContractInfo from './ContractInfo';
import InvoiceInfo from './InvoiceInfo';
import ServiceInfo from './ServiceInfo';
import { MaskedTarget } from './types';
import { customerContractsInfoData } from '@api/queries/customerDetail/useCustomerDetail';
import useMemberStore from '@stores/MemberStore';

interface InformationProps {
  customerId: string;
  contractId: string;
}

const Information = ({ customerId, contractId }: InformationProps) => {
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
          width: 1021,
          height: 737,
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
        <ServiceInfo serviceInfoParam={selectedInfo?.service ?? null} maskingParam={maskingParam} />
      </Box>
      {isUnmaskable && (
        <Typography variant='caption' sx={{ color: '#6E7782' }}>
          &apos;*&apos;와 &apos;고객정보보호&apos; 는 [마우스 우클릭→ &apos;마스킹 해제&apos; 클릭]
          하여 데이터를 조회할 수 있습니다.
        </Typography>
      )}
    </Box>
  );
};

export default Information;
