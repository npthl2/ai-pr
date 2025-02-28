export interface BookmarkRequestParams {
  bookmark: string;
}

export interface BookmarkResponse {
  memberId: string;
  bookmarks: string[];
}
