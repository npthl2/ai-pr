import { Button, Stack } from '@mui/material';
import { NestedDialog } from '@components/NestedDialog';
import { useDialog } from '@hooks/useDialog';

export const Example = () => {
    const { alert, confirm, custom, openDialog } = useDialog();

    const handleOpenAlert = () => {
        alert('저장이 완료되었습니다.', {
            onClose: () => console.log('알림창이 닫혔습니다.')
        });
    };

    const handleOpenConfirm = () => {
        confirm(
            '정말 삭제하시겠습니까?',
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
            <div>
                <h2>커스텀 버튼을 가진 다이얼로그</h2>
                <p>원하는 형태로 버튼을 구성할 수 있습니다.</p>
            </div>,
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
            </Stack>,
            { title: '커스텀 다이얼로그' }
        );
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
                                onClick={() => alert('마지막 알림입니다.', { title: '마지막 알림' })}
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