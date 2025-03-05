import { Box, styled, SxProps, Typography } from '@mui/material';

export const boxStyles: SxProps = {
  mb: 2,
  width: 499,
  height: 32,
  marginBottom: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const typographyStyles: SxProps = {
  fontFamily: 'Pretendard',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '27px',
  letterSpacing: '0px',
  marginRight: 2,
  width: '63px',
  height: '27px',
  gap: '24px',
};

export const formControlLabelStyles: SxProps = {
  height: 32,
};

export const textFieldStyles: SxProps = {
  height: 32,
};

export const inputAdornmentStyles: SxProps = {
  color: '#666',
  height: 24,
};

export const inputPropsStyles: SxProps = {
  backgroundColor: '#fff',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
  },
};

export const StyledBox = styled(Box)(({}) => ({
  width: 422,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '14px',
}));

export const StyledTypography = styled(Typography)(({}) => ({
  fontSize: '14px',
  color: '#666',
}));
