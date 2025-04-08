import { useState, useMemo, useEffect } from 'react';

import { Stack, Divider } from '@mui/material';
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

  const handleSignupClick = (contractId: string) => {
    setSelectedContractId(contractId);
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

  const randomQuote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * EMPTY_STATE_QUOTES.length);
    return EMPTY_STATE_QUOTES[randomIndex];
  }, []);

  const filteredContracts = todayContracts?.filter((contract) =>
    contract.customerDetail.customerName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 검색 조건이 변경될 때 마다 rerender 해서 arrow 표시가 적절하게 되어야 함
  useEffect(() => {
    handleAfterChange();
  }, [searchQuery, filteredContracts]);

  return (
    <TodayContractsContainer>
      <TitleWrapper>
        <TitleBox>
          <Title variant='h2'>오늘의 신규가입</Title>
          <Title variant='h2'>{filteredContracts?.length}</Title>
        </TitleBox>
        <SearchContainer>
          <StyledTextField
            size='medium'
            variant='outlined'
            placeholder='이름 검색'
            value={searchQuery}
            onChange={handleSearchChange}
            suffix={<SearchIcon sx={{ color: '#868F99' }} />}
          />
        </SearchContainer>
      </TitleWrapper>

      <Stack direction='row' spacing={2} height={'258px'}>
        {todayContracts?.length === 0 ? (
          <EmptyContainer>
            <EmptyTitle variant='h3'>오늘 신규가입 건은 없습니다.</EmptyTitle>
            <EmptyDescription variant='h5'>
              {randomQuote.text}
              <br></br>-{randomQuote.author}-
            </EmptyDescription>
          </EmptyContainer>
        ) : filteredContracts?.length === 0 ? (
          <NoResultContainer>
            <NoResultText variant='body1'>조회 결과가 없습니다.</NoResultText>
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
              <CardWrapper
                key={contract.contractId}
                className={hoveredCardId === contract.contractId ? 'hover-active' : ''}
                onMouseEnter={() => setHoveredCardId(contract.contractId)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <CardContent>
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
