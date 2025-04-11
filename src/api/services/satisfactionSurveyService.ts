import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';
import {
  SurveyResponseSearchRequestParams,
  SurveyResponseSearchResponse,
  SurveyResponseRequest,
} from '@model/SatisfactionSurvey';

const satisfactionSurveyService = {
  getSurveyResponse(
    data: SurveyResponseSearchRequestParams,
  ): Promise<CommonResponse<SurveyResponseSearchResponse>> {
    const queryString = new URLSearchParams(Object.entries(data)).toString();
    return baseService.get<SurveyResponseSearchResponse>(
      `/adm-be/v1/survey/satisfaction/response?${queryString}`,
    );
  },
  saveSurveyResponse(data: SurveyResponseRequest): Promise<CommonResponse<null>> {
    return baseService.post<null, SurveyResponseRequest>(
      `/adm-be/v1/survey/satisfaction/response`,
      data,
    );
  },
};

export default satisfactionSurveyService;
