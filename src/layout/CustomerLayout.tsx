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
  const [lastDisplayMode, setLastDisplayMode] = useState<MainMenu.HOME | MainMenu.CUSTOMERS>(
    MainMenu.HOME,
  );
  const setDisplayMode = useMenuStore((state) => state.setDisplayMode);
  useEffect(() => {
    if (customers.length === 0) {
      setSelectedMainMenu(MainMenu.HOME);
      setLastDisplayMode(MainMenu.HOME);
    }
  }, [customers]);

  useEffect(() => {
    if (selectedMainMenu === MainMenu.HOME) {
      setLastDisplayMode(MainMenu.HOME);
    } else if (selectedMainMenu === MainMenu.CUSTOMERS) {
      setLastDisplayMode(MainMenu.CUSTOMERS);
    }
  }, [selectedMainMenu]);

  const handleDisplayMode = () => {
    return selectedMainMenu !== MainMenu.HOME && selectedMainMenu !== MainMenu.CUSTOMERS
      ? lastDisplayMode
      : selectedMainMenu;
  };

  useEffect(() => {
    setDisplayMode(handleDisplayMode());
  }, [lastDisplayMode]);

  const displayMode = handleDisplayMode();

  return (
    <>
      <Box
        key={selectedMainMenu}
        sx={{
          display: displayMode === MainMenu.HOME ? 'block' : 'none',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Home />
      </Box>
      {customers.map((customer) => (
        <Box
          key={customer.id}
          sx={{
            display:
              displayMode === MainMenu.HOME
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
