import { Box, styled, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { blueGrey } from '@mui/material/colors';

export const SurveyCard = styled(Box)(() => ({
  width: '411px',
  height: '138px',
  backgroundColor: blueGrey[50],
  borderRadius: '24px',
  padding: '20px 27px',
  cursor: 'pointer',
  position: 'relative',

  backgroundImage: 'url(/images/satisfaction_survey.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '45%',
  backgroundPosition: 'right bottom',
}));

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}));

export const StyledRightIcon = styled(ChevronRightIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '24px',
}));

export const SecondaryTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
