import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { AdditionalService } from '@model/modifyService/ModifyServiceModel';

interface ServiceCommon {
  contractId: string;
  serviceId: string;
  serviceName: string;
  serviceType: string;
  serviceValue: number;
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
  additionalService: [
    {
      contractId: 's100000000',
      serviceId: 'a_5g_1',
      serviceName: '5G 1 Giga 충전 부가서비스',
      serviceType: 'ADDITIONAL',
      serviceValue: 21000,
      availableAgeMin: undefined,
      availableAgeMax: undefined,
    },
    {
      contractId: 's100000000',
      serviceId: 'a_5g_2',
      serviceName: '5G 2 Giga 충전 부가서비스',
      serviceType: 'ADDITIONAL',
      serviceValue: 26000,
      availableAgeMin: '13',
      availableAgeMax: '18',
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
