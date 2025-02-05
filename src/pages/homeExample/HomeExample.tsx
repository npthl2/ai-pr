import { useBoardsQuery } from '@/api/queries/board/useBoardsQuery';
import { CircularProgress } from '@mui/material';
import { HomeContainer, SpinnerContainer } from './HomeExample.styled';
import BoardList from './components/BoardList';

function HomeExample() {
  const { data, isLoading, error } = useBoardsQuery();

  if (isLoading) {
    return (
      <SpinnerContainer>
        <CircularProgress color='primary' />
      </SpinnerContainer>
    );
  }

  if (error) {
    return (
      <div>
        <h2>에러가 발생했습니다</h2>
        <p>{error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다'}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <HomeContainer>
      <h1>게시판 목록</h1>
      <BoardList boards={data} />
    </HomeContainer>
  );
}

export default HomeExample;
