import { Outlet, useNavigate } from 'react-router-dom';
import { IconButton, ThemeProvider, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { getTheme } from '@theme/theme';
import { useState } from 'react';
import { LayoutContainer, Header, Logo, HeaderRight } from './Layout.styled';
import Button from '@components/Button';
import Tooltip from '@components/Tooltip';
import useCustomerStore from '@stores/CustomerStore';
import useAuthStore from '@stores/AuthStore';
import useMemberStore from '@stores/MemberStore';
import GNBCustomer from './component/GNBCustomer';
import LogoutDialogForm from '../pages/auth/components/LogoutDialogForm';
import { useHotkeys } from 'react-hotkeys-hook';
import CustomerSearch from '@pages/customer/search/CustomerSearch';
import { MainMenu } from '@constants/CommonConstant';
import useMenuStore from '@stores/MenuStore';
import authService from '@api/services/authService';

const Layout = () => {
  const navigate = useNavigate();
  const { setSelectedMainMenu } = useMenuStore();
  const { selectCustomer, reset } = useCustomerStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const memberInfo = useMemberStore((state) => state.memberInfo);
  const logout = useAuthStore((state) => state.logout);
  const clearMemberInfo = useMemberStore((state) => state.clearMemberInfo);
  const selectedCustomer = useCustomerStore((state) =>
    state.customers.find((c) => c.id === state.selectedCustomerId),
  );

  // 로그아웃 관련 상태
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLogoutCompleteDialogOpen, setIsLogoutCompleteDialogOpen] = useState(false);

  const handleLogoClick = () => {
    setSelectedMainMenu(MainMenu.HOME);
    selectCustomer('');
    navigate('/');
  };

  // 고객 검색 Modal 출력 및 단축키 설정
  const [open, setOpen] = useState(false);
  useHotkeys('ctrl+/', () => setOpen(true));

  const handleSearch = () => {
    setOpen(true);
  };

  // 로그아웃 버튼 클릭 시 확인 팝업 표시
  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true);
  };

  // 로그아웃 확인 팝업에서 취소 클릭
  const handleLogoutCancel = () => {
    setIsLogoutDialogOpen(false);
  };

  // 실제 로그아웃 처리
  const handleLogout = async () => {
    try {
      setIsLogoutDialogOpen(false);
      await authService.logout();
      logout();
      clearMemberInfo();
      
      setIsLogoutCompleteDialogOpen(true);
    } catch (error) {
      console.error('Logout failed:', error);
      // 에러가 발생하더라도 로컬 상태는 초기화
      logout();
      clearMemberInfo();
      setIsLogoutCompleteDialogOpen(true);
    } finally {
      reset();
    }
  };
  
  // 로그아웃 완료 팝업 닫고 로그인 페이지로 이동 (부모 컴포넌트)
  const handleLogoutCompleteClose = () => {
    // Snackbar의 autoHideDuration이 완료된 후에 호출되므로,
    // 여기서 즉시 false로 변경해도 괜찮습니다.
    console.log('부모: LogoutCompleteClose 호출됨');
    setIsLogoutCompleteDialogOpen(false);
    navigate('/login');
  };

  return (
    <ThemeProvider theme={getTheme('light')}>
      <LayoutContainer>
        <Header>
          <Logo onClick={handleLogoClick}>
            <h1>R & R</h1>
          </Logo>

          {isAuthenticated && (
            <>
              {/* TODO : 고객 정보 추가 - 검색 정보가 있다면 */}
              {selectedCustomer && (
                <GNBCustomer
                  name={selectedCustomer.name}
                  rrno={selectedCustomer.rrno}
                  gender={selectedCustomer.gender === 'M' ? '남' : '여'}
                  age={selectedCustomer.age}
                />
              )}
              <HeaderRight>
                <Tooltip
                  title='아이콘 클릭 또는 [Ctrl + /] 키로 고객검색'
                  arrow
                  placement='left'
                  open={true}
                >
                  <IconButton
                    size='small'
                    onClick={handleSearch}
                    data-testid='customer-search-modal-button'
                  >
                    <SearchIcon color='primary' />
                  </IconButton>
                </Tooltip>

                <Typography variant='body2'>
                  {memberInfo?.memberName} {memberInfo?.classOfPosition}
                </Typography>
                <Button
                  variant='text'
                  color='primary'
                  size='large'
                  iconComponent={<LogoutIcon />}
                  data-testid="logout-button"
                  onClick={handleLogoutClick}
                />
              </HeaderRight>
            </>
          )}
        </Header>
        <Outlet />
        <CustomerSearch
          authority={memberInfo?.authorities}
          open={open}
          onCloseModal={() => setOpen(false)}
        />

        <LogoutDialogForm
          isConfirmOpen={isLogoutDialogOpen}
          isCompleteOpen={isLogoutCompleteDialogOpen}
          onConfirm={handleLogout}
          onCancel={handleLogoutCancel}
          onCompleteClose={handleLogoutCompleteClose}
        />
      </LayoutContainer>
    </ThemeProvider>
  );
};

export default Layout;
