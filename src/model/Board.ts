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
