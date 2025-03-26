import styled from '@emotion/styled';
import Button from '@components/Button';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material';

export const CustomerSearchContainer = styled('div')(({ theme }: { theme: Theme }) => ({
  width: '474px',
  minHeight: '181px',
  display: 'flex',
  flexDirection: 'column' as const, // flexDirection 타입을 명시적으로 지정,
  gap: '24px',
  borderRadius: '16px',
  padding: '24px 32px',
  backgroundColor: theme.palette.primary.contrastText, // 테마의 primary 색상 사용
  boxShadow: '0px 4px 15px 0px #00000033',
  marginTop: '24px',
}));

// "고객조회" 제목의 스타일 (Figma 프로퍼티 적용)
export const SearchTitle = styled.div`
  width: 49px;
  height: 21px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0px;
`;

export const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CustomerSearchButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  width: '410px',
  height: '32px',
  borderRadius: '2px',
  background: theme.palette.primary.main, // 테마의 primary 색상 사용
  color: theme.palette.primary.contrastText, // primary 대비 텍스트 색상 사용

  fontFamily: 'Pretendard, sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '21px',
  letterSpacing: '0px',

  // hover 시에도 배경색 및 스타일 유지
  '&:hover': {
    background: theme.palette.primary.main, // hover 시 primary 색상 유지
  },
}));

// 라디오 버튼 전체를 감싸는 컨테이너: 두 개의 라디오 버튼이 들어가며,
// Figma에 따르면 전체 컨테이너는 width: 74px, height: 21px, gap: 8px
export const RadioGroupContainer = styled.div`
  width: 74px;
  height: 21px;
  display: flex;
  gap: 8px;
  align-items: center;
  padding-left: 8px;
`;

// 각각의 라디오 버튼을 감싸는 래퍼: Figma 프로퍼티: width: 33px, height: 21px, gap: 4px
export const RadioButtonWrapper = styled.div`
  width: 33px;
  height: 21px;
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
`;

export const CustomerSearchModal = styled(Box)({
  position: 'absolute',
  top: '64px',
  right: '92px',
  width: '474px',
  height: '181px',
});
