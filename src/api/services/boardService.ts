import { BoardsResponse } from '@/model/Board';
import baseService from './baseService';
import { CommonResponse } from '@model/common/CommonResponse';

export const boardService = {
  getBoards(): Promise<CommonResponse<BoardsResponse>> {
    return baseService.get<BoardsResponse>('/v1/boards');
  },
};
