import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { Service, AdditionalService } from '@api/queries/modifyService/useModifyServiceQuery';

export interface ModifyServiceState {
  // 선택된 서비스 (요금제)
  selectedService: Service | null;
  // 선택된 부가서비스 목록
  selectedAdditionalServices: AdditionalService[];

  // 액션
  setSelectedService: (service: Service | null) => void;
  addAdditionalService: (service: AdditionalService) => void;
  removeAdditionalService: (serviceId: string) => void;
  clearAdditionalServices: () => void;
  resetAll: () => void;

  // 계산된 값
  getTotalPrice: () => number;
}

const useModifyServiceStore = create<ModifyServiceState>((set, get) => ({
  // 초기 상태
  selectedService: null,
  selectedAdditionalServices: [],

  // 액션
  setSelectedService: (service) => {
    set({ selectedService: service });
  },

  addAdditionalService: (service) => {
    // 이미 선택된 서비스인지 확인
    const exists = get().selectedAdditionalServices.some(
      (item) => item.serviceId === service.serviceId,
    );

    // 선택되지 않은 경우에만 추가
    if (!exists) {
      set((state) => ({
        selectedAdditionalServices: [...state.selectedAdditionalServices, service],
      }));
    }
  },

  removeAdditionalService: (serviceId) => {
    set((state) => ({
      selectedAdditionalServices: state.selectedAdditionalServices.filter(
        (service) => service.serviceId !== serviceId,
      ),
    }));
  },

  clearAdditionalServices: () => {
    set({ selectedAdditionalServices: [] });
  },

  resetAll: () => {
    set({
      selectedService: null,
      selectedAdditionalServices: [],
    });
  },

  // 계산된 값
  getTotalPrice: () => {
    const mainServicePrice = get().selectedService?.serviceValue || 0;
    const additionalServicesPrice = get().selectedAdditionalServices.reduce(
      (total, service) => total + service.serviceValue,
      0,
    );

    return mainServicePrice + additionalServicesPrice;
  },
}));

// 개발 환경에서만 디버깅 도구 연결
if (import.meta.env.DEV) {
  mountStoreDevtool('ModifyService Store', useModifyServiceStore);
}

export default useModifyServiceStore;
