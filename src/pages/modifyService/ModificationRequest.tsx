import React from 'react';
import { Box, Typography } from '@mui/material';

interface ModificationRequestProps {
  contractTabId?: string;
}

const ModificationRequest: React.FC<ModificationRequestProps> = ({ contractTabId }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 3,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.common.white,
          p: 3,
          borderRadius: 1,
          mb: 2,
        }}
      >
        <Typography variant='h3' sx={{ mb: 2 }}>
          변경요청입니다.
        </Typography>
        <Typography variant='body1' sx={{ mb: 2 }}>
          계약 ID: {contractTabId || '정보 없음'}
        </Typography>
      </Box>
    </Box>
  );
};

export default ModificationRequest;
