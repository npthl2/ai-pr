import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@components/Button';
import { styles } from './ServiceModificationBlockModal.styles';

interface ServiceModificationBlockModalProps {
  open: boolean;
  message?: string;
  isChangedToday?: boolean;
  onClose: () => void;
}

/**
 * 요금제 변경 불가 알림 모달 컴포넌트
 *
 * 요금제 변경이 불가능한 경우 사유를 표시하고 확인 버튼을 제공합니다.
 * 당월 요금제 변경 이력이 있는 경우 등 변경이 불가능한 상황에서 표시됩니다.
 *
 * @param open - 모달 표시 여부
 * @param message - 표시할 메시지 내용 (기본값이 있으며 선택적 prop)
 * @param isChangedToday - 당일 변경 여부 (메시지 결정에 사용)
 * @param onClose - 모달 닫기 핸들러
 */
const ServiceModificationBlockModal: React.FC<ServiceModificationBlockModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='service-modification-block-modal-title'
      data-testid='service-modification-block-modal'
    >
      <Box sx={styles.modalContainer}>
        {/* 모달 헤더 */}
        <Box sx={styles.modalHeader}>
          <Typography variant='h6' component='h2' id='service-modification-block-modal-title'>
            요금제변경 불가 알림
          </Typography>
          <IconButton onClick={onClose} size='small' sx={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* 모달 컨텐츠 */}
        <Box sx={{ ...styles.contentContainer, justifyContent: 'flex-start' }}>
          <Typography sx={{ ...styles.messageText, whiteSpace: 'pre-line', textAlign: 'left' }}>
            {
              '요금제 변경은 월 1회만 가능합니다.\n현재 당월에는 변경이 불가하니, 다음 달에 다시 시도해 주세요.'
            }
          </Typography>
        </Box>

        {/* 모달 푸터 */}
        <Box sx={{ ...styles.modalFooter, justifyContent: 'flex-end' }}>
          <Button
            variant='contained'
            onClick={onClose}
            size='medium'
            data-testid='service-modification-block-confirm-button'
          >
            확인
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ServiceModificationBlockModal;
