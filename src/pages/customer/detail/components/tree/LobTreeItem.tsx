import { LobItem } from './types';
import { StyledTreeItem } from './StyledTreeItem';
import { PhoneTreeItem } from './PhoneTreeItem';
import { Box, Typography } from '@mui/material';

interface LobTreeItemProps {
  item: LobItem;
  onPhoneSelect: (contractId: string) => void;
  onLobSelect: (lobId: string) => void;
}

export const LobTreeItem = ({ item, onPhoneSelect, onLobSelect }: LobTreeItemProps) => {
  const isDisabled = item.lobType !== 'Mobile';

  const labelStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    opacity: isDisabled ? 0.5 : 1,
  };

  const textStyles = {
    display: 'flex',
    fontSize: '14px',
    color: isDisabled ? '#666' : 'inherit',
  };

  return (
    <StyledTreeItem
      data-testid='tree-lob-item'
      data-group-testid='tree-item'
      key={item.id}
      itemId={item.id}
      disabled={isDisabled}
      label={
        <Box sx={labelStyles}>
          <Typography sx={textStyles}>
            {item.lobType}
            <Typography color='text.secondary'>&nbsp;- {item.children.length}</Typography>
          </Typography>
        </Box>
      }
      onClick={() => {
        if (!isDisabled) {
          onLobSelect('Mobile');
        }
      }}
    >
      {!isDisabled &&
        item.children.map((phone) => (
          <PhoneTreeItem key={phone.id} item={phone} onPhoneSelect={onPhoneSelect} />
        ))}
    </StyledTreeItem>
  );
};
