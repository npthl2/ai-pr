import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

export const AlertContent = () => <div>저장이 완료되었습니다.</div>;

export const ConfirmContent = () => <div>정말 삭제하시겠습니까?</div>;

export const CustomContent = () => (
  <div>
    <h2>커스텀 버튼을 가진 다이얼로그</h2>
    <p>원하는 형태로 버튼을 구성할 수 있습니다.</p>
  </div>
);

export const CustomButtons = () => (
  <Stack direction='row' spacing={1}>
    <Button variant='outlined' color='error'>
      삭제
    </Button>
    <Button variant='outlined' color='warning'>
      수정
    </Button>
    <Button variant='contained' color='primary'>
      저장
    </Button>
  </Stack>
);

interface NestedDialogContentProps {
  onOpenNext: () => void;
}

export const FirstNestedContent = ({ onOpenNext }: NestedDialogContentProps) => (
  <div>
    <h2>첫 번째 다이얼로그</h2>
    <Button variant='contained' onClick={onOpenNext}>
      다음 다이얼로그 열기
    </Button>
  </div>
);

interface SecondNestedContentProps {
  onOpenAlert: () => void;
}

export const SecondNestedContent = ({ onOpenAlert }: SecondNestedContentProps) => (
  <div>
    <h2>두 번째 다이얼로그</h2>
    <Button variant='contained' onClick={onOpenAlert}>
      마지막 다이얼로그 열기
    </Button>
  </div>
);
