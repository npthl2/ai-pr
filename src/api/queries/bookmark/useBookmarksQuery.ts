import bookmarkService from '@api/services/bookmarkService';
import { CommonResponse } from '@model/common/CommonResponse';
import { BookmarkResponse } from '@model/Bookmark';
import { useReactQuery } from '@hooks/useReactQuery';

export const useBookmarksQuery = () => {
  return useReactQuery({
    queryKey: ['bookmarks'],
    queryFn: () => bookmarkService.getBookmarks(),
    select: (data: CommonResponse<BookmarkResponse>) => {
      if (data.successOrNot === 'N') return data;
      if (typeof data.data === 'string') return [];
      return data.data?.bookmarks || [];
    },
  });
};
