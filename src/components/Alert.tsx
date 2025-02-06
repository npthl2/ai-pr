import { Alert as MuiAlert, AlertProps as MuiAlertProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@assets/icons/ErrorIcon.png';
import WarningIcon from '@assets/icons/WarningIcon.png';
import InfoIcon from '@assets/icons/InfoIcon.png';
import SuccessIcon from '@assets/icons/SuccessIcon.png';
import { Button } from './Button';

interface AlertProps extends Omit<MuiAlertProps, 'action'> {
  title?: string;
  buttonText?: string;
  buttonAction?: (...args: any[]) => any;
  closeAction?: (...args: any[]) => any;
}

const StyledAlert = styled(MuiAlert)`
  gap: 10px;

  & .MuiAlert-action {
    margin-left: auto;
    padding: 0 8px;
    display: flex;
  }

  & .MuiAlert-message {
    gap: 4px;
    display: flex;
    flex-direction: column;
  }

  & .MuiAlert-icon {
    width: 22px;
    height: 36px;
    margin: 0;
  }
`;

const StyledActionButton = styled(Button)`
  size: small;
  variant: text;
`;

const StyledCloseButton = styled(Button)`
  color: ${({ theme }) => theme.palette.grey[500]};
  size: large;
  width: 36px;
  height: 36px;
  min-width: 0;

  & .MuiSvgIcon-root {
    font-size: 16px;
  }
`;

const ActionContainer = styled('div')`
  height: 42px;
  padding: 3px 0 3px 16px;
`;

const iconMapping = {
  error: <img src={ErrorIcon} alt='error' />,
  warning: <img src={WarningIcon} alt='warning' />,
  info: <img src={InfoIcon} alt='info' />,
  success: <img src={SuccessIcon} alt='success' />,
};

export const Alert = ({
  title,
  buttonText = '확인하기',
  buttonAction,
  closeAction,
  children,
  ...props
}: AlertProps) => (
  <StyledAlert
    iconMapping={iconMapping}
    {...props}
    action={
      (buttonAction || closeAction) && (
        <ActionContainer>
          {buttonAction && (
            <StyledActionButton onClick={buttonAction}>{buttonText}</StyledActionButton>
          )}
          {closeAction && (
            <StyledCloseButton onClick={closeAction}>
              <CloseIcon />
            </StyledCloseButton>
          )}
        </ActionContainer>
      )
    }
  >
    {title && <Typography variant='h5'>{title}</Typography>}
    <Typography variant='body2'>{children}</Typography>
  </StyledAlert>
);

export default Alert;
