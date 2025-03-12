import {
  StatusMessageContainer,
  GifContainer,
  StatusMessage as StyledStatusMessage
} from '../RegistrationRequest.styled';
import { REGISTRATION_STATUS, RegistrationStatusType } from '@constants/RegistrationConstants';

interface StatusMessageProps {
  status: RegistrationStatusType;
  customerName: string;
  failReason?: string;
}

const StatusMessage = ({ status, customerName }: StatusMessageProps) => {
  // 이미지 경로 정의
  const pendingGifPath = '/images/Registration-Progressing.gif';
  const completedGifPath = '/images/Registration-Completed.gif';

  return (
    <>
      {status === REGISTRATION_STATUS.PENDING && (
        <StatusMessageContainer>
          <StyledStatusMessage>{customerName} 고객님의 가입이 처리중입니다.</StyledStatusMessage>
          <GifContainer src={pendingGifPath} alt="처리중" />
        </StatusMessageContainer>
      )}
      
      {status === REGISTRATION_STATUS.COMPLETED && (
        <StatusMessageContainer>
          <StyledStatusMessage>{customerName} 고객님의 가입이 처리 완료되었습니다.</StyledStatusMessage>
          <GifContainer src={completedGifPath} alt="완료" />
        </StatusMessageContainer>
      )}
      
      {status === REGISTRATION_STATUS.FAILED && (
        <StatusMessageContainer>
          <StyledStatusMessage>{customerName} 고객님의 가입을 실패하였습니다.</StyledStatusMessage>
          <StyledStatusMessage>
            실패사유: {
              <>
                <span style={{ color: 'red' }}>가입한도</span>
                를 
                <span style={{ color: 'red' }}> 초과</span>
                했습니다.
              </>
            }
          </StyledStatusMessage>
        </StatusMessageContainer>
      )}
    </>
  );
};

export default StatusMessage; 