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
import GNBCustomer from './component/GNBCustomer';
import { useHotkeys } from 'react-hotkeys-hook';
import CustomerSearch from '@pages/customer/search/CustomerSearch';
import { MainMenu } from '@constants/CommonConstant';
import useMenuStore from '@stores/MenuStore';

const Layout = () => {
  const navigate = useNavigate();
  const { setSelectedMainMenu } = useMenuStore();
  const { selectCustomer } = useCustomerStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const selectedCustomer = useCustomerStore((state) =>
    state.customers.find((c) => c.id === state.selectedCustomerId),
  );

  const handleLogoClick = () => {
    setSelectedMainMenu(MainMenu.HOME);
    selectCustomer('');
    navigate('/');
  };

  // 고객 검색 Modal 출력 및 단축키 설정
  const [open, setOpen] = useState(false);
  useHotkeys('ctrl+/', () => setOpen(true));

  // -- START : TODO : Sample Data
  const memberName = '케이티';
  const grade = '책임';

  const handleSearch = () => {
    setOpen(true);
  };

  // END : TODO : Sample Data

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
                  <IconButton size='small' onClick={handleSearch}>
                    <SearchIcon color='primary' />
                  </IconButton>
                </Tooltip>

                <Typography variant='body2'>
                  {memberName} {grade}
                </Typography>
                <Button
                  variant='text'
                  color='primary'
                  size='large'
                  iconComponent={<LogoutIcon />}
                  // TODO : 로그아웃 기능 추가
                />
              </HeaderRight>
            </>
          )}
        </Header>
        <Outlet />

        <CustomerSearch open={open} onCloseModal={() => setOpen(false)} />
      </LayoutContainer>
    </ThemeProvider>
  );
};

export default Layout;
