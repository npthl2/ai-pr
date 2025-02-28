import { UnmaskingRequestDto, UnmaskingResponseDto } from '@model/Unmasking';
import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';

const unmaskingService = {
  unmasking(data: UnmaskingRequestDto): Promise<CommonResponse<UnmaskingResponseDto>> {
    return baseService.post<UnmaskingResponseDto, UnmaskingRequestDto>('/adm-be/v1/unmasking', data);
  }
}
export default unmaskingService;