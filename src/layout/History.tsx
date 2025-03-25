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
  const renderStatus = (status: string, index: number) => {
    switch (status) {
      case REGISTRATION_STATUS.COMPLETED:
        return (
          <StatusTypography
            status='success'
            key={`status-${index}`}
            data-testid={`history-area-content-status-${index}`}
          >
            처리완료
          </StatusTypography>
        );
      case REGISTRATION_STATUS.FAILED:
        return (
          <StatusTypography
            status='error'
            key={`status-${index}`}
            data-testid={`history-area-content-status-${index}`}
          >
            처리실패
          </StatusTypography>
        );
      case REGISTRATION_STATUS.PENDING:
        return (
          <StatusTypography
            status='info'
            key={`status-${index}`}
            data-testid={`history-area-content-status-${index}`}
          >
            진행중
          </StatusTypography>
        );
    }
  };

  const renderContent = (name: string, eventType: string, index: number) => {
    switch (eventType) {
      case REGISTRATION_EVENT_TYPE.REGISTRATION_SAVE_REQUEST:
        return (
          <Typography
            variant='body2'
            key={`content-${index}`}
            data-testid={`history-area-content-${index}`}
          >
            {name}님 가입
          </Typography>
        );
      case REGISTRATION_EVENT_TYPE.PLAN_ADDITIONAL_SERVICE_CHANGE:
        return (
          <Typography
            variant='body2'
            key={`content-${index}`}
            data-testid={`history-area-content-${index}`}
          >
            {name}님 요금제/부가서비스 변경
          </Typography>
        );
    }
  };

  const renderStatusTime = (status: string, statusTime: string, index: number) => {
    if (status !== REGISTRATION_STATUS.PENDING) {
      return (
        <Typography
          variant='caption'
          color='text.secondary'
          key={`status-time-${index}`}
          data-testid={`history-area-content-status-time-${index}`}
        >
          {dayjs(statusTime).format('HH:mm')}
        </Typography>
      );
    }
  };

  return (
    <HistoryContainer data-testid='history-area'>
      <Header>
        <Typography variant='h3'>처리 요청 내역</Typography>
        <Typography variant='caption' color='text.secondary' data-testid='history-area-count-label'>
          처리중 {registrationStatus?.pendingCount ?? 0}건
        </Typography>
      </Header>
      {registrationStatus === null ||
        (registrationStatus?.registrations && registrationStatus?.registrations.length === 0 && (
          <EmptyContent>
            <Typography color='text.secondary' data-testid='history-area-empty-content'>
              표시할 내용이 없습니다.
            </Typography>
          </EmptyContent>
        ))}
      <ContentWrapper>
        {registrationStatus?.registrations.map((registration, index) => (
          <Content key={`content-${index}`}>
            <ContentStatus key={`content-status-${index}`}>
              {renderStatus(registration.status, index)}
              {renderContent(registration.customerName, registration.eventType, index)}
            </ContentStatus>
            {renderStatusTime(registration.status, registration.statusTime, index)}
          </Content>
        ))}
      </ContentWrapper>
    </HistoryContainer>
  );
};

export default History;
