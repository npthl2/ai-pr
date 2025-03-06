import { Dialog, DialogTitle, IconButton, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DialogStyled = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== 'isTopmost',
})<{ isTopmost: boolean }>(({ theme, isTopmost }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: isTopmost ? 'block' : 'none',
    transition: 'none',
  },
  '& .MuiDialog-paper': {
    transition: 'none',
    backgroundColor: theme.palette.background.paper,
    backgroundImage: 'none',
  },
  '& .MuiDialogTitle-root, & .MuiDialogContent-root': {
    backgroundColor: 'inherit',
    color: theme.palette.text.primary,
  },
}));

export const DialogTitleStyled = styled(DialogTitle)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 48px',
  margin: 0,
});

export const DialogContentStyled = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column', // 세로 방향 정렬
  justifyContent: 'center', // 위아래 균등한 간격 유지
  padding: '32px 32px', // 위아래 간격을 늘려 균등한 여백 확보
  flexGrow: 1, // ✅ 부모 컨테이너가 남는 공간을 차지하도록 설정
});

export const DialogContentWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column', // 세로 방향 정렬
  justifyContent: 'center', // 위아래 균등한 간격 유지
  padding: '32px', // 위아래 간격을 늘려 균등한 여백 확보
  minHeight: '120px', // ✅ 최소 높이 지정하여 위아래 균등한 공백 확보
  flexGrow: 1, // ✅ 부모 컨테이너가 남는 공간을 차지하도록 설정
});

export const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: 8,
  top: 8,
});

export const DialogActionsStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  // borderTop: `1px solid ${theme.palette.divider}`,
}));
