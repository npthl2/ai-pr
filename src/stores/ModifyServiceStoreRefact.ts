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
  [customerId: string]: {
    [contractId: string]: ModifyServiceInfo;
  };
}

export interface ModifyServiceState {
  modifyServices: ModifyServices;
  serviceModificationMounted: boolean;

  // 상태 설정
  setInitialStates: (
    customerId: string,
    contractId: string,
    isRollbackAvailable: boolean,
    isServiceModifiable: boolean,
    previousService: Service | null,
  ) => void;
  setIsRollbackAvailable: (
    customerId: string,
    contractId: string,
    isRollbackAvailable: boolean,
  ) => void;
  setServiceModifiable: (customerId: string, contractId: string, isModifiable: boolean) => void;
  setPreviousService: (customerId: string, contractId: string, service: Service | null) => void;

  // 생성/조회/공통
  createModifyServiceInfo: (customerId: string, contractId: string) => void; // 완료
  getModifyServiceInfo: (customerId: string, contractId: string) => ModifyServiceInfo | undefined; // 완료
  updateHasChanges: (customerId: string, contractId: string) => void; // 완료

  // ModifiedServiceSelect.tsx 사용
  setSelectedService: (customerId: string, contractId: string, service: Service | null) => void; // 완료
  revertToPreviousService: (customerId: string, contractId: string) => void; // 완료
  setRevertButtonClickedDate: (customerId: string, contractId: string, date: string | null) => void; // 완료
  setModificationBusinessProcessId: (
    customerId: string,
    contractId: string,
    businessProcessId: string,
  ) => void;

  // AdditionalServiceList.tsx 사용
  restoreCurrentAdditionalService: (
    customerId: string,
    contractId: string,
    service: AdditionalService,
  ) => void; // 완료
  addAdditionalService: (
    customerId: string,
    contractId: string,
    service: AdditionalService,
  ) => void; // 완료

  // SelectedAdditionalServiceList.tsx 사용
  setHasRestrictedServices: (
    customerId: string,
    contractId: string,
    hasRestricted: boolean,
  ) => void; // 완료
  setCurrentAdditionalServices: (
    customerId: string,
    contractId: string,
    services: AdditionalService[],
  ) => void; // 완료
  removeCurrentAdditionalService: (
    customerId: string,
    contractId: string,
    service: AdditionalService,
  ) => void; // 완료
  removeAdditionalService: (customerId: string, contractId: string, serviceId: string) => void; // 완료

