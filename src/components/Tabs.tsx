import { Tabs as MuiTabs, TabsProps as MuiTabsProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TabsProps extends Omit<MuiTabsProps, ''> {}

const StyledTabs = styled(MuiTabs, {
  shouldForwardProp: (prop) => prop !== 'orientation',
})``;

export const Tabs = ({ children, ...props }: TabsProps) => (
  <StyledTabs {...props}>{children}</StyledTabs>
);

export default Tabs;
