import { styled } from '@mui/material/styles';
import { Box, Radio } from '@mui/material';
import TextField from '@components/TextField';
import Button from '@components/Button';

export const SectionContainer = styled(Box)(({}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  borderRadius: '8px',
  width: '100%',
  height: '100%',
}));

export const SectionInfoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  // minWidth: '227px',
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

export const FormRowSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& .MuiFormControl-root': {
    width: '140px',
  },
}));

export const FormRowSectionIEMI = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& .MuiFormControl-root': {
    width: '160px',
  },
}));

export const FormRowSectionPlan = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& .MuiFormControl-root': {
    width: '200px',
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
    backgroundColor: '#FFFFFF',
    height: '28px',
  },
}));

export const StyledRadio = styled(Radio)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));

export const PhoneNumberField = styled(TextField)(({ theme }) => ({
  width: '200px',
  marginRight: theme.spacing(1),
}));

export const ActionButton = styled(Button)(({}) => ({
  margin: 0,
  padding: 0,
  height: '28px',
  backgroundColor: '#FFFFFF',
}));

export const TwoColumnContainer = styled(Box)({
  display: 'flex',
  gap: '20px',
});

export const Column = styled(Box)(({ theme }) => ({
  width: '100%',
  gap: theme.spacing(2),
  flex: 1,
  borderRight: '1px solid #e0e0e0',
  '&:last-child': {
    borderRight: 'none',
  },
  padding: '0 10px',
}));
