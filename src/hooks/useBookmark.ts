import { useCallback } from 'react';
import { debounce } from '@mui/material';
import { SUBSCRIPTION_MENUS } from '@constants/CommonConstant';
import useMenuStore from '@stores/MenuStore';
import { useBookmarkMutation } from '@api/queries/bookmark/useBookmarkMutation';

export const useBookmark = () => {
  const { menuItems, setMenuItems } = useMenuStore();
  const bookmarkMutation = useBookmarkMutation();

  const handleBookmarkClick = useCallback(
    debounce((e: React.MouseEvent<HTMLElement>, itemId: string) => {
      e.stopPropagation();

      const previousBookmarks = [...(menuItems.bookmarks || [])];
      const targetMenu = SUBSCRIPTION_MENUS.find((menu) => menu.id === itemId);

      if (!targetMenu) return;

      const newBookmarks = menuItems.bookmarks.some((item) => item.id === itemId)
        ? menuItems.bookmarks.filter((item) => item.id !== itemId)
        : [...menuItems.bookmarks, { id: targetMenu.id, name: targetMenu.name, bookmark: true }];

      setMenuItems(newBookmarks.map((item) => item.id));

      bookmarkMutation.mutate(
        { bookmark: itemId },
        {
          onError: () => setMenuItems(previousBookmarks.map((item) => item.id)),
        },
      );
    }, 500),
    [bookmarkMutation, menuItems, setMenuItems],
  );

  return { handleBookmarkClick };
};
