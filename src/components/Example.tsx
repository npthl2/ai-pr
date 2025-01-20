import { Button, Stack } from '@mui/material';
import { useDialogStore } from '../stores/dialogStore';
import { NestedDialog } from './NestedDialog';

export const Example = () => {
    const openDialog = useDialogStore((state) => state.openDialog);

    const handleOpenAlert = () => {
        openDialog('alert-dialog', (
            <div>
                저장이 완료되었습니다.
            </div>
        ), { type: 'alert' });
    };

    const handleOpenConfirm = () => {
        openDialog('confirm-dialog', (
            <div>
                정말 삭제하시겠습니까?
            </div>
        ), {
            type: 'confirm',
            title: '삭제 확인',
            onConfirm: () => {
                console.log('삭제 확인됨');
                // 여기에 삭제 로직 추가
            }
        });
    };

    const handleOpenCustom = () => {
        openDialog('custom-dialog', (
            <div>
                <h2>커스텀 버튼을 가진 다이얼로그</h2>
                <p>원하는 형태로 버튼을 구성할 수 있습니다.</p>
            </div>
        ), {
            type: 'custom',
            title: '커스텀 다이얼로그',
            customActions: (
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" color="error">
                        삭제
                    </Button>
                    <Button variant="outlined" color="warning">
                        수정
                    </Button>
                    <Button variant="contained" color="primary">
                        저장
                    </Button>
                </Stack>
            )
        });
    };

    const handleOpenNested = () => {
        openDialog('dialog1', (
            <div>
                <h2>첫 번째 다이얼로그</h2>
                <Button
                    variant="contained"
                    onClick={() => openDialog('dialog2', (
                        <div>
                            <h2>두 번째 다이얼로그</h2>
                            <Button
                                variant="contained"
                                onClick={() => openDialog('dialog3', (
                                    <div>
                                        <h2>세 번째 다이얼로그</h2>
                                    </div>
                                ), { type: 'alert', title: '마지막 알림' })}
                            >
                                마지막 다이얼로그 열기
                            </Button>
                        </div>
                    ), { type: 'none' })}
                >
                    다음 다이얼로그 열기
                </Button>
            </div>
        ), { type: 'none' });
    };

    return (
        <Stack spacing={2} alignItems="center" sx={{ p: 4 }}>
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
        </Stack>
    );
}; 