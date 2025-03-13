import { styled } from '@mui/material/styles';
import { Box, Typography, FormControlLabel } from '@mui/material';
import TextField from '@components/TextField';
import Button from '@components/Button';

export const DialogTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const DialogContent = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  rowGap: 16,
  marginBottom: 16,
});

export const DialogLabel = styled(Typography)(({ alignItems }: { alignItems?: string }) => ({
  display: 'flex',
  alignItems: alignItems || 'center',
  paddingTop: alignItems === 'inherit' ? 4 : 0,
  gap: 4,
}));

export const DialogTextField = styled(TextField)({
  width: 216,
});

export const RadioGroup = styled(Box)({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  paddingTop: 16,
  paddingBottom: 16,
});

export const StyledRadioLabel = styled(FormControlLabel)({
  '& .MuiFormControlLabel-root': {
    margin: 0,
  },
  marginLeft: 0,
  width: 65,
});

export const StyledRadioLabelSecond = styled(FormControlLabel)({
  '& .MuiFormControlLabel-root': {
    margin: 0,
  },
  marginLeft: -30,
  width: 75,
});

export const AuthButton = styled(Button)({
  width: 65,
  padding: 0,
  marginLeft: -8,
});

export const DialogResultContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

export const DialogResultGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '12px',
});

export const DialogResultLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const DialogResultValue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'success',
})<{ success?: boolean }>(({ theme, success }) => ({
  color:
    success !== undefined
      ? success
        ? theme.palette.success.main
        : theme.palette.error.main
      : 'inherit',
}));
