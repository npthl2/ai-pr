import { EmailSendRequest, EmailSendResponse } from '@model/Email';
import baseService from './baseService';
import { CommonResponse } from '@model/common/CommonResponse';

const emailService = {
  // 이메일 발송 이력 저장 API
  sendEmail(data: EmailSendRequest): Promise<CommonResponse<EmailSendResponse>> {


    return baseService.post<EmailSendResponse, EmailSendRequest>('/adm-be/v1/email/history', data);
  },
};

export default emailService;
