import { TextareaAutosize, styled } from '@mui/material';

export const Textarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.primary.main}`,
  resize: 'none',
  borderRadius: '4px',
  padding: '7px 12px',
  '&:focus': { outlineColor: theme.palette.primary.main },
}));
