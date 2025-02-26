import React from 'react';
import { Button, Box } from '@mui/material';
import MemoAndHistoryPanel from './MemoAndSendHistoryPanel';
import { useHistoryPanelStore } from '@stores/HistoryPanelStore';

const MemoTestPage: React.FC = () => {
  const toggleOpen = useHistoryPanelStore((state) => state.toggleOpen);
  return (
    <Box>
      {/* TO-DO : 레이아웃 구성전 임시 페이지. 삭제 필요 */}
      <Button data-testid='memoOpenButton' variant='contained' color='primary' onClick={toggleOpen}>
        메모 및 발송이력 열기
      </Button>
      <MemoAndHistoryPanel />
    </Box>
  );
};

export default MemoTestPage;
