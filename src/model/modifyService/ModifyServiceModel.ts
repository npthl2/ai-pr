// src/model/modifyService/ModifyServiceModel.ts
/**
 * 요금제 변경 관련 모델 정의
 * 요금제 변경 가능 여부 확인, 요금제 변경 요청 및 응답 관련 인터페이스를 포함합니다.
 */

/**
 * 통합된 부가서비스 타입 - CurrentServiceStore와 ModifyServiceStore에서 공통으로 사용
 *
 * @property serviceId - 서비스 ID
 * @property serviceName - 서비스 명
 * @property serviceValue - 서비스 가격
 * @property serviceType - 서비스 타입 (ADDITIONAL 등)
 * @property serviceValueType - 서비스 가격 타입 (요금 등)
 * @property contractId - 계약 ID
 * @property validStartDateTime - 유효 시작 시간
 * @property validStartEndTime - 유효 종료 시간
 * @property releaseDate - 출시일
 * @property exclusiveServiceIds - 호환되지 않는 서비스 ID 목록
 */
export interface AdditionalService {
  serviceId: string;
  serviceName: string;
  serviceValue: number;
  serviceType?: string;
  serviceValueType?: string;
  contractId?: string;
  validStartDateTime?: string;
  validStartEndTime?: string;
  releaseDate?: string;
  exclusiveServiceIds?: string[];
  availableAgeMin?: string;
  availableAgeMax?: string;
  hasAgeRestriction?: boolean;
  exclusive?: boolean;
}

/**
 * 이전 서비스 정보 인터페이스
 *
 * @property serviceId - 서비스 ID
 * @property serviceName - 서비스 명
 * @property serviceValue - 서비스 가격
 * @property serviceValueType - 서비스 가격 타입
 */
export interface PreviousService {
  serviceId: string;
  serviceName: string;
  serviceValue: number;
  serviceValueType: string;
}

/**
 * 요금제 변경 가능 여부 확인 응답 인터페이스
 *
 * @property isModifiable - 요금제 변경 가능 여부 (true: 변경 가능, false: 변경 불가)
 * @property isRollbackAvailable - 당일 요금제 변경 여부
 * @property previousService - 이전 서비스 정보 (isRollbackAvailable이 true인 경우에만 존재)
 */
export interface ServiceModifiableResponse {
  isModifiable: boolean;
  isRollbackAvailable: boolean;
  previousService: PreviousService | null;
}

/**
 * 요금제 변경 나이 제한 확인 요청 인터페이스
 *
 * @property age - 고객 나이
 * @property serviceId - 변경하려는 서비스 ID
 */
export interface ServiceAgeCheckRequest {
  age: string;
  serviceId: string;
}

/**
 * 요금제 변경 나이 제한 확인 응답 인터페이스
 *
 * @property isAvailable - 요금제 변경 가능 여부 (true: 변경 가능, false: 변경 불가)
 */
export interface ServiceAgeCheckResponse {
  isAvailable: boolean;
}

/**
 * 요금제/부가서비스 변경 요청에 사용되는 서비스 정보
 *
 * @property serviceId - 서비스 ID
 */
export interface ServiceRequest {
  serviceId: string;
  serviceName: string;
  serviceValue: number;
  serviceValueType: string;
}

/**
 * 요금제/부가서비스 변경 요청 인터페이스
 *
 * @property gTrId - 글로벌 트랜잭션 ID
 * @property customerId - 고객 ID
 * @property contractId - 계약 ID
 * @property service - 변경할 요금제 정보
 * @property additionalServices - 부가서비스 목록
 */
export interface ServiceModificationRequest {
  gTrId: string;
  customerId: string;
  contractId: string;
  service?: ServiceRequest | null;
  additionalServices: ServiceRequest[];
}

/**
 * 요금제/부가서비스 변경 응답 인터페이스
 *
 * @property businessProcessId - 비즈니스 프로세스 ID (요청 추적용)
 */
export interface ServiceModificationResponseData {
  businessProcessId: string;
}
