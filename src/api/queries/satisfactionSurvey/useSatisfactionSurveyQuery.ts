import satisfactionSurveyService from '@api/services/satisfactionSurveyService';
import { CommonResponse } from '@model/common/CommonResponse';
import {
  SurveyResponseSearchResponse,
  SurveyResponseSearchRequestParams,
  isSurveyResponseSearchResponse,
} from '@model/SatisfactionSurvey';
import { useReactQuery } from '@hooks/useReactQuery';

export const useSatisfactionSurveyResponseQuery = (
  memberId: string,
  data: SurveyResponseSearchRequestParams,
) => {
  return useReactQuery({
    queryKey: ['satisfactionSurvey', memberId],
    queryFn: () => satisfactionSurveyService.getSurveyResponse(memberId, data),
    select: (data: CommonResponse<SurveyResponseSearchResponse>) => {
      if (isSurveyResponseSearchResponse(data.data)) {
        return data.data;
      }
      return null;
    },
  });
};
