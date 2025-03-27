import { Button } from '@mui/material';
import { NestedDialog } from '@components/NestedDialog';
import { useDialog } from '@hooks/useDialog';
import { ExampleContainer } from './DialogExample.styled';
import {
  AlertContent,
  ConfirmContent,
  CustomContent,
  CustomButtons,
  FirstNestedContent,
  SecondNestedContent,
} from './components/DialogContents';

const DialogExample = () => {
  const { alert, confirm, custom, openDialog } = useDialog();

  const handleOpenAlert = () => {
    alert(<AlertContent />, {
      onClose: () => {
        // 알림창이 닫혔을 때의 처리
      },
    });
  };

  const handleOpenConfirm = () => {
    confirm(
      <ConfirmContent />,
      () => {
        // 삭제 확인 처리
      },
      {
        title: '삭제 확인',
        onCancel: () => {
          // 삭제 취소 처리
        },
        onClose: () => {
          // 확인 창이 닫혔을 때의 처리
        },
      },
    );
  };

  const handleOpenCustom = () => {
    custom(<CustomContent />, <CustomButtons />, { title: '커스텀 다이얼로그' });
  };

  const handleOpenNested = () => {
    const openSecondDialog = () => {
      openDialog(
        'dialog2',
        <SecondNestedContent
          onOpenAlert={() => alert(<AlertContent />, { title: '마지막 알림' })}
        />,
        { type: 'none' },
      );
    };

    openDialog('dialog1', <FirstNestedContent onOpenNext={openSecondDialog} />, { type: 'none' });
  };

  return (
    <ExampleContainer>
      <Button variant='contained' onClick={handleOpenAlert}>
        Alert 다이얼로그
      </Button>
      <Button variant='contained' onClick={handleOpenConfirm}>
        Confirm 다이얼로그
      </Button>
      <Button variant='contained' onClick={handleOpenCustom}>
        Custom 다이얼로그
      </Button>
      <Button variant='contained' onClick={handleOpenNested}>
        중첩 다이얼로그
      </Button>
      <NestedDialog />
    </ExampleContainer>
  );
};

export default DialogExample;
