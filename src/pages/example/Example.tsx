import { Button } from '@mui/material';
import { NestedDialog } from '@components/NestedDialog';
import { useDialog } from '@hooks/useDialog';
import { ExampleContainer } from './Example.styled';
import { AlertContent, ConfirmContent, CustomContent, CustomButtons, FirstNestedContent, SecondNestedContent } from './components/DialogContents';

export const Example = () => {
    const { alert, confirm, custom, openDialog } = useDialog();

    const handleOpenAlert = () => {
        alert(<AlertContent />, {
            onClose: () => console.log('알림창이 닫혔습니다.')
        });
    };

    const handleOpenConfirm = () => {
        confirm(
            <ConfirmContent />,
            () => {
                console.log('삭제 확인됨');
                // 여기에 삭제 로직 추가
            },
            {
                title: '삭제 확인',
                onCancel: () => console.log('삭제가 취소되었습니다.'),
                onClose: () => console.log('확인 창이 닫혔습니다.')
            }
        );
    };

    const handleOpenCustom = () => {
        custom(
            <CustomContent />,
            <CustomButtons />,
            { title: '커스텀 다이얼로그' }
        );
    };

    const handleOpenNested = () => {
        const openSecondDialog = () => {
            openDialog('dialog2',
                <SecondNestedContent
                    onOpenAlert={() => alert(<AlertContent />, { title: '마지막 알림' })}
                />,
                { type: 'none' }
            );
        };

        openDialog('dialog1',
            <FirstNestedContent onOpenNext={openSecondDialog} />,
            { type: 'none' }
        );
    };

    return (
        <ExampleContainer>
            <Button variant="contained" onClick={handleOpenAlert}>
                Alert 다이얼로그
            </Button>
            <Button variant="contained" onClick={handleOpenConfirm}>
                Confirm 다이얼로그
            </Button>
            <Button variant="contained" onClick={handleOpenCustom}>
                Custom 다이얼로그
            </Button>
            <Button variant="contained" onClick={handleOpenNested}>
                중첩 다이얼로그
            </Button>
            <NestedDialog />
        </ExampleContainer>
    );
}; 