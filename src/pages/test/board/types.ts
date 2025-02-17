// src/types.ts
export interface BoardItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface BoardListResponse {
  data: BoardItem[];
}

export interface BoardRequest {
  title: string;
  content: string;
}
