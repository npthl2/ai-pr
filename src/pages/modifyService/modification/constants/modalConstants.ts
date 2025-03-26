import { ServiceModificationModalProps } from '../components/ServiceModificationBlockModal';

export enum ServiceModificationModalType {
  CONFIRM_CHANGE = 'CONFIRM_CHANGE', // 요금제와 부가서비스 모두 변경
  CONFIRM_SERVICE_CHANGE = 'CONFIRM_SERVICE_CHANGE', // 요금제만 변경
  CONFIRM_ADDITIONAL_SERVICES_CHANGE = 'CONFIRM_ADDITIONAL_SERVICES_CHANGE', // 부가서비스만 변경
  TERMINATION_REQUIRED = 'TERMINATION_REQUIRED', // 해지 필요 부가서비스 존재
  ROLLBACK_EXPIRED = 'ROLLBACK_EXPIRED', // 이전 요금제로 되돌리기 만료
  MONTHLY_RESTRICTION = 'MONTHLY_RESTRICTION', // 월 1회 제한으로 인한 불가
  AGE_RESTRICTION = 'AGE_RESTRICTION', // 나이 제한으로 인한 불가
  SERVICE_CHANGE = 'SERVICE_CHANGE', // 요금제 변경 (ModifiedServiceSelect에서 사용)
}

interface ModalConfig {
  title: string;
  showCancel: boolean;
  content: (props: ServiceModificationModalProps) => string;
}

export const ServiceModificationModalConfig: Record<ServiceModificationModalType, ModalConfig> = {
  [ServiceModificationModalType.CONFIRM_CHANGE]: {
    title: '상품 변경 확인',
    showCancel: true,
    content: (props) =>
      `[${props.serviceName}]요금제, 부가서비스 ${props.additionalServicesCount}개로 변경하시겠습니까?`,
  },
  [ServiceModificationModalType.CONFIRM_SERVICE_CHANGE]: {
    title: '상품 변경 확인',
    showCancel: true,
    content: (props) => `[${props.serviceName}]요금제로 변경하시겠습니까?`,
  },
  [ServiceModificationModalType.CONFIRM_ADDITIONAL_SERVICES_CHANGE]: {
    title: '상품 변경 확인',
    showCancel: true,
    content: (props) => `부가서비스 ${props.additionalServicesCount}개로 변경하시겠습니까?`,
  },
  [ServiceModificationModalType.TERMINATION_REQUIRED]: {
    title: '상품 변경 불가 알림',
    showCancel: false,
    content: () =>
      '상품 변경이 불가능합니다. 해지 필요한 부가서비스를 삭제한 후 다시 시도해 주세요.',
  },
  [ServiceModificationModalType.ROLLBACK_EXPIRED]: {
    title: '이전 요금제로 되돌리기 불가 알림',
    showCancel: false,
    content: () =>
      '이전 요금제로 되돌릴 수 없습니다. 요금제를 다시 선택한 후 저장해 주시기 바랍니다.',
  },
  [ServiceModificationModalType.MONTHLY_RESTRICTION]: {
    title: '월 1회 제한으로 인한 불가 알림',
    showCancel: false,
    content: () => '상품 변경이 불가능합니다. 월 1회 제한으로 인한 불가입니다.',
  },
  [ServiceModificationModalType.AGE_RESTRICTION]: {
    title: '나이 제한으로 인한 불가 알림',
    showCancel: false,
    content: () => '상품 변경이 불가능합니다. 나이 제한으로 인한 불가입니다.',
  },
  [ServiceModificationModalType.SERVICE_CHANGE]: {
    title: '상품 변경 확인',
    showCancel: true,
    content: (props) => `[${props.serviceName}] 요금제로 변경하시겠습니까?`,
  },
} as const;
