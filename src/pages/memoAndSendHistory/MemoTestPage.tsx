import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import MemoAndHistoryPanel from './MemoAndSendHistoryPanel';
import { Toast } from '@components/Toast';

const MemoTestPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box>
      {/* TO-DO : 레이아웃 구성전 임시 페이지. 삭제 필요 */}
      <Button variant='contained' color='primary' onClick={toggleDrawer(true)}>
        메모 및 발송이력 열기
      </Button>
      <MemoAndHistoryPanel open={isDrawerOpen} onClose={handleClose} />
      <Toast />
    </Box>
  );
};

export default MemoTestPage;
