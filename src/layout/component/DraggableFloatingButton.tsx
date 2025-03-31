import { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import History from '@layout/History';
import {
  CountLabel,
  FloatingButton,
  HistoryWrapper,
  ProgressWrapper,
  StyledCircularProgress,
} from './DraggableFloatingButton.styled';
import { useRegistrationStatus } from '@hooks/useRegistrationStatus';
import { enqueueSnackbar, VariantType } from 'notistack';
import { RegistrationStatusResponseData } from '@model/RegistrationInfo';
import { REGISTRATION_EVENT_TYPE } from '@constants/RegistrationConstants';

const DraggableFloatingButton = () => {
  const [showHistory, setShowHistory] = useState(false);

  const [positionY, setPositionY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef(null);

  const [prevRegistrationStatus, setPrevRegistrationStatus] = useState<
    RegistrationStatusResponseData[]
  >([]);

  const { data: registrationStatus, refetch } = useRegistrationStatus();

  const handleOpen = (_: React.MouseEvent) => {
    if (!isDragging) {
      setShowHistory((prev) => !prev);
      if (!showHistory) {
        refetch();
      }
    }
  };

  const handleDrag: DraggableEventHandler = (_, data) => {
    setPositionY(data.y);
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  const toastMessage = (name: string, status: string, eventType: string) => {
    let message = '';
    switch (eventType) {
      case REGISTRATION_EVENT_TYPE.REGISTRATION_SAVE_REQUEST:
        message = `${name}님 가입`;
        break;
      case REGISTRATION_EVENT_TYPE.PLAN_ADDITIONAL_SERVICE_CHANGE_REQUEST:
        message = `${name}님 요금제/부가서비스 변경`;
        break;
    }

    let variant: VariantType = 'error';
    switch (status) {
      case 'COMPLETED':
        message += `처리 완료되었습니다.`;
        variant = 'success';
        break;
      case 'FAILED':
        message += `을 실패하였습니다.`;
        break;
    }

    enqueueSnackbar(message, { variant: variant });
  };

  useEffect(() => {
    if (registrationStatus && registrationStatus.registrations.length > 0) {
      const statusChangedRegistrations = registrationStatus.registrations.filter((registration) =>
        prevRegistrationStatus?.some(
          (prevRegistration) =>
            prevRegistration.businessProcessId === registration.businessProcessId &&
            prevRegistration.status !== registration.status,
        ),
      );

      const newRegistrations = registrationStatus.registrations.filter(
        (registration) =>
          !prevRegistrationStatus?.some(
            (prevRegistration) =>
              prevRegistration.businessProcessId === registration.businessProcessId,
          ),
      );

      const changedRegistrations = [...statusChangedRegistrations, ...newRegistrations];

      if (prevRegistrationStatus.length > 0 && changedRegistrations.length > 0) {
        changedRegistrations.forEach((registration) => {
          if (registration.status === 'COMPLETED' || registration.status === 'FAILED') {
            toastMessage(registration.customerName, registration.status, registration.eventType);
          }
        });
      }
      setPrevRegistrationStatus(registrationStatus.registrations);
    }
  }, [registrationStatus]);

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x: 0, y: positionY }}
      onDrag={handleDrag}
      onStop={handleDragStop}
      axis='y'
      handle='.drag-handle'
      bounds={{ top: -window.innerHeight + 400, bottom: 0 }}
    >
      <Box ref={nodeRef}>
        <HistoryWrapper className={showHistory ? 'show' : ''} style={{ bottom: 80 }}>
          <FloatingButton
            onClick={handleOpen}
            size='large'
            className='drag-handle'
            data-testid='floating-button'
          >
            {showHistory ? (
              <CloseIcon />
            ) : registrationStatus && registrationStatus.pendingCount > 0 ? (
              <ProgressWrapper>
                <StyledCircularProgress color='error' size='19.2px' />
                <CountLabel data-testid='draggable-floating-button-history-count-label'>
                  {registrationStatus?.pendingCount}
                </CountLabel>
              </ProgressWrapper>
            ) : (
              <HistoryIcon />
            )}
          </FloatingButton>
          <History registrationStatus={registrationStatus} />
        </HistoryWrapper>
      </Box>
    </Draggable>
  );
};

export default DraggableFloatingButton;
