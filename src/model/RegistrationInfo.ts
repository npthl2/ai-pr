export interface RegistrationInfoModel {
    customerId: string;
    contractId: string;
    invoiceId: string;
    deviceId: string;
    salesId: string;
    createdAt: string;
  }
  
  export interface OutboxModel {
    eventId: string;
    eventType: string;
    payload: RegistrationInfoModel;
    createdAt: string;
  }
  
  export interface RegistrationRequest {
    registrationInfo: RegistrationInfoModel;
    outbox: OutboxModel;
  }
  