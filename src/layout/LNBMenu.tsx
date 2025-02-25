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

interface LNBMenuProps {
  menus: Array<{
    id: string;
    name?: string;
    icon: React.ReactElement;
  }>;
  selectedMenu?: string | null;
  onMenuSelect?: (menuId: string) => void;
}

type SubMenuItem = {
  id: string;
  name: string;
  selected?: boolean;
};

type SubMenuItems = {
  [key: string]: SubMenuItem[];
};

const LNBMenu = ({ selectedMenu, menus, onMenuSelect }: LNBMenuProps) => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [mountSubmenu, setMountSubmenu] = useState<string | null>(null);
  const [selectedBookmarks, setSelectedBookmarks] = useState<Set<string>>(new Set());
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState<string | null>(null);
  const { customers, selectedCustomerId, selectCustomer, removeCustomer } = useCustomerStore();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setTabValue(selectedCustomerId);
  }, [selectedCustomerId]);

  const subMenuItems: SubMenuItems = {
    menu: [
      { id: 'menu1', name: '신규가입' },
      { id: 'menu2', name: '요금제/부가서비스 변경' },
    ],
    favorite: [
      { id: 'favorite1', name: '즐겨찾기 1' },
      { id: 'favorite2', name: '즐겨찾기 2' },
      { id: 'favorite3', name: '즐겨찾기 3' },
    ],
  };

  const handleMenuClick = (menuId: string) => {
    if (openSubMenu === menuId) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(menuId);
      setMountSubmenu(menuId);
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
  };

  const handleBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>, itemId: string) => {
    event.stopPropagation();
    setSelectedBookmarks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    selectCustomer(newValue);
    navigate('/');
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
            value={tabValue || ''}
            onChange={handleTabChange}
            customers={customers}
            onRemove={handleRemoveCustomer}
          />
        </MainMenu>

        <Box sx={{ overflow: 'hidden' }}>
          {mountSubmenu && subMenuItems[mountSubmenu] && (
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
                  {subMenuItems[mountSubmenu].map((item) => (
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
                        {selectedBookmarks.has(item.id) ? (
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
