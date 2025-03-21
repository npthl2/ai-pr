import React, { useState } from 'react';
import { Typography, MenuItem, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@components/Button';
import Select from '@components/Select';
import TextField from '@components/TextField';

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
  TotalContainer,
  TotalLabel,
  TotalPrice,
  ButtonContainer,
  WarningMessage,
  ServiceSearchContainer,
} from './ServiceModification.styled';

interface ServiceItem {
  id: number;
  name: string;
  price: number;
  description?: string;
  status?: string;
}

const ServiceModification: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<number[]>([5]);
  const [searchValue, setSearchValue] = useState<string>('');

  // 현재 요금제 데이터
  const currentServiceData = {
    name: '넷플릭스 초이스 스페셜',
    price: 110000,
    items: [
      { id: 1, name: '부가서비스 1', price: 10000 },
      { id: 2, name: '부가서비스 2', price: 10000 },
      { id: 3, name: '부가서비스 3', price: 10000 },
      { id: 4, name: '부가서비스 4', price: 10000 },
    ],
    totalPrice: 45000,
  };

  // 부가서비스 목록 데이터
  const additionalServices: ServiceItem[] = [
    { id: 5, name: '부가서비스 5', price: 5000, status: '가입 불가' },
    { id: 6, name: '부가서비스 6', price: 10000 },
    {
      id: 7,
      name: '부가서비스 7',
      description: '무조건 이용해야만 합니다. 현재 요구사항에 맞춰 서비스로 이용해야 하는 서비스',
      price: 10000,
    },
    { id: 8, name: '부가서비스 8', price: 10000 },
    { id: 9, name: '부가서비스 9', price: 10000 },
    { id: 10, name: '부가서비스 10', price: 10000 },
  ];

  // 서비스 필터링
  const filteredServices = additionalServices.filter((service) =>
    service.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  // 선택된 서비스 목록
  const selectedServicesList = additionalServices.filter((service) =>
    selectedServices.includes(service.id),
  );

  // 새 요금제 총액 계산
  const newTotalPrice = selectedServicesList.reduce((total, service) => total + service.price, 0);

  // 서비스 선택 핸들러
  const handleServiceToggle = (serviceId: number) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

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
                <ServiceValue>010-297-*964</ServiceValue>
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
              <Box sx={{ flexShrink: 0 }}>
                <ServiceValue>현재 요금제</ServiceValue>
                <ServiceItemContainer sx={{ borderBottom: 'none', marginTop: 0.5, py: 0.5 }}>
                  <ServiceValue>{currentServiceData.name}</ServiceValue>
                  <ServicePrice>{currentServiceData.price.toLocaleString()}원</ServicePrice>
                </ServiceItemContainer>
              </Box>

              <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
                <ServiceValue>현재 부가서비스 ({currentServiceData.items.length})</ServiceValue>
                {currentServiceData.items.map((item) => (
                  <ServiceItemContainer key={item.id} sx={{ py: 0.5 }}>
                    <ServiceLabel>{item.name}</ServiceLabel>
                    <ServicePrice>{item.price.toLocaleString()}원</ServicePrice>
                  </ServiceItemContainer>
                ))}
              </Box>

              <Box sx={{ flexShrink: 0 }}>
                <TotalContainer>
                  <TotalLabel>합계</TotalLabel>
                  <TotalPrice>{currentServiceData.totalPrice.toLocaleString()}원</TotalPrice>
                </TotalContainer>
              </Box>
            </CurrentServiceContainer>

            <NewServiceContainer>
              <Box sx={{ flexShrink: 0 }}>
                <ServiceValue>변경할 요금제</ServiceValue>
                <Select
                  fullWidth
                  displayEmpty
                  size='small'
                  value=''
                  renderValue={() => (
                    <Typography sx={{ color: 'text.secondary' }}>요금제 선택</Typography>
                  )}
                >
                  <MenuItem value=''>요금제 선택</MenuItem>
                </Select>
              </Box>

              <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
                <ServiceSearchContainer sx={{ mb: 1 }}>
                  <ServiceValue>부가서비스 목록</ServiceValue>
                  <TextField
                    size='small'
                    placeholder='부가서비스 검색'
                    value={searchValue}
                    onChange={handleSearchChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ width: 200, marginLeft: 'auto' }}
                  />
                </ServiceSearchContainer>

                {filteredServices.map((service) => (
                  <ServiceItemContainer key={service.id} sx={{ position: 'relative', py: 0.5 }}>
                    <Box display='flex' alignItems='center' gap={1}>
                      <ServiceLabel>{service.name}</ServiceLabel>
                      {service.description && <InfoOutlinedIcon fontSize='small' color='action' />}
                    </Box>
                    <Box display='flex' alignItems='center' gap={1}>
                      <ServicePrice>{service.price.toLocaleString()}원</ServicePrice>
                      <Button
                        size='small'
                        variant={selectedServices.includes(service.id) ? 'contained' : 'outlined'}
                        iconComponent={
                          selectedServices.includes(service.id) ? <RemoveIcon /> : <AddIcon />
                        }
                        onClick={() => handleServiceToggle(service.id)}
                        disabled={service.status === '가입 불가'}
                      />
                    </Box>
                    {service.status === '가입 불가' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          right: '-5px',
                          top: '-5px',
                          bgcolor: 'error.main',
                          color: 'white',
                          padding: '0 4px',
                          borderRadius: 1,
                          fontSize: 10,
                        }}
                      >
                        {service.status}
                      </Box>
                    )}
                  </ServiceItemContainer>
                ))}
              </Box>

              <Box sx={{ flexShrink: 0 }}>
                <ServiceValue>선택한 부가서비스 ({selectedServicesList.length})</ServiceValue>
                {selectedServicesList.map((service) => (
                  <ServiceItemContainer key={service.id} sx={{ py: 0.5 }}>
                    <Box display='flex' alignItems='center' gap={1}>
                      <ServiceLabel>{service.name}</ServiceLabel>
                    </Box>
                    <Box display='flex' alignItems='center' gap={1}>
                      <ServicePrice>{service.price.toLocaleString()}원</ServicePrice>
                      <Button
                        size='small'
                        variant='text'
                        iconComponent={<RemoveIcon />}
                        onClick={() => handleServiceToggle(service.id)}
                      />
                    </Box>
                  </ServiceItemContainer>
                ))}
                <TotalContainer>
                  <TotalLabel>합계</TotalLabel>
                  <TotalPrice>{newTotalPrice.toLocaleString()}원</TotalPrice>
                </TotalContainer>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexShrink: 0,
                }}
              >
                <WarningMessage>
                  <ErrorOutlineIcon fontSize='small' />
                  부가서비스를 추가하여 요금제를 변경하는 경우, 다음 청구서에 반영됩니다.
                </WarningMessage>
                <ButtonContainer sx={{ marginTop: 0 }}>
                  <Button size='medium' variant='outlined' color='grey'>
                    초기화
                  </Button>
                  <Button size='medium' variant='contained'>
                    저장
                  </Button>
                </ButtonContainer>
              </Box>
            </NewServiceContainer>
          </ServicesContainer>
        </ContentContainer>
      </Container>
    </Box>
  );
};

export default ServiceModification;
