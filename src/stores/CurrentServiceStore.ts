import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { AdditionalService } from '@model/modifyService/ModifyServiceModel';

interface ServiceCommon {
  contractId: string;
  serviceId: string;
  serviceName: string;
  serviceType: string;
  serviceValue: number;
  validStartDateTime: string;
  validStartEndTime: string;
}

interface Service extends ServiceCommon {
  additionalService: AdditionalService[];
}

// 초기 서비스 정의
const initialService: Service = {
  contractId: 's100000000',
  serviceId: 'svc_1',
  serviceName: '5G Ultra Plus 요금제',
  serviceType: 'PLAN',
  serviceValue: 130000,
  validStartDateTime: '2025-01-01T00:00:00',
  validStartEndTime: '2025-12-31T23:59:59',
  additionalService: [
    {
      contractId: 's100000000',
      serviceId: 'a_5g_1',
      serviceName: '5G 1 Giga 충전 부가서비스',
      serviceType: 'ADDITIONAL',
      serviceValue: 21000,
      validStartDateTime: '2025-01-01T00:00:00',
      validStartEndTime: '2025-03-31T23:59:59',
    },
    {
      contractId: 's100000000',
      serviceId: 'a_5g_2',
      serviceName: '5G 2 Giga 충전 부가서비스',
      serviceType: 'ADDITIONAL',
      serviceValue: 26000,
      validStartDateTime: '2025-01-01T00:00:00',
      validStartEndTime: '2025-03-31T23:59:59',
    },
  ],
};

interface ServiceState {
  currentService: Service | null;
  setCurrentService: (service: Service) => void;
  clearCurrentService: () => void;
}

const useCurrentServiceStore = create<ServiceState>((set) => ({
  currentService: initialService,
  setCurrentService: (service: Service) => set({ currentService: service }),
  clearCurrentService: () => set({ currentService: null }),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('CurrentService Store', useCurrentServiceStore);
}

export default useCurrentServiceStore;
