import { TreeItem } from '@mui/x-tree-view';
import { styled } from '@mui/material/styles';

export const StyledTreeItem = styled(TreeItem)(({}) => ({
  '& .MuiTreeItem-content': {
    padding: '8px 24px',
  },
  '& .MuiTreeItem-label': {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
  },
  '& .status': {
    color: '#666',
    fontSize: '12px',
  },
  '& .date': {
    color: '#666',
    fontSize: '12px',
  },
}));
