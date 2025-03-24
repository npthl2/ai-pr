import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@components/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// 루트 컨테이너 - 전체 컴포넌트 레이아웃
export const RootContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

// 서비스 행 컨테이너 - 한 줄에 모든 요소 배치
export const ServiceRowContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between', // 요소들 사이에 공간을 균등하게 분배
});

// 왼쪽 영역 컨테이너 - 제목과 드롭다운 배치
export const LeftSectionContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
});

// 타이틀 텍스트 스타일
export const TitleTypography = styled(Typography)({
  fontWeight: 500,
  whiteSpace: 'nowrap',
  marginRight: '16px',
  minWidth: '120px',
});

// Autocomplete를 감싸는 컨테이너
export const AutocompleteContainer = styled(Box)({
  flex: 0.5, // 크기를 줄임
  maxWidth: '400px', // 최대 너비 설정
  marginLeft: '8px',
  marginRight: '16px',
});

// 가격 영역 컨테이너
export const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

// 가격 텍스트 스타일
export const PriceTypography = styled(Typography)({
  whiteSpace: 'nowrap',
  fontWeight: 500,
  minWidth: '80px',
  textAlign: 'right',
});

// 이전 요금제로 되돌리기 버튼 스타일
export const RevertButton = styled(Button)({
  whiteSpace: 'nowrap',
  minHeight: '32px',
  fontSize: '12px',
});

// 툴팁 아이콘 스타일
export const InfoIcon = styled(InfoOutlinedIcon)({
  fontSize: 16,
  color: '#9e9e9e',
  marginLeft: '4px',
  cursor: 'help',
});
