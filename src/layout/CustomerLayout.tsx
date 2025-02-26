import { Box } from '@mui/material';
import useCustomerStore from '@stores/CustomerStore';
import ContentsLayout from './ContentsLayout';

const CustomerLayout = () => {
  const { customers, selectedCustomerId } = useCustomerStore();

  return (
    <>
      {customers.map((customer) => (
        <Box
          key={customer.id}
          sx={{
            display: selectedCustomerId === customer.id ? 'block' : 'none',
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
