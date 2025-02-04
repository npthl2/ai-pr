import { Radio as MuiRadio, RadioProps as MuiRadioProps, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface RadioProps extends Omit<MuiRadioProps, 'label'> {
  label?: string;
  showLabel?: boolean;
}

const StyledLabel = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
`;

const StyledFormControlLabel = styled(FormControlLabel)({
  gap: 4,
});

const StyledRadio = styled(MuiRadio)`
  size: 16px;
  padding: 0;
  &:not(.Mui-checked):hover {
    .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.primary.light};
    }
  }
`;

export const Radio = ({ label = '', showLabel = true, ...props }: RadioProps) => (
  <StyledFormControlLabel
    label={showLabel ? <StyledLabel>{label}</StyledLabel> : ''}
    control={<StyledRadio {...props} />}
  />
);

export default Radio;
