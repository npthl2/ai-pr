import { SUBSCRIPTION_MENUS } from '@constants/CommonConstant';
import { create } from 'zustand';

type MenuItem = {
  id: string;
  name: string;
  bookmark?: boolean;
  selected?: boolean;
};

type MenuState = {
  menuItems: {
    bookmarks: MenuItem[];
    menu: MenuItem[];
  };
  setMenuItems: (bookmarks: string[]) => void;
};

const useMenuStore = create<MenuState>((set) => ({
  menuItems: {
    bookmarks: [],
    menu: [],
  },
  setMenuItems: (bookmarks: string[]) => {
    set(() => ({
      menuItems: {
        bookmarks: SUBSCRIPTION_MENUS.filter((menu) =>
          bookmarks?.some((bookmark) => bookmark === menu.id),
        ).map((menu) => ({
          id: menu.id,
          name: menu.name,
          bookmark: bookmarks?.some((bookmark) => bookmark === menu.id),
        })),
        menu: SUBSCRIPTION_MENUS.map((menu) => ({
          id: menu.id,
          name: menu.name,
          bookmark: bookmarks?.some((bookmark) => bookmark === menu.id),
        })),
      },
    }));
  },
}));
export default useMenuStore;
