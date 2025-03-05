import { PhoneItem } from './types';
import { StyledTreeItem } from './StyledTreeItem';
import { ServiceTreeItem } from './ServiceTreeItem';
import { Box, Typography } from '@mui/material';
import { Chip } from '@components/Chip';
import { CONTRACT_STATUS_CODE_USE } from '@pages/customerDetail/CustomerDetailConstant';

interface PhoneTreeItemProps {
  item: PhoneItem;
  onPhoneSelect: (contractId: string) => void;
}

const chipStyles = (status: string) => ({
  width: 53,
  height: 22,
  borderRadius: '16px',
  backgroundColor: status === CONTRACT_STATUS_CODE_USE ? '#2196F3' : '#FFFFFF',
  backgroundImage:
    status === CONTRACT_STATUS_CODE_USE
      ? 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))'
      : 'none',
  border: status !== CONTRACT_STATUS_CODE_USE ? '1px solid #D1D6DA' : 'none',
  color: '272E35',
  fontSize: '12px',
});

export const PhoneTreeItem = ({ item, onPhoneSelect }: PhoneTreeItemProps) => (
  <StyledTreeItem
    key={item.id}
    itemId={item.contractId}
    onClick={() => onPhoneSelect(item.contractId)}
    label={
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Typography sx={{ fontSize: '14px' }}>{item.phone}</Typography>
        <Chip label={item.status} sx={chipStyles(item.status)} data-testid='phone-status' />
        <Typography
          component='span'
          sx={{
            fontSize: '12px',
          }}
        >
          {item.date}
        </Typography>
      </Box>
    }
    data-testid='phone-tree-item'
    data-group-testid='tree-item'
  >
    {item.children?.map((service) => (
      <ServiceTreeItem
        key={service.id}
        item={service}
        onPhoneSelect={onPhoneSelect}
        contractId={item.contractId}
        data-testid='tree-phone-item'
      />
    ))}
  </StyledTreeItem>
);
