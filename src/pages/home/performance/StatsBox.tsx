import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SignupStatsBox, SignupStatsHeader } from '../SalesPerformance.styled';

interface StatsBoxProps {
  title: string;
  date: string;
  count: number;
  unit?: string;
}

const StatsBox = ({ title, date, count, unit = '건' }: StatsBoxProps) => {
  const theme = useTheme();

  return (
    <SignupStatsBox>
      <SignupStatsHeader>
        <Typography variant='h4' sx={{ color: theme.palette.text.secondary }}>
          {title}
        </Typography>
        <Typography variant='caption' sx={{ color: theme.palette.text.secondary }}>
          {date}
        </Typography>
      </SignupStatsHeader>
      <Typography sx={{ fontSize: 28, textAlign: 'right' }}>{`${count}${unit}`}</Typography>
    </SignupStatsBox>
  );
};

export default StatsBox;
