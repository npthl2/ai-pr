import { EmailSendRequest, EmailSendResponse } from '@model/Email';
import baseService from './baseService';
import { CommonResponse } from '@model/common/CommonResponse';

const emailService = {
  // 이메일 발송 이력 저장 API
  sendEmail(data: EmailSendRequest): Promise<CommonResponse<EmailSendResponse>> {
    // 개발 단계에서는 실제 API 호출 대신 임시 응답 반환
    // if (process.env.NODE_ENV === 'development') {
    //   const mockResponse: CommonResponse<EmailSendResponse> = {
    //     successOrNot: 'Y',
    //     statusCode: CommonStatus.SUCCESS,
    //     data: {
    //       emailHistoryId: 'EMAIL_' + new Date().getTime(),
    //       sentTimestamp: new Date().toISOString()
    //     }
    //   };
    //   return Promise.resolve(mockResponse);
    // }
    
    return baseService.post<EmailSendResponse, EmailSendRequest>('/adm-be/v1/email', data);
  },
};

export default emailService; 