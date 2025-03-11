import Button from '@components/Button';
import TextField from '@components/TextField';
import { Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: 8,
  border: `1px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.grey[50],
  padding: 16,
  gap: 16,
}));

export const FormWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const LeftSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
});

export const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const FieldContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const FieldLabel = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  minWidth: 60,
  gap: 4,
});

export const PersonalInfoLabel = styled(Box)({
  minWidth: 100,
  gap: 4,
});

export const VerificationContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: '12px 24px',
  borderRadius: 8,
  height: '52px',
  display: 'flex',
}));

export const VerificationContent = styled(Box)({
  display: 'flex',
  gap: 16,
  alignItems: 'center',
});

export const VerificationTitle = styled(Typography)({
  variant: 'h4',
});

export const VerificationLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  variant: 'h6',
}));

export const VerificationStatus = styled(Typography)<{ success?: boolean }>(
  ({ theme, success }) => ({
    color: success ? theme.palette.success.main : theme.palette.error.main,
    variant: 'h6',
  }),
);

export const VerificationCheckButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  height: 28,
}));

export const DialogContent = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  rowGap: 16,
  marginBottom: 24,
  alignItems: 'center',
});

export const DialogResultBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: 16,
  borderRadius: 4,
}));

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

export const DialogResultValue = styled(Typography)<{ success?: boolean }>(
  ({ theme, success }) => ({
    color:
      success !== undefined
        ? success
          ? theme.palette.success.main
          : theme.palette.error.main
        : 'inherit',
  }),
);

export const StyledCheckbox = styled(Checkbox)(({ theme, disabled }) => ({
  '& .MuiSvgIcon-root': {
    color: disabled ? 'inherit' : theme.palette.grey[300],
  },
  '&:hover .MuiSvgIcon-root': {
    color: disabled ? 'inherit' : theme.palette.primary.main,
  },
  '&.Mui-checked .MuiSvgIcon-root': {
    color: disabled ? 'inherit' : theme.palette.primary.main,
  },
}));

export const StyledFormControlLabel = styled(FormControlLabel)({
  minWidth: 100,
  paddingLeft: 8,
  '& .MuiCheckbox-root': {
    padding: '0px 2px 0px 8px',
  },
});

export const VerificationButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  width: 65,
  padding: 0,
}));

export const DialogTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const DialogLabel = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
});

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

export const ResultText = styled(Typography)<{ success?: boolean }>(({ theme, success }) => ({
  color: success ? theme.palette.success.main : theme.palette.error.main,
}));
