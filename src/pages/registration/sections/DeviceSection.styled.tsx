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
});

export const FieldContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
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
  gap: 4,
}));

export const RadioWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 4px;
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
