import { ChipProps as MuiChipProps, Chip as MuiChip, styled } from '@mui/material';

type ChipSize = 'xsmall' | 'small' | 'medium';
interface ChipProps extends Omit<MuiChipProps, 'size'> {
  size?: ChipSize;
}

interface StyledChipProps {
  $chipSize: ChipSize;
}

const StyledChip = styled(MuiChip, {
  shouldForwardProp: (prop) => prop !== '$chipSize',
})<StyledChipProps>(({ theme, color, variant, $chipSize }) => ({
  '& .MuiChip-label': {
    padding: '2px 8px',
  },
  // TODO : medium size 예정
  height: {
    xsmall: 20,
    small: 22,
    medium: 24,
  }[$chipSize],
  '& .MuiSvgIcon-root': {
    fontSize: {
      xsmall: '13.33px',
      small: '13.33px',
      medium: '16.33px',
    }[$chipSize],
  },
  ...(color === 'default' && {
    backgroundColor: theme.palette.grey[100],
  }),
  ...(variant === 'outlined' && {
    backgroundColor: 'inherit',
    ...(theme.palette.mode === 'dark' && {
      color: theme.palette.text.primary,
      borderColor:
        theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        borderColor: theme.palette.primary.light,
      },
      '&:disabled': {
        backgroundColor: 'inherit',
        borderColor: theme.palette.action.disabledBackground,
      },
      ...(color === 'primary' && {
        '.MuiSvgIcon-root': {
          color: theme.palette.primary.light,
        },
      }),
    }),
  }),
}));

export const Chip = (props: ChipProps) => {
  const { size = 'small', ...restProps } = props;

  return <StyledChip $chipSize={size} {...restProps} />;
};

export default Chip;
