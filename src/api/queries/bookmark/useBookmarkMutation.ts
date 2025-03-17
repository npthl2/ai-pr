import bookmarkService from '@api/services/bookmarkService';
import { BookmarkRequestParams } from '@model/Bookmark';
import { useReactMutation } from '@hooks/useReactQuery';

export const useBookmarkMutation = () => {
  return useReactMutation({
    mutationFn: (data: BookmarkRequestParams) => bookmarkService.saveBookmark(data),
  });
};
