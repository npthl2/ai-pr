import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const InputDomainContainer = styled(Box)(({}) => ({
  width: '14%', // 컨테이너 너비를 비율로 설정
  minWidth: '140px', // 최소 너비 설정
  flexShrink: 0, // 공간이 부족할 때 축소 허용
  minHeight: '40px', // 최소 높이 설정 (오류 메시지 공간 확보)
  display: 'flex',
  flexDirection: 'column',
}));

export const SendButtonContainer = styled(Box)(({}) => ({
  flexShrink: 0, // 컨테이너가 축소될 때 크기 유지
  height: '30px', // 높이 설정
  width: '5%',
  minWidth: '80px', // 최소 너비 설정
  display: 'flex',
  alignItems: 'center',
}));

export const EmailFormContainer = styled(Box)(({}) => ({
  display: 'flex', // 자식 요소들을 가로로 배치
  alignItems: 'flex-start', // 자식 요소들을 상단 정렬로 변경
  flexWrap: 'nowrap', // 자식 요소들이 한 줄에 유지되도록 설정
  gap: 1, // 자식 요소들 사이의 간격
}));

export const EmailAddressContainer = styled(Box)(({}) => ({
  width: '30%', // 컨테이너 너비를 비율로 설정
  minWidth: '100px', // 최소 너비 설정
  flexShrink: 1, // 공간이 부족할 때 축소 허용
  minHeight: '40px', // 최소 높이 설정 (오류 메시지 공간 확보)
}));

export const DomainSelectContainer = styled(Box)(({}) => ({
  width: '14%', // 컨테이너 너비를 비율로 설정
  minWidth: '140px', // 최소 너비 설정
  flexShrink: 0, // 공간이 부족할 때 축소 허용
  minHeight: '40px', // 최소 높이 설정 (오류 메시지 공간 확보)
  display: 'flex',
  flexDirection: 'column',
}));
