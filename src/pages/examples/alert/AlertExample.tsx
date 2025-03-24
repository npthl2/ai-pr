import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Alert from '@components/Alert';
import { ComponentTitle, AlertExampleContainer, AlertWrapper } from './AlertExample.styled';

const AlertExample = () => {
  const handleAction = () => {
    // console.log('Action clicked');
  };

  const handleClose = () => {
    // console.log('Close clicked');
  };

  return (
    <AlertExampleContainer>
      <Typography variant='h4' gutterBottom>
        Alert 컴포넌트 예시
      </Typography>

      <Grid container spacing={4} flexDirection='column'>
        {/* Contents만 있는 Alert */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>기본 Alert</ComponentTitle>
          <AlertWrapper>
            <Alert severity='error'>Error Alert 메시지</Alert>
            <Alert severity='warning'>Warning Alert 메시지</Alert>
            <Alert severity='info'>Info Alert 메시지</Alert>
            <Alert severity='success'>Success Alert 메시지</Alert>
          </AlertWrapper>
        </Grid>

        {/* Title + Contents */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>타이틀이 있는 Alert</ComponentTitle>
          <AlertWrapper>
            <Alert title='Error 알림' severity='error'>
              타이틀이 있는 Error Alert 메시지
            </Alert>
            <Alert title='Warn 알림' severity='warning'>
              타이틀이 있는 warn Alert 메시지
            </Alert>
            <Alert title='Info 알림' severity='info'>
              타이틀이 있는 info Alert 메시지
            </Alert>
            <Alert title='Success 알림' severity='success'>
              타이틀이 있는 Success Alert 메시지
            </Alert>
          </AlertWrapper>
        </Grid>

        {/* Contents + Buttons */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>버튼이 있는 Alert</ComponentTitle>
          <AlertWrapper>
            <Alert
              severity='error'
              buttonText='해결하기'
              buttonAction={handleAction}
              closeAction={handleClose}
            >
              Error Alert with Buttons
            </Alert>
            <Alert
              severity='warning'
              buttonText='확인하기'
              buttonAction={handleAction}
              closeAction={handleClose}
            >
              Warning Alert with Buttons
            </Alert>
            <Alert
              severity='info'
              buttonText='자세히 보기'
              buttonAction={handleAction}
              closeAction={handleClose}
            >
              Info Alert with Buttons
            </Alert>
            <Alert
              severity='success'
              buttonText='확인하기'
              buttonAction={handleAction}
              closeAction={handleClose}
            >
              Success Alert with Buttons
            </Alert>
          </AlertWrapper>
        </Grid>

        {/* Title + Contents + Buttons */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>타이틀과 버튼이 있는 Alert</ComponentTitle>
          <AlertWrapper>
            <Alert
              title='Error 알림'
              severity='error'
              buttonText='해결하기'
              buttonAction={handleAction}
              closeAction={handleClose}
            >
              모든 요소가 있는 Error Alert
            </Alert>
            <Alert
              title='Warning 알림'
              severity='warning'
              buttonText='확인하기'
              buttonAction={handleAction}
              closeAction={handleClose}
            >
              모든 요소가 있는 Warning Alert
            </Alert>
            <Alert
              title='Info 알림'
              severity='info'
              buttonText='자세히 보기'
              buttonAction={handleAction}
              closeAction={handleClose}
            >
              모든 요소가 있는 Info Alert
            </Alert>
            <Alert
              title='Success 알림'
              severity='success'
              buttonText='확인하기'
              buttonAction={handleAction}
              closeAction={handleClose}
            >
              모든 요소가 있는 Success Alert
            </Alert>
          </AlertWrapper>
        </Grid>
      </Grid>
    </AlertExampleContainer>
  );
};

export default AlertExample;
