import { styled } from '@mui/material/styles';
import TextField from '@components/TextField';
import { Box } from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    minHeight: '28px',
  },
}));
export const FormRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  flexDirection: 'row',
}));

export const FormGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  gap: theme.spacing(1.5),
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'center',
  height: '28px',
}));

export const FormLabel = styled('div')(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.secondary,
  whiteSpace: 'nowrap',
  width: 'auto',
}));

export const RequiredLabel = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  marginLeft: '2px',
}));
