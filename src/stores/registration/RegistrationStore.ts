import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { RegistrationInfo } from '@model/RegistrationInfo';
import { RegistrationStatusType } from '@constants/RegistrationConstants';

// import { RegistrationCustomerInfo } from './RegistrationCustomerStore';

// // 계약 정보 저장을 위한 데이터 타입 정의
// export interface RegistrationInfo {
//   customer: RegistrationCustomerInfo; // 고객 정보
//   contract: Record<string, any>; // 계약 정보
//   invoice: Record<string, any>; // 청구서 정보
//   device: Record<string, any>; // 기기 정보
//   sales: Record<string, any>; // 판매 정보
//   status?: 'PENDING' | 'COMPLETED' | 'FAILED'; // 저장 상태 추가
// }

// 스토어 상태 인터페이스 정의
export interface RegistrationStoreState {
  registrationInfo: Record<string, RegistrationInfo>; // 계약 ID를 키로 갖는 저장된 계약 데이터 객체
  
  // 특정 계약 ID에 대한 데이터를 저장하는 함수
  setRegistrationInfo: (contractTapId: string, data: RegistrationInfo) => void;
  
  // 특정 계약 ID의 데이터를 조회하는 함수
  getRegistrationInfo: (contractTapId: string) => RegistrationInfo | undefined;
  
  // 특정 계약 ID에 대한 저장된 데이터를 삭제하는 함수
  removeRegistrationInfo: (contractTapId: string) => void;
  
  // 전체 계약 데이터를 초기화하는 함수
  clearAllRegistrationInfo: () => void;
  
  // 저장 상태를 업데이트하는 함수 추가
  updateRegistrationStatus: (contractTapId: string, status: RegistrationStatusType) => void;
}

// Zustand 상태 생성 및 정의
const useRegistrationStore = create<RegistrationStoreState>((set, get) => ({
    registrationInfo: {}, // 초기 상태는 빈 객체
    
    // 특정 계약 ID에 대한 데이터를 저장하는 함수 구현
    setRegistrationInfo: (contractTapId, data) => {
        set((state) => ({
            registrationInfo: {
                ...state.registrationInfo,
                [contractTapId]: data,
            },
        }));
    },
    
    // 특정 계약 ID의 데이터를 조회하는 함수 구현
    getRegistrationInfo: (contractTapId) => {
        return get().registrationInfo[contractTapId];
    },
    
    // 특정 계약 ID에 대한 저장된 데이터를 삭제하는 함수 구현
    removeRegistrationInfo: (contractTapId) => {
        set((state) => {
            const newRegistrationInfo = { ...state.registrationInfo };
            delete newRegistrationInfo[contractTapId];
            return { registrationInfo: newRegistrationInfo };
        });
    },
    
    // 전체 계약 데이터를 초기화하는 함수 구현
    clearAllRegistrationInfo: () => {
        set({ registrationInfo: {} });
    },
    
    // 저장 상태를 업데이트하는 함수 구현
    updateRegistrationStatus: (contractTapId, status) => {
        set((state) => {
            const currentInfo = state.registrationInfo[contractTapId];
            if (!currentInfo) {
                return state; // 해당 ID의 데이터가 없으면 상태 변경 없음
            }
            
            return {
                registrationInfo: {
                    ...state.registrationInfo,
                    [contractTapId]: {
                        ...currentInfo,
                        status,
                    },
                },
            };
        });
    },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Registration Store', useRegistrationStore);
}

export default useRegistrationStore;
