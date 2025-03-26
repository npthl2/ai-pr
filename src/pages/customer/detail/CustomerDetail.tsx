import { useEffect, useState } from 'react';
import Tree from './components/tree/Tree';
import { Box } from '@mui/material';
import Information from './components/information/Information';
import { SearchComponent } from './components/search/SearchComponent';
import useCustomerStore from '@stores/CustomerStore';
import { useQueryClient } from '@tanstack/react-query';
import {
  boxContainerStyle,
  informationContainerStyle,
  treeContainerStyle,
} from './CustomerDetail.styled';
import { boxStyle } from './CustomerDetail.styled';

const CustomerDetail = () => {
  const queryClient = useQueryClient();

  const [selectedContractId, setSelectedContractId] = useState<string>('');
  const [includeCancelled, setIncludeCancelled] = useState<boolean>(false);
  const [filteredContractId, setFilteredContractId] = useState<string | null>(null);

  const selectedCustomer = useCustomerStore((state) =>
    state.customers.find((c) => c.id === state.selectedCustomerId),
  ) as { id: string; contractId?: string } | undefined;
  const customerId = selectedCustomer?.id || '';

  useEffect(() => {
    initializeContractId();
    return () => {
      queryClient.invalidateQueries({ queryKey: ['customerContracts', customerId] });
    };
  }, []);

  const initializeContractId = () => {
    const contractId = selectedCustomer?.contractId;
    if (contractId) {
      setSelectedContractId(contractId);
    }
  };

  const handleFilteredContractId = (id: string | null) => {
    setFilteredContractId(id);
    if (id) {
      setSelectedContractId(id);
    }
  };

  return (
    <Box sx={boxStyle}>
      <Box sx={boxContainerStyle}>
        <Box sx={treeContainerStyle}>
          <SearchComponent
            customerId={customerId}
            includeCancelled={includeCancelled}
            onIncludeCancelledChange={setIncludeCancelled}
            onFilteredContractId={handleFilteredContractId}
          />
          <Tree
            customerId={customerId}
            selectedContractId={selectedContractId}
            includeCancelled={includeCancelled}
            filteredContractId={filteredContractId}
            onPhoneSelect={setSelectedContractId}
          />
        </Box>
        <Box sx={informationContainerStyle}>
          <Information customerId={customerId} contractId={selectedContractId} />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerDetail;
