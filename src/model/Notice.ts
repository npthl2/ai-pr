export interface NoticeRequestParams {
  category?: string;
  keyword?: string;
}

export interface Notice {
  noticeId: string;
  category: string;
  title: string;
  content: string;
  author: string;
  isActive: boolean;
  firstCreateDatetime: string;
  lastUpdateDatetime: string;
}

export interface NoticeResponse {
  notices: Notice[];
}

export enum NoticeCategory {
  NOTICE = '공지',
  INTEGRATED = '통합',
}
