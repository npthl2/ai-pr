export interface SurveyResponseSearchRequestParams {
  year: number;
  month: number;
}

export interface SurveyResponseSearchResponse {
  hasResponseYn: 'Y' | 'N';
  totalResponses: number;
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
    ['hasResponseYn', 'totalResponses'].every((key) => key in value)
  );
}
