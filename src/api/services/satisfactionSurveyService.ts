import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';
import {
  SurveyResponseSearchRequestParams,
  SurveyResponseSearchResponse,
  SurveyResponseRequest,
} from '@model/SatisfactionSurvey';

const satisfactionSurveyService = {
  getSurveyResponse(
    memberId: string,
    data: SurveyResponseSearchRequestParams,
  ): Promise<CommonResponse<SurveyResponseSearchResponse>> {
    const queryString = new URLSearchParams(Object.entries(data)).toString();
    return baseService.get<SurveyResponseSearchResponse>(
      `/adm-be/v1/survey/satisfaction/${memberId}/response?${queryString}`,
    );
  },
  saveSurveyResponse(memberId: string, data: SurveyResponseRequest): Promise<CommonResponse<null>> {
    return baseService.post<null, SurveyResponseRequest>(
      `/adm-be/v1/survey/satisfaction/${memberId}/response`,
      data,
    );
  },
};

export default satisfactionSurveyService;
