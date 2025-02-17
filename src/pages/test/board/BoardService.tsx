import { CommonResponse } from '@model/common/CommonResponse';
import { BoardListResponse, BoardRequest } from './types';
import baseService from '@api/services/baseService';

const BoardService = {
  async fetchBoardList(): Promise<CommonResponse<BoardListResponse>> {
    return await baseService.get<BoardListResponse>('/v1/board');
  },

  async registBoard(data: BoardRequest): Promise<CommonResponse<null>> {
    return await baseService.post<null, BoardRequest>('/v1/board', data);
  },
};

export default BoardService;
