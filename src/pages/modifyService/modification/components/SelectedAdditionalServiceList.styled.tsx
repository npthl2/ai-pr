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
  borderTop: '1px solid #e0e0e0',
  borderBottom: '1px solid #e0e0e0',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: 'auto', // 내부 컨텐츠에 맞춤
});

// 경고 메시지 컨테이너
export const WarningContainer = styled(Box)({
  backgroundColor: '#ffebee',
  padding: '8px 16px',
  borderRadius: '4px',
  margin: '0 0 12px 0',
  display: 'flex',
  alignItems: 'center',
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

// 테이블 레이아웃 고정 스타일
export const StyledTable = styled(Table)({
  tableLayout: 'fixed',
  borderCollapse: 'collapse',
});

// 스크롤 가능한 테이블 컨테이너
export const ScrollableTableContainer = styled(TableContainer)({
  // 헤더와 데이터 6개가 보이도록 고정 높이 설정 (행 높이 37px × 4개 = 148px)
  height: '148px',
  minHeight: '148px',
  maxHeight: '148px', // 항상 같은 높이를 유지
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '2px',
  },
});

// 테이블 헤더 셀 스타일
export const StyledTableHeaderCell = styled(TableCell)({
  fontWeight: 500,
});

// 테이블 빈공간 셀 스타일
export const StyledTableBlankCell = styled(TableCell)({
  textAlign: 'center',
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

// 상태 표시 스타일 - 기본 베이스 스타일
const BadgeBase = styled(Box)({
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '12px',
});

// 가입 상태 배지
export const SubscribeStatusBadge = styled(BadgeBase)({
  fontWeight: 400,
  backgroundColor: '#e3f2fd',
  color: '#0d47a1',
});

// 가입중 상태 배지
export const CurrentStatusBadge = styled(BadgeBase)({
  fontWeight: 500,
  backgroundColor: '#f0f0f0',
  color: '#616161',
});

// 해지필요 상태 배지
export const RestrictedStatusBadge = styled(BadgeBase)({
  fontWeight: 500,
  backgroundColor: '#ff5252',
  color: '#ffffff',
});

// 삭제 버튼 스타일
export const DeleteButton = styled(Button)({
  minWidth: '50px',
  whiteSpace: 'nowrap',
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
  marginBottom: '2px',
});
