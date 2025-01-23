import {
  InputAdornment,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  FormControl,
  FormHelperText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

type SelectSize = 'small' | 'medium';
type SelectState = 'inactive' | 'active' | 'disabled' | 'error';

interface CustomSelectProps extends Omit<MuiSelectProps, 'size' | 'prefix'> {
  size?: SelectSize;
  state?: SelectState;
  prefix?: React.ReactNode;
  helperText?: string;
}

const StyledSelect = styled(MuiSelect, {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'state',
})<{ size: SelectSize; state: SelectState }>(({ theme, size, state }) => ({
  height: {
    small: 32,
    medium: 42,
  }[size],
  '& .MuiSelect-icon': {
    color: 'inherit',
  },
  ...(state === 'error' && {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.error.main,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.error.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.error.main,
    },
  }),
}));

const StyledFormHelperText = styled(FormHelperText, {
  shouldForwardProp: (prop) => prop !== 'state',
})<{ state: SelectState }>(({ theme, state }) => ({
  color: state === 'error' ? theme.palette.error.main : theme.palette.text.secondary,
}));

const Select = ({
  children,
  size = 'medium',
  state = 'inactive',
  prefix,
  disabled,
  helperText,
  ...props
}: CustomSelectProps) => {
  const currentState = disabled ? 'disabled' : state;
  const error = state === 'error';

  return (
    <FormControl error={error} fullWidth={props.fullWidth}>
      <StyledSelect
        size={size}
        state={currentState}
        disabled={disabled}
        displayEmpty
        inputProps={{ ...props.inputProps, 'data-size': size }}
        startAdornment={prefix && <InputAdornment position='start'>{prefix}</InputAdornment>}
        IconComponent={ExpandMoreIcon}
        {...props}
      >
        {children}
      </StyledSelect>
      {helperText && <StyledFormHelperText state={currentState}>{helperText}</StyledFormHelperText>}
    </FormControl>
  );
};

export default Select;
