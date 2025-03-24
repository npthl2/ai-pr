import { Box, Typography, Table, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import Button from '@components/Button';

// 루트 컨테이너 - 전체 컴포넌트 레이아웃
export const RootContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

// 헤더 컨테이너 - 제목과 카운트를 포함하는 상단 영역
export const ServiceHeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  marginBottom: '16px',
});

// 제목 타이포그래피 스타일
export const TitleTypography = styled(Typography)({
  fontWeight: 500,
  whiteSpace: 'nowrap',
  marginRight: '16px',
});

// 카운트 타이포그래피 스타일
export const CountTypography = styled(Typography)({
  fontWeight: 400,
});

// 목록 컨테이너 - 테이블을 감싸는 영역
export const ListContainer = styled(Box)({
  width: '100%',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

// 테이블 레이아웃 고정 스타일
export const StyledTable = styled(Table)({
  tableLayout: 'fixed',
});

// 스크롤 가능한 테이블 컨테이너
export const ScrollableTableContainer = styled(TableContainer)({
  maxHeight: '200px',
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

// 서비스명 스타일
export const ServiceName = styled(Typography)({
  fontWeight: 400,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '500px',
});

// 가격 셀 스타일
export const PriceCell = styled(TableCell)({
  textAlign: 'right',
  whiteSpace: 'nowrap',
});

// 상태 표시 스타일
export const StatusBadge = styled(Typography)<{ isCurrentService?: boolean }>(({ isCurrentService }) => ({
  color: isCurrentService ? '#388e3c' : '#1976d2',
  fontWeight: isCurrentService ? 500 : 400,
}));

// 삭제 버튼 스타일
export const DeleteButton = styled(Button)({
  minWidth: '80px',
  whiteSpace: 'nowrap',
});

// 합계 행 스타일
export const TotalRow = styled(TableRow)({
  backgroundColor: '#f5f6f8',
  '& th, & td': {
    fontWeight: 'bold',
    padding: '16px',
  },
});

// 합계 텍스트 스타일
export const TotalText = styled(Typography)({
  fontWeight: 'bold',
});

// 합계 금액 스타일
export const TotalAmount = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.1rem',
}); 