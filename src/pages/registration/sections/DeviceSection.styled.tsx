import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LeftSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '0px',
});

export const FieldContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '0px',
});

export const FieldLabel = styled(Typography)(() => ({
  minWidth: 60,
  height: 21,
  color: '#6E7782',
  fontFamily: 'Pretendard',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '150%',
  letterSpacing: '0px',
  gap: 8,
}));

export const RadioWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 0px;

  .MuiRadio-root {
    padding: 1px;
    .MuiSvgIcon-root {
      width: 15px;
      height: 15px;
    }
  }

  .MuiFormControlLabel-label {
    font-family: Pretendard;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    letter-spacing: 0px;
  }
`;

export const StyledSpan = styled('span')({
  fontFamily: 'Pretendard',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '150%',
  letterSpacing: '0px',
  color: '#272E35',
});

export const RequiredSpan = styled('span')({
  fontFamily: 'Pretendard',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '150%',
  letterSpacing: '0px',
  color: '#FE2E36',
});

export const StyledButton = styled('button')({
  width: 85,
  height: 28,
  borderRadius: 2,
  borderWidth: 1,
  background: '#FFFFFF',
  border: '1px solid #05151F80',
  cursor: 'pointer',
  fontFamily: 'Pretendard',
  fontSize: '13px',
  lineHeight: '150%',
  color: '#05151F',
  '&:hover': {
    background: '#F5F5F5',
  },
});
