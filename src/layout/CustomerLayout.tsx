import { Box } from '@mui/material';
import useCustomerStore from '@stores/CustomerStore';
import ContentsLayout from './ContentsLayout';
import useMenuStore from '@stores/MenuStore';
import Home from '@pages/home/Home';
import { useEffect, useState } from 'react';
import { MainMenu } from '@constants/CommonConstant';

const CustomerLayout = () => {
  const { customers, selectedCustomerId } = useCustomerStore();
  const selectedMainMenu = useMenuStore((state) => state.selectedMainMenu);
  const setSelectedMainMenu = useMenuStore((state) => state.setSelectedMainMenu);
  const [lastDisplayMode, setLastDisplayMode] = useState<'home' | 'customer'>('home');

  useEffect(() => {
    if (customers.length === 0) {
      setSelectedMainMenu(MainMenu.HOME);
      setLastDisplayMode('home');
    }
  }, [customers]);

  useEffect(() => {
    if (selectedMainMenu === MainMenu.HOME) {
      setLastDisplayMode('home');
    } else if (selectedMainMenu === MainMenu.CUSTOMERS) {
      setLastDisplayMode('customer');
    }
  }, [selectedMainMenu]);

  // 메뉴나 북마크 상태일 때는 마지막 디스플레이 모드를 유지
  const displayMode =
    selectedMainMenu === MainMenu.HOME
      ? 'home'
      : selectedMainMenu === MainMenu.CUSTOMERS
        ? 'customer'
        : lastDisplayMode;

  return (
    <>
      <Box
        key={selectedMainMenu}
        sx={{
          display: displayMode === 'home' ? 'block' : 'none',
          height: '100%',
        }}
      >
        <Home />
      </Box>
      {customers.map((customer) => (
        <Box
          key={customer.id}
          sx={{
            display:
              displayMode === 'home'
                ? 'none'
                : selectedCustomerId === customer.id
                  ? 'block'
                  : 'none',
            height: '100%',
          }}
        >
          <ContentsLayout customerId={customer.id} />
        </Box>
      ))}
    </>
  );
};

export default CustomerLayout;
