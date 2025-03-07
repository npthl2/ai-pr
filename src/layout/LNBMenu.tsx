import { Box, Typography, Divider, Slide, useTheme } from '@mui/material';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { useEffect, useState } from 'react';
import {
  LNBMenuContainer,
  MainMenu as MainMenuContainer,
  SubMenu,
  SubMenuHeader,
  SubMenuTitle,
  CloseButton,
  SubMenuContent,
  SubMenuItem,
  LNBMenuItem,
  StarIconButton,
} from './LNBMenu.styled';
import { amber } from '@mui/material/colors';
import FavoriteIcon from '@components/FavoriteIcon';
import useCustomerStore from '@stores/CustomerStore';
import LNBCustomerList from '@layout/component/LNBCustomerList';
import { useBookmarksQuery } from '@api/queries/bookmark/useBookmarksQuery';
import useMenuStore from '@stores/MenuStore';
import { useBookmark } from '@hooks/useBookmark';
import { DEFAULT_TABS, MainMenu, SUBSCRIPTION_MENUS, TabInfo } from '@constants/CommonConstant';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { Work } from '@model/Customer';
import { useRegistration } from '@hooks/useRegistration';

interface LNBMenuProps {
  selectedMenu?: string | null;
  onMenuSelect?: (menuId: string) => void;
}

type MenuType = 'bookmarks' | 'menu';

type SubMenuItem = {
  id: string;
  name: string;
  bookmark?: boolean;
  selected?: boolean;
};

