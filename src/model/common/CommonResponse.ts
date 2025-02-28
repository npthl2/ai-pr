export enum CommonConstants {
  SESSION_NAME = 'SESSION_NAME', // 성공
  YES_FLAG = 'Y', // 예
  NO_FLAG = 'N', // 아니오
  NA = 'NA', // 미지정
}

export enum CommonStatus {
  SUCCESS = 'SUCCESS', // 성공
  FAIL = 'FAIL', // 실패
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR', // 서버 오류
  MANDATORY_PARAM_ERR = 'MANDATORY_PARAM_ERR', // 필수 파라미터 오류
  XSS_FORBIDDEN_STRING = 'XSS_FORBIDDEN_STRING', // XSS 금지 문자열 포함
  FORBIDDEN = 'FORBIDDEN', // 권한 오류
  DUPLICATE_KEY = 'DUPLICATE_KEY', // 중복 키
}

export interface CommonResponse<T> {
  successOrNot: string;
  statusCode: CommonStatus;
  data: T | string | null;
}
