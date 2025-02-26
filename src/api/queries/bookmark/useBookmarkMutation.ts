import { useMutation } from '@tanstack/react-query';

import bookmarkService from '@api/services/bookmarkService';
import { BookmarkRequestParams } from '@model/Bookmark';

export const useBookmarkMutation = () => {
  return useMutation({
    mutationFn: (data: BookmarkRequestParams) => bookmarkService.saveBookmark(data),
  });
};
