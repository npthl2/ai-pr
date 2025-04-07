import satisfactionSurveyService from '@api/services/satisfactionSurveyService';
import { SurveyResponseRequest } from '@model/SatisfactionSurvey';
import { useReactMutation } from '@hooks/useReactQuery';

export const useSatisfactionSurveyResponseMutation = (memberId: string) => {
  return useReactMutation({
    mutationFn: (data: SurveyResponseRequest) =>
      satisfactionSurveyService.saveSurveyResponse(memberId, data),
  });
};
