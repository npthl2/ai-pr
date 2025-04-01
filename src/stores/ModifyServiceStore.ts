import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { Service } from '@api/queries/modifyService/useModifyServiceQuery';
import { AdditionalService } from '@model/modifyService/ModifyServiceModel';

export interface ModifyServiceInfo {
  // 선택된 서비스 (요금제)
  selectedService: Service | null;
  // 선택된 부가서비스 목록
  selectedAdditionalServices: AdditionalService[];
  // 유지할 현재 부가서비스 목록 (현재 가입중인 서비스 중 유지할 것들)
  currentAdditionalServices: AdditionalService[];
  // 제거된 현재 부가서비스 목록 (현재 가입중인 서비스 중 제거할 것들)
  removedCurrentAdditionalServices: AdditionalService[];
  // 초기 현재 부가서비스 목록 (화면 진입 시 상태 저장)
  initialCurrentAdditionalServices: AdditionalService[];
  // 요금제 변경 가능 여부
  isServiceModifiable: boolean;
  // 이전 요금제 정보 (되돌리기용)
  previousService: Service | null;
  // 당일 요금제 변경 여부
  isRollbackAvailable: boolean;
  // 나이 제한으로 인해 제거해야 하는 서비스가 있는지 여부
  hasRestrictedServices: boolean;
  // ServiceModification 컴포넌트가 마운트되었는지 여부
  serviceModificationMounted: boolean;
  // 변경 사항이 있는지 여부
  hasChanges: boolean;
  // 초기 상태 저장
  initialIsRollbackAvailable: boolean;
  initialIsServiceModifiable: boolean;
  initialPreviousService: Service | null;
  revertButtonClickedDate: string | null;
}

export interface ModifyServices {
  [contractTabId: string]: ModifyServiceInfo;
}

export interface ModifyServiceState {
  // 서비스 객체
  modifyServices: ModifyServices;

  // 기타 전역 상태
  serviceModificationMounted: boolean;

  // 계약 탭 ID별 정보 조회
  getModifyServiceInfo: (contractTabId: string) => ModifyServiceInfo | undefined;

  // 선택된 서비스 관련 액션
  setSelectedService: (contractTabId: string, service: Service | null) => void;

  // 부가서비스 관련 액션
  addAdditionalService: (contractTabId: string, service: AdditionalService) => void;
  removeAdditionalService: (contractTabId: string, serviceId: string) => void;
  removeCurrentAdditionalService: (contractTabId: string, service: AdditionalService) => void;
  restoreCurrentAdditionalService: (contractTabId: string, service: AdditionalService) => void;
  setCurrentAdditionalServices: (contractTabId: string, services: AdditionalService[]) => void;

  // 기타 액션
  resetAll: (contractTabId: string) => void;
  setServiceModifiable: (contractTabId: string, isModifiable: boolean) => void;
  setPreviousService: (contractTabId: string, service: Service | null) => void;
  setIsRollbackAvailable: (contractTabId: string, isRollbackAvailable: boolean) => void;
  revertToPreviousService: (contractTabId: string) => void;
  setHasRestrictedServices: (contractTabId: string, hasRestricted: boolean) => void;
  setServiceModificationMounted: (isMounted: boolean) => void;
  updateHasChanges: (contractTabId: string) => void;
  setInitialStates: (
    contractTabId: string,
    isRollbackAvailable: boolean,
    isServiceModifiable: boolean,
    previousService: Service | null,
  ) => void;
  setRevertButtonClickedDate: (contractTabId: string, date: string | null) => void;

  // 계약 탭 ID 생성 및 삭제
  createModifyServiceInfo: (contractTabId: string) => void;
  removeModifyServiceInfo: (contractTabId: string) => void;
  clearAllModifyServiceInfo: () => void;
}

// 기본 서비스 정보 생성 함수
const createDefaultServiceInfo = (): ModifyServiceInfo => ({
  selectedService: null,
  selectedAdditionalServices: [],
  currentAdditionalServices: [],
  removedCurrentAdditionalServices: [],
  initialCurrentAdditionalServices: [],
  isServiceModifiable: true,
  previousService: null,
  isRollbackAvailable: false,
  hasRestrictedServices: false,
  hasChanges: false,
  initialIsRollbackAvailable: false,
  initialIsServiceModifiable: true,
  initialPreviousService: null,
  revertButtonClickedDate: null,
  serviceModificationMounted: false,
});

