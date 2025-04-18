export interface ServiceItem {
  id: string;
  serviceType: string;
  serviceName: string;
  validStartDatetime: string;
  validEndDatetime: string;
}

export interface PhoneItem {
  id: string;
  phone: string;
  status: string;
  date: string;
  contractId: string;
  children?: ServiceItem[];
}

export interface LobItem {
  id: string;
  lobType: string;
  children: PhoneItem[];
}
