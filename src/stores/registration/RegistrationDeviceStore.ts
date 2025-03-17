import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
// import useRegistrationContractStore from './RegistrationContractStore';

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
  // Store previous values to detect changes
  previousContractValues: Record<string, { imei: string; serviceId: string }>;
  setDisplayMode: (displayMode: string) => void;
  getRegistrationDeviceInfo: (contractTapId: string) => RegistrationDeviceInfo | undefined;
  setRegistrationDeviceInfo: (contractTapId: string, info: RegistrationDeviceInfo) => void;
  removeRegistrationDeviceInfo: (contractTapId: string) => void;
  clearRegistrationDeviceInfo: () => void;
  // New method to check for contract changes
  // checkForContractChanges: (contractTapId: string) => void;
}

const useRegistrationDeviceStore = create<RegistrationDeviceState>((set, get) => ({
  displayMode: 'home',
  registrationDevices: {},
  previousContractValues: {},

  setDisplayMode: (displayMode: string) => {
    console.log('[RegistrationDeviceStore] setDisplayMode:', displayMode);
    set(() => ({
      displayMode,
    }));
  },

  getRegistrationDeviceInfo: (contractTapId: string) => {
    // Check for contract changes before returning device info
    //get().checkForContractChanges(contractTapId);

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
    // Check for contract changes before setting device info
    //get().checkForContractChanges(contractTapId);

    // Then set the new info (removed the clearing of data)
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [contractTapId]: _, ...rest } = state.registrationDevices;
      return { registrationDevices: rest };
    });
  },

  clearRegistrationDeviceInfo: () => {
    set(() => ({ registrationDevices: {} }));
  },

  // New method to check for changes in the contract store
  // checkForContractChanges: (contractTapId: string) => {
  //   // Get current contract information
  //   const contractStore = useRegistrationContractStore.getState();
  //   const contract = contractStore.getRegistrationContractInfo(contractTapId);

  //   if (!contract) return;

  //   // Get current values
  //   const currentImei = contract.imei || '';
  //   const currentServiceId = contract.service?.serviceId || '';

  //   // Get previous values
  //   const previousValues = get().previousContractValues[contractTapId] || {
  //     imei: '',
  //     serviceId: '',
  //   };

  //   // Check if values have changed - only consider it a change if:
  //   // 1. We had a previous non-empty value
  //   // 2. The current value is different from the previous value
  //   const imeiChanged =
  //     previousValues.imei !== '' && currentImei !== '' && currentImei !== previousValues.imei;

  //   const serviceIdChanged =
  //     previousValues.serviceId !== '' &&
  //     currentServiceId !== '' &&
  //     currentServiceId !== previousValues.serviceId;

  //   // If either value has changed, reset device info
  //   if (imeiChanged || serviceIdChanged) {
  //     // Remove device info for this tabId
  //     get().removeRegistrationDeviceInfo(contractTapId);
  //   }

  //   // Only update previous values if they are not empty
  //   if (currentImei !== '' || currentServiceId !== '') {
  //     set((state) => ({
  //       previousContractValues: {
  //         ...state.previousContractValues,
  //         [contractTapId]: {
  //           imei: currentImei || previousValues.imei,
  //           serviceId: currentServiceId || previousValues.serviceId,
  //         },
  //       },
  //     }));
  //   }
  // },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('RegistrationDevice Store', useRegistrationDeviceStore);
}

export default useRegistrationDeviceStore;
