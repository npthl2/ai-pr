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
  marginBottom: '12px',
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
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: 'auto', // 내부 컨텐츠에 맞춤
  border: '1px solid #eaeaea',
  borderRadius: '4px',
});

// 테이블 레이아웃 고정 스타일
export const StyledTable = styled(Table)({
  tableLayout: 'fixed',
  borderCollapse: 'collapse',
});

// 스크롤 가능한 테이블 컨테이너
export const ScrollableTableContainer = styled(TableContainer)({
  maxHeight: '320px', // 더 유연한 높이 제한
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
  padding: '8px 16px',
  height: '40px',
  borderBottom: '1px solid #eaeaea',
  '& .MuiTypography-root': {
    fontWeight: 600,
  },
});

// 헤더 셀 내부 컨테이너 (정렬 아이콘 포함)
export const HeaderCellContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  cursor: 'pointer',
  '&.right-aligned': {
    justifyContent: 'flex-end',
  },
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
  padding: '8px 16px',
});

// 상태 표시 스타일 (배지로 변경)
// $ 접두사를 사용하여 DOM으로 전달되지 않도록 함
export const StatusBadge = styled(Box)<{ $isCurrentService?: boolean }>(({ $isCurrentService }) => ({
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: $isCurrentService ? 500 : 400,
  backgroundColor: $isCurrentService ? '#f0f0f0' : '#e3f2fd',
  color: $isCurrentService ? '#616161' : '#0d47a1',
}));

// 삭제 버튼 스타일
export const DeleteButton = styled(Button)({
  minWidth: '32px',
  width: '32px',
  height: '32px',
  padding: 0,
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#bdbdbd',
  },
});

// 합계 행 스타일
export const TotalRow = styled(TableRow)({
  backgroundColor: '#f5f6f8',
  '& th, & td': {
    padding: '12px 16px',
    borderTop: '1px solid #eaeaea',
  },
});

// 합계 텍스트 스타일
export const TotalText = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '14px',
});

// 합계 금액 스타일
export const TotalAmount = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '16px',
});
