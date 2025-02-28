import styled from '@emotion/styled';
import Button from '@components/Button';
import Box from '@mui/material/Box';

export const CustomerSearchContainer = styled.div`
  width: 474px;
  min-height: 181px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 16px;
  padding: 24px 32px;
  background-color: #ffffff;
  box-shadow: 0px 4px 15px 0px #00000033;
`;

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
  align-items: baseline;
  gap: 16px;
`;

// Button의 스타일 오버라이드 - 인라인 스타일 대신 별도로 분리
export const CustomerSearchButton = styled(Button)`
  width: 410px;
  height: 32px;
  border-radius: 2px;
  background: #05151f;
  color: #ffffff;

  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0px;

  // hover 시에도 배경색 및 스타일 유지
  &:hover {
    background: #05151f;
  }
`;

// 라디오 버튼 전체를 감싸는 컨테이너: 두 개의 라디오 버튼이 들어가며,
// Figma에 따르면 전체 컨테이너는 width: 74px, height: 21px, gap: 8px
export const RadioGroupContainer = styled.div`
  width: 74px;
  height: 21px;
  display: flex;
  gap: 8px;
  align-items: center;
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
