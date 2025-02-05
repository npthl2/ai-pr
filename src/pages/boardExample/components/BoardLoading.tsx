import { Skeleton, Box } from '@mui/material';
import { BoardContainer } from '../BoardExample.styled';
import { keyframes } from '@mui/system';

// 반짝이는 애니메이션 정의
const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const BoardLoading = () => {
  return (
    <BoardContainer>
      {/* 제목 스켈레톤 */}
      <Skeleton
        variant='text'
        width='200px'
        height={40}
        sx={{
          mb: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: (theme) =>
              theme.palette.mode === 'light'
                ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
            animation: `${shimmer} 2s infinite`,
          },
        }}
      />

      {/* BoardListContainer 스타일을 반영한 스켈레톤 컨테이너 */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={(theme) => ({
            p: 2,
            borderRadius: 1,
            bgcolor:
              theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)',
            boxShadow: 1,
            '&:hover': {
              boxShadow: 3,
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(0, 0, 0, 0.05)'
                  : 'rgba(255, 255, 255, 0.05)',
            },
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                theme.palette.mode === 'light'
                  ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
              animation: `${shimmer} 2s infinite`,
            },
          })}
        >
          {/* BoardTitle 스타일을 반영한 제목 스켈레톤 */}
          <Skeleton variant='text' width='70%' height={28} sx={{ mb: 1 }} />

          {/* BoardInfo 스타일을 반영한 정보 스켈레톤 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Skeleton variant='text' width={100} />
            <Skeleton variant='text' width={120} />
          </Box>
        </Box>
      </Box>
    </BoardContainer>
  );
};

export default BoardLoading;
