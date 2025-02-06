import { ChipProps, Chip as MuiChip, styled } from '@mui/material';

const StyledChip = styled(MuiChip)(({ theme, color, variant }) => ({
  '& .MuiChip-label': {
    padding: '2px 8px',
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

// TODO : Meduim size 추후 Figma 예정
export const Chip = (props: ChipProps) => {
  const { size = 'small', ...restProps } = props;

  return <StyledChip size={size} {...restProps} />;
};
