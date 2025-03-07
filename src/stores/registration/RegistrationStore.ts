import { create } from 'zustand';
import { RegistrationCustomerInfo } from './RegistrationCustomerStore';

// 계약 정보 저장을 위한 데이터 타입 정의
export interface RegistrationInfo {
  customer: RegistrationCustomerInfo // 고객 정보
//   contract: Record<string, any>; // 계약 정보
//   invoice: Record<string, any>; // 청구서 정보
//   device: Record<string, any>; // 기기 정보
//   sales: Record<string, any>; // 판매 정보
}

// Zustand 상태 관리 인터페이스 정의
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
}

// Zustand 상태 생성 및 정의
const useRegistrationStore = create<RegistrationStoreState>((set, get) => ({
    registrationInfo: {}, // 초기 상태는 빈 객체

  // 특정 계약 ID의 데이터를 저장하는 함수
  setRegistrationInfo: (contractTapId, data) => {
    set((state) => ({
        registrationInfo: {
        ...state.registrationInfo,
        [contractTapId]: data, // 새로운 데이터를 저장
      },
    }));
  },

  // 특정 계약 ID의 데이터를 조회하는 함수
  getRegistrationInfo: (contractTapId) => {
    return get().registrationInfo[contractTapId]; // 저장된 데이터 반환
  },

  // 특정 계약 ID에 대한 저장된 데이터를 삭제하는 함수
  removeRegistrationInfo: (contractTapId) => {
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [contractTapId]: removed, ...rest } = state.registrationInfo; // 특정 계약 데이터 제거
      return { registrationInfo: rest };
    });
  },

  // 전체 계약 데이터를 초기화하는 함수
  clearAllRegistrationInfo: () => {
    set(() => ({ registrationInfo: {} })); // 모든 계약 데이터 초기화
  },
}));

export default useRegistrationStore;
