import { Box, styled, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { blueGrey } from '@mui/material/colors';

export const SurveyCard = styled(Box)(({ completed }: { completed: 'Y' | 'N' | undefined }) => ({
  width: '411px',
  height: '138px',
  backgroundColor: blueGrey[50],
  borderRadius: '24px',
  padding: '20px 27px',
  position: 'relative',

  ...(completed && {
    backgroundImage:
      completed === 'Y'
        ? 'url(/images/satisfaction_survey_complete.png)'
        : 'url(/images/satisfaction_survey.png)',
    cursor: completed === 'Y' ? 'default' : 'pointer',
    backgroundSize: completed === 'Y' ? '40%' : '45%',
    ...(completed === 'Y' && { '& .MuiSvgIcon-root': { display: 'none' } }),
  }),
  backgroundRepeat: 'no-repeat',
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
