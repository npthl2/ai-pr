import { Box, styled, Stack, Accordion, AccordionSummary, IconButton } from '@mui/material';
import Select from '@components/Select';
import TextField from '@components/TextField';

export const TitleContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export const TitleWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const TitleBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

export const SearchContainer = styled(Stack)(() => ({
  flexDirection: 'row',
  marginBottom: '4px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '16px',
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  width: 150,
  height: 32,
  '& .MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${theme.palette.grey[200]}`,
  },
}));

export const SearchPaper = styled('form')(({ theme }) => ({
  width: 220,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '4px',
  padding: '0 12px',
  boxShadow: 'none',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&.active': {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

export const StyledTextField = styled(TextField)(() => ({
  flex: 1,
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-root': {
    padding: 0,
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
  width: 24,
  height: 24,
  color: theme.palette.action.active,
  '& svg': {
    fontSize: 20,
  },
}));

export const SearchIcon = styled('span')(() => ({
  fontSize: 20,
}));

export const HeaderGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '48px 100px 1fr 200px 256px',
  backgroundColor: `${theme.palette.grey[50]}`,
  padding: '12px 16px',
  borderTop: `1px solid ${theme.palette.grey[200]}`,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  '&:before': { display: 'none' },
  boxShadow: 'none',
  '&.Mui-expanded': {
    margin: 0,
  },
}));

export const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  display: 'grid',
  gridTemplateColumns: '48px 100px 1fr 200px 256px',
  gridTemplateRows: '65px',
  alignItems: 'center',
  padding: '0 16px',
  '& .MuiAccordionSummary-content': {
    margin: 0,
    display: 'contents',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    position: 'absolute',
    left: '16px',
    '&.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
  },
}));

export const AccordionDetailsContent = styled(Box)(({ theme }) => ({
  padding: '22px 16px 22px 164px',
  whiteSpace: 'pre-line',
  borderTop: `1px solid ${theme.palette.grey[200]}`,
}));

export const NoResultBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '272px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));

export const ContentContainer = styled(Box)<{ hasNotices: boolean }>(({ hasNotices }) => ({
  flex: 1,
  overflow: 'auto',
  width: '100%',
  height: hasNotices ? '748px' : 'auto',
}));

export const DialogStyle = {
  '& .MuiDialog-paper': {
    boxShadow:
      '0px 9px 46px 8px rgba(0, 0, 0, 0.12), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 11px 15px -7px rgba(0, 0, 0, 0.2)',
  },
  zIndex: 1500,
};

export const selectMenuProps = {
  sx: {
    zIndex: 1600,
  },
};
