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
  cursor: completed === 'N' ? 'pointer' : 'default',

  ...(completed && {
    backgroundImage:
      completed === 'Y'
        ? 'url(/images/satisfaction_survey_complete.png)'
        : 'url(/images/satisfaction_survey.png)',
  }),
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right bottom',
  backgroundSize: completed === 'N' ? '45%' : '40%',

  '& .MuiSvgIcon-root': { display: completed === 'N' ? 'block' : 'none' },
}));

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}));

export const StyledRightIcon = styled(ChevronRightIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '24px',
}));

export const PrimaryMainTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const SecondaryTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const PrimaryTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
