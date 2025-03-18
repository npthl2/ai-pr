import { styled } from '@mui/material/styles';
import { FormControlLabel, Checkbox, Box, Typography } from '@mui/material';
import Button from '@components/Button';

export const LeftSection = styled(Box)({
  display: 'flex',
  gap: 14,
});

export const RightSection = styled(Box)({
  display: 'flex',
});

export const FieldContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'last' && prop !== 'readOnly',
})<{ last?: boolean; readOnly?: boolean }>(({ last, readOnly }) => ({
  display: 'flex',
  gap: last ? 0 : 6,
  alignItems: 'flex-start',
  ...(readOnly && {
    alignItems: 'center',
  }),
}));

export const NameLabel = styled(Box)({
  display: 'flex',
  minWidth: 36,
  gap: 1,
  paddingTop: 3,
});

export const RrnoLabel = styled(Box)({
  display: 'flex',
  minWidth: 60,
  gap: 1,
  paddingTop: 3,
});

export const PersonalInfoLabel = styled(Box)({
  display: 'flex',
  minWidth: 100,
  gap: 1,
  paddingTop: 3,
});

export const ReadOnlyLabel = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  paddingRight: 36,
  paddingTop: 3,
});

export const StyledFormControlLabel = styled(FormControlLabel)({
  minWidth: 100,
  '& .MuiCheckbox-root': {
    padding: '0px',
  },
  paddingTop: 3,
});

export const VerificationButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  width: 65,
  height: 32,
  padding: 0,
}));

export const StyledCheckbox = styled(Checkbox)(({ theme, disabled }) => ({
  marginRight: 2,
  marginLeft: 6,
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
