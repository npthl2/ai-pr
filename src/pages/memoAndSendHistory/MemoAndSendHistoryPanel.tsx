import React from 'react';
import { Container, Typography } from '@mui/material';
import MemoHistory from './components/MemoHistory';
import DoubleArrow from '@mui/icons-material/DoubleArrow';
import { PanelCloseButton, PanelBox, PanelDrawer } from './MemoAndSendHistoryPanel.styled';

const MemoAndHistoryPanel: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <PanelDrawer anchor='right' open={open} onClose={onClose}>
      <Container
        sx={{
          width: {
            sm: '700px',
            lg: '900px',
          },
        }}
      >
        <PanelCloseButton
          variant='text'
          color='primary'
          size='small'
          iconComponent={<DoubleArrow />}
          onClick={onClose}
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
