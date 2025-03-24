import { Box, Typography, Table, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell from '@components/Table/TableCell';
import Button from '@components/Button';

// 루트 컨테이너 - 전체 컴포넌트 레이아웃
export const RootContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

// 헤더 컨테이너 - 제목과 검색 영역을 포함하는 상단 영역
export const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
});

// 제목 섹션 - 제목과 카운트를 담는 영역
export const TitleSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

// 제목 타이포그래피 스타일
export const TitleTypography = styled(Typography)({
  fontWeight: 500,
  whiteSpace: 'nowrap',
  marginRight: '8px',
});

// 카운트 타이포그래피 스타일
export const CountTypography = styled(Typography)({
  fontWeight: 400,
});

// 목록 컨테이너 - 테이블을 감싸는 영역
export const ListContainer = styled(Box)({
  width: '100%',
  borderTop: '1px solid #e0e0e0',
  borderBottom: '1px solid #e0e0e0',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: 'auto', // 내부 컨텐츠에 맞춤
});

// 테이블 레이아웃 고정 스타일
export const StyledTable = styled(Table)({
  tableLayout: 'fixed',
});

// 스크롤 가능한 테이블 컨테이너
export const ScrollableTableContainer = styled(TableContainer)({
  // 헤더와 데이터 6개가 보이도록 고정 높이 설정 (행 높이 37px × 6개 = 222px)
  height: '222px',
  minHeight: '222px',
  maxHeight: '222px', // 항상 같은 높이를 유지
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
});

// 테이블 헤더 셀 스타일
export const StyledTableHeaderCell = styled(TableCell)({
  backgroundColor: '#f5f6f8',
  fontWeight: 500,
});

// 추가 버튼 스타일
export const AddButton = styled(Button)({
  minWidth: '80px',
  whiteSpace: 'nowrap',
});
