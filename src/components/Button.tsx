import { Button as MuiButton, ButtonProps as MuiButtonProps, styled } from '@mui/material';

export type ButtonIconPosition = 'left' | 'right';
export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonColor = 'grey' | MuiButtonProps['color'];

export type ButtonProps = Omit<MuiButtonProps, 'startIcon' | 'endIcon' | 'color'> & {
  color?: ButtonColor;
  size?: ButtonSize;
  iconPosition?: ButtonIconPosition;
  iconComponent?: React.ReactNode;
};

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'color',
})<{ size: ButtonSize; isGrey: boolean }>(({ theme, size, isGrey, variant }) => ({
  ...(size === 'small' ? theme.typography.body2 : theme.typography.body1),
  minHeight: {
    small: 28,
    medium: 32,
    large: 36,
  }[size],
  minWidth: {
    small: 58,
    medium: 67,
    large: 68,
  }[size],
  '& .MuiButton-startIcon': {
    marginRight: 4,
  },
  '& .MuiButton-endIcon': {
    marginLeft: 4,
  },
  ...(isGrey && {
    backgroundColor: theme.palette.mode === 'dark' ? 'inherit' : theme.palette.common.white,
    borderColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
    '&:disabled': {
      backgroundColor: 'inherit',
      borderColor: theme.palette.grey[100],
    },
  }),
  ...(variant === 'outlined' &&
    !isGrey &&
    theme.palette.mode === 'dark' && {
      color: theme.palette.text.primary,
      borderColor:
        theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        borderColor: theme.palette.primary.light,
      },
      '&:disabled': {
        backgroundColor: 'inherit',
        borderColor: theme.palette.grey[100],
      },
    }),
}));

export const Button = (props: ButtonProps) => {
  const {
    size = 'large',
    color = 'primary',
    iconPosition,
    iconComponent,
    variant,
    ...restProps
  } = props;
  const isGrey = color === 'grey';
  const startIcon = iconPosition === 'left' ? iconComponent : undefined;
  const endIcon = iconPosition === 'right' ? iconComponent : undefined;

  return (
    <StyledButton
      size={size}
      color={isGrey ? 'inherit' : color}
      isGrey={isGrey}
      variant={isGrey ? 'outlined' : variant}
      startIcon={startIcon}
      endIcon={endIcon}
      {...restProps}
    ></StyledButton>
  );
};
export default Button;
