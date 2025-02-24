import { useState, useRef } from 'react';
import { Box } from '@mui/material';
import Draggable from 'react-draggable';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import History from '@layout/History';
import { FloatingButton, HistoryWrapper } from './DraggableFloatingButton.styled';

const DraggableFloatingButton = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [positionY, setPositionY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef(null);

  const handleOpen = (_: React.MouseEvent) => {
    if (!isDragging) {
      setShowHistory((prev) => !prev);
    }
  };

  const handleDrag = (_: any, data: any) => {
    setPositionY(data.y);
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x: 0, y: positionY }}
      onDrag={handleDrag}
      onStop={handleDragStop}
      axis='y'
      handle='.drag-handle'
      bounds={{ top: -window.innerHeight + 400, bottom: 0 }}
    >
      <Box ref={nodeRef}>
        <HistoryWrapper className={showHistory ? 'show' : ''} style={{ bottom: 80 }}>
          <FloatingButton onClick={handleOpen} size='large' className='drag-handle'>
            {showHistory ? <CloseIcon /> : <HistoryIcon />}
          </FloatingButton>
          <History />
        </HistoryWrapper>
      </Box>
    </Draggable>
  );
};

export default DraggableFloatingButton;
