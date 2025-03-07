import { Typography, Button } from '@mui/material';
import { FormContainer, FormWrapper } from './common/SectionCommon.styled';

interface DeviceSectionProps {
  contractTabId: string;
  onComplete: () => void;
  completed?: boolean;
}

const DeviceSection = ({ contractTabId, onComplete, completed }: DeviceSectionProps) => {
  return (
    // completed 가 true 이면 outline 활성화, fales 일 경우 비활성화
    <FormContainer completed={completed}>
      <FormWrapper>
        {/* FormWrapper 는 삭제 필요 */}
        <Typography>단말기결제 정보 폼 내용 {contractTabId} </Typography>
        {/* TODO : 완료가 되면 onComplete 함수를 호출해서 다음 섹션으로 넘어가는 작업 필요 */}
        <Button variant='contained' color='primary' onClick={onComplete}>
          완료
        </Button>
      </FormWrapper>
    </FormContainer>
  );
};

export default DeviceSection;
