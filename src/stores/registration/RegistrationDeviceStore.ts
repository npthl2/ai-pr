import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export interface RegistrationDeviceInfo {
  deviceId: string;
  deviceName: string;
  deviceNameAlias: string; //
  devicePaymentType: 'installment' | 'immediate'; // 할부/즉납
  deviceSponsorName: string | '통합스폰서';
  deviceEngagementType: 'PUBLIC_POSTED_SUPPORT' | 'SELECTED';
  deviceEngagementPeriod: number; // 약정기간 12 | 24
  deviceEngagementName: '공시지원금' | '선택약정'; // 공시지원금/선택약정
  deviceSalesPrice: number; // 단말출고가
  deviceDiscountPrice: number; // 공시지원금
  devicePrepaidPrice: number; // 선납금
  deviceInstallmentAmount: number; // 할부원금
  deviceInstallmentFee: number; // 총 할부수수료
  deviceTotalPrice: number; // 총 금액
  deviceInstallmentPeriod: number; // 분납개월수
  monthlyInstallmentPrice: number; // 월/최종분납금
  isValidated: boolean;
}

export interface RegistrationDevices {
  [contractTapId: string]: RegistrationDeviceInfo;
}

export interface RegistrationDeviceState {
  displayMode: string;
  registrationDevices: RegistrationDevices;
  setDisplayMode: (displayMode: string) => void;
  getRegistrationDeviceInfo: (contractTapId: string) => RegistrationDeviceInfo | undefined;
  setRegistrationDeviceInfo: (contractTapId: string, info: RegistrationDeviceInfo) => void;
  removeRegistrationDeviceInfo: (contractTapId: string) => void;
  clearRegistrationDeviceInfo: () => void;
  initializeDeviceStore: (contractTapId: string) => void;
  updateDeviceInfo: (tabId: string, partialInfo: Partial<RegistrationDeviceInfo>) => void;
}

const useRegistrationDeviceStore = create<RegistrationDeviceState>((set, get) => ({
  displayMode: 'home',
  registrationDevices: {},

  setDisplayMode: (displayMode: string) => {
    set(() => ({
      displayMode,
    }));
  },

  initializeDeviceStore: (contractTapId: string) => {
    // Reset device info and set default values
    const defaultDeviceInfo: RegistrationDeviceInfo = {
      deviceId: '',
      deviceName: '',
      deviceNameAlias: '',
      devicePaymentType: 'installment',
      deviceSponsorName: '통합스폰서',
      deviceEngagementType: 'PUBLIC_POSTED_SUPPORT',
      deviceEngagementPeriod: 0,
      deviceEngagementName: '공시지원금',
      deviceSalesPrice: 0,
      deviceDiscountPrice: 0,
      devicePrepaidPrice: 0,
      deviceInstallmentAmount: 0,
      deviceInstallmentFee: 0,
      deviceTotalPrice: 0,
      deviceInstallmentPeriod: 0,
      monthlyInstallmentPrice: 0,
      isValidated: false,
    };

    set((state) => ({
      registrationDevices: {
        ...state.registrationDevices,
        [contractTapId]: defaultDeviceInfo,
      },
    }));
  },

  getRegistrationDeviceInfo: (contractTapId: string) => {
    const deviceInfo = get().registrationDevices[contractTapId];

    if (!deviceInfo) {
      return {
        deviceId: '',
        deviceName: '',
        deviceNameAlias: '',
        devicePaymentType: 'installment' as const,
        deviceSponsorName: '통합스폰서',
        deviceEngagementType: 'PUBLIC_POSTED_SUPPORT' as const,
        deviceEngagementPeriod: 0,
        deviceEngagementName: '공시지원금' as const,
        deviceSalesPrice: 0,
        deviceDiscountPrice: 0,
        devicePrepaidPrice: 0,
        deviceInstallmentAmount: 0,
        deviceInstallmentFee: 0,
        deviceTotalPrice: 0,
        deviceInstallmentPeriod: 0,
        monthlyInstallmentPrice: 0,
        isValidated: false,
      };
    }
    return deviceInfo;
  },

  setRegistrationDeviceInfo: (contractTapId: string, info: RegistrationDeviceInfo) => {
    set((state) => {
      return {
        registrationDevices: {
          ...state.registrationDevices,
          [contractTapId]: info,
        },
      };
    });
  },

  removeRegistrationDeviceInfo: (contractTapId: string) => {
    set((state) => {
      const newDevices = { ...state.registrationDevices };
      delete newDevices[contractTapId];
      return { registrationDevices: newDevices };
    });
  },

  clearRegistrationDeviceInfo: () => {
    set(() => ({
      registrationDevices: {},
    }));
  },

  updateDeviceInfo: (tabId: string, partialInfo: Partial<RegistrationDeviceInfo>) => {
    set((state) => {
      const currentInfo = state.registrationDevices[tabId];
      if (!currentInfo) return state;

      return {
        registrationDevices: {
          ...state.registrationDevices,
          [tabId]: {
            ...currentInfo,
            ...partialInfo,
          },
        },
      };
    });
  },
}));

mountStoreDevtool('RegistrationDevice Store', useRegistrationDeviceStore);

export default useRegistrationDeviceStore;
