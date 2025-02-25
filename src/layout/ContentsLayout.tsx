import { Typography, Box, useTheme } from '@mui/material';
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
  StarIconButton,
} from './ContentsLayout.styled';
import useCustomerStore from '../stores/CustomerStore';
import Breadcrumb from '@components/Breadcrumb';
import FavoriteIcon from '@components/FavoriteIcon';
import { amber } from '@mui/material/colors';
import useMenuStore from '@stores/MenuStore';
import { SUBSCRIPTION_MENUS } from '@constants/CommonConstant';
import { useBookmark } from '@hooks/useBookmark';

const ContentsLayout = () => {
  const theme = useTheme();
  const selectedCustomer = useCustomerStore((state) => state.selectedCustomer);
  const customerTabs = useCustomerStore((state) =>
    selectedCustomer ? state.customerTabs[selectedCustomer] : null,
  );
  const { setActiveTab, closeCustomerTab, closeAllCustomerTabs } = useCustomerStore();
  const { menuItems } = useMenuStore();
  const { handleBookmarkClick } = useBookmark();
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (selectedCustomer) {
      setActiveTab(selectedCustomer, newValue);
    }
  };

  const handleCloseTab = (event: React.MouseEvent, tabId: number) => {
    event.stopPropagation();
    if (selectedCustomer) {
      closeCustomerTab(selectedCustomer, tabId);
    }
  };

  const handleCloseAll = () => {
    if (selectedCustomer) {
      closeAllCustomerTabs(selectedCustomer);
    }
  };

  const handleMoveLeft = () => {
    if (selectedCustomer && customerTabs) {
      setActiveTab(selectedCustomer, Math.max(0, customerTabs.activeTab - 1));
    }
  };

  const handleMoveRight = () => {
    if (selectedCustomer && customerTabs && customerTabs.tabs.length > 0) {
      setActiveTab(
        selectedCustomer,
        Math.min(customerTabs.tabs.length - 1, customerTabs.activeTab + 1),
      );
    }
  };

  if (!customerTabs) return null;

  const currentTab = customerTabs.tabs.find((tab) => tab.id === customerTabs.activeTab);
  const isBookmarked = menuItems.bookmarks.some((item) => item.name === currentTab?.label);
  const currentTabId = SUBSCRIPTION_MENUS.find((menu) => menu.name === currentTab?.label)?.id;

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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='h3'>{currentTab?.label}</Typography>
            {currentTab?.label !== '고객조회' && (
              <StarIconButton
                variant='text'
                onClick={(e) => {
                  if (!currentTab?.label || !currentTabId) return;
                  handleBookmarkClick(e, currentTabId);
                }}
              >
                {isBookmarked ? (
                  <FavoriteIcon fillColor={amber[600]} size='small' />
                ) : (
                  <FavoriteIcon borderColor={theme.palette.action.active} size='small' />
                )}
              </StarIconButton>
            )}
          </Box>
          <Breadcrumb activeTabLabel={['Home', currentTab?.label || '']} />
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
