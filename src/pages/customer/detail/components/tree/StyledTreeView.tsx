import { styled } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view';

const StyledTreeView = styled(SimpleTreeView)(({}) => ({
  width: 499,
  height: 682,
  paddingBottom: '8px',
  borderRadius: '4px',

  '& .Mui-focused': {
    backgroundColor: 'transparent !important',
  },
  '& .MuiTreeItem-content.Mui-focused': {
    backgroundColor: 'transparent !important',
  },
  '& .MuiTreeItem-content:hover': {
    backgroundColor: 'transparent !important',
  },
  '& .Mui-selected': {
    backgroundColor: '#F5F6F8 !important',
  },
  '& .MuiTreeItem-content.Mui-selected': {
    backgroundColor: '#F5F6F8 !important',
  },
}));

export default StyledTreeView;
