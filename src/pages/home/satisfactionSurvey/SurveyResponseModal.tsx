import Dialog from '@components/Dialog';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Textarea, PrimaryTypography } from './SurveyResponseModal.styled';
import Rating from './Rating';
import { useSatisfactionSurveyResponseMutation } from '@api/queries/satisfactionSurvey/useSatisfactionSurveyMutation';
import useMemberStore from '@stores/MemberStore';
import { useQueryClient } from '@tanstack/react-query';
interface SurveyResponseModalProps {
  open: boolean;
  onClose: () => void;
}

export const SurveyResponseModal = ({ open, onClose }: SurveyResponseModalProps) => {
  const memberId = useMemberStore((state) => state.memberInfo?.memberId) ?? '';
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const saveSurveyResponseMutation = useSatisfactionSurveyResponseMutation();
  const queryClient = useQueryClient();

  const initializeFormData = () => {
    setContent('');
    setRating(0);
  };

  const handleConfirm = () => {
    saveSurveyResponseMutation.mutate(
      { score: rating, comment: content },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['satisfactionSurvey', memberId] });
          initializeFormData();
          onClose();
        },
      },
    );
  };

  const handleClose = () => {
    initializeFormData();
    onClose();
  };

  return (
    <Dialog
      size='small'
      title='시스템 만족도 평가(최대 54자)'
      content={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <PrimaryTypography variant='body1'>시스템 사용이 만족스러웠나요?</PrimaryTypography>
          <Rating value={rating} max={5} onChange={(value) => setRating(value)} />
          <Textarea
            minRows={2}
            maxRows={2}
            maxLength={54}
            placeholder='구체적인 의견을 남겨주시면 꼼꼼히 읽고 서비스 개선에 참고할게요.'
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            data-testid='satisfaction-survey-comment'
          />
        </Box>
      }
      open={open}
      confirmLabel='평가완료'
      onClose={handleClose}
      onConfirm={handleConfirm}
      isConfirmDisabled={rating === 0 || content.length === 0}
      data-testid='satisfaction-survey-modal'
    />
  );
};
