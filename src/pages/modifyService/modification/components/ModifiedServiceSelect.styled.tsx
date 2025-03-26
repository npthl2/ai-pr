import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@components/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
  fontWeight: 800,
  whiteSpace: 'nowrap',
  minWidth: '100px',
});

// Autocomplete를 감싸는 컨테이너
export const AutocompleteContainer = styled(Box)({
  flex: 0.8, // 크기를 줄임
  maxWidth: '400px', // 최대 너비 설정
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
  fontWeight: 800,
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

export const ErrorIcon = styled(ErrorOutlineIcon)({
  color: '#f44336',
  fontSize: '12px',
  marginRight: '4px',
});

// 요금제 변경 가능 여부 안내 메시지 컨테이너
export const WarningContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

// 요금제 변경 안내 메시지 스타일
export const WarningMessage = styled(Typography)({
  fontSize: '12px',
  color: '#f44336', // 빨간색 경고 메시지
  fontWeight: 500,
});

// 요금제 선택 리스트 내 가격 스타일
export const ServicePrice = styled(Typography)({
  color: '#6E7782',
});

// 서비스 TextField 스타일 객체
export const serviceTextFieldStyle = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    '&.Mui-disabled': {
      backgroundColor: '#E5E8EB',
    },
  },
};

// 비활성화된 서비스 TextField 스타일 객체
export const disabledTextFieldStyle = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#E5E8EB',
    '&.Mui-disabled': {
      backgroundColor: '#E5E8EB',
    },
  },
};
