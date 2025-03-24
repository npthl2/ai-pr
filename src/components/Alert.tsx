import { Alert as MuiAlert, AlertProps as MuiAlertProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from './Button';

interface AlertProps extends Omit<MuiAlertProps, 'action'> {
  title?: string;
  buttonText?: string;
  buttonAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  closeAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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

export const Alert = ({
  title,
  buttonText = '확인하기',
  buttonAction,
  closeAction,
  children,
  ...props
}: AlertProps) => (
  <StyledAlert
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
