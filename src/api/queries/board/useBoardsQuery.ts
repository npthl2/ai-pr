import { useSuspenseQuery } from '@tanstack/react-query';
import boardService from '@api/services/boardService';
import { isBoardsResponse } from '@model/Board';

export const useBoardsQuery = () => {
  return useSuspenseQuery({
    queryKey: ['boards'],
    queryFn: () => boardService.getBoards(),
    select: (data) => {
      console.log(data);
      if (isBoardsResponse(data.data)) {
        return data.data.boards;
      }
      return [];
    },
  });
};
