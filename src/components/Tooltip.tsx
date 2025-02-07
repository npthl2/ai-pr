import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
  Typography as MuiTypography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTooltip = styled(({ className, ...props }: MuiTooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  ['& .MuiTooltip-tooltip']: {
    backgroundColor: theme.palette.primary.main,
    padding: '8px 16px',
    borderRadius: '4px',
  },
  ['& .MuiTooltip-arrow']: {
    color: theme.palette.primary.main,
  },
}));

const StyledTypography = styled(MuiTypography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '15px',
  color: theme.palette.primary.contrastText,
}));

const Tooltip = ({ title, children, ...props }: MuiTooltipProps) => {
  return (
    <StyledTooltip title={<StyledTypography>{title}</StyledTypography>} {...props}>
      {children}
    </StyledTooltip>
  );
};

export default Tooltip;
