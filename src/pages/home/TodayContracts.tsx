import { useState, useMemo, useEffect } from 'react';
import { TitleWrapper, TitleBox } from './Home.styled';
import {
  TodayContractsContainer,
  EmptyContractContainer,
  EmptyContractText,
  EmptyDescription,
  StyledSlider,
  ArrowButton,
  Title,
  SearchContainer,
  StyledTextField,
  ContractsStack,
  arrowIconStyle,
  StyledSearchIcon,
} from './TodayContracts.styled';
import { useTodayContracts } from '@api/queries/dashboard/useTodayContracts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ContractDataWithCustomer } from '@model/CustomerContract';
import { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TodayContractsModal from './todayContracts/TodayContractsModal';
import { EMPTY_STATE_QUOTES, SLIDES_TO_SHOW } from './TodayContractsConstants';
import useMemberStore from '@stores/MemberStore';
import ContractCard from './todayContracts/ContractCard';

const TodayContracts = () => {
  const memberInfo = useMemberStore((state) => state.memberInfo);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRightArrow, setShowRightArrow] = useState(true);
  const { data: todayContracts } = useTodayContracts(memberInfo?.memberId || '');
  const [filteredContracts, setFilteredContracts] = useState<ContractDataWithCustomer[]>([]);
  const [sliderKey, setSliderKey] = useState(0);

  // 랜덤 명언 가져오기
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
    handleAfterChange(0);
  }, [filteredContracts]);

  const handleDetailInfoClick = (contractId: string) => {
    setSelectedContractId(contractId);
    setIsModalOpen(true);
  };

  const handleSearchClick = (value: string) => {
    const filtered =
      todayContracts?.filter((contract) => contract.customerDetail.customerName.includes(value)) ??
      [];
    setFilteredContracts(filtered);
    // 검색조건 변경 시 강제 리마운트
    setSliderKey(sliderKey + 1);
  };

  // 슬라이더 끝에 도달했을 때 오른쪽 화살표 표시 없애기
  const handleAfterChange = (currentSlide: number) => {
    const slideNow = currentSlide ?? 0;
    const totalSlides = filteredContracts.length;

    // 마지막 슬라이드가 보이는지 여부 계산(width 계산 없다는 전제 하)
    const isLastSlideVisible = slideNow + SLIDES_TO_SHOW >= totalSlides;
    setShowRightArrow(!isLastSlideVisible);
  };

  const CustomPrevArrow = ({ onClick, className }: CustomArrowProps) => (
    <ArrowButton onClick={onClick} className={className} $isNext={false}>
      <ArrowBackIosNewIcon sx={arrowIconStyle} data-testid='prev-arrow' />
    </ArrowButton>
  );

  const CustomNextArrow = ({
    onClick,
    className,
    show = true,
  }: CustomArrowProps & { show?: boolean }) => (
    <ArrowButton onClick={onClick} className={className} $isNext={true} $show={show}>
      <ArrowForwardIosIcon sx={arrowIconStyle} data-testid='next-arrow' />
    </ArrowButton>
  );

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
              <StyledSearchIcon
                onClick={() => handleSearchClick(searchQuery)}
                data-testid='search-icon'
              />
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchClick(searchQuery);
              }
            }}
            data-testid='search-input'
          />
        </SearchContainer>
      </TitleWrapper>

      <ContractsStack>
        {!todayContracts?.length ? (
          <EmptyContractContainer>
            <EmptyContractText variant='h3'>오늘 신규가입 건은 없습니다.</EmptyContractText>
            <EmptyDescription variant='h5' data-testid='quote-text'>
              {randomQuote.text}
            </EmptyDescription>
            <EmptyDescription variant='h5'>-{randomQuote.author}-</EmptyDescription>
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
            afterChange={(currentSlide) => handleAfterChange(currentSlide)}
            initialSlide={0}
            nextArrow={<CustomNextArrow show={showRightArrow} />}
            prevArrow={<CustomPrevArrow />}
          >
            {filteredContracts?.map((contract: ContractDataWithCustomer) => (
              <ContractCard
                key={contract.contractId}
                contract={contract}
                onDetailClick={handleDetailInfoClick}
              />
            ))}
          </StyledSlider>
        )}
      </ContractsStack>

      <TodayContractsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contractId={selectedContractId}
      />
    </TodayContractsContainer>
  );
};

export default TodayContracts;
