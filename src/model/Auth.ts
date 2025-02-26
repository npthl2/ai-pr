import { CommonResponse } from './common/CommonResponse';

export interface LoginRequestParams {
  memberId: string;
  password: string;
}

export interface User {
  memberId: string | null;
  memberGroup: string;
  classOfPosition: string;
  auth?: MemberAuth;
}
// 단일 권한 정보를 나타내는 인터페이스
export interface Permission {
  member_id: string;   // 사용자 ID, 최대 길이 20
  right_id: number;    // 권한 ID
  rights_name: string; // 권한 이름, 최대 길이 50 (예: 전화번호 검색, 마스킹 해제)
}

// 사용자의 권한 정보를 배열로 관리하는 타입
export type MemberAuth = Permission[];

export interface GetUserResponse extends CommonResponse<User> {}
export interface LogoutResponse extends CommonResponse<void> {}
