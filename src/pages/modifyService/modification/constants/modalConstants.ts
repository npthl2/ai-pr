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
    title: '요금제 변경',
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
      '상품 변경이 불가능합니다. \n해지 필요한 부가서비스를 삭제한 후 다시 시도해 주세요.',
  },
  [ServiceModificationModalType.ROLLBACK_EXPIRED]: {
    title: '이전 요금제로 되돌리기 불가 알림',
    showCancel: false,
    content: () =>
      '이전 요금제로 되돌릴 수 없습니다. \n요금제를 다시 선택한 후 저장해 주시기 바랍니다.',
  },
  [ServiceModificationModalType.MONTHLY_RESTRICTION]: {
    title: '요금제변경 불가 알림',
    showCancel: false,
    content: () =>
      '요금제 변경은 월 1회만 가능합니다. \n현재 당월에는 변경이 불가능하니, 다음 달에 다시 시도해 주세요.',
  },
  [ServiceModificationModalType.AGE_RESTRICTION]: {
    title: '요금제 변경 불가 알림',
    showCancel: false,
    content: () => '해당 요금제는 연령 제한으로 가입이용 불가능 합니다. \n다른 요금제를 선택해주세요.',
  },
  [ServiceModificationModalType.SERVICE_CHANGE]: {
    title: '요금제 변경',
    showCancel: true,
    content: (props) => `[${props.serviceName}]로 요금제 변경 처리하시겠습니까?`,
  },
} as const;

// 모달 우선순위 정의
export const MODAL_PRIORITY = [
  ServiceModificationModalType.TERMINATION_REQUIRED,
  ServiceModificationModalType.ROLLBACK_EXPIRED,
  ServiceModificationModalType.MONTHLY_RESTRICTION,
  ServiceModificationModalType.AGE_RESTRICTION,
  ServiceModificationModalType.CONFIRM_CHANGE,
  ServiceModificationModalType.CONFIRM_SERVICE_CHANGE,
  ServiceModificationModalType.CONFIRM_ADDITIONAL_SERVICES_CHANGE,
  ServiceModificationModalType.SERVICE_CHANGE,
];

// 모달 표시 조건 정의
export interface ModalConditionInputs {
  hasTerminationRequiredServices: boolean;
  isRollbackExpired: boolean;
  hasServiceChange: boolean;
  hasAdditionalServicesChange: boolean;
}

// 모달 타입별 표시 조건 함수
export const MODAL_CONDITIONS: Record<
  ServiceModificationModalType,
  (inputs: ModalConditionInputs) => boolean
> = {
  [ServiceModificationModalType.TERMINATION_REQUIRED]: (inputs) =>
    inputs.hasTerminationRequiredServices,
  [ServiceModificationModalType.ROLLBACK_EXPIRED]: (inputs) => inputs.isRollbackExpired,
  [ServiceModificationModalType.CONFIRM_CHANGE]: (inputs) =>
    inputs.hasServiceChange && inputs.hasAdditionalServicesChange,
  [ServiceModificationModalType.CONFIRM_SERVICE_CHANGE]: (inputs) =>
    inputs.hasServiceChange && !inputs.hasAdditionalServicesChange,
  [ServiceModificationModalType.CONFIRM_ADDITIONAL_SERVICES_CHANGE]: (inputs) =>
    !inputs.hasServiceChange && inputs.hasAdditionalServicesChange,
  [ServiceModificationModalType.MONTHLY_RESTRICTION]: () => false, // 현재 ServiceModify.tsx에서 사용되지 않음
  [ServiceModificationModalType.AGE_RESTRICTION]: () => false, // 현재 ServiceModify.tsx에서 사용되지 않음
  [ServiceModificationModalType.SERVICE_CHANGE]: () => false, // 다른 컴포넌트에서 사용됨
};
