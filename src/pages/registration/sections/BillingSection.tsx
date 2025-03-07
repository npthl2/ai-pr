import { Typography, Button } from '@mui/material';
import { FormContainer, FormWrapper } from './common/SectionCommon.styled';
import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';

interface BillingSectionProps {
  contractTabId: string;
  onComplete: () => void;
  completed?: boolean;
}

const BillingSection = ({ contractTabId, onComplete, completed }: BillingSectionProps) => {
  const { getRegistrationCustomerInfo } = useRegistrationCustomerStore();

  const customerInfo = getRegistrationCustomerInfo(contractTabId);
  return (
    // completed 가 true 이면 outline 활성화, fales 일 경우 비활성화
    <FormContainer completed={completed}>
      {/* FormWrapper 는 삭제 필요 */}
      <FormWrapper>
        <Typography>청구정보 폼 내용 {contractTabId} </Typography>
        <Typography>{customerInfo?.name}</Typography>
        <Typography>{customerInfo?.rrno}</Typography>
        <Typography>{customerInfo?.isConsent ? '동의' : '미동의'}</Typography>
        {/* TODO : 완료가 되면 onComplete 함수를 호출해서 다음 섹션으로 넘어가는 작업 필요 */}
        <Button variant='contained' color='primary' onClick={onComplete}>
          완료
        </Button>
      </FormWrapper>
    </FormContainer>
  );
};

export default BillingSection;
