import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@components/Button';
import { styles } from './ServiceModificationBlockModal.styles';
import { ServiceModificationModalType, ServiceModificationModalConfig } from '../constants/modalConstants';

// 모달 타입을 추가하여 다양한 경우를 처리
export interface ServiceModificationModalProps {
  open: boolean;
  type: ServiceModificationModalType;
  serviceName?: string; // 요금제 이름
  additionalServicesCount?: number; // 부가서비스 개수
  onClose: () => void;
  onConfirm?: () => void;
}

interface ModalFooterProps {
  showCancel: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ showCancel, onClose, onConfirm }) => {
  const handleConfirm = () => {
    if (showCancel && onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <Box sx={showCancel ? styles.modalFooterWithCancel : styles.modalFooterWithoutCancel}>
      {showCancel && (
        <Button
          variant='outlined'
          onClick={onClose}
          size='medium'
          data-testid='service-modification-cancel-button'
        >
          취소
        </Button>
      )}
      <Button
        variant='contained'
        onClick={handleConfirm}
        size='medium'
        data-testid='service-modification-confirm-button'
      >
        확인
      </Button>
    </Box>
  );
};

/**
 * 요금제 변경 관련 모달 컴포넌트
 *
 * 요금제 변경과 관련된 다양한 상황(변경 확인, 나이 제한, 월 제한 등)에서 사용되는 모달 컴포넌트입니다.
 * type 속성으로 모달의 종류를 지정하고, 필요한 추가 속성을 전달하여 다양한 상황에 재사용할 수 있습니다.
 */
const ServiceModificationModal: React.FC<ServiceModificationModalProps> = ({
  open,
  type,
  serviceName,
  additionalServicesCount,
  onClose,
  onConfirm,
}) => {
  const modalConfig = ServiceModificationModalConfig[type];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='service-modification-modal-title'
      data-testid='service-modification-modal'
    >
      <Box sx={styles.modalContainer}>
        {/* 모달 헤더 */}
        <Box sx={styles.modalHeader}>
          <Typography variant='h6' component='h2' id='service-modification-modal-title'>
            {modalConfig.title}
          </Typography>
          <IconButton onClick={onClose} size='small' sx={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* 모달 컨텐츠 */}
        <Box sx={styles.contentContainerWithStart}>
          <Typography sx={styles.messageTextWithPreLine}>
            {modalConfig.content({ open, type, serviceName, additionalServicesCount, onClose, onConfirm })}
          </Typography>
        </Box>

        {/* 모달 푸터 */}
        <ModalFooter
          showCancel={modalConfig.showCancel}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      </Box>
    </Modal>
  );
};

export default ServiceModificationModal;
