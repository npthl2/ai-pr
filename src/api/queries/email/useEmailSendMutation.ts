import { useMutation } from '@tanstack/react-query';
import emailService from '@api/services/emailService';
import { EmailSendRequest } from '@model/Email';

export const useEmailSendMutation = () => {
  return useMutation({
    mutationFn: (data: EmailSendRequest) => {
      return emailService.sendEmail(data);
    },
  });
};
