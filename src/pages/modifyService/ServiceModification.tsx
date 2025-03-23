import React, { useState } from 'react';
import { Typography, Box, Table, TableBody, TableHead, TableContainer, Paper, TableSortLabel } from '@mui/material';
import Button from '@components/Button';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';

import {
  Container,
  ContentContainer,
  LineInfoContainer,
  LineInfoDetailsContainer,
  ServicesContainer,
  CurrentServiceContainer,
  NewServiceContainer,
  ServiceValue,
  ServicePrice,
  ServiceLabel,
  ServiceItemContainer,
} from './ServiceModification.styled';


const ServiceModification: React.FC = () => {
  const [orderBy, setOrderBy] = useState<'name' | 'price'>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  // 현재 요금제 데이터
  const currentServiceData = {
    name: '넷플릭스 초이스 스페셜',
    price: 110000,
    items: [
      { id: 1, name: '부가서비스 1', price: 10000 },
      { id: 2, name: '부가서비스 2', price: 11000 },
      { id: 3, name: '부가서비스 3', price: 12000 },
      { id: 4, name: '부가서비스 4', price: 13000 },
    ],
    totalPrice: 45000,
  };

  // 정렬 핸들러
  const handleRequestSort = (property: 'name' | 'price') => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // 정렬된 아이템 가져오기
  const getSortedItems = (items: typeof currentServiceData.items) => {
    return [...items].sort((a, b) => {
      if (orderBy === 'name') {
        return order === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      }
    });
  };

  const sortedItems = getSortedItems(currentServiceData.items);

  return (
    <Box
      sx={{
        height: 'calc(100vh - 100px)', // Adjust based on your header/footer height
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Container>
        <ContentContainer>
          <LineInfoContainer sx={{ flexShrink: 0 }}>
            <Typography variant='h3' sx={{ mr: 2, fontWeight: 700, fontSize: '1.1rem' }}>
              회선정보
            </Typography>
            <LineInfoDetailsContainer>
              <Box display='flex' alignItems='center' sx={{ minWidth: '200px', flexGrow: 0 }}>
                <ServiceLabel sx={{ mr: 1 }}>전화번호</ServiceLabel>
                <Typography>010-297-*964</Typography>
                <Button
                  size='small'
                  variant='outlined'
                  color='grey'
                  sx={{ ml: 1, minWidth: 'auto', height: 22, px: 1, fontSize: '0.75rem' }}
                >
                  번호 선택
                </Button>
              </Box>
              <Box display='flex' alignItems='center' sx={{ minWidth: '180px', flexGrow: 0 }}>
                <ServiceLabel sx={{ mr: 1 }}>담당 지점</ServiceLabel>
                <ServiceValue>서울시 서울자치 무역길 5번길</ServiceValue>
              </Box>
              <Box display='flex' alignItems='center' sx={{ minWidth: '160px', flexGrow: 0 }}>
                <ServiceLabel sx={{ mr: 1 }}>가입일자</ServiceLabel>
                <ServiceValue>AR214-113-1257</ServiceValue>
              </Box>
              <Box display='flex' alignItems='center' sx={{ minWidth: '160px', flexGrow: 0 }}>
                <ServiceLabel sx={{ mr: 1 }}>고객식별코드</ServiceLabel>
                <ServiceValue>WRT42-887F2</ServiceValue>
              </Box>
            </LineInfoDetailsContainer>
          </LineInfoContainer>

          <ServicesContainer>
            <CurrentServiceContainer>
              <Box sx={{ margin: '20px' }}>
                <Box>  
                  <ServiceItemContainer sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <ServiceValue variant='h4'>현재 요금제</ServiceValue>
                      <ServiceValue variant='h2'>{currentServiceData.name}</ServiceValue>
                    </Box>
                    <ServicePrice variant='h2'>{currentServiceData.price.toLocaleString()}원</ServicePrice>
                  </ServiceItemContainer>
                </Box>

                <Box sx={{ marginTop: '30px' }}>
                  <Box>
                    <ServiceValue variant='h4'>현재 부가서비스 <Typography variant='h4' component="span" color="text.secondary" sx={{ display: 'inline' }}>{currentServiceData.items.length}</Typography></ServiceValue>
                  </Box>
                  <TableContainer component={Paper} sx={{ boxShadow: 'none', maxHeight: 300, overflow: 'auto' }}>
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <TableRow variant="head" sx={(theme) => ({ backgroundColor: theme.palette.grey[50] })}>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === 'name'}
                              direction={orderBy === 'name' ? order : 'asc'}
                              onClick={() => handleRequestSort('name')}
                            >
                              부가서비스명
                            </TableSortLabel>
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <TableSortLabel
                                active={orderBy === 'price'}
                                direction={orderBy === 'price' ? order : 'asc'}
                                onClick={() => handleRequestSort('price')}
                              >
                                요금(원)
                              </TableSortLabel>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sortedItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align="right">{item.price.toLocaleString()}원</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#DEE5EE' }}>
                          <TableCell sx={{ fontWeight: 'bold' }}>합계</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {currentServiceData.totalPrice.toLocaleString()}원
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </CurrentServiceContainer>

            <NewServiceContainer>
              부가서비스변경
            </NewServiceContainer>
          </ServicesContainer>
        </ContentContainer>
      </Container>
    </Box>
  );
};

export default ServiceModification;
