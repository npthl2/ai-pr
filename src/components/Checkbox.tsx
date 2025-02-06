import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomCheckboxProps extends Omit<MuiCheckboxProps, 'color' | 'onChange'> {
  showLabel?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

const StyledCheckbox = styled(MuiCheckbox)<CustomCheckboxProps>(({ theme, disabled }) => ({
  padding: 0,
  '& .MuiCheckbox-root': {
    size: '16px',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
  },
  ...(!disabled && {
    '.MuiSvgIcon-root': {
      color: theme.palette.grey[300],
    },
    '&:hover .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
    '&.Mui-checked .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  }),
}));

const StyledFormControlLabel = styled(FormControlLabel)({
  gap: '4px',
});

const Checkbox = ({
  checked,
  label,
  showLabel = true,
  onChange,
  ...props
}: CustomCheckboxProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event?.target.checked);
  };

  return (
    <StyledFormControlLabel
      control={
        <StyledCheckbox
          checked={checked}
          onChange={(e) => handleOnChange(e as React.ChangeEvent<HTMLInputElement>)}
          {...props}
        />
      }
      label={showLabel ? <Typography variant='body1'>{label}</Typography> : ''}
    />
  );
};

export default Checkbox;
