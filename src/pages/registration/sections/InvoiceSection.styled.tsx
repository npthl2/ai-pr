import { Typography, RadioGroup, Card, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const InvoiceCard = styled(Card)({
  height: '100%',
  backgroundColor: 'inherit',
  boxShadow: 'none',
  boxSizing: 'border-box',
  marginTop: 20,
  '> .MuiBox-root': {
    marginBottom: 20,
  },

  '& .MuiBox-root': {
    display: 'flex',
    alignItems: 'top',
  },
});

export const LabelWrapper = styled(Box)({
  display: 'flex',
  width: '100px',
  minWidth: '100px',
  alignItems: 'top',
});

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
}));

export const InformationIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.action.active,
}));
