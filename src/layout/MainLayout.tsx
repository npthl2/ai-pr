import { Outlet } from 'react-router-dom';

import { MainContainer, MainContent } from './MainLayout.styled';
import LNBMenu from './LNBMenu';
import DraggableFloatingButton from './component/DraggableFloatingButton';
import useMenuStore from '@stores/MenuStore';
import { MainMenu } from '@constants/CommonConstant';
import useCustomerStore from '@stores/CustomerStore';

const MainLayout = () => {
  const { selectCustomer } = useCustomerStore();
  const { selectedMainMenu, setSelectedMainMenu } = useMenuStore();

  const handleMenuSelect = (menuId: string) => {
    if (menuId === MainMenu.HOME) {
      selectCustomer('');
    }
    setSelectedMainMenu(menuId);
  };

  return (
    <MainContainer>
      <LNBMenu selectedMenu={selectedMainMenu} onMenuSelect={handleMenuSelect} />
      <MainContent>
        <Outlet />
      </MainContent>
      <DraggableFloatingButton />
    </MainContainer>
  );
};

export default MainLayout;
