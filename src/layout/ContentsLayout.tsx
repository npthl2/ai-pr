import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TabContext, TabPanel } from '@mui/lab';
import {
  ContentsContainer,
  Header,
  ContentsBG,
  StyledTabs,
  StyledTab,
  TabLabel,
  TabCloseButton,
  TabActions,
  ActionButton,
  CloseAllButton,
  ContentHeader,
} from './ContentsLayout.styled';
import useCustomerStore from '../stores/CustomerStore';
import Breadcrumb from '@components/Breadcrumb';

const ContentsLayout = () => {
  const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId);
  const customerTabs = useCustomerStore((state) =>
    selectedCustomerId ? state.customerTabs[selectedCustomerId] : null,
  );
  const { setActiveTab, closeCustomerTab, removeCustomer } = useCustomerStore();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (selectedCustomerId) {
      setActiveTab(selectedCustomerId, newValue);
    }
  };

  const handleCloseTab = (event: React.MouseEvent, tabId: number) => {
    event.stopPropagation();
    if (selectedCustomerId) {
      closeCustomerTab(selectedCustomerId, tabId);
    }
  };

  const handleCloseAll = () => {
    if (selectedCustomerId) {
      removeCustomer(selectedCustomerId);
    }
  };

  const handleMoveLeft = () => {
    if (selectedCustomerId && customerTabs) {
      setActiveTab(selectedCustomerId, Math.max(0, customerTabs.activeTab - 1));
    }
  };

  const handleMoveRight = () => {
    if (selectedCustomerId && customerTabs && customerTabs.tabs.length > 0) {
      setActiveTab(
        selectedCustomerId,
        Math.min(customerTabs.tabs.length - 1, customerTabs.activeTab + 1),
      );
    }
  };

  if (!customerTabs) return null;

  return (
    <ContentsContainer>
      <TabContext value={customerTabs.activeTab.toString()}>
        <Header>
          <StyledTabs value={customerTabs.activeTab} onChange={handleTabChange}>
            {customerTabs.tabs.map((tab) => (
              <StyledTab
                key={tab.id}
                value={tab.id}
                label={
                  <TabLabel>
                    <Typography variant='body2'>{tab.label}</Typography>
                    {tab.closeable && (
                      <TabCloseButton size='small' onClick={(e) => handleCloseTab(e, tab.id)}>
                        <CloseIcon />
                      </TabCloseButton>
                    )}
                  </TabLabel>
                }
              />
            ))}
          </StyledTabs>
          <TabActions>
            <ActionButton
              size='small'
              onClick={handleMoveLeft}
              disabled={customerTabs.activeTab === 0}
            >
              <KeyboardArrowLeftIcon />
            </ActionButton>
            <ActionButton
              size='small'
              onClick={handleMoveRight}
              disabled={customerTabs.activeTab === customerTabs.tabs.length - 1}
            >
              <KeyboardArrowRightIcon />
            </ActionButton>
            <CloseAllButton onClick={handleCloseAll}>
              <CloseIcon />
              <Typography variant='body2'>전체닫기</Typography>
            </CloseAllButton>
          </TabActions>
        </Header>
        <ContentHeader>
          <Typography variant='h6'>
            {customerTabs.tabs.find((tab) => tab.id === customerTabs.activeTab)?.label}
          </Typography>
          <Breadcrumb
            activeTabLabel={[
              'Home',
              customerTabs.tabs.find((tab) => tab.id === customerTabs.activeTab)?.label || '',
            ]}
          />
        </ContentHeader>
        <ContentsBG>
          {customerTabs.tabs.map((tab) => (
            <TabPanel
              key={tab.id}
              value={tab.id.toString()}
              keepMounted
              sx={{ height: '100%', padding: 0 }}
            >
              <Outlet />
            </TabPanel>
          ))}
        </ContentsBG>
      </TabContext>
    </ContentsContainer>
  );
};

export default ContentsLayout;
