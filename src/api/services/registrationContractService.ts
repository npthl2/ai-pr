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
  deviceModelNameAlias: string;
  deviceType: string;
  sellingPrice: number;
}

const initialDeviceModel: DeviceModelResponse = {
  deviceModelId: '',
  deviceModelName: '',
  deviceModelNameAlias: '',
  deviceType: '',
  sellingPrice: 0,
};

export interface ServiceResponse {
  serviceId: string;
  serviceName: string;
  serviceType: string;
  serviceValueType: string;
  serviceValue: string;
  exclusiveServiceIds: string[];
  validStartDatetime: string;
  validEndDatetime: string;
}

export interface ServiceResponseWithAge {
  serviceId: string;
  serviceName: string;
  serviceType: string;
  serviceValueType: string;
  serviceValue: string;
  exclusiveServiceIds: string[];
  validStartDatetime: string;
  validEndDatetime: string;
  availableAgeMin?: number;
  availableAgeMax?: number;
}
// Request Types
export interface ClaimPhoneNumberRequest {
  phoneNumber: string;
  customerId: string;
}

export interface ExclusiveServiceRequest {
  serviceId: string;
  additionalServiceId: string;
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
  ): Promise<PhoneNumberAvailabilityResponse[]> {
    const response = await baseService.get<PhoneNumberAvailabilityResponse[]>(
      `/ctt-be/v1/phone-numbers/availability?endPhoneNumber=${endPhoneNumber}&customerId=${customerId}`,
    );
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }
    return response.data;
  },

  /**
   * 전화번호 할당 요청
   * @path POST /phone-numbers/availability
   * @param data - 전화번호 할당 요청 정보
   * @returns void
   */
  claimAvailablePhoneNumber(data: ClaimPhoneNumberRequest): Promise<CommonResponse<void>> {
    return baseService.put<void, ClaimPhoneNumberRequest>(
      `/ctt-be/v1/phone-numbers/${data.phoneNumber}/claim`,
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
      `/ctt-be/v1/device-inventories/${imei}/device-model`,
    );

    if (!response.data || typeof response.data !== 'object') {
      return initialDeviceModel;
    }
    return response.data;
  },

  /**
   * 서비스 목록 조회
   * @path GET /services
   * @returns 서비스 목록
   */
  getServices(): Promise<CommonResponse<ServiceResponse[]>> {
    return baseService.get<ServiceResponse[]>('/ctt-be/v1/services');
  },

  /**
   * 부가 서비스 목록 조회
   * @path GET /additional-services
   * @returns 부가 서비스 목록
   */
  getAdditionalServices(): Promise<CommonResponse<ServiceResponse[]>> {
    return baseService.get<ServiceResponse[]>('/ctt-be/v1/additional-services');
  },

  /**
   * 부가 서비스 목록 조회(나이 정보 추가)
   * @path GET /additional-services-with-age
   * @returns 부가 서비스 목록
   */
  getAdditionalServicesWithAge(): Promise<CommonResponse<ServiceResponseWithAge[]>> {
    return baseService.get<ServiceResponseWithAge[]>('/ctt-be/v1/additional-services-with-age');
  },

  /**
   * 부가서비스 배타여부 확인
   * @path GET /additional-services
   * @returns 부가서비스 배타여부 확인
   */
  checkExclusiveService(data: ExclusiveServiceRequest): Promise<CommonResponse<boolean>> {
    const queryString = new URLSearchParams(Object.entries(data)).toString();
    return baseService.get<boolean>(`/ctt-be/v1/additional-services/exclusive?${queryString}`);
  },
};

export default registrationContractService;
