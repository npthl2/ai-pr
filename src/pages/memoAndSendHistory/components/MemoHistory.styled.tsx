import { Box, TextareaAutosize, Typography, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HighlightedTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export const MemoHistoryBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const MemoEditorBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const MemoContentTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  textOverflow: 'ellipsis',
}));

export const MemoEditorTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.primary.main}`,
  resize: 'none',
  borderRadius: '4px',
}));

export const MemoHistoryTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: '220px',
  minHeight: '220px',
  overflowY: 'auto',
  position: 'relative',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));