  // 초기화 및 스토어 삭제
  resetAll: (customerId: string, contractId: string) => void;
  removeModifyServiceInfo: (customerId: string, contractId: string) => void;
  removeModifyServiceInfoByCustomerId: (customerId: string) => void;
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

// 변경 여부 체크
const checkHasChanges = (serviceInfo: ModifyServiceInfo): boolean => {
  const {
    selectedService,
    selectedAdditionalServices,
    initialCurrentAdditionalServices,
    currentAdditionalServices,
    removedCurrentAdditionalServices,
  } = serviceInfo;

  const hasServiceChange = selectedService !== null;
  const hasSelectedServicesChange = selectedAdditionalServices.length > 0;
  const hasRemovedServicesChange = removedCurrentAdditionalServices.length > 0;

  const hasCurrentServicesChange =
    initialCurrentAdditionalServices.length !== currentAdditionalServices.length ||
    !initialCurrentAdditionalServices.every((initialService) =>
      currentAdditionalServices.some(
        (currentService) => currentService.serviceId === initialService.serviceId,
      ),
    );

  return (
    hasServiceChange ||
    hasSelectedServicesChange ||
    hasRemovedServicesChange ||
    hasCurrentServicesChange
  );
};

// 계약 정보 확인 공통 정의
const getContractInfo = (
  state: ModifyServiceState,
  customerId: string,
  contractId: string,
): ModifyServiceInfo | undefined => {
  return state.modifyServices[customerId]?.[contractId];
};

const useModifyServiceStore = create<ModifyServiceState>((set, get) => ({
  // 초기 상태
  modifyServices: {},
  serviceModificationMounted: false,

  // 초기 상태 설정
  setInitialStates: (
    customerId: string,
    contractId: string,
    isRollbackAvailable: boolean,
    isServiceModifiable: boolean,
    previousService: Service | null,
  ) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              initialIsRollbackAvailable: isRollbackAvailable,
              initialIsServiceModifiable: isServiceModifiable,
              initialPreviousService: previousService,
            },
          },
        },
      };
    });
  },

  // 롤백 가능 여부 설정
  setIsRollbackAvailable: (
    customerId: string,
    contractId: string,
    isRollbackAvailable: boolean,
  ) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              isRollbackAvailable,
            },
          },
        },
      };
    });
  },

  // 서비스 변경 가능 여부 설정
  setServiceModifiable: (customerId: string, contractId: string, isModifiable: boolean) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              isServiceModifiable: isModifiable,
            },
          },
        },
      };
    });
  },

  // 이전 서비스 설정
  setPreviousService: (customerId: string, contractId: string, service: Service | null) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              previousService: service,
            },
          },
        },
      };
    });
  },

  // 계약 ID 별 정보 생성
  createModifyServiceInfo: (customerId: string, contractId: string) => {
    set((state) => {
      const contractInfoByCustomerId = state.modifyServices[customerId] || {};
      // 이미 해당 계약 ID가 존재하면 아무 작업도 하지 않습니다.
      if (contractInfoByCustomerId[contractId]) return {};
      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...contractInfoByCustomerId,
            [contractId]: createDefaultServiceInfo(),
          },
        },
      };
    });
  },

  // 계약 탭 ID별 정보 조회
  getModifyServiceInfo: (customerId: string, contractId: string) => {
    return get().modifyServices[customerId]?.[contractId];
  },

  // 변경사항 있음 여부 업데이트
  updateHasChanges: (customerId: string, contractId: string) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      const hasAnyChanges = checkHasChanges(serviceInfoByContractId);

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              hasChanges: hasAnyChanges,
            },
          },
        },
      };
    });
  },

  // 선택된 서비스 설정
  setSelectedService: (customerId: string, contractId: string, service: Service | null) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              selectedService: service,
            },
          },
        },
      };
    });

    get().updateHasChanges(customerId, contractId);
  },

  // 이전 서비스로 되돌리기
  revertToPreviousService: (customerId: string, contractId: string) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              selectedService: serviceInfoByContractId.previousService,
              isRollbackAvailable: false,
              selectedAdditionalServices: [],
            },
          },
        },
      };
    });

    get().updateHasChanges(customerId, contractId);
  },

  // 롤백 버튼 클릭 날짜 설정
  setRevertButtonClickedDate: (customerId: string, contractId: string, date: string | null) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              revertButtonClickedDate: date,
            },
          },
        },
      };
    });
  },

  setModificationBusinessProcessId: (
    customerId: string,
    contractId: string,
    businessProcessId: string,
  ) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              businessProcessId,
            },
          },
        },
      };
    });
  },

  // 제거된 현재 부가서비스 복구
  restoreCurrentAdditionalService: (
    customerId: string,
    contractId: string,
    service: AdditionalService,
  ) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              currentAdditionalServices: [
                ...serviceInfoByContractId.currentAdditionalServices,
                service,
              ],
              removedCurrentAdditionalServices:
                serviceInfoByContractId.removedCurrentAdditionalServices.filter(
                  (item) => item.serviceId !== service.serviceId,
                ),
            },
          },
        },
      };
    });

    get().updateHasChanges(customerId, contractId);
  },

  // 부가서비스 추가
  addAdditionalService: (customerId: string, contractId: string, service: AdditionalService) => {
    const currentServiceInfo = get().getModifyServiceInfo(customerId, contractId);
    if (!currentServiceInfo) return;

    // 제거된 현재 부가서비스인지 확인
    const isRemovedCurrentService = currentServiceInfo.removedCurrentAdditionalServices.some(
      (item) => item.serviceId === service.serviceId,
    );

    if (isRemovedCurrentService) {
      // 제거된 현재 부가서비스인 경우 복구
      return get().restoreCurrentAdditionalService(customerId, contractId, service);
    }

    // 이미 선택된 서비스인지 확인
    const exists = currentServiceInfo.selectedAdditionalServices.some(
      (item) => item.serviceId === service.serviceId,
    );

    // 선택되지 않은 경우에만 추가
    if (!exists) {
      set((state) => {
        const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
        if (!serviceInfoByContractId) return state;

        return {
          modifyServices: {
            ...state.modifyServices,
            [customerId]: {
              ...state.modifyServices[customerId],
              [contractId]: {
                ...serviceInfoByContractId,
                selectedAdditionalServices: [
                  ...serviceInfoByContractId.selectedAdditionalServices,
                  service,
                ],
              },
            },
          },
        };
      });

      get().updateHasChanges(customerId, contractId);
    }
  },

  // 제한된 서비스 있음 여부 설정
  setHasRestrictedServices: (customerId: string, contractId: string, hasRestricted: boolean) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              hasRestrictedServices: hasRestricted,
            },
          },
        },
      };
    });
  },

  // 현재 부가서비스 설정
  setCurrentAdditionalServices: (
    customerId: string,
    contractId: string,
    services: AdditionalService[],
  ) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              currentAdditionalServices: services,
              removedCurrentAdditionalServices: [],
              initialCurrentAdditionalServices: [...services],
            },
          },
        },
      };
    });

    get().updateHasChanges(customerId, contractId);
  },

  // 현재 부가서비스 제거
  removeCurrentAdditionalService: (
    customerId: string,
    contractId: string,
    service: AdditionalService,
  ) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      const alreadyRemoved = serviceInfoByContractId.removedCurrentAdditionalServices.some(
        (item) => item.serviceId === service.serviceId,
      );
      if (alreadyRemoved) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              currentAdditionalServices: serviceInfoByContractId.currentAdditionalServices.filter(
                (item) => item.serviceId !== service.serviceId,
              ),
              removedCurrentAdditionalServices: [
                ...serviceInfoByContractId.removedCurrentAdditionalServices,
                service,
              ],
            },
          },
        },
      };
    });

    get().updateHasChanges(customerId, contractId);
  },

  // 선택된 부가서비스 제거
  removeAdditionalService: (customerId: string, contractId: string, serviceId: string) => {
    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              selectedAdditionalServices: serviceInfoByContractId.selectedAdditionalServices.filter(
                (service) => service.serviceId !== serviceId,
              ),
            },
          },
        },
      };
    });

    get().updateHasChanges(customerId, contractId);
  },

  // 모든 설정 초기화
  resetAll: (customerId: string, contractId: string) => {
    const currentServiceInfo = get().getModifyServiceInfo(customerId, contractId);
    if (!currentServiceInfo) return;

    set((state) => {
      const serviceInfoByContractId = getContractInfo(state, customerId, contractId);
      if (!serviceInfoByContractId) return state;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: {
            ...state.modifyServices[customerId],
            [contractId]: {
              ...serviceInfoByContractId,
              selectedService: null,
              selectedAdditionalServices: [],
              currentAdditionalServices: [
                ...serviceInfoByContractId.initialCurrentAdditionalServices,
              ],
              removedCurrentAdditionalServices: [],
              hasRestrictedServices: false,
              hasChanges: false,
              isRollbackAvailable: serviceInfoByContractId.initialIsRollbackAvailable,
              isServiceModifiable: serviceInfoByContractId.initialIsServiceModifiable,
              previousService: serviceInfoByContractId.initialPreviousService,
            },
          },
        },
      };
    });
  },

  // 계약 단위 정보 삭제
  removeModifyServiceInfo: (customerId: string, contractId: string) => {
    set((state) => {
      const serviceInfoByCustomerId = state.modifyServices[customerId];
      if (!serviceInfoByCustomerId || !serviceInfoByCustomerId[contractId]) return state;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [contractId]: _, ...restContracts } = serviceInfoByCustomerId;

      return {
        modifyServices: {
          ...state.modifyServices,
          [customerId]: restContracts,
        },
      };
    });
  },

  // 고객 단위 변경 정보 삭제
  removeModifyServiceInfoByCustomerId: (customerId: string) => {
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [customerId]: _, ...rest } = state.modifyServices;
      return { modifyServices: rest };
    });
  },

  // 모든 정보 초기화
  clearAllModifyServiceInfo: () => {
    set({ modifyServices: {} });
  },
}));

// 개발 환경에서만 디버깅 도구 연결
if (import.meta.env.DEV) {
  mountStoreDevtool('ModifyService Store Refact', useModifyServiceStore);
}

export default useModifyServiceStore;
