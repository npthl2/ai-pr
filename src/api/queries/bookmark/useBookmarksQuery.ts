import { useSuspenseQuery } from '@tanstack/react-query';
import bookmarkService from '@api/services/bookmarkService';
import { CommonResponse } from '@model/common/CommonResponse';
import { BookmarkResponse } from '@model/Bookmark';

export const useBookmarksQuery = () => {
  return useSuspenseQuery({
    queryKey: ['bookmarks'],
    queryFn: () => bookmarkService.getBookmarks(),
    select: (data: CommonResponse<BookmarkResponse>) => {
      if (typeof data.data === 'string') return [];
      return data.data?.bookmarks || [];
    },
  });
};
