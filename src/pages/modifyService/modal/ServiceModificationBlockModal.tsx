import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@components/Button';
import { styles } from './ServiceModificationBlockModal.styles';

// 모달 타입을 추가하여 다양한 경우를 처리
export enum ServiceModificationModalType {
  CONFIRM_CHANGE = 'CONFIRM_CHANGE', // 요금제와 부가서비스 모두 변경
  CONFIRM_SERVICE_CHANGE = 'CONFIRM_SERVICE_CHANGE', // 요금제만 변경
  CONFIRM_ADDITIONAL_SERVICES_CHANGE = 'CONFIRM_ADDITIONAL_SERVICES_CHANGE', // 부가서비스만 변경
  TERMINATION_REQUIRED = 'TERMINATION_REQUIRED', // 해지 필요 부가서비스 존재
  ROLLBACK_EXPIRED = 'ROLLBACK_EXPIRED', // 이전 요금제로 되돌리기 만료
  MONTHLY_RESTRICTION = 'MONTHLY_RESTRICTION', // 월 1회 제한으로 인한 불가
  AGE_RESTRICTION = 'AGE_RESTRICTION', // 나이 제한으로 인한 불가
}

interface ServiceModificationModalProps {
  open: boolean;
  type: ServiceModificationModalType;
  serviceName?: string; // 요금제 이름
  additionalServicesCount?: number; // 부가서비스 개수
  onClose: () => void;
  onConfirm?: () => void;
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
  additionalServicesCount,
  onClose,
  onConfirm,
}) => {
  // 모달 타입에 따른 제목 결정
  const getTitle = () => {
    switch (type) {
      case ServiceModificationModalType.CONFIRM_CHANGE:
      case ServiceModificationModalType.CONFIRM_SERVICE_CHANGE:
      case ServiceModificationModalType.CONFIRM_ADDITIONAL_SERVICES_CHANGE:
        return '상품 변경 확인';
      case ServiceModificationModalType.TERMINATION_REQUIRED:
        return '상품 변경 불가 알림';
      case ServiceModificationModalType.ROLLBACK_EXPIRED:
        return '이전 요금제로 되돌리기 불가 알림';
      case ServiceModificationModalType.MONTHLY_RESTRICTION:
        return '월 1회 제한으로 인한 불가 알림';
      case ServiceModificationModalType.AGE_RESTRICTION:
        return '나이 제한으로 인한 불가 알림';
      default:
        return '상품 변경 알림';
    }
  };

  // 모달 타입에 따른 내용 결정
  const getContent = () => {
    switch (type) {
      case ServiceModificationModalType.CONFIRM_CHANGE:
        return `[${serviceName}]요금제, 부가서비스 ${additionalServicesCount}개로 변경하시겠습니까?`;
      case ServiceModificationModalType.CONFIRM_SERVICE_CHANGE:
        return `[${serviceName}]요금제로 변경하시겠습니까?`;
      case ServiceModificationModalType.CONFIRM_ADDITIONAL_SERVICES_CHANGE:
        return `부가서비스 ${additionalServicesCount}개로 변경하시겠습니까?`;
      case ServiceModificationModalType.TERMINATION_REQUIRED:
        return '상품 변경이 불가능합니다. 해지 필요한 부가서비스를 삭제한 후 다시 시도해 주세요.';
      case ServiceModificationModalType.ROLLBACK_EXPIRED:
        return '이전 요금제로 되돌릴 수 없습니다. 요금제를 다시 선택한 후 저장해 주시기 바랍니다.';
      case ServiceModificationModalType.MONTHLY_RESTRICTION:
        return '상품 변경이 불가능합니다. 월 1회 제한으로 인한 불가입니다.';
      case ServiceModificationModalType.AGE_RESTRICTION:
        return '상품 변경이 불가능합니다. 나이 제한으로 인한 불가입니다.';
      default:
        return '';
    }
  };

  // 취소 버튼 표시 여부
  const showCancelButton = [
    ServiceModificationModalType.CONFIRM_CHANGE,
    ServiceModificationModalType.CONFIRM_SERVICE_CHANGE,
    ServiceModificationModalType.CONFIRM_ADDITIONAL_SERVICES_CHANGE,
  ].includes(type);

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
        <Box
          sx={{
            ...styles.modalFooter,
            justifyContent: showCancelButton ? 'space-between' : 'flex-end',
          }}
        >
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
