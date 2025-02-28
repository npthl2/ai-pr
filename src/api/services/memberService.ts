// // src/api/queries/memberService.ts
// import baseService from './baseService';
// import { CommonResponse } from '@model/common/CommonResponse';
// import { MemberAuth } from '@model/Auth'; // MemberAuth 타입은 사용자 권한 정보를 정의

// const memberService = {
//   getMemberAuth(memberId: string): Promise<CommonResponse<MemberAuth>> {
//     return baseService.get<MemberAuth>(`/v1/member/auth/${memberId}`);
//   },
// };

// export default memberService;
