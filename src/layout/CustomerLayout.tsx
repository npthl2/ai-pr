import { Box } from '@mui/material';
import useCustomerStore from '@stores/CustomerStore';
import ContentsLayout from './ContentsLayout';
import useMenuStore from '@stores/MenuStore';
import Home from '@pages/home/Home';

const CustomerLayout = () => {
  const { customers, selectedCustomerId } = useCustomerStore();
  const selectedMainMenu = useMenuStore((state) => state.selectedMainMenu);

  return (
    <>
      <Box
        key={selectedMainMenu}
        sx={{
          display: selectedMainMenu === 'home' ? 'block' : 'none',
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
              selectedMainMenu === 'home'
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
