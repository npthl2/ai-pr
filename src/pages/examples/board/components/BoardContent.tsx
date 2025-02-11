import { useBoardsQuery } from '@api/queries/board/useBoardsQuery';
import { BoardContainer } from '../BoardExample.styled';
import BoardList from './BoardList';

const BoardContent = () => {
  const { data } = useBoardsQuery();

  return (
    <BoardContainer>
      <h1>게시판 목록</h1>
      {data && data.length > 0 ? <BoardList boards={data} /> : <p>게시글이 없습니다</p>}
    </BoardContainer>
  );
};

export default BoardContent;
