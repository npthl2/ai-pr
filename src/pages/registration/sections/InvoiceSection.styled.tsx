import { Typography, RadioGroup, Card, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';

export const InvoiceCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isSaved',
})<{ isSaved: boolean }>(({ isSaved }) => ({
  height: '100%',
  backgroundColor: 'inherit',
  boxShadow: 'none',
  boxSizing: 'border-box',
  marginTop: 10,
  '> .MuiBox-root': {
    marginBottom: isSaved ? 10 : 20,
  },

  '& .MuiBox-root': {
    display: 'flex',
    alignItems: 'top',
  },
}));

export const LabelWrapper = styled(Box)<{ width?: string }>(({ width = '100px' }) => ({
  display: 'flex',
  width,
  minWidth: width,
  alignItems: 'top',
}));

export const MandatoryTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export const LabelTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '14px',
  lineHeight: '150%',
  fontWeight: 600,
}));

export const CaptionTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '12px',
  lineHeight: '150%',
  fontWeight: 400,
}));

export const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  gap: '2px',
}));

export const InformationIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.action.active,
}));

export const AddressSearchIcon = styled(SearchIcon)({
  cursor: 'pointer',
  fontSize: 16,
});

export const InvoiceCheckIcon = styled(CheckIcon)({
  fontSize: 16,
});

export const SelectLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
