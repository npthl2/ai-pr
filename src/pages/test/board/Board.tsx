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

  const data = [
    {
      id: 1,
      title: '첫 번째 게시글',
      content: '이것은 첫 번째 게시글의 내용입니다.',
      createdAt: '2025-02-01',
    },
    {
      id: 2,
      title: '두 번째 게시글',
      content: '두 번째 게시글의 내용이 여기에 들어갑니다.',
      createdAt: '2025-02-02',
    },
    {
      id: 3,
      title: '세 번째 게시글',
      content: '세 번째 게시글에 대한 내용이 여기에 있습니다.',
      createdAt: '2025-02-03',
    },
    {
      id: 4,
      title: '네 번째 게시글',
      content: '네 번째 게시글의 내용이 여기에 들어가 있습니다.',
      createdAt: '2025-02-04',
    },
    {
      id: 5,
      title: '다섯 번째 게시글',
      content: '다섯 번째 게시글의 내용입니다. 여기에 다양한 정보가 포함될 수 있습니다.',
      createdAt: '2025-02-05',
    },
  ];

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
        // setBoardList(data);
      } catch (error) {
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
