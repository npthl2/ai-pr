import { Box, Typography, Divider, Slide, useTheme } from '@mui/material';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  LNBMenuContainer,
  MainMenu,
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
import { SUBSCRIPTION_MENUS } from '@constants/CommonConstant';

interface LNBMenuProps {
  menus: Array<{
    id: string;
    name?: string;
    icon: React.ReactElement;
  }>;
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

const LNBMenu = ({ selectedMenu, menus, onMenuSelect }: LNBMenuProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openSubMenu, setOpenSubMenu] = useState<MenuType | null>(null);
  const [mountSubmenu, setMountSubmenu] = useState<MenuType | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

  const { menuItems, setMenuItems } = useMenuStore();

  const {
    customers,
    selectedCustomerId,
    selectCustomer,
    removeCustomer,
    customerTabs,
    setCustomerTabs,
    setActiveTab,
  } = useCustomerStore();
  const { handleBookmarkClick } = useBookmark();
  const { data: bookmarks } = useBookmarksQuery();

  useEffect(() => {
    if (bookmarks) {
      setMenuItems(bookmarks);
    }
  }, [bookmarks]);

  const handleMenuClick = (menuId: string) => {
    if (openSubMenu === menuId) {
      setOpenSubMenu(null);
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
    setSelectedSubItem(itemId);

    if (!selectedCustomerId) return;

    navigate('/customer');
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
      id: currentTabs.length,
      label: targetMenu.name,
      closeable: true,
    };

    setCustomerTabs(selectedCustomerId, [...currentTabs, newTab]);
    setActiveTab(selectedCustomerId, newTab.id);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate('/customer');
    selectCustomer(newValue);
  };

  const handleRemoveCustomer = (id: string) => {
    removeCustomer(id);
  };

  return (
    <>
      <LNBMenuContainer>
        <MainMenu>
          {menus.map((menu) => (
            <LNBMenuItem
              key={menu.id}
              variant='text'
              iconComponent={menu.icon}
              className={selectedMenu === menu.id ? 'selected' : ''}
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
        </MainMenu>

        <Box sx={{ overflow: 'hidden' }}>
          {mountSubmenu && menuItems[mountSubmenu] && (
            <Slide
              direction='right'
              in={openSubMenu === mountSubmenu}
              timeout={300}
              mountOnEnter
              unmountOnExit
            >
              <SubMenu>
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
                      variant='text'
                      onClick={() => handleSubMenuItemClick(item.id)}
                      className={selectedSubItem === item.id ? 'selected' : ''}
                    >
                      <Typography>{item.name}</Typography>
                      <StarIconButton
                        variant='text'
                        onClick={(e) => handleBookmarkClick(e, item.id)}
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