const LNBMenu = ({ selectedMenu, onMenuSelect }: LNBMenuProps) => {
  const theme = useTheme();

  const [openSubMenu, setOpenSubMenu] = useState<MenuType | null>(null);
  const [mountSubmenu, setMountSubmenu] = useState<MenuType | null>(null);

  const { menuItems, displayMode, setMenuItems, setSelectedMainMenu } = useMenuStore();
  const [newCustomerId, setNewCustomerId] = useState<number>(0);

  const {
    customers,
    selectedCustomerId,
    addCustomer,
    selectCustomer,
    removeCustomer,
    customerTabs,
    setCustomerTabs,
    setActiveTab,
  } = useCustomerStore();

  const { handleBookmarkClick } = useBookmark();
  const { handleRemoveAllRegistrationInfo } = useRegistration();
  const { data: bookmarks } = useBookmarksQuery();

  const menus = [
    { id: MainMenu.HOME, icon: <HomeIcon /> },
    { id: MainMenu.MENU, icon: <MenuIcon />, name: '메뉴' },
    {
      id: MainMenu.BOOKMARKS,
      icon: (
        <FavoriteIcon
          borderColor={openSubMenu === 'bookmarks' ? theme.palette.common.white : undefined}
        />
      ),
      name: '즐겨찾는 메뉴',
    },
  ];

  useEffect(() => {
    if (bookmarks) {
      setMenuItems(bookmarks);
    }
  }, [bookmarks]);

  useEffect(() => {
    if (selectedMenu === MainMenu.HOME) {
      const timer = setTimeout(() => {
        setOpenSubMenu(null);
        setMountSubmenu(null);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [selectedMenu]);

  const handleMenuClick = (menuId: string) => {
    if (openSubMenu === menuId) {
      setOpenSubMenu(null);
      if (displayMode === MainMenu.HOME) {
        onMenuSelect?.(MainMenu.HOME);
        return;
      }
    } else {
      setOpenSubMenu(menuId as MenuType);
      setMountSubmenu(menuId as MenuType);
    }
    onMenuSelect?.(menuId);
  };

  const handleCloseSubMenu = () => {
    setOpenSubMenu(null);
    setTimeout(() => {
      setMountSubmenu(null);
    }, 300);
  };

  const handleSubMenuItemClick = (itemId: string) => {
    if (itemId === 'NEW_SUBSCRIPTION') {
      const newCustomer: Work = {
        id: 'NEW_SUBSCRIPTION' + newCustomerId,
        name: TabInfo.NEW_SUBSCRIPTION.label,
      };
      addCustomer(newCustomer);
      setNewCustomerId(newCustomerId + 1);
      const newTab = {
        id: 2,
        label: newCustomer.name,
        closeable: true,
      };

      setCustomerTabs(newCustomer.id, [newTab]);
      setActiveTab(newCustomer.id, newTab.id);
      setSelectedMainMenu(MainMenu.CUSTOMERS);
    } else {
      if (!selectedCustomerId || selectedCustomerId.includes('NEW_SUBSCRIPTION')) return;

      const targetMenu = SUBSCRIPTION_MENUS.find((menu) => menu.id === itemId);
      if (!targetMenu) return;

      const currentTabs = customerTabs[selectedCustomerId]?.tabs;
      if (!currentTabs) return;

      const existingTab = currentTabs.find((tab) => tab.label === targetMenu.name);
      if (existingTab) {
        setActiveTab(selectedCustomerId, existingTab.id);
        return;
      }

      const newTab = {
        id: DEFAULT_TABS.find((tab) => tab.label === targetMenu.name)?.id ?? currentTabs.length,
        label: targetMenu.name,
        closeable: true,
      };

      setCustomerTabs(selectedCustomerId, [...currentTabs, newTab]);
      setActiveTab(selectedCustomerId, newTab.id);
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    selectCustomer(newValue);
  };

  const handleRemoveCustomer = (id: string) => {
    removeCustomer(id);
    handleRemoveAllRegistrationInfo(id);
  };

  return (
    <>
      <LNBMenuContainer>
        <MainMenuContainer>
          {menus.map((menu) => (
            <LNBMenuItem
              key={menu.id}
              variant='text'
              data-testid={`${menu.id}-button`}
              iconComponent={menu.icon}
              className={
                (menu.id === MainMenu.HOME && selectedMenu === MainMenu.HOME) ||
                (selectedMenu !== MainMenu.HOME &&
                  (menu.id === MainMenu.MENU || menu.id === MainMenu.BOOKMARKS) &&
                  openSubMenu === menu.id) ||
                (menu.id === MainMenu.CUSTOMERS && selectedMenu === MainMenu.CUSTOMERS)
                  ? 'selected'
                  : ''
              }
              onClick={() => handleMenuClick(menu.id)}
            />
          ))}

          <Divider sx={{ my: 1, width: '100%' }} />

          <LNBCustomerList
            value={selectedCustomerId || ''}
            onChange={handleTabChange}
            customers={customers}
            onRemove={handleRemoveCustomer}
          />
        </MainMenuContainer>

        <Box sx={{ overflow: 'hidden' }}>
          {mountSubmenu && menuItems[mountSubmenu] && (
            <Slide
              direction='right'
              in={openSubMenu === mountSubmenu}
              timeout={300}
              mountOnEnter
              unmountOnExit
            >
              <SubMenu data-testid={`${mountSubmenu}-list`}>
                <SubMenuHeader>
                  <SubMenuTitle>
                    {menus.find((menu) => menu.id === mountSubmenu)?.name || '메뉴'}
                  </SubMenuTitle>
                  <CloseButton
                    variant='text'
                    iconComponent={<KeyboardTabIcon />}
                    onClick={handleCloseSubMenu}
                  />
                </SubMenuHeader>
                <SubMenuContent>
                  {menuItems[mountSubmenu].map((item) => (
                    <SubMenuItem
                      key={item.id}
                      data-testid={`menu-item-${item.name}`}
                      variant='text'
                      onClick={() => handleSubMenuItemClick(item.id)}
                    >
                      <Typography>{item.name}</Typography>
                      <StarIconButton
                        variant='text'
                        data-testid={`bookmark-button-${item.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmarkClick(e, item.id);
                        }}
                      >
                        {item.bookmark ? (
                          <FavoriteIcon fillColor={amber[600]} size='small' />
                        ) : (
                          <FavoriteIcon borderColor={theme.palette.action.active} size='small' />
                        )}
                      </StarIconButton>
                    </SubMenuItem>
                  ))}
                </SubMenuContent>
              </SubMenu>
            </Slide>
          )}
        </Box>
      </LNBMenuContainer>
    </>
  );
};

export default LNBMenu;
