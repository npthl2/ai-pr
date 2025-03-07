import { Typography, Box, useTheme } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { TabContext } from '@mui/lab';
import {
  ContentsContainer,
  Header,
  ContentsBG,
  StyledTabs,
  StyledTab,
  TabLabel,
  TabCloseButton,
  TabActions,
  CloseAllButton,
  ContentHeader,
  StarIconButton,
} from './ContentsLayout.styled';
import useCustomerStore from '../stores/CustomerStore';
import Breadcrumb from '@components/Breadcrumb';
import FavoriteIcon from '@components/FavoriteIcon';
import { amber } from '@mui/material/colors';
import useMenuStore from '@stores/MenuStore';
import { SUBSCRIPTION_MENUS, TabInfo } from '@constants/CommonConstant';
import { useBookmark } from '@hooks/useBookmark';
import NewSubscription from '@pages/customer/subscription/NewSubscription';
import ServiceModification from '@pages/customer/subscription/ServiceModification';
import CustomerDetailContainer from '@pages/customerDetail/CustomerDetailContainer';

interface ContentsLayoutProps {
  customerId: string;
}

const ContentsLayout = ({ customerId }: ContentsLayoutProps) => {
  const theme = useTheme();
  const customerTabs = useCustomerStore((state) => state.customerTabs[customerId]);
  const { setActiveTab, closeCustomerTab, removeCustomer } = useCustomerStore();
  const { menuItems } = useMenuStore();
  const { handleBookmarkClick } = useBookmark();
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (customerId) {
      setActiveTab(customerId, newValue);
    }
  };

  const handleCloseTab = (event: React.MouseEvent, tabId: number) => {
    event.stopPropagation();
    if (customerId) {
      closeCustomerTab(customerId, tabId);
      if (customerId.includes('NEW_SUBSCRIPTION')) {
        removeCustomer(customerId);
      }
    }
  };

  const handleCloseAll = () => {
    if (customerId) {
      removeCustomer(customerId);
    }
  };

  if (!customerTabs?.tabs?.length) return null;

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
                data-testid={`tab-${tab.label}`}
                label={
                  <TabLabel>
                    <Typography variant='body2'>{tab.label}</Typography>
                    {tab.closeable && (
                      <TabCloseButton
                        size='small'
                        data-testid={`close-tab-${tab.label}`}
                        onClick={(e) => handleCloseTab(e, tab.id)}
                      >
                        <CloseIcon />
                      </TabCloseButton>
                    )}
                  </TabLabel>
                }
              />
            ))}
          </StyledTabs>
          <TabActions>
            <CloseAllButton onClick={handleCloseAll} data-testid='close-all-tabs'>
              <CloseIcon />
              <Typography variant='body2'>전체닫기</Typography>
            </CloseAllButton>
          </TabActions>
        </Header>
        <ContentHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='h3'>{currentTab?.label}</Typography>
            {currentTab?.label !== TabInfo.CUSTOMER_SEARCH.label && (
              <StarIconButton
                variant='text'
                data-testid={`bookmark-tab-${currentTab?.label}`}
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
          <Box
            sx={{
              display: currentTab?.id === TabInfo.CUSTOMER_SEARCH.id ? 'block' : 'none',
              height: '100%',
            }}
          >
            <CustomerDetailContainer />
          </Box>
          <Box
            sx={{
              display: currentTab?.id === TabInfo.SERVICE_MODIFICATION.id ? 'block' : 'none',
              height: '100%',
            }}
          >
            <ServiceModification />
          </Box>
          <Box
            sx={{
              display: currentTab?.id === TabInfo.NEW_SUBSCRIPTION.id ? 'block' : 'none',
              height: '100%',
            }}
          >
            <NewSubscription customerId={customerId} />
          </Box>
        </ContentsBG>
      </TabContext>
    </ContentsContainer>
  );
};

export default ContentsLayout;
