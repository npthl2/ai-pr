import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// 메인 컨테이너 - 전체 페이지 레이아웃
export const Container = styled(Box)({
  padding: '20px',
  borderTopRightRadius: '8px',
  borderBottomRightRadius: '8px',
  flex: 1,
});

// 섹션 컨테이너 - 각 섹션 간의 간격 조절
export const Section = styled(Box)({
  marginBottom: '24px',
});

// 버튼 그룹 - 하단 버튼 영역 레이아웃
export const ButtonGroup = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  marginTop: '16px',
}); 