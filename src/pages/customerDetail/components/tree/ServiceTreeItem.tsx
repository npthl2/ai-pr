import { ServiceItem } from './types';
import { StyledTreeItem } from './StyledTreeItem';
import { Box, Typography } from '@mui/material';
import { CONTRACT_SERVICE_TYPE_CODE } from '@pages/customerDetail/CustomerDetailConstant';

interface ServiceTreeItemProps {
  item: ServiceItem;
  contractId: string;
  onPhoneSelect: (contractId: string) => void;
}

export const ServiceTreeItem = ({ item, contractId, onPhoneSelect }: ServiceTreeItemProps) => {
  const getTypeColor = (type: string): string => {
    switch (type) {
      case CONTRACT_SERVICE_TYPE_CODE:
        return '#ff0000';
      default:
        return '#666';
    }
  };

  const typeColor = getTypeColor(item.serviceType);

  const boxStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const colorBoxStyles = {
    width: '3px',
    height: '21px',
    backgroundColor: typeColor,
    marginRight: '8px',
  };

  const textStyles = {
    fontSize: '14px',
    color: typeColor,
  };

  const smallTextStyles = {
    fontSize: '12px',
    color: '#666',
  };

  return (
    <StyledTreeItem
      key={item.id}
      itemId={item.id}
      onClick={() => onPhoneSelect(contractId)}
      data-group-testid='tree-item'
      label={
        <Box sx={boxStyles}>
          <Box sx={colorBoxStyles} />
          <Typography
            sx={{
              ...textStyles,
              fontWeight: item.serviceType === CONTRACT_SERVICE_TYPE_CODE ? 500 : 400,
            }}
          >
            {item.serviceType}
          </Typography>
          <Typography component='span' sx={smallTextStyles}>
            {item.serviceName}
          </Typography>
          <Typography component='span' sx={smallTextStyles}>
            {item.date} -
          </Typography>
        </Box>
      }
    />
  );
};
