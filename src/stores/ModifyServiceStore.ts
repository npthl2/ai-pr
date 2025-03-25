import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { Service } from '@api/queries/modifyService/useModifyServiceQuery';
import { AdditionalService } from '@model/modifyService/ModifyServiceModel';

export interface ModifyServiceState {
  // 선택된 서비스 (요금제)
  selectedService: Service | null;
  // 선택된 부가서비스 목록
  selectedAdditionalServices: AdditionalService[];
  // 유지할 현재 부가서비스 목록 (현재 가입중인 서비스 중 유지할 것들)
  currentAdditionalServices: AdditionalService[];
  // 제거된 현재 부가서비스 목록 (현재 가입중인 서비스 중 제거할 것들)
  removedCurrentAdditionalServices: AdditionalService[];
  // 요금제 변경 가능 여부
  isServiceModifiable: boolean;
  // 이전 요금제 정보 (되돌리기용)
  previousService: Service | null;
  // 당일 요금제 변경 여부
  isRollbackAvailable: boolean;
  // 나이 제한으로 인해 제거해야 하는 서비스가 있는지 여부
  hasAgeRestrictedServices: boolean;
  // ServiceModification 컴포넌트가 마운트되었는지 여부
  serviceModificationMounted: boolean;

  // 액션
  setSelectedService: (service: Service | null) => void;
  addAdditionalService: (service: AdditionalService) => void;
  removeAdditionalService: (serviceId: string) => void;
  removeCurrentAdditionalService: (service: AdditionalService) => void;
  restoreCurrentAdditionalService: (service: AdditionalService) => void;
  setCurrentAdditionalServices: (services: AdditionalService[]) => void;
  resetAll: () => void;
  setServiceModifiable: (isModifiable: boolean) => void;
  setPreviousService: (service: Service | null) => void;
  setIsRollbackAvailable: (isRollbackAvailable: boolean) => void;
  revertToPreviousService: () => void;
  setHasAgeRestrictedServices: (hasRestricted: boolean) => void;
  setServiceModificationMounted: (isMounted: boolean) => void;
}

const useModifyServiceStore = create<ModifyServiceState>((set, get) => ({
  // 초기 상태
  selectedService: null,
  selectedAdditionalServices: [],
  currentAdditionalServices: [],
  removedCurrentAdditionalServices: [],
  isServiceModifiable: true,
  previousService: null,
  isRollbackAvailable: false,
  hasAgeRestrictedServices: false,
  serviceModificationMounted: false,

  // 액션
  setSelectedService: (service) => {
    set({ selectedService: service });
  },

  addAdditionalService: (service) => {
    // 제거된 현재 부가서비스인지 확인
    const isRemovedCurrentService = get().removedCurrentAdditionalServices.some(
      (item) => item.serviceId === service.serviceId,
    );

    if (isRemovedCurrentService) {
      // 제거된 현재 부가서비스인 경우 복구
      return get().restoreCurrentAdditionalService(service);
    }

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

  removeCurrentAdditionalService: (service) => {
    set((state) => ({
      currentAdditionalServices: state.currentAdditionalServices.filter(
        (item) => item.serviceId !== service.serviceId,
      ),
      removedCurrentAdditionalServices: [...state.removedCurrentAdditionalServices, service],
    }));
  },

  restoreCurrentAdditionalService: (service) => {
    set((state) => ({
      currentAdditionalServices: [...state.currentAdditionalServices, service],
      removedCurrentAdditionalServices: state.removedCurrentAdditionalServices.filter(
        (item) => item.serviceId !== service.serviceId,
      ),
    }));
  },

  setCurrentAdditionalServices: (services) => {
    set({
      currentAdditionalServices: services,
      removedCurrentAdditionalServices: [],
    });
  },

  resetAll: () => {
    set({
      selectedService: null,
      selectedAdditionalServices: [],
      removedCurrentAdditionalServices: [],
      hasAgeRestrictedServices: false,
    });
  },

  setServiceModifiable: (isModifiable: boolean) => {
    set({ isServiceModifiable: isModifiable });
  },

  setPreviousService: (service: Service | null) => {
    set({ previousService: service });
  },

  setIsRollbackAvailable: (isRollbackAvailable: boolean) => {
    set({ isRollbackAvailable: isRollbackAvailable });
  },

  revertToPreviousService: () => {
    const { previousService } = get();
    if (previousService) {
      set({
        selectedService: previousService,
        isRollbackAvailable: false,
        // 요금제 변경은 여전히 불가능하도록 isServiceModifiable 유지 (false)
        // isServiceModifiable: true,
        // 선택한 부가서비스 초기화 (새로운 요금제에 맞게 부가서비스를 다시 선택할 수 있도록)
        selectedAdditionalServices: [],
      });
    }
  },

  setHasAgeRestrictedServices: (hasRestricted: boolean) => 
    set({ hasAgeRestrictedServices: hasRestricted }),

  setServiceModificationMounted: (isMounted: boolean) =>
    set({ serviceModificationMounted: isMounted }),
}));

// 개발 환경에서만 디버깅 도구 연결
if (import.meta.env.DEV) {
  mountStoreDevtool('ModifyService Store', useModifyServiceStore);
}

export default useModifyServiceStore;
