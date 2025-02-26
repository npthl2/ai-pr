import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const LoginContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #ffffff;
    padding: 15px 30px;
`;

export const LogoText = styled.h1`
    color: #050E1F;
    font-size: 20px;
    margin: 0;
`;

export const FormContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 126.5px auto;
    padding: 40px 32px;
    gap: 24px;
    background: #FFFFFF;
    border: 1px solid #D1D6DA;
    border-radius: 10px;
    box-shadow: 0px 4px 64px rgba(0, 0, 0, 0.05);
`;

export const TitleContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
`;

export const Title = styled.h2`
    color: #050E1F;
    font-size: 16px;
    margin: 0;
`;

export const Subtitle = styled.h3`
    color: #050E1F;
    font-size: 28px;
    margin: 0;
`;

export const AlertContainer = styled(Box)`
    margin-bottom: 24px;
`;

export const FormFieldsContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 24px;
`;
