import { REGISTRATION_STATUS } from './RegistrationConstants';

export const STATUS_MESSAGES = {
  REGISTRATION: {
    [REGISTRATION_STATUS.PENDING]: '{customerName} 고객님의 가입이 처리중입니다.',
    [REGISTRATION_STATUS.COMPLETED]: '{customerName} 고객님의 가입이 처리 완료되었습니다.',
    [REGISTRATION_STATUS.FAILED]: '{customerName} 고객님의 가입을 실패하였습니다.',
  },
  MODIFICATION: {
    [REGISTRATION_STATUS.PENDING]: '{customerName} 고객님의 변경 요청이 처리중입니다.',
    [REGISTRATION_STATUS.COMPLETED]: '{customerName} 고객님의 변경 요청이 처리 완료되었습니다.',
    [REGISTRATION_STATUS.FAILED]: '{customerName} 고객님의 변경 요청을 실패하였습니다.',
  },
};