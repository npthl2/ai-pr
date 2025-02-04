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
})<{ size: ButtonSize; isGrey: boolean }>(({ theme, size, isGrey }) => ({
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
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[200]}`,
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
    '&:disabled': {
      backgroundColor: 'inherit',
      border: 'inherit',
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
      color={isGrey ? undefined : color}
      isGrey={isGrey}
      variant={isGrey ? 'outlined' : variant}
      startIcon={startIcon}
      endIcon={endIcon}
      {...restProps}
    ></StyledButton>
  );
};
export default Button;
