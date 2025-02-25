import { Outlet, useNavigate } from 'react-router-dom';
import { IconButton, ThemeProvider, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import useThemeStore from '@stores/ThemeStore';
import { getTheme } from '@theme/theme';
import { useMemo, useState } from 'react';
import { LayoutContainer, Header, Logo, HeaderRight } from './Layout.styled';
import Button from '@components/Button';
import Tooltip from '@components/Tooltip';
import useCustomerStore from '@stores/CustomerStore';
import useAuthStore from '@stores/AuthStore';
import GNBCustomer from './component/GNBCustomer';

interface LayoutProps {
  handleMemoPanelOpen: () => void;
}

const Layout = ({ handleMemoPanelOpen }: LayoutProps) => {
  const mode = useThemeStore((state) => state.mode);
  const theme = useMemo(() => getTheme(mode), [mode]);
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // -- START : TODO : Sample Data
  const memberName = '케이티';
  const grade = '책임';
  const [searchCount, setSearchCount] = useState(0);
  const addCustomer = useCustomerStore((state) => state.addCustomer);
  const sampleCustomers = [
    { name: '김철수', id: '10' },
    { name: '이영희', id: '11' },
    { name: '박지성', id: '12' },
    { name: '손흥민', id: '13' },
    { name: '김재1', id: '14' },
    { name: '김재2', id: '15' },
    { name: '김재3', id: '16' },
    { name: '김재4', id: '17' },
    { name: '김재5', id: '18' },
    { name: '김재6', id: '19' },
    { name: '김재7', id: '20' },
    { name: '김민재8', id: '21' },
    { name: '김민재9', id: '22' },
    { name: '민재10', id: '23' },
    { name: '민재11', id: '24' },
    { name: '민재12', id: '25' },
  ];

  const handleSearch = () => {
    if (searchCount < sampleCustomers.length) {
      addCustomer(sampleCustomers[searchCount]);
      setSearchCount((prev) => prev + 1);
    }
  };

  // END : TODO : Sample Data

  return (
    <ThemeProvider theme={theme}>
      <LayoutContainer>
        <Header>
          <Logo onClick={() => navigate('/')}>
            <h1>R & R</h1>
          </Logo>

          {isAuthenticated && (
            <>
              {/* TODO : 고객 정보 추가 - 검색 정보가 있다면 */}
              <GNBCustomer
                name='홍길*'
                id='020314-3******'
                gender='남'
                age={21}
                handleMemoPanelOpen={handleMemoPanelOpen}
              />

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
      </LayoutContainer>
    </ThemeProvider>
  );
};

export default Layout;
