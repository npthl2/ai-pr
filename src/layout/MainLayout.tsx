import { Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { MainContainer, MainContent } from './MainLayout.styled';
import FavoriteIcon from '@components/FavoriteIcon';
import LNBMenu from './LNBMenu';
import DraggableFloatingButton from './component/DraggableFloatingButton';

const MainLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>('home');
  const theme = useTheme();

  const menus = [
    { id: 'home', icon: <HomeIcon /> },
    { id: 'menu', icon: <MenuIcon />, name: '메뉴' },
    {
      id: 'favorite',
      icon: (
        <FavoriteIcon
          borderColor={selectedMenu === 'favorite' ? theme.palette.common.white : undefined}
        />
      ),
      name: '즐겨찾는 메뉴',
    },
  ];

  const handleMenuSelect = (menuId: string) => {
    setSelectedMenu(menuId);
  };

  return (
    <MainContainer>
      <LNBMenu selectedMenu={selectedMenu} menus={menus} onMenuSelect={handleMenuSelect} />
      <MainContent>
        <Outlet />
      </MainContent>
      <DraggableFloatingButton />
    </MainContainer>
  );
};

export default MainLayout;
