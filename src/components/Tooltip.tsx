import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
  Typography as MuiTypography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

type TooltipDirection = 'none' | 'up' | 'right' | 'down' | 'left';

interface CustomTooltipProps extends Omit<MuiTooltipProps, 'title' | 'arrow'> {
  title: React.ReactNode | string;
  direction?: TooltipDirection;
}

const StyledTooltip = styled(
  ({ className, ...props }: CustomTooltipProps) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
  ),
  { shouldForwardProp: (prop) => prop !== 'direction' },
)<{ direction: TooltipDirection }>(({ theme, direction }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: theme.palette.primary.main,
    padding: '8px 16px',
    borderRadius: '4px',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth:
        direction === 'up'
          ? '0 6px 6px 6px'
          : direction === 'down'
            ? '6px 6px 0 6px'
            : direction === 'left'
              ? '6px 6px 6px 0'
              : direction === 'right'
                ? '6px 0 6px 6px'
                : '0',
      borderColor:
        direction === 'up'
          ? `transparent transparent ${theme.palette.primary.main} transparent`
          : direction === 'down'
            ? `${theme.palette.primary.main} transparent transparent transparent`
            : direction === 'left'
              ? `transparent ${theme.palette.primary.main} transparent transparent`
              : direction === 'right'
                ? `transparent transparent transparent ${theme.palette.primary.main}`
                : 'transparent',
      ...(direction === 'up' && {
        top: '-3px',
        left: '50%',
      }),
      ...(direction === 'down' && {
        bottom: '-9px',
        left: '50%',
      }),
      ...(direction === 'left' && {
        top: '50%',
        left: '-3px',
      }),
      ...(direction === 'right' && {
        top: '50%',
        right: '-9px',
      }),
      transform: 'translate(-50%, -50%)',
    },
  },
}));

const StyledTypography = styled(MuiTypography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '15px',
  color: theme.palette.primary.contrastText,
}));

const Tooltip = ({ title, direction = 'none', children, ...props }: CustomTooltipProps) => {
  const currentPlacement = {
    up: 'bottom',
    right: 'left',
    down: 'top',
    left: 'right',
    none: 'bottom',
  }[direction] as MuiTooltipProps['placement'];
  return (
    <StyledTooltip
      title={<StyledTypography variant='body2'>{title}</StyledTypography>}
      direction={direction}
      placement={currentPlacement}
      {...props}
    >
      {children}
    </StyledTooltip>
  );
};

export default Tooltip;
