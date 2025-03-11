import { styled } from '@mui/material/styles';
import { Box, Radio, Button } from '@mui/material';
import TextField from '@components/TextField';

export const SectionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  borderRadius: '8px',
  // height: '227px',
  height: '100%',
}));

export const SectionTitle = styled('div')(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  // marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '"•"',
    marginRight: theme.spacing(1),
    fontSize: '1.2rem',
  },
}));

export const FormRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& > *:first-of-type': {
    flex: '0 0 auto',
  },
  '& > *:not(:first-of-type)': {
    flex: '1 1 auto',
  },
}));

export const FormLabel = styled('div')(({ theme }) => ({
  minWidth: '100px',
  fontWeight: 'bold',
  color: theme.palette.text.secondary,
}));

export const RequiredLabel = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  marginLeft: '2px',
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
  },
}));

export const StyledRadio = styled(Radio)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));

export const PhoneNumberField = styled(TextField)(({ theme }) => ({
  width: '200px',
  marginRight: theme.spacing(1),
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  margin: 0,
  padding: 0,
}));

export const TwoColumnContainer = styled(Box)({
  display: 'flex',
  gap: '20px',
});

export const Column = styled(Box)({
  flex: 1,
  borderRight: '1px solid #e0e0e0',
  '&:last-child': {
    borderRight: 'none',
  },
  padding: '0 10px',
});
