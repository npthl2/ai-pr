import React from 'react';
import { Typography } from '@mui/material';
import MemoHistory from './components/MemoHistory';
import DoubleArrow from '@mui/icons-material/DoubleArrow';
import {
  PanelCloseButton,
  PanelBox,
  PanelDrawer,
  OverlayBox,
  PanelContainer,
} from './MemoAndSendHistoryPanel.styled';
import { useHistoryPanelStore } from '@stores/HistoryPanelStore';

const MemoAndHistoryPanel: React.FC = () => {
  const { open, toggleOpen } = useHistoryPanelStore();

  return (
    <PanelDrawer data-testid='memoPanel' anchor='right' open={open} onClose={toggleOpen}>
      <OverlayBox data-testid='memoOverlay' onClick={toggleOpen} />
      <PanelContainer>
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
      </PanelContainer>
    </PanelDrawer>
  );
};

export default MemoAndHistoryPanel;
