// src/model/modifyService/ModifyServiceModel.ts
/**
 * 요금제 변경 관련 모델 정의
 * 요금제 변경 가능 여부 확인, 요금제 변경 요청 및 응답 관련 인터페이스를 포함합니다.
 */

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
