import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// 메인 컨테이너 - 전체 페이지 레이아웃
export const Container = styled(Box)({
  paddingLeft: '20px',
  paddingRight: '20px',
  borderTopRightRadius: '8px',
  borderBottomRightRadius: '8px',
  flex: 1,
});

// 섹션 컨테이너 - 각 섹션 간의 간격 조절
export const Section = styled(Box)({
  marginBottom: '10px',
});

// 버튼 그룹 - 하단 버튼 영역 레이아웃
export const ButtonGroup = styled(Box)({
  display: 'flex',
  gap: '8px',
});

// 경고 메시지 텍스트
export const WarningMessage = styled(Typography)({
  color: '#d32f2f',
  fontSize: '14px',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    marginRight: '8px',
  },
});

// 툴팁 아이콘 스타일
export const InfoIcon = styled(InfoOutlinedIcon)({
  fontSize: 16,
});
