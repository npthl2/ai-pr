import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import MemoHistory from './components/MemoHistory';
import DoubleArrow from '@mui/icons-material/DoubleArrow';
import { PanelCloseButton, PanelBox, PanelDrawer } from './MemoAndSendHistoryPanel.styled';
import { useHistoryPanelStore } from '@stores/HistoryPanelStore';

const MemoAndHistoryPanel: React.FC = () => {
  const { open, toggleOpen } = useHistoryPanelStore();

  return (
    <PanelDrawer data-testid='memoPanel' anchor='right' open={open} onClose={toggleOpen}>
      <Box
        data-testid='memoOverlay'
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
        onClick={toggleOpen}
      />
      <Container
        sx={{
          width: {
            sm: '700px',
            lg: '900px',
          },
        }}
      >
        <PanelCloseButton
          data-testid='memoCloseButton'
          variant='text'
          color='primary'
          size='small'
          iconComponent={<DoubleArrow />}
          onClick={toggleOpen}
        />
        <PanelBox>
          <Typography variant='h2'>메모 및 발송이력</Typography>
          <MemoHistory />
          {/* <SendHistory /> */}
        </PanelBox>
      </Container>
    </PanelDrawer>
  );
};

export default MemoAndHistoryPanel;
