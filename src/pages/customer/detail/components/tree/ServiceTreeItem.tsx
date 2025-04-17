import { ServiceItem } from './types';
import { StyledTreeItem } from './StyledTreeItem';
import { Box, Typography } from '@mui/material';
import { CONTRACT_SERVICE_TYPE_CODE } from '@pages/customer/detail/CustomerDetailConstant';

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
    gap: '8px',
  };

  const colorBoxStyles = {
    width: '3px',
    height: '21px',
    backgroundColor: typeColor,
  };

  const textStyles = {
    color: typeColor,
  };

  const formattedStartDate = item.validStartDatetime.split('T')[0];
  const formattedEndDate = item.validEndDatetime.split('T')[0];

  return (
    <StyledTreeItem
      key={item.id}
      itemId={item.id}
      onClick={() => onPhoneSelect(contractId)}
      data-group-testid='tree-item'
      label={
        <Box sx={boxStyles}>
          <Box sx={colorBoxStyles} />
          <Typography sx={textStyles} variant='body2'>
            {item.serviceType}
          </Typography>
          <Typography component='span' variant='body1'>
            {item.serviceName}
          </Typography>
          <Typography component='span' variant='body2' color='text.secondary'>
            {formattedStartDate} - {formattedEndDate}
          </Typography>
        </Box>
      }
    />
  );
};
