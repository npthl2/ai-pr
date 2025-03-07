import { Box, Accordion, styled } from '@mui/material';

export const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: 24,
});

export const ContentWrapper = styled(Box)({
  display: 'flex',
  gap: 24,
  minHeight: 0,
  flex: 1,
});

export const SectionsContainer = styled(Box)({
  flex: '0 0 66.666%',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
});

export const SectionsWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  // paddingBottom: '42vh',
  '&::-webkit-scrollbar': {
    width: 4,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[300],
    borderRadius: 4,
    minHeight: 124,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
}));

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  gap: 24,
  '&:not(:last-child)': {
    marginBottom: theme.spacing(1),
  },
  '&:last-child': {
    paddingBottom: '50vh',
  },
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    minHeight: 48,
    flexDirection: 'row-reverse',
    gap: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    backgroundColor: 'transparent',
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
}));
