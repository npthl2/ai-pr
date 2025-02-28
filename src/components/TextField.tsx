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
  absoluteHelperText?: boolean;
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
    // 자동완성 시 기본 적용되는 배경/여백 제거
    '&:-webkit-autofill': {
      // 배경색 덮어쓰기 (100px 또는 더 큰 값으로 inset box-shadow)
      boxShadow: `0 0 0 100px ${state === 'disabled' ? theme.palette.grey[100] : '#fff'} inset`,
      '-webkit-box-shadow': `0 0 0 100px ${
        state === 'disabled' ? theme.palette.grey[100] : '#fff'
      } inset`,

      // 불필요한 border-radius 제거
      borderRadius: 0,

      // 불필요한 내부 여백 제거
      padding: '0 !important',
      margin: '0 !important',

      // 텍스트 색상 (오류 상태 시 빨간색, 아니면 기본 텍스트)
      '-webkit-text-fill-color':
        state === 'error' ? theme.palette.error.main : theme.palette.text.primary,
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
  absoluteHelperText = false,
  ...props
}: CustomTextFieldProps) => {
  const currentState: TextFieldState = disabled ? 'disabled' : state;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <FormControl fullWidth error={error} sx={absoluteHelperText ? { position: 'relative' } : {}}>
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
      {helperText &&
        (absoluteHelperText ? (
          <StyledFormHelperText
            state={currentState}
            sx={{
              position: 'absolute',
              bottom: -20,
              left: 0,
            }}
          >
            {helperText}
          </StyledFormHelperText>
        ) : (
          <StyledFormHelperText state={currentState}>{helperText || ' '}</StyledFormHelperText>
        ))}
    </FormControl>
  );
};

export default TextField;
