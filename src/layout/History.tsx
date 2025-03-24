import { Typography } from '@mui/material';
import {
  Content,
  ContentStatus,
  ContentWrapper,
  EmptyContent,
  Header,
  HistoryContainer,
  StatusTypography,
} from './History.styled';
import dayjs from 'dayjs';
import { AllRegistrationStatusResponseData } from '@model/RegistrationInfo';
import { REGISTRATION_EVENT_TYPE, REGISTRATION_STATUS } from '@constants/RegistrationConstants';

interface HistoryProps {
  registrationStatus?: AllRegistrationStatusResponseData | null;
}

const History = ({ registrationStatus }: HistoryProps) => {
  const renderStatus = (status: string) => {
    switch (status) {
      case REGISTRATION_STATUS.COMPLETED:
        return <StatusTypography status='success'>처리완료</StatusTypography>;
      case REGISTRATION_STATUS.FAILED:
        return <StatusTypography status='error'>처리실패</StatusTypography>;
      case REGISTRATION_STATUS.PENDING:
        return <StatusTypography status='info'>진행중</StatusTypography>;
    }
  };

  const renderContent = (name: string, eventType: string) => {
    switch (eventType) {
      case REGISTRATION_EVENT_TYPE.REGISTRATION_SAVE_REQUEST:
        return <Typography variant='body2'>{name}님 가입</Typography>;
      case REGISTRATION_EVENT_TYPE.PLAN_ADDITIONAL_SERVICE_CHANGE:
        return <Typography variant='body2'>{name}님 요금제/부가서비스 변경</Typography>;
    }
  };

  const renderStatusTime = (status: string, statusTime: string) => {
    if (status !== REGISTRATION_STATUS.PENDING) {
      return (
        <Typography variant='caption' color='text.secondary'>
          {dayjs(statusTime).format('HH:mm')}
        </Typography>
      );
    }
  };

  return (
    <HistoryContainer data-testid='history-area'>
      <Header>
        <Typography variant='h3'>처리 요청 내역</Typography>
        <Typography variant='caption' color='text.secondary'>
          처리중 {registrationStatus?.pendingCount ?? 0}건
        </Typography>
      </Header>
      {registrationStatus === null ||
        (registrationStatus?.registrations && registrationStatus?.registrations.length === 0 && (
          <EmptyContent>
            <Typography color='text.secondary'>표시할 내용이 없습니다.</Typography>
          </EmptyContent>
        ))}
      <ContentWrapper>
        {registrationStatus?.registrations.map((registration, index) => (
          <>
            <Content key={index}>
              <ContentStatus key={index}>
                {renderStatus(registration.status)}
                {renderContent(registration.customerName, registration.eventType)}
              </ContentStatus>
              {renderStatusTime(registration.status, registration.statusTime)}
            </Content>
          </>
        ))}
      </ContentWrapper>
    </HistoryContainer>
  );
};

export default History;
