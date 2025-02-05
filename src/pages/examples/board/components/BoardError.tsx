import { Box } from '@mui/material';
import { BoardContainer } from '../BoardExample.styled';
import { FallbackProps } from 'react-error-boundary';

const BoardError = ({ error }: FallbackProps) => {
  return (
    <BoardContainer>
      <Box
        sx={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={(theme) => ({
            p: 4,
            width: '100%',
            borderRadius: 1,
            bgcolor:
              theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)',
            textAlign: 'center',
          })}
        >
          <h2 style={{ margin: '0 0 16px 0' }}>에러가 발생했습니다</h2>
          <p style={{ margin: 0, color: '#f44336' }}>
            {error.message || '알 수 없는 에러가 발생했습니다'}
          </p>
        </Box>
      </Box>
    </BoardContainer>
  );
};

export default BoardError;
