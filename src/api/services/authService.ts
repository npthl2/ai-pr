import { User } from '@model/Auth';
import { CommonResponse, CommonStatus } from '@model/common/CommonResponse';

const authService = {
  login(): Promise<CommonResponse<User>> {
    // return baseService.post<User, LoginRequestParams>('/api/v1/session', data);
    const user: CommonResponse<User> = {
      successOrNot: 'Y',
      data: {
        emailAddress: 'admin@kt.com',
        memberId: 1,
        sessionId: '1234',
        memberName: '이명진',
      },
      status: CommonStatus.SUCCESS,
    };
    return Promise.resolve(user);
  },
};

export default authService;
