import { Typography, styled } from '@mui/material';

export const TabsExampleContainer = styled('div')`
  padding: 24px;
`;

export const ComponentTitle = styled(Typography)`
  margin-bottom: 16px;
`;

export const TabWrapper = styled('div')`
  display: flex;
  gap: 16px;

  &:has(> [direction='vertical']) {
    flex-direction: column;
  }
`;
