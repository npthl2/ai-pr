import { TextareaAutosize, Typography, styled } from '@mui/material';

export const Textarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.primary.main}`,
  resize: 'none',
  borderRadius: '4px',
  padding: '7px 12px',
  '&:focus': { outlineColor: theme.palette.primary.main },

  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '150%',
  letterSpacing: '0px',
  verticalAlign: 'middle',
  color: theme.palette.text.primary,
}));

export const PrimaryTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
