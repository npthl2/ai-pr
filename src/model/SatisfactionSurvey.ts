export interface SurveyResponseSearchRequestParams {
  year: number;
  month: number;
}

export interface SurveyResponseSearchResponse {
  alreadyRespondedYn: 'Y' | 'N';
  totalResponseCount: number;
}

export interface SurveyResponseRequest {
  score: number;
  comment: string;
}

export function isSurveyResponseSearchResponse(
  value: unknown,
): value is SurveyResponseSearchResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    ['alreadyRespondedYn', 'totalResponseCount'].every((key) => key in value)
  );
}
