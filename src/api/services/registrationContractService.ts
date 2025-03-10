import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';

// Response Types
export interface PhoneNumberAvailabilityResponse {
  statusCode: string;
  phoneNumber: string;
  claimedCustomerId: string;
  phoneNumberProvider: string;
  lastUpdateStatusDatetime: string;
  lastUpdateStatueMemberId: string;
}

export interface DeviceModelResponse {
  deviceModelId: string;
  deviceModelName: string;
  deviceType: string;
  sellingPrice: number;
}

export interface ServiceResponse {
  serviceId: string;
  serviceName: string;
  serviceType: string;
  serviceValueType: string;
  serviceValue: string;
  exclusiveServiceIds: string[];
  validStartDateTime: string;
  validEndDateTime: string;
}

// export interface AdditionalServiceResponse extends ServiceResponse {
//   excludeServiceIds: string[];
// }

// Request Types
export interface ClaimPhoneNumberRequest {
  phoneNumber: string;
  customerId: string;
}

const registrationContractService = {
  /**
   * 사용 가능한 전화번호 조회
   * @path GET /phone-numbers/availability
   * @param endPhoneNumber - 끝자리 번호
   * @param customerId - 고객 ID
   * @returns 전화번호 가용성 정보
   */
  async getAvailablePhoneNumber(
    endPhoneNumber: string,
    customerId: string,
  ): Promise<PhoneNumberAvailabilityResponse> {
    const response = await baseService.get<PhoneNumberAvailabilityResponse>(
      `/phone-numbers/availability?endPhoneNumber=${endPhoneNumber}&customerId=${customerId}`,
    );
    return response.data as PhoneNumberAvailabilityResponse;
  },

  /**
   * 전화번호 할당 요청
   * @path POST /phone-numbers/availability
   * @param data - 전화번호 할당 요청 정보
   * @returns void
   */
  claimAvailablePhoneNumber(data: ClaimPhoneNumberRequest): Promise<CommonResponse<void>> {
    return baseService.post<void, ClaimPhoneNumberRequest>(
      `/phone-numbers/${data.phoneNumber}/claim`,
      data,
    );
  },

  /**
   * IMEI로 단말기 모델 조회
   * @path GET /device-models
   * @param imei - IMEI 번호
   * @returns 단말기 모델 정보
   */
  async getDeviceModelByIMEI(imei: string): Promise<DeviceModelResponse> {
    const response = await baseService.get<DeviceModelResponse>(
      `/device-inventories/${imei}/device-model`,
    );
    return response.data as DeviceModelResponse;
  },

  /**
   * 서비스 목록 조회
   * @path GET /services
   * @returns 서비스 목록
   */
  getServices(): Promise<CommonResponse<ServiceResponse[]>> {
    return baseService.get<ServiceResponse[]>('/services');
  },

  /**
   * 부가 서비스 목록 조회
   * @path GET /additional-services
   * @returns 부가 서비스 목록
   */
  getAdditionalServices(): Promise<CommonResponse<ServiceResponse[]>> {
    return baseService.get<ServiceResponse[]>('/additional-services');
  },
};

export default registrationContractService;
