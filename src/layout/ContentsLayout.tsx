import { Typography, Box, useTheme } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
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
import CustomerView from '@pages/customer/view/CustomerView';
import NewSubscription from '@pages/customer/subscription/NewSubscription';
import ServiceModification from '@pages/customer/subscription/ServiceModification';

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
    }
  };

  const handleCloseAll = () => {
    if (customerId) {
      removeCustomer(customerId);
    }
  };

  const handleMoveLeft = () => {
    if (customerId && customerTabs) {
      setActiveTab(customerId, Math.max(0, customerTabs.activeTab - 1));
    }
  };

  const handleMoveRight = () => {
    if (customerId && customerTabs && customerTabs.tabs.length > 0) {
      setActiveTab(customerId, Math.min(customerTabs.tabs.length - 1, customerTabs.activeTab + 1));
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
          <Box
            sx={{
              display: currentTab?.id === 0 ? 'block' : 'none',
              height: '100%',
            }}
          >
            <CustomerView customerId={customerId} />
          </Box>
          <Box
            sx={{
              display: currentTab?.id === 1 ? 'block' : 'none',
              height: '100%',
            }}
          >
            <ServiceModification />
          </Box>
          <Box
            sx={{
              display: currentTab?.id === 2 ? 'block' : 'none',
              height: '100%',
            }}
          >
            <NewSubscription />
          </Box>
        </ContentsBG>
      </TabContext>
    </ContentsContainer>
  );
};

export default ContentsLayout;
