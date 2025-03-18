export interface PhoneNumber {
  id: number;
  statusCode: string;
  phoneNumber: string;
  phoneNumberProvider: string;
  lastUpdateStatusDatetime: string;
}

export interface Service {
  serviceId: string;
  serviceName: string;
  serviceValueType: string;
  serviceValue: number;
}

export interface AdditionalService extends Service {
  exclusiveServiceIds: string[];
}
