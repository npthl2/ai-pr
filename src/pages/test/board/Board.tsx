// src/BoardList.tsx
import React, { useEffect, useState } from 'react';
import BoardItem from './component/BoardItem';
import { BoardItem as BoardItemType } from './types';
import {
  BoardListContainer,
  LoadingMessage,
  ErrorMessage,
  BoardRegistButton,
} from './Board.styled';
import BoardService from './BoardService';
import { useNavigate } from 'react-router-dom'; // react-router-dom 사용하여 페이지 이동

const Board: React.FC = () => {
  const [boardList, setBoardList] = useState<BoardItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleAddPostClick = () => {
    navigate('/test/board/regist', { replace: true });
  };

  useEffect(() => {
    const getBoardList = async () => {
      try {
        const response = await BoardService.fetchBoardList();
        if (response.successOrNot === 'Y' && response.data) {
          setBoardList(response.data as unknown as BoardItemType[]);
        }
      } catch (error) {
        console.error('Failed to load board data', error);
        setError('Failed to load board data');
      } finally {
        setLoading(false);
      }
    };

    getBoardList();
  }, []);

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <BoardListContainer>
      <BoardRegistButton onClick={handleAddPostClick} data-testid='registBoard'>
        게시글 등록
      </BoardRegistButton>
      {boardList.map((item) => (
        <BoardItem key={item.id} item={item} />
      ))}
    </BoardListContainer>
  );
};

export default Board;
