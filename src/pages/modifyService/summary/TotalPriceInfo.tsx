import { Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Container,
  PriceChangeContainer,
  PriceDifferenceText,
  PriceComparisonContainer,
  PriceColumn,
  PriceTitle,
  PriceText,
  ArrowContainer,
} from './TotalPriceInfo.styled';

interface TotalPriceInfoProps {
  totalBeforePrice: number;
  totalAfterPrice: number;
}

const TotalPriceInfo = ({ totalBeforePrice, totalAfterPrice }: TotalPriceInfoProps) => {
  // 가격 차이
  const priceDifference = totalAfterPrice - totalBeforePrice;
  
  return (
    <Container>
      <PriceChangeContainer>
        <PriceDifferenceText>
          {priceDifference > 0 ? '+' : ''}
          {priceDifference.toLocaleString()}원
        </PriceDifferenceText>
      </PriceChangeContainer>
      
      <PriceComparisonContainer>
        <PriceColumn>
          <PriceTitle>변경 전</PriceTitle>
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <PriceText>월 {totalBeforePrice.toLocaleString()}원</PriceText>
          </Box>
        </PriceColumn>
        
        <ArrowContainer>
          <ArrowForwardIcon sx={{ color: 'action.active' }} />
        </ArrowContainer>
        
        <PriceColumn>
          <PriceTitle>변경 후</PriceTitle>
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <PriceText isAfter>월 {totalAfterPrice.toLocaleString()}원</PriceText>
          </Box>
        </PriceColumn>
      </PriceComparisonContainer>
    </Container>
  );
};

export default TotalPriceInfo;
