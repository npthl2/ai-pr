import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomCheckboxProps extends Omit<MuiCheckboxProps, 'color' | 'onChange'> {
  showLabel?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

const StyledCheckbox = styled(MuiCheckbox)<CustomCheckboxProps>({
  '& .MuiCheckbox-root': {
    width: '16px',
    height: '16px',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
  },
});

const StyledCheckboxLabel = styled(FormControlLabel)<CustomCheckboxProps>({
  '& .MuiFormControlLabel-label': {
    lineHeight: '21px',
    fontSize: '14px',
    fontWeight: '400px',
  },
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
    <StyledCheckboxLabel
      control={<StyledCheckbox checked={checked} onChange={handleOnChange} {...props} />}
      label={showLabel ? label : ''}
    />
  );
};

export default Checkbox;
