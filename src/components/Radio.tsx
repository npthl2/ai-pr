import { Radio as MuiRadio, RadioProps as MuiRadioProps, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface RadioProps extends Omit<MuiRadioProps, 'label'> {
  label?: string;
  showLabel?: boolean;
  checked?: boolean;
}

const StyledLabel = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  .Mui-disabled & {
    color: ${({ theme }) => theme.palette.grey[400]};
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)({
  gap: 4,
});

const StyledRadio = styled(MuiRadio)`
  size: 16px;
  padding: 0;
  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.grey[400]};
  }

  &:hover {
    .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  &.Mui-checked {
    .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.primary.main};
    }
    .MuiSvgIcon-root:last-of-type {
      transform: scale(1.2);
    }
  }

  &.Mui-disabled {
    .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.grey[400]};
    }

    &.Mui-checked {
      .MuiSvgIcon-root:first-of-type {
        color: ${({ theme }) => theme.palette.grey[200]};
      }
      .MuiSvgIcon-root:last-of-type {
        color: ${({ theme }) => theme.palette.grey[400]};
        transform: scale(1.2);
      }
    }
  }
`;

export const Radio = ({ label = '', showLabel = true, checked = false, ...props }: RadioProps) => (
  <StyledFormControlLabel
    label={showLabel ? <StyledLabel>{label}</StyledLabel> : ''}
    control={<StyledRadio checked={checked} {...props} />}
  />
);

export default Radio;
