import { styled } from '@mui/material/styles';
import { FormControlLabel, Checkbox } from '@mui/material';
import Button from '@components/Button';

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

export const VerificationButton = styled(Button)({
  width: 65,
  padding: 0,
});
