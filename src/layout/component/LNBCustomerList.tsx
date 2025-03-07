import { Tab, IconButton, Box } from '@mui/material';
import { TabContext } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { LNBCustomerListContainer, StyledTabList, CustomerName } from './LNBCustomerList.styled';
import { useState } from 'react';
import { Customer, Work } from '@model/Customer';
import useMenuStore from '@stores/MenuStore';
import { MainMenu } from '@constants/CommonConstant';

interface LNBCustomerListProps {
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
  customers: Customer[] | Work[];
  onRemove: (id: string) => void;
}

const LNBCustomerList = ({ value, onChange, customers, onRemove }: LNBCustomerListProps) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const { setSelectedMainMenu } = useMenuStore();

  return (
    <LNBCustomerListContainer>
      <TabContext value={value}>
        <StyledTabList
          orientation='vertical'
          onClick={() => setSelectedMainMenu(MainMenu.CUSTOMERS)}
          onChange={onChange}
          data-testid='lnb-customer-list'
        >
          {customers.map((customer) => (
            <Tab
              key={customer.id}
              label={
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <CustomerName noWrap className={hoveredTab === customer.id ? 'hovered' : ''}>
                    {customer.name}
                  </CustomerName>
                  {hoveredTab === customer.id && (
                    <IconButton
                      size='small'
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(customer.id);
                      }}
                      sx={{
                        padding: 0,
                        position: 'absolute',
                        right: 4,
                        '&:hover': { backgroundColor: 'transparent' },
                      }}
                      data-testid={`remove-btn-${customer.id}`}
                    >
                      <CloseIcon
                        fontSize='small'
                        sx={{
                          fontSize: '14px',
                        }}
                      />
                    </IconButton>
                  )}
                </Box>
              }
              value={customer.id}
              onMouseEnter={() => setHoveredTab(customer.id)}
              onMouseLeave={() => setHoveredTab(null)}
              data-testid={`customer-tab-${customer.id}`}
            />
          ))}
        </StyledTabList>
      </TabContext>
    </LNBCustomerListContainer>
  );
};

export default LNBCustomerList;
