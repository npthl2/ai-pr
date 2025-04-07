import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  WidgetContainer,
  HeaderContainer,
  TitleContainer,
  Title,
  SignupCount,
  SearchContainer,
  SearchInput,
  SignupCard,
  CardContent,
  CustomerInfo,
  CustomerName,
  ServiceName,
  DetailButton,
  Divider,
  EmptyContainer,
  EmptyTitle,
  EmptyDescription,
  NoResultContainer,
  NoResultText,
  StyledSlider,
  ArrowButton,
} from './NewSignupWidget.styled';
import { useTodayContracts } from '@api/queries/dashboard/useTodayContracts';
import CircularProgress from '@mui/material/CircularProgress';
import NewSignupModal from './NewSignupModal';
import { ContractData } from '@model/Contract';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

interface CustomArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  show?: boolean;
}

const CustomNextArrow = ({ onClick, className, show = true }: CustomArrowProps) => (
  <ArrowButton onClick={onClick} className={className} $isNext={true} $show={show}>
    <ArrowForwardIosIcon sx={{ fontSize: '14px', color: '#05151F' }} />
  </ArrowButton>
);

const CustomPrevArrow = ({ onClick, className }: CustomArrowProps) => (
  <ArrowButton onClick={onClick} className={className} $isNext={false}>
    <ArrowBackIosNewIcon sx={{ fontSize: '14px', color: '#05151F', marginLeft: '3px' }} />
  </ArrowButton>
);

const NewSignupWidget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSignupId, setSelectedSignupId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRightArrow, setShowRightArrow] = useState(true);
  const { data: todayContracts, isLoading, error } = useTodayContracts();

  const handleSignupClick = (signupId: string) => {
    setSelectedSignupId(signupId);
    setIsModalOpen(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * EMPTY_STATE_QUOTES.length);
    return EMPTY_STATE_QUOTES[randomIndex];
  };

  const handleBeforeChange = () => {
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

  if (isLoading) {
    return (
      <WidgetContainer sx={{ justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </WidgetContainer>
    );
  }

  if (error || !todayContracts) {
    return (
      <WidgetContainer>
        <Title>데이터를 불러오는데 실패했습니다.</Title>
      </WidgetContainer>
    );
  }

  const filteredContracts = todayContracts.filter((contract) =>
    contract.invoiceDetail.paymentName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderContent = () => {
    if (todayContracts.length === 0) {
      const quote = getRandomQuote();
      return (
        <EmptyContainer>
          <EmptyTitle>오늘 신규가입 건은 없습니다.</EmptyTitle>
          <EmptyDescription>
            {quote.text}
            <br></br>-{quote.author}-
          </EmptyDescription>
        </EmptyContainer>
      );
    }

    if (filteredContracts.length === 0) {
      return (
        <NoResultContainer>
          <NoResultText>조회 결과가 없습니다.</NoResultText>
        </NoResultContainer>
      );
    }

    return (
      <StyledSlider
        variableWidth={true}
        slidesToShow={1}
        slidesToScroll={1}
        centerMode={false}
        arrows={true}
        infinite={false}
        beforeChange={handleBeforeChange}
        nextArrow={<CustomNextArrow show={showRightArrow} />}
        prevArrow={<CustomPrevArrow />}
      >
        {filteredContracts.map((contract: ContractData) => (
          <SignupCard key={contract.contractId}>
            <CardContent>
              <CustomerInfo>
                <CustomerName>{contract.invoiceDetail.paymentName}</CustomerName>
                <Divider />
                <ServiceName>
                  {contract.contractDetail.serviceList[0]?.serviceName ?? '요금제 없음'}
                </ServiceName>
              </CustomerInfo>
            </CardContent>
            <DetailButton onClick={() => handleSignupClick(contract.contractId)}>
              상세 정보 보기 →
            </DetailButton>
          </SignupCard>
        ))}
      </StyledSlider>
    );
  };

  return (
    <WidgetContainer>
      <HeaderContainer>
        <TitleContainer>
          <Title>오늘의 신규가입</Title>
          <SignupCount>{todayContracts.length}건</SignupCount>
        </TitleContainer>
        <SearchContainer>
          <SearchInput
            placeholder='이름 검색'
            value={searchQuery}
            onChange={handleSearchChange}
            endAdornment={<SearchIcon sx={{ color: '#868F99' }} />}
          />
        </SearchContainer>
      </HeaderContainer>

      {renderContent()}

      <NewSignupModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        signupId={selectedSignupId}
      />
    </WidgetContainer>
  );
};

export default NewSignupWidget;
