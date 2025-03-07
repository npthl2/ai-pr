import { create } from 'zustand';

export interface RegistrationDeviceState {
  displayMode: string;
  setDisplayMode: (displayMode: string) => void;
  removeRegistrationDeviceInfo: (contractTapId: string) => void;
}

const useRegistrationDeviceStore = create<RegistrationDeviceState>((set) => ({
  displayMode: 'home',

  setDisplayMode: (displayMode: string) => {
    set(() => ({
      displayMode,
    }));
  },

  // remove 영역은 좌측 탭, 신규가입 탭 닫힐때 공통으로 처리 영역으로 아래 내용만 구현
  removeRegistrationDeviceInfo: (contractTapId: string) => {
    set((state) => {
      // TODO : 해당 내용 구현
      console.log('contractTapId', contractTapId);
      return state;
    });
  },
}));
export default useRegistrationDeviceStore;
