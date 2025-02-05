export interface Board {
  boardId: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface BoardsResponse {
  boards: Board[];
  totalCount: number;
}

// Board 타입가드 함수 추가
export function isBoard(value: unknown): value is Board {
  return (
    typeof value === 'object' &&
    value !== null &&
    'boardId' in value &&
    typeof (value as Board).boardId === 'number'
  );
}

// BoardsResponse 타입가드 함수 추가
export function isBoardsResponse(value: unknown): value is BoardsResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'boards' in value &&
    Array.isArray((value as BoardsResponse).boards) &&
    (value as BoardsResponse).boards.every((item) => isBoard(item)) &&
    'totalCount' in value &&
    typeof (value as BoardsResponse).totalCount === 'number'
  );
}
