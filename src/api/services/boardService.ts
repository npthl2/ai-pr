import { BoardsResponse } from '@/model/Board';
//import baseService from './baseService';
import { CommonResponse, CommonStatus } from '@model/common/CommonResponse';

const mockBoardsData: CommonResponse<BoardsResponse> = {
  successOrNot: 'Y',
  status: CommonStatus.SUCCESS,
  data: {
    boards: [
      {
        boardId: 1,
        title: '첫 번째 게시글입니다',
        content: '안녕하세요. 첫 번째 게시글의 내용입니다.',
        author: '홍길동',
        createdAt: '2024-03-20T10:00:00',
      },
      {
        boardId: 2,
        title: '두 번째 게시글입니다',
        content: '안녕하세요. 두 번째 게시글의 내용입니다.',
        author: '김철수',
        createdAt: '2024-03-20T11:00:00',
      },
      {
        boardId: 3,
        title: '세 번째 게시글입니다',
        content: '안녕하세요. 세 번째 게시글의 내용입니다.',
        author: '이영희',
        createdAt: '2024-03-20T12:00:00',
      },
    ],
    totalCount: 3,
  },
};

const boardService = {
  getBoards(): Promise<CommonResponse<BoardsResponse>> {
    // 2초 지연 후 목업 데이터 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBoardsData);
      }, 2000);
    });
  },
};

export default boardService;
