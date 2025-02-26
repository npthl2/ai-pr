import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';
import { BookmarkRequestParams, BookmarkResponse } from '@model/Bookmark';

const bookmarkService = {
  getBookmarks(): Promise<CommonResponse<BookmarkResponse>> {
    return baseService.get<BookmarkResponse>('/cca-be/v1/member/bookmark');
  },
  saveBookmark(data: BookmarkRequestParams): Promise<CommonResponse<BookmarkResponse>> {
    return baseService.post<BookmarkResponse, BookmarkRequestParams>(
      '/cca-be/v1/member/bookmark',
      data,
    );
  },
};

export default bookmarkService;
