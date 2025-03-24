import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@components/Button';
import { styles } from './ServiceModificationBlockModal.styles';

// 모달 타입을 추가하여 다양한 경우를 처리
export enum ServiceModificationModalType {
  CONFIRM_CHANGE = 'CONFIRM_CHANGE',      // 요금제 변경 확인 (첫 번째 이미지)
  AGE_RESTRICTION = 'AGE_RESTRICTION',    // 나이 제한으로 인한 불가 (두 번째 이미지)
  MONTHLY_RESTRICTION = 'MONTHLY_RESTRICTION' // 월 1회 제한으로 인한 불가 (세 번째 이미지)
}

interface ServiceModificationModalProps {
  open: boolean;
  type: ServiceModificationModalType;
  serviceName?: string;        // 요금제 이름 (CONFIRM_CHANGE 타입에서 사용)
  message?: string;            // 커스텀 메시지 (필요한 경우)
  onClose: () => void;
  onConfirm?: () => void;      // 확인 버튼 클릭 핸들러 (CONFIRM_CHANGE 타입에서 사용)
}

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
  message,
  onClose,
  onConfirm,
}) => {
  // 모달 타입에 따른 제목 결정
  const getTitle = () => {
    switch (type) {
      case ServiceModificationModalType.CONFIRM_CHANGE:
        return '요금제 변경';
      case ServiceModificationModalType.AGE_RESTRICTION:
        return '요금제 변경 불가 알림';
      case ServiceModificationModalType.MONTHLY_RESTRICTION:
        return '요금제변경 불가 알림';
      default:
        return '요금제 변경 알림';
    }
  };

  // 모달 타입에 따른 내용 결정
  const getContent = () => {
    switch (type) {
      case ServiceModificationModalType.CONFIRM_CHANGE:
        return `[${serviceName}]로 요금제 변경 처리하시겠습니까?`;
      case ServiceModificationModalType.AGE_RESTRICTION:
        return message || '해당 요금제는 연령 제한으로 가입이용 불가능합니다.\n다른 요금제를 선택해 주세요.';
      case ServiceModificationModalType.MONTHLY_RESTRICTION:
        return message || '요금제 변경은 월 1회만 가능합니다.\n현재 당월에는 변경이 불가하니, 다음 달에 다시 시도해 주세요.';
      default:
        return message || '';
    }
  };

  // 취소 버튼 표시 여부
  const showCancelButton = type === ServiceModificationModalType.CONFIRM_CHANGE;

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
            {getTitle()}
          </Typography>
          <IconButton onClick={onClose} size='small' sx={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* 모달 컨텐츠 */}
        <Box sx={{ ...styles.contentContainer, justifyContent: 'flex-start' }}>
          <Typography sx={{ ...styles.messageText, whiteSpace: 'pre-line', textAlign: 'center' }}>
            {getContent()}
          </Typography>
        </Box>

        {/* 모달 푸터 */}
        <Box sx={{ 
          ...styles.modalFooter, 
          justifyContent: showCancelButton ? 'space-between' : 'flex-end' 
        }}>
          {showCancelButton && (
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
            onClick={type === ServiceModificationModalType.CONFIRM_CHANGE ? onConfirm : onClose}
            size='medium'
            data-testid='service-modification-confirm-button'
          >
            확인
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ServiceModificationModal;
