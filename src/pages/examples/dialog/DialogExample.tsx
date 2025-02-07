import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import Dialog from '@components/Dialog';
import { DialogExampleContainer, DialogWrapper } from './DialogExample.styled';

const DialogExample = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [useConfirm, setUseConfirm] = useState(true);

  const handleOpen = (dialogSize: 'small' | 'medium' | 'large', useConfirm: boolean) => {
    setSize(dialogSize);
    setOpen(true);
    setUseConfirm(useConfirm);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogExampleContainer>
      <Typography variant='h4' gutterBottom>
        Dialog 컴포넌트 예시
      </Typography>
      <DialogWrapper>
        <Button variant='outlined' onClick={() => handleOpen('small', true)}>
          Small
        </Button>
        <Button variant='outlined' onClick={() => handleOpen('medium', true)}>
          Medium
        </Button>
        <Button variant='outlined' onClick={() => handleOpen('large', true)}>
          Large
        </Button>
      </DialogWrapper>
      <DialogWrapper>
        <Button variant='outlined' onClick={() => handleOpen('small', false)}>
          Small (No Confirm)
        </Button>
        <Button variant='outlined' onClick={() => handleOpen('medium', false)}>
          Medium (No Confirm)
        </Button>
        <Button variant='outlined' onClick={() => handleOpen('large', false)}>
          Large (No Confirm)
        </Button>
      </DialogWrapper>
      <Dialog
        open={open}
        size={size}
        title='Dialog Title'
        content='This is the content of the dialog.'
        closeLabel='Close'
        onClose={handleClose}
        onConfirm={useConfirm ? () => alert('Confirmed!') : undefined}
      />
    </DialogExampleContainer>
  );
};

export default DialogExample;
