import {
  StatusMessageContainer,
  PendingGifContainer,
  StatusMessage as StyledStatusMessage,
  CompletedGifContainer,
  ErrorMessage,
} from '../RegistrationRequest.styled';
import { REGISTRATION_STATUS, RegistrationStatusType } from '@constants/RegistrationConstants';
import { REGISTRATION_GIF_PATHS } from '@constants/RegistrationImagePath';
import { STATUS_MESSAGES } from '@constants/RegistrationMessageTemplates';

type MessageType = 'REGISTRATION' | 'MODIFICATION';

interface StatusMessageProps {
  status: RegistrationStatusType;
  customerName: string;
  type: MessageType;
  failReason?: string;
}

const StatusMessage = ({ status, customerName, type }: StatusMessageProps) => {
  const message = STATUS_MESSAGES[type][status].replace('{customerName}', customerName);

  const gif =
    status === REGISTRATION_STATUS.PENDING ? (
      <PendingGifContainer src={REGISTRATION_GIF_PATHS.PENDING} alt='처리중' />
    ) : status === REGISTRATION_STATUS.COMPLETED ? (
      <CompletedGifContainer src={REGISTRATION_GIF_PATHS.COMPLETED} alt='완료' />
    ) : null;

  const failureReason =
    status === REGISTRATION_STATUS.FAILED ? (
      <StyledStatusMessage>
        실패사유:{' '}
        {type === 'MODIFICATION' ? (
          <>
            <ErrorMessage>동일한 회선으로</ErrorMessage>를
            <ErrorMessage> 처리중인 변경 건</ErrorMessage>이 있습니다.
          </>
        ) : (
          <>
            <ErrorMessage>가입한도</ErrorMessage>를<ErrorMessage> 초과</ErrorMessage> 했습니다.
          </>
        )}
      </StyledStatusMessage>
    ) : null;

  return (
    <StatusMessageContainer>
      <StyledStatusMessage data-testid='status-message'>{message}</StyledStatusMessage>
      {gif}
      {failureReason}
    </StatusMessageContainer>
  );
};

export default StatusMessage;