const useModifyServiceStore = create<ModifyServiceState>((set, get) => ({
  // 초기 상태
  modifyServices: {},
  serviceModificationMounted: false,

  // 계약 탭 ID별 정보 조회
  getModifyServiceInfo: (contractTabId: string) => {
    return get().modifyServices[contractTabId];
  },

  // 계약 탭 ID별 정보 생성
  createModifyServiceInfo: (contractTabId: string) => {
    const exists = get().modifyServices[contractTabId];
    if (exists) return;

    set((state) => ({
      modifyServices: {
        ...state.modifyServices,
        [contractTabId]: createDefaultServiceInfo(),
      },
    }));
  },

  // 계약 탭 ID별 정보 삭제
  removeModifyServiceInfo: (contractTabId: string) => {
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [contractTabId]: _, ...rest } = state.modifyServices;
      return { modifyServices: rest };
    });
  },

  // 모든 정보 초기화
  clearAllModifyServiceInfo: () => {
    set({ modifyServices: {} });
  },

  // 선택된 서비스 설정
  setSelectedService: (contractTabId: string, service: Service | null) => {
    set((state) => {
      const serviceInfo = state.modifyServices[contractTabId];
      if (!serviceInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...serviceInfo,
            selectedService: service,
          },
        },
      };
    });

    get().updateHasChanges(contractTabId);
  },

  // 부가서비스 추가
  addAdditionalService: (contractTabId: string, service: AdditionalService) => {
    const serviceInfo = get().modifyServices[contractTabId];
    if (!serviceInfo) return;

    // 제거된 현재 부가서비스인지 확인
    const isRemovedCurrentService = serviceInfo.removedCurrentAdditionalServices.some(
      (item) => item.serviceId === service.serviceId,
    );

    if (isRemovedCurrentService) {
      // 제거된 현재 부가서비스인 경우 복구
      return get().restoreCurrentAdditionalService(contractTabId, service);
    }

    // 이미 선택된 서비스인지 확인
    const exists = serviceInfo.selectedAdditionalServices.some(
      (item) => item.serviceId === service.serviceId,
    );

    // 선택되지 않은 경우에만 추가
    if (!exists) {
      set((state) => {
        const currentInfo = state.modifyServices[contractTabId];
        if (!currentInfo) return state;

        return {
          modifyServices: {
            ...state.modifyServices,
            [contractTabId]: {
              ...currentInfo,
              selectedAdditionalServices: [...currentInfo.selectedAdditionalServices, service],
            },
          },
        };
      });

      get().updateHasChanges(contractTabId);
    }
  },

  // 선택된 부가서비스 제거
  removeAdditionalService: (contractTabId: string, serviceId: string) => {
    set((state) => {
      const serviceInfo = state.modifyServices[contractTabId];
      if (!serviceInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...serviceInfo,
            selectedAdditionalServices: serviceInfo.selectedAdditionalServices.filter(
              (service) => service.serviceId !== serviceId,
            ),
          },
        },
      };
    });

    get().updateHasChanges(contractTabId);
  },

  // 현재 부가서비스 제거
  removeCurrentAdditionalService: (contractTabId: string, service: AdditionalService) => {
    set((state) => {
      const serviceInfo = state.modifyServices[contractTabId];
      if (!serviceInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...serviceInfo,
            currentAdditionalServices: serviceInfo.currentAdditionalServices.filter(
              (item) => item.serviceId !== service.serviceId,
            ),
            removedCurrentAdditionalServices: [
              ...serviceInfo.removedCurrentAdditionalServices,
              service,
            ],
          },
        },
      };
    });

    get().updateHasChanges(contractTabId);
  },

  // 제거된 현재 부가서비스 복구
  restoreCurrentAdditionalService: (contractTabId: string, service: AdditionalService) => {
    set((state) => {
      const serviceInfo = state.modifyServices[contractTabId];
      if (!serviceInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...serviceInfo,
            currentAdditionalServices: [...serviceInfo.currentAdditionalServices, service],
            removedCurrentAdditionalServices: serviceInfo.removedCurrentAdditionalServices.filter(
              (item) => item.serviceId !== service.serviceId,
            ),
          },
        },
      };
    });

    get().updateHasChanges(contractTabId);
  },

  // 현재 부가서비스 설정
  setCurrentAdditionalServices: (contractTabId: string, services: AdditionalService[]) => {
    set((state) => {
      const serviceInfo = state.modifyServices[contractTabId];
      if (!serviceInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...serviceInfo,
            currentAdditionalServices: services,
            removedCurrentAdditionalServices: [],
            initialCurrentAdditionalServices: [...services],
          },
        },
      };
    });

    get().updateHasChanges(contractTabId);
  },

  // 모든 설정 초기화
  resetAll: (contractTabId: string) => {
    const serviceInfo = get().modifyServices[contractTabId];
    if (!serviceInfo) return;

    set((state) => {
      const currentInfo = state.modifyServices[contractTabId];
      if (!currentInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...currentInfo,
            selectedService: null,
            selectedAdditionalServices: [],
            currentAdditionalServices: [...currentInfo.initialCurrentAdditionalServices],
            removedCurrentAdditionalServices: [],
            hasRestrictedServices: false,
            hasChanges: false,
            isRollbackAvailable: currentInfo.initialIsRollbackAvailable,
            isServiceModifiable: currentInfo.initialIsServiceModifiable,
            previousService: currentInfo.initialPreviousService,
          },
        },
      };
    });
  },

  // 서비스 변경 가능 여부 설정
  setServiceModifiable: (contractTabId: string, isModifiable: boolean) => {
    set((state) => {
      const serviceInfo = state.modifyServices[contractTabId];
      if (!serviceInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...serviceInfo,
            isServiceModifiable: isModifiable,
          },
        },
      };
    });
  },

  // 이전 서비스 설정
  setPreviousService: (contractTabId: string, service: Service | null) => {
    set((state) => {
      const serviceInfo = state.modifyServices[contractTabId];
      if (!serviceInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...serviceInfo,
            previousService: service,
          },
        },
      };
    });
  },

  // 롤백 가능 여부 설정
  setIsRollbackAvailable: (contractTabId: string, isRollbackAvailable: boolean) => {
    set((state) => {
      const serviceInfo = state.modifyServices[contractTabId];
      if (!serviceInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...serviceInfo,
            isRollbackAvailable,
          },
        },
      };
    });
  },

  // 이전 서비스로 되돌리기
  revertToPreviousService: (contractTabId: string) => {
    const serviceInfo = get().modifyServices[contractTabId];
    if (!serviceInfo || !serviceInfo.previousService) return;

    set((state) => {
      const currentInfo = state.modifyServices[contractTabId];
      if (!currentInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...currentInfo,
            selectedService: currentInfo.previousService,
            isRollbackAvailable: false,
            selectedAdditionalServices: [],
          },
        },
      };
    });

    get().updateHasChanges(contractTabId);
  },

  // 제한된 서비스 있음 여부 설정
  setHasRestrictedServices: (contractTabId: string, hasRestricted: boolean) => {
    set((state) => {
      const serviceInfo = state.modifyServices[contractTabId];
      if (!serviceInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...serviceInfo,
            hasRestrictedServices: hasRestricted,
          },
        },
      };
    });
  },

  // 서비스 수정 마운트 여부 설정 (전역)
  setServiceModificationMounted: (isMounted: boolean) => {
    set({ serviceModificationMounted: isMounted });
  },

  // 변경사항 있음 여부 업데이트
  updateHasChanges: (contractTabId: string) => {
    const serviceInfo = get().modifyServices[contractTabId];
    if (!serviceInfo) return;

    const {
      selectedService,
      selectedAdditionalServices,
      initialCurrentAdditionalServices,
      currentAdditionalServices,
      removedCurrentAdditionalServices,
    } = serviceInfo;

    // 변경 사항이 있는지 확인
    const hasServiceChange = selectedService !== null;
    const hasSelectedServicesChange = selectedAdditionalServices.length > 0;
    const hasRemovedServicesChange = removedCurrentAdditionalServices.length > 0;

    // 현재 부가서비스와 초기 부가서비스 비교
    const hasCurrentServicesChange =
      initialCurrentAdditionalServices.length !== currentAdditionalServices.length ||
      !initialCurrentAdditionalServices.every((initialService) =>
        currentAdditionalServices.some(
          (currentService) => currentService.serviceId === initialService.serviceId,
        ),
      );

    const hasAnyChanges =
      hasServiceChange ||
      hasSelectedServicesChange ||
      hasRemovedServicesChange ||
      hasCurrentServicesChange;

    set((state) => {
      const currentInfo = state.modifyServices[contractTabId];
      if (!currentInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...currentInfo,
            hasChanges: hasAnyChanges,
          },
        },
      };
    });
  },

  // 초기 상태 설정
  setInitialStates: (
    contractTabId: string,
    isRollbackAvailable: boolean,
    isServiceModifiable: boolean,
    previousService: Service | null,
  ) => {
    set((state) => {
      const serviceInfo = state.modifyServices[contractTabId];
      if (!serviceInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...serviceInfo,
            initialIsRollbackAvailable: isRollbackAvailable,
            initialIsServiceModifiable: isServiceModifiable,
            initialPreviousService: previousService,
          },
        },
      };
    });
  },

  // 롤백 버튼 클릭 날짜 설정
  setRevertButtonClickedDate: (contractTabId: string, date: string | null) => {
    set((state) => {
      const serviceInfo = state.modifyServices[contractTabId];
      if (!serviceInfo) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [contractTabId]: {
            ...serviceInfo,
            revertButtonClickedDate: date,
          },
        },
      };
    });
  },
}));

// 개발 환경에서만 디버깅 도구 연결
if (import.meta.env.DEV) {
  mountStoreDevtool('ModifyService Store', useModifyServiceStore);
}

export default useModifyServiceStore;
