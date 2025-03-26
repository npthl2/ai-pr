import styled from '@emotion/styled';
import { Typography, Box, Button, Theme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const LogoText = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.common.black,
  fontSize: '24px', // 폰트 크기
  fontWeight: 700, // 글자 굵기를 700으로 설정 (Bold 효과)
  letterSpacing: '5px', // 글자 사이 간격을 0.5px로 설정
  margin: 0, // 여백 제거
}));

export const LoginContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  padding: '15px 30px',
  gap: '24px',
});

export const FormContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '400px',
  margin: '126.5px auto',
  padding: '40px 32px',
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '10px',
  borderRight: `1px solid ${theme.palette.divider}`,
  boxShadow: '0px 4px 64px rgba(0, 0, 0, 0.05)',
}));

export const TitleContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const Title = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.common.black,
  fontSize: '16px', // 폰트 크기
  fontWeight: 300, // 글자 굵기를 700으로 설정 (Bold 효과)
  letterSpacing: '1px', // 글자 사이 간격을 0.5px로 설정
}));

export const Subtitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.common.black,
  fontSize: '30px', // 폰트 크기
  fontWeight: 300, // 글자 굵기를 700으로 설정 (Bold 효과)
  letterSpacing: '1px', // 글자 사이 간격을 0.5px로 설정
}));

export const AlertContainer = styled(Box)`
  margin-bottom: 24px;
`;

export const FormFieldsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
`;

export const LoginIdContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 32px;
`;

export const LoginPasswordContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ContainerTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '150%',
  margin: 0,
}));

export const LoginButton = styled(Button)`
  background-color: ${grey[900]};
  text-transform: none;
  margin-bottom: 36px;
  color: white;

  &:hover {
    background-color: ${grey[800]};
  }
`;
