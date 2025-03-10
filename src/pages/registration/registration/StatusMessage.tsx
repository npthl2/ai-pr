import {
  StatusMessageContainer,
  GifContainer,
  StatusMessage as StyledStatusMessage,
  ErrorMessage
} from '../RegistrationRequest.styled';
import { RegistrationStatusType } from '@model/RegistrationInfo';

interface StatusMessageProps {
  status: RegistrationStatusType;
  customerName: string;
  failReason?: string;
}

const StatusMessage = ({ status, customerName, failReason }: StatusMessageProps) => {
  // 이미지 경로 정의
  const pendingGifPath = '/images/Registration-Progressing.gif';
  const completedGifPath = '/images/Registration-Completed.gif';

  return (
    <>
      {status === 'PENDING' && (
        <StatusMessageContainer>
          <StyledStatusMessage>{customerName} 고객님의 가입이 처리중입니다.</StyledStatusMessage>
          <GifContainer src={pendingGifPath} alt="처리중" />
        </StatusMessageContainer>
      )}
      
      {status === 'COMPLETED' && (
        <StatusMessageContainer>
          <StyledStatusMessage>{customerName} 고객님의 가입이 처리 완료되었습니다.</StyledStatusMessage>
          <GifContainer src={completedGifPath} alt="완료" />
        </StatusMessageContainer>
      )}
      
      {status === 'FAILED' && (
        <StatusMessageContainer>
          <StyledStatusMessage>{customerName} 고객님의 가입을 실패하였습니다.</StyledStatusMessage>
          <ErrorMessage>
            실패 사유: {failReason || '가입한도를 초과했습니다.'}
          </ErrorMessage>
        </StatusMessageContainer>
      )}
    </>
  );
};

export default StatusMessage; 