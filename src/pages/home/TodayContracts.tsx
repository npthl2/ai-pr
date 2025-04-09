import { useState, useMemo, useEffect } from 'react';

import { Stack, Divider } from '@mui/material';
import { TitleWrapper, TitleBox } from './Home.styled';
import {
  ServiceName,
  CustomerName,
  CustomerInfo,
  TodayContractsContainer,
  EmptyContractContainer,
  EmptyContractText,
  EmptyDescription,
  StyledSlider,
  DetailButton,
  ArrowButton,
  PhoneNumber,
  Title,
  SearchContainer,
  StyledTextField,
  CardWrapper,
  CardContent,
  DetailInfo,
} from './TodayContracts.styled';

import { useTodayContracts } from '@api/queries/dashboard/useTodayContracts';

import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ContractDataWithCustomer } from '@model/CustomerContract';

import { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import TodayContractsModal from './todayContracts/TodayContractsModal';
import { EMPTY_STATE_QUOTES } from './TodayContractsConstants';

const TodayContracts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const { data: todayContracts } = useTodayContracts();
  const [filteredContracts, setFilteredContracts] = useState(todayContracts);
  const [sliderKey, setSliderKey] = useState(0);

  const handleSignupClick = (contractId: string) => {
    setSelectedContractId(contractId);
    setIsModalOpen(true);
  };

  const handleSearchClick = (value: string) => {
    const filtered = todayContracts?.filter((contract) =>
      contract.customerDetail.customerName.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredContracts(filtered);
    // 검색조건 변경 시 강제 리마운트(슬라이더 인덱스 초기화)
    setSliderKey(sliderKey + 1);
  };

  const CustomNextArrow = ({
    onClick,
    className,
    show = true,
  }: CustomArrowProps & { show?: boolean }) => (
    <ArrowButton onClick={onClick} className={className} $isNext={true} $show={show}>
      <ArrowForwardIosIcon sx={{ fontSize: '14px', color: '#05151F' }} data-testid='next-arrow' />
    </ArrowButton>
  );

  const CustomPrevArrow = ({ onClick, className }: CustomArrowProps) => (
    <ArrowButton onClick={onClick} className={className} $isNext={false}>
      <ArrowBackIosNewIcon sx={{ fontSize: '14px', color: '#05151F' }} data-testid='prev-arrow' />
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

  const randomQuote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * EMPTY_STATE_QUOTES.length);
    return EMPTY_STATE_QUOTES[randomIndex];
  }, []);

  useEffect(() => {
    if (todayContracts) {
      setFilteredContracts(todayContracts);
    }
  }, [todayContracts]);

  // 검색 조건이 변경될 때 마다 rerender 해서 arrow 표시가 적절하게 되어야 함
  useEffect(() => {
    // 카드가 먼저 렌더되어야 해서 timer 적용
    const timer = setTimeout(() => {
      handleAfterChange();
    }, 0);

    return () => clearTimeout(timer);
  }, [filteredContracts]);

  return (
    <TodayContractsContainer>
      <TitleWrapper>
        <TitleBox>
          <Title variant='h2'>오늘의 신규가입</Title>
          <Title variant='h2' data-testid='total-contracts'>
            {filteredContracts?.length}
          </Title>
        </TitleBox>
        <SearchContainer>
          <StyledTextField
            size='medium'
            variant='outlined'
            placeholder='이름 검색'
            value={searchQuery}
            onChange={setSearchQuery}
            suffix={
              <SearchIcon
                sx={{ color: '#868F99' }}
                onClick={() => handleSearchClick(searchQuery)}
                data-testid='search-icon'
              />
            }
            data-testid='search-input'
          />
        </SearchContainer>
      </TitleWrapper>

      <Stack direction='row' spacing={2} height={'258px'}>
        {todayContracts?.length === 0 ? (
          <EmptyContractContainer>
            <EmptyContractText variant='h3'>오늘 신규가입 건은 없습니다.</EmptyContractText>
            <EmptyDescription variant='h5' data-testid='quote-text'>
              {randomQuote.text}
              <br></br>-{randomQuote.author}-
            </EmptyDescription>
          </EmptyContractContainer>
        ) : filteredContracts?.length === 0 ? (
          <EmptyContractContainer>
            <EmptyContractText variant='body1'>조회 결과가 없습니다.</EmptyContractText>
          </EmptyContractContainer>
        ) : (
          <StyledSlider
            key={sliderKey}
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
            {filteredContracts?.map((contract: ContractDataWithCustomer, index: number) => (
              <CardWrapper
                key={contract.contractId}
                className={hoveredCardId === contract.contractId ? 'hover-active' : ''}
                onMouseEnter={() => setHoveredCardId(contract.contractId)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <CardContent data-testid={`card-content-${index}`}>
                  <CustomerInfo>
                    <CustomerName variant='h3'>{contract.customerDetail.customerName}</CustomerName>
                    <PhoneNumber variant='h3'>{contract.contractDetail.phoneNumber}</PhoneNumber>
                    <Divider />
                    <ServiceName variant='h4'>
                      {contract.contractDetail.serviceList[0]?.serviceName ?? '요금제 없음'}
                    </ServiceName>
                  </CustomerInfo>
                  <DetailInfo>
                    <DetailButton
                      variant='h5'
                      onClick={() => handleSignupClick(contract.contractId)}
                      data-testid={`card-detail-info-${index}`}
                    >
                      상세 정보 보기 →
                    </DetailButton>
                  </DetailInfo>
                </CardContent>
              </CardWrapper>
            ))}
          </StyledSlider>
        )}
      </Stack>

      <TodayContractsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contractId={selectedContractId}
      />
    </TodayContractsContainer>
  );
};

export default TodayContracts;
