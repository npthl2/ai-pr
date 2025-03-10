export interface PhoneNumber {
  id: number;
  status: string;
  phoneNumber: string;
  provider: string;
  expirationDate: string;
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
