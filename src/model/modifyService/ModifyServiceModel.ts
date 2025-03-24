// src/model/modifyService/ModifyServiceModel.ts
/**
 * 요금제 변경 관련 모델 정의
 * 요금제 변경 가능 여부 확인, 요금제 변경 요청 및 응답 관련 인터페이스를 포함합니다.
 */

/**
 * 요금제 변경 가능 여부 확인 응답 인터페이스
 *
 * @property isModifiable - 요금제 변경 가능 여부 (true: 변경 가능, false: 변경 불가)
 * @property isChangedToday - 당일 요금제 변경 여부
 */
export interface ServiceModifiableResponse {
  isModifiable: boolean;
  isChangedToday: boolean;
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
