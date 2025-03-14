import {
  StatusMessageContainer,
  PendingGifContainer,
  StatusMessage as StyledStatusMessage,
  CompletedGifContainer,
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

  // 상태별 설정 정의
  const statusConfig = {
    [REGISTRATION_STATUS.PENDING]: {
      message: `${customerName} 고객님의 가입이 처리중입니다.`,
      gif: <PendingGifContainer src={pendingGifPath} alt="처리중" />,
      failureReason: null,
    },
    [REGISTRATION_STATUS.COMPLETED]: {
      message: `${customerName} 고객님의 가입이 처리 완료되었습니다.`,
      gif: <CompletedGifContainer src={completedGifPath} alt="완료" />,
      failureReason: null,
    },
    [REGISTRATION_STATUS.FAILED]: {
      message: `${customerName} 고객님의 가입을 실패하였습니다.`,
      gif: null, // 실패 시 GIF가 필요 없다면 null 처리
      failureReason: (
        <StyledStatusMessage>
          실패사유:{' '}
          <span style={{ color: 'red' }}>가입한도</span>를
          <span style={{ color: 'red' }}> 초과</span> 했습니다.
        </StyledStatusMessage>
      ),
    },
  };

  const statusData = statusConfig[status];

  return statusData ? (
    <StatusMessageContainer>
      <StyledStatusMessage data-testid="status-message">
        {statusData.message}
      </StyledStatusMessage>
      {statusData.gif}
      {statusData.failureReason}
    </StatusMessageContainer>
  ) : null;
};

export default StatusMessage;
