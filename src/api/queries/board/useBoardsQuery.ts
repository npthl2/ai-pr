import { useQuery } from '@tanstack/react-query';
import { boardService } from '@/api/services/boardService';

const mockBoards = [
  {
    boardId: 1,
    title: '샘플 게시글 1',
    content: '샘플 내용입니다.',
    author: '작성자1',
    createdAt: new Date().toISOString(),
  },
  {
    boardId: 2,
    title: '샘플 게시글 2',
    content: '샘플 내용입니다.',
    author: '작성자2',
    createdAt: new Date().toISOString(),
  },
];

export const useBoardsQuery = () => {
  return useQuery({
    queryKey: ['boards'],
    queryFn: () => boardService.getBoards(),
    select: (data) => {
      if (typeof data.data === 'object' && data.data?.boards) {
        return data.data.boards;
      }
      return mockBoards;
    },
  });
};
