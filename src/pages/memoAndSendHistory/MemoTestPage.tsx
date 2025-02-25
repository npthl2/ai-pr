import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import MemoAndHistoryPanel from './MemoAndSendHistoryPanel';

const MemoTestPage: React.FC = () => {
  const [isMemoPanelOpen, setIsMemoPanelOpen] = useState(false);

  return (
    <Box>
      {/* TO-DO : 레이아웃 구성전 임시 페이지. 삭제 필요 */}
      <Button
        data-testid='memoOpenButton'
        variant='contained'
        color='primary'
        onClick={() => setIsMemoPanelOpen(true)}
      >
        메모 및 발송이력 열기
      </Button>
      <MemoAndHistoryPanel open={isMemoPanelOpen} onClose={() => setIsMemoPanelOpen(false)} />
    </Box>
  );
};

export default MemoTestPage;
