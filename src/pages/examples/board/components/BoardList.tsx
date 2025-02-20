import { Board } from '@model/Board';
import { BoardListContainer, BoardItem, BoardTitle, BoardInfo } from './BoardList.styled';

interface BoardListProps {
  boards: Board[];
}

const BoardList = ({ boards }: BoardListProps) => {
  return (
    <BoardListContainer>
      {boards.map((board) => (
        <BoardItem key={board.boardId}>
          <BoardTitle>{board.title}</BoardTitle>
          <BoardInfo>
            <span>{board.author}</span>
            <span>{new Date(board.createdAt).toLocaleDateString()}</span>
          </BoardInfo>
        </BoardItem>
      ))}
    </BoardListContainer>
  );
};

export default BoardList;
