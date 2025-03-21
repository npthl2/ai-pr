// src/model/modifyService/ModifyServiceModel.ts
/**
 * 요금제 변경 관련 모델 정의
 * 요금제 변경 가능 여부 확인, 요금제 변경 요청 및 응답 관련 인터페이스를 포함합니다.
 */

/**
 * 요금제 변경 가능 여부 확인 응답 인터페이스
 * 
 * @property isModifiable - 요금제 변경 가능 여부 (true: 변경 가능, false: 변경 불가)
 * @property message - 요금제 변경 불가 시 표시할 메시지
 * @property blockReason - 요금제 변경 불가 사유 코드
 * @property modifiedDate - 이미 변경한 경우, 변경 일자 (yyyy-MM-dd 형식)
 * @property isChangedToday - 당일 요금제 변경 여부
 */
export interface ServiceModifiableResponse {
  isModifiable: boolean;
  message?: string;
  blockReason?: 'ALREADY_MODIFIED' | 'PAYMENT_OVERDUE' | 'SERVICE_BLOCKED' | 'OTHER';
  modifiedDate?: string; // 이미 변경한 경우, 변경 일자
  isChangedToday: boolean;
}

/**
 * 요금제 변경 요청 인터페이스
 * 
 * @property contractId - 계약 ID
 * @property newServiceId - 변경할 새 요금제 ID
 * @property additionalServiceIds - 변경할 부가서비스 ID 목록
 */
export interface ServiceModificationRequest {
  contractId: string;
  newServiceId: string;
  additionalServiceIds: string[];
}

/**
 * 요금제 변경 응답 인터페이스
 * 
 * @property modificationId - 요금제 변경 이력 ID
 * @property modificationDate - 요금제 변경 일자 (yyyy-MM-dd HH:mm:ss 형식)
 * @property status - 요금제 변경 상태 (COMPLETED: 완료, PENDING: 처리중, FAILED: 실패)
 */
export interface ServiceModificationResponse {
  modificationId: string;
  modificationDate: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

/**
 * 백엔드 공통 응답 구조
 * 
 * @property successOrNot - 성공 여부 (Y/N)
 * @property statusCode - 상태 코드
 * @property data - 응답 데이터
 */
export interface BackendResponse<T> {
  successOrNot: string;
  statusCode: string;
  data: T;
}