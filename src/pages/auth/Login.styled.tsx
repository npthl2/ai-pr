import styled from '@emotion/styled';
import { Typography, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Theme } from '@mui/material';
// import type { Theme } from '@mui/material/styles';

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
    backgroundColor: grey[50],
    padding: '15px 30px',
  });

export const FormContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    margin: '126.5px auto',
    padding: '40px 32px',
    gap: '24px',
    backgroundColor: grey[50],
    border: `1px solid ${grey[500]}`,
    borderRadius: '10px',
    boxShadow: '0px 4px 64px rgba(0, 0, 0, 0.05)',
  });

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
    margin: 0, // 여백 제거
}));

export const Subtitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
    color: theme.palette.common.black,
    fontSize: '30px', // 폰트 크기
    fontWeight: 300, // 글자 굵기를 700으로 설정 (Bold 효과)
    letterSpacing: '1px', // 글자 사이 간격을 0.5px로 설정
    margin: 0, // 여백 제거
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