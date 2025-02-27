import { Tab, IconButton, Typography, Box } from '@mui/material';
import { TabContext } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { LNBCustomerListContainer, StyledTabList } from './LNBCustomerList.styled';
import { useState } from 'react';
import { Customer } from '@model/Customer';

interface LNBCustomerListProps {
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
  customers: Customer[];
  onRemove: (id: string) => void;
}

const LNBCustomerList = ({ value, onChange, customers, onRemove }: LNBCustomerListProps) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <LNBCustomerListContainer>
      <TabContext value={value}>
        <StyledTabList orientation='vertical' onChange={onChange} data-testid='lnb-customer-list'>
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
                  data-testid={`customer-tab-${customer.id}`}
                >
                  <Typography noWrap sx={{ textAlign: 'center' }}>
                    {customer.name}
                  </Typography>
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
            />
          ))}
        </StyledTabList>
      </TabContext>
    </LNBCustomerListContainer>
  );
};

export default LNBCustomerList;
