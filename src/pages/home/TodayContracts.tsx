import { useState, useMemo } from 'react';

import { Typography, Box, Stack, CardContent, Divider } from '@mui/material';
import { TitleWrapper, TitleBox } from './Home.styled';
import {
  ServiceName,
  CustomerName,
  CustomerInfo,
  TodayContractsContainer,
  NoResultText,
  NoResultContainer,
  EmptyContainer,
  EmptyTitle,
  EmptyDescription,
  StyledSlider,
  DetailButton,
  ArrowButton,
  PhoneNumber,
  SignupCardWrapper,
} from './TodayContracts.styled';

import { useTodayContracts } from '@api/queries/dashboard/useTodayContracts';

import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ContractDataWithCustomer } from '@model/CustomerContract';

import { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import TodayContractsModal from './TodayContractsModal';
import { StyledTextField } from '@pages/registration/sections/contract/ContractSectionComponent.styles';

const TodayContracts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSignupId, setSelectedSignupId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const { data: todayContracts } = useTodayContracts();

  const handleSignupClick = (signupId: string) => {
    setSelectedSignupId(signupId);
    setIsModalOpen(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const CustomNextArrow = ({
    onClick,
    className,
    show = true,
  }: CustomArrowProps & { show?: boolean }) => (
    <ArrowButton onClick={onClick} className={className} $isNext={true} $show={show}>
      <ArrowForwardIosIcon sx={{ fontSize: '14px', color: '#05151F' }} />
    </ArrowButton>
  );

  const CustomPrevArrow = ({ onClick, className }: CustomArrowProps) => (
    <ArrowButton onClick={onClick} className={className} $isNext={false}>
      <ArrowBackIosNewIcon sx={{ fontSize: '14px', color: '#05151F' }} />
    </ArrowButton>
  );

  const handleAfterChange = () => {
    const sliderElement = document.querySelector('.slick-slider');
    const sliderTrack = document.querySelector('.slick-track');
    if (!sliderElement || !sliderTrack) return;

    const sliderRect = sliderElement.getBoundingClientRect();
    const lastSlide = document.querySelector('.slick-slide:not(.slick-cloned):last-child');
    if (!lastSlide) return;

    const lastSlideRect = lastSlide.getBoundingClientRect();
    const isLastSlideFullyVisible = lastSlideRect.right <= sliderRect.right;
    setShowRightArrow(!isLastSlideFullyVisible);
  };

  const EMPTY_STATE_QUOTES = [
    {
      text: '성공은 우연이 아니다. 그것은 열심히 노력하고, 배움을 지속하며,\n결코 포기하지 않는 사람들에게만 찾아온다.',
      author: '콜린 파일',
    },
    {
      text: '어떤 일이든 할 수 있다고 믿으면 그 일을 할 수 있다.',
      author: '테디 루즈벨트',
    },
    {
      text: '오늘의 노력은 내일의 성취를 만든다.',
      author: '토니 로빈스',
    },
    {
      text: '성취는 작은 일들의 축적이다.',
      author: '윌리엄 제임스',
    },
    {
      text: '누구든지 원하는 것을 이루기 위해서는 끊임없이 도전해야 한다.',
      author: '마이클 조던',
    },
  ];

  const randomQuote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * EMPTY_STATE_QUOTES.length);
    return EMPTY_STATE_QUOTES[randomIndex];
  }, []);

  const filteredContracts = todayContracts?.filter((contract) =>
    contract.customerDetail.customerName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <TodayContractsContainer>
      <TitleWrapper>
        <TitleBox>
          <Typography variant='h2'>오늘의 신규가입</Typography>
          <Typography variant='h2'>{todayContracts?.length}건</Typography>
        </TitleBox>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', height: '32px' }}>
          <StyledTextField
            size='small'
            variant='outlined'
            placeholder='이름 검색'
            value={searchQuery}
            onChange={handleSearchChange}
            endAdornment={<SearchIcon sx={{ color: '#868F99' }} />}
          />
        </Box>
      </TitleWrapper>

      <Stack direction='row' spacing={2} height={'258px'}>
        {todayContracts?.length === 0 ? (
          <EmptyContainer>
            <EmptyTitle>오늘 신규가입 건은 없습니다.</EmptyTitle>
            <EmptyDescription>
              {randomQuote.text}
              <br></br>-{randomQuote.author}-
            </EmptyDescription>
          </EmptyContainer>
        ) : filteredContracts?.length === 0 ? (
          <NoResultContainer>
            <NoResultText>조회 결과가 없습니다.</NoResultText>
          </NoResultContainer>
        ) : (
          <StyledSlider
            variableWidth={true}
            slidesToShow={1}
            slidesToScroll={1}
            centerMode={false}
            arrows={true}
            infinite={false}
            afterChange={handleAfterChange}
            nextArrow={<CustomNextArrow show={showRightArrow} />}
            prevArrow={<CustomPrevArrow />}
          >
            {filteredContracts?.map((contract: ContractDataWithCustomer) => (
              <SignupCardWrapper
                key={contract.contractId}
                className={hoveredCardId === contract.contractId ? 'hover-active' : ''}
                onMouseEnter={() => setHoveredCardId(contract.contractId)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <CardContent sx={{ padding: '0px' }}>
                  <CustomerInfo>
                    <CustomerName>{contract.customerDetail.customerName}</CustomerName>
                    <PhoneNumber>{contract.contractDetail.phoneNumber}</PhoneNumber>
                    <Divider />
                    <ServiceName>
                      {contract.contractDetail.serviceList[0]?.serviceName ?? '요금제 없음'}
                    </ServiceName>
                  </CustomerInfo>
                  <DetailButton onClick={() => handleSignupClick(contract.contractId)}>
                    상세 정보 보기 →
                  </DetailButton>
                </CardContent>
              </SignupCardWrapper>
            ))}
          </StyledSlider>
        )}
      </Stack>

      <TodayContractsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        signupId={selectedSignupId}
      />
    </TodayContractsContainer>
  );
};

export default TodayContracts;
