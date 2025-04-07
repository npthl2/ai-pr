import Dialog from '@components/Dialog';
import { DialogImageContainer, PromotionDialogContent } from './PromotionDialog.styled';

interface PromotionDialogProps {
  open: boolean;
  onClose: () => void;
}

const PromotionDialog = ({ open, onClose }: PromotionDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title='프로모션 상세보기'
      size='medium-large'
      content={
        <PromotionDialogContent>
          <DialogImageContainer>
            <img src='/images/promotion.png' alt='프로모션 상세 이미지' />
          </DialogImageContainer>
        </PromotionDialogContent>
      }
      closeLabel='확인'
      sx={{
        '& .MuiDialog-paper': {
          width: '882px',
        },
      }}
      disablePortal={false}
    />
  );
};

export default PromotionDialog;
