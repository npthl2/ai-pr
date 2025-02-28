import { Typography } from '@mui/material';
import { Content, Header, HistoryContainer } from './History.styled';

const History = () => {
  return (
    <HistoryContainer data-testid='history-area'>
      <Header>
        <Typography variant='subtitle2'>처리 요청 내역</Typography>
        <Typography variant='caption' color='text.secondary'>
          처리중 0건
        </Typography>
      </Header>
      <Content>
        <Typography color='text.secondary'>표시할 내용이 없습니다.</Typography>
      </Content>
    </HistoryContainer>
  );
};

export default History;
