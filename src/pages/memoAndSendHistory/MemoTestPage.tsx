import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import MemoAndHistoryPanel from './MemoAndSendHistoryPanel';

const MemoTestPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box>
      {/* TO-DO : 레이아웃 구성전 임시 페이지. 삭제 필요 */}
      <Button variant='contained' color='primary' onClick={() => setIsDrawerOpen(true)}>
        메모 및 발송이력 열기
      </Button>
      <MemoAndHistoryPanel open={isDrawerOpen} onClose={handleClose} />
    </Box>
  );
};

export default MemoTestPage;
