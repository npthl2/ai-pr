import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  FormControl,
  FormHelperText,
  InputAdornment,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

type TextFieldSize = 'small' | 'medium';
type TextFieldState = 'inactive' | 'active' | 'disabled' | 'error';

interface CustomTextFieldProps
  extends Omit<MuiTextFieldProps, 'size' | 'state' | 'prefix' | 'onChange'> {
  size?: TextFieldSize;
  state?: TextFieldState;
  value: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  helperText?: string;
  onChange: (value: string) => void;
}

const getBorderColor = (theme: any, state: TextFieldState) =>
  ({
    inactive: theme.palette.grey[200],
    active: theme.palette.primary.main,
    disabled: theme.palette.grey[200],
    error: theme.palette.error.main,
  })[state];

const StyledTextField = styled(MuiTextField, {
  shouldForwardProp: (prop) => prop !== 'state',
})<{ size: TextFieldSize; state: TextFieldState }>(({ theme, size, state }) => ({
  backgroundColor: state === 'disabled' ? theme.palette.grey[100] : 'none',
  '& .MuiInputBase-root': {
    minHeight: size === 'small' ? 28 : 32,
    padding: size === 'small' ? '0px 8px' : '0px 10px',
  },
  '& .MuiInputBase-input': {
    padding: 0,
    minHeight: 'inherit',
    height: 'auto',
    color: state === 'error' ? theme.palette.error.main : theme.palette.text.primary,
    '&.MuiInputBase-inputMultiline': {
      alignContent: 'center',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: getBorderColor(theme, state),
  },
  '&:hover .MuiInputBase-input': {
    borderColor: getBorderColor(theme, state),
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: getBorderColor(theme, state),
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: getBorderColor(theme, state),
  },
}));

const StyledFormHelperText = styled(FormHelperText, {
  shouldForwardProp: (prop) => prop !== 'state',
})<{ state: TextFieldState }>(({ theme, state }) => ({
  ...(state !== 'disabled' && {
    color: {
      inactive: theme.palette.grey[600],
      active: theme.palette.primary.main,
      error: theme.palette.error.main,
      disabled: theme.palette.text.disabled,
    }[state],
  }),
}));

const TextField = ({
  value,
  size = 'medium',
  state = 'inactive',
  prefix,
  suffix,
  helperText,
  error,
  disabled,
  onChange,
  InputProps,
  InputLabelProps,
  ...props
}: CustomTextFieldProps) => {
  const currentState: TextFieldState = disabled ? 'disabled' : state;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <FormControl fullWidth error={error}>
      <StyledTextField
        value={value}
        size={size}
        state={currentState}
        disabled={disabled}
        onChange={(e) => handleOnChange(e as React.ChangeEvent<HTMLInputElement>)}
        InputProps={{
          ...InputProps,
          startAdornment: prefix && (
            <InputAdornment position='start'>
              <Typography variant='body2'>{prefix}</Typography>
            </InputAdornment>
          ),
          endAdornment: suffix && <InputAdornment position='end'>{suffix}</InputAdornment>,
        }}
        InputLabelProps={{
          ...InputLabelProps,
          shrink: false,
          sx: (theme) => ({
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            color: theme.palette.grey[600],
            display: value || prefix ? 'none' : 'block',
          }),
        }}
        {...props}
      />
      {helperText && <StyledFormHelperText state={currentState}>{helperText}</StyledFormHelperText>}
    </FormControl>
  );
};

export default TextField;
