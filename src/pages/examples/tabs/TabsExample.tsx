import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Tab } from '@components/Tab';
import { Tabs } from '@components/Tabs';
import { TabsExampleContainer, ComponentTitle } from './TabsExample.styled';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useState } from 'react';

const TabsExample = () => {
  const [selectedValue, setSelectedValue] = useState(0);
  const [scrollValue, setScrollValue] = useState(0);

  const handleChange =
    (setter: (value: number) => void) => (event: React.SyntheticEvent, newValue: number) => {
      setter(newValue);
    };

  return (
    <TabsExampleContainer>
      <Typography variant='h4' gutterBottom>
        Tabs 컴포넌트 예시
      </Typography>

      <Grid container spacing={4} flexDirection='column'>
        {/* Horizontal Tabs */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>가로 Tabs</ComponentTitle>
          <Tabs value={selectedValue} onChange={handleChange(setSelectedValue)}>
            <Tab label='Text Only' value={0} />
            <Tab icon={<HomeIcon />} value={1} />
            <Tab label='Text + Icon' icon={<PersonIcon />} value={2} />
            <Tab label='Disabled' icon={<SettingsIcon />} value={3} disabled />
          </Tabs>
        </Grid>

        {/* Scrollable Horizontal Tabs */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>가로 스크롤 Tabs</ComponentTitle>
          <Tabs
            value={scrollValue}
            onChange={handleChange(setScrollValue)}
            variant='scrollable'
            scrollButtons
            allowScrollButtonsMobile
            sx={{ maxWidth: 400 }}
          >
            <Tab label='Item 1' icon={<HomeIcon />} value={0} />
            <Tab label='Item 2' icon={<PersonIcon />} value={1} />
            <Tab label='Item 3' icon={<SettingsIcon />} value={2} />
            <Tab label='Item 4' icon={<EmailIcon />} value={3} />
            <Tab label='Item 5' icon={<NotificationsIcon />} value={4} />
            <Tab label='Item 6' icon={<AccountBoxIcon />} value={5} />
            <Tab label='Item 7' icon={<SettingsIcon />} value={6} />
          </Tabs>
        </Grid>
      </Grid>
    </TabsExampleContainer>
  );
};

export default TabsExample;
