import { Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material';
import { MainContainer, MainContent } from './MainLayout.styled';
import FavoriteIcon from '@components/FavoriteIcon';
import LNBMenu from './LNBMenu';
import DraggableFloatingButton from './component/DraggableFloatingButton';
import useMenuStore from '@stores/MenuStore';
import { MainMenu } from '@constants/CommonConstant';
import { useNavigate } from 'react-router-dom';
import useCustomerStore from '@stores/CustomerStore';

const MainLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { selectCustomer } = useCustomerStore();
  const { selectedMainMenu, setSelectedMainMenu } = useMenuStore();
  const menus = [
    { id: MainMenu.HOME, icon: <HomeIcon /> },
    { id: MainMenu.MENU, icon: <MenuIcon />, name: '메뉴' },
    {
      id: MainMenu.BOOKMARKS,
      icon: (
        <FavoriteIcon
          borderColor={selectedMainMenu === 'bookmarks' ? theme.palette.common.white : undefined}
        />
      ),
      name: '즐겨찾는 메뉴',
    },
  ];

  const handleMenuSelect = (menuId: string) => {
    if (menuId === MainMenu.HOME) {
      selectCustomer('');
      navigate('/');
    }
    setSelectedMainMenu(menuId);
  };

  return (
    <MainContainer>
      <LNBMenu selectedMenu={selectedMainMenu} menus={menus} onMenuSelect={handleMenuSelect} />
      <MainContent>
        <Outlet />
      </MainContent>
      <DraggableFloatingButton />
    </MainContainer>
  );
};

export default MainLayout;
