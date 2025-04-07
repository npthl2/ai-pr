import { Box, Paper, Stack, styled } from '@mui/material';

export const NoticeContainer = styled(Box)(() => ({
  width: '100%',
}));

export const NoticePaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 24px',
  backgroundColor: theme.palette.primary.light,
  borderRadius: '10px',
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  transition: 'background-color 0.2s',
}));

export const NoticeContentStack = styled(Stack)(() => ({
  flex: 1,
}));

export const NoticeTitleTypography = styled('div')(() => ({
  flex: 1,
}));
