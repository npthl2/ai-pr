import { Tab as MuiTab, TabProps as MuiTabProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TabProps extends Omit<MuiTabProps, ''> {}

const StyledTab = styled(MuiTab)`
  color: ${({ theme }) => theme.palette.grey[600]};

  &.Mui-selected {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  & .MuiSvgIcon-root {
    font-size: 24px;
  }

  &.Mui-disabled {
    & .MuiTypography-root {
      color: ${({ theme }) => theme.palette.grey[200]};
    }
    & .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.grey[200]};
    }
  }
`;

const TabLabel = styled(Typography)`
  text-transform: none;
`;

export const Tab = ({ label, ...props }: TabProps) => (
  <StyledTab label={<TabLabel variant={'h5'}>{label}</TabLabel>} {...props} />
);

export default Tab;
