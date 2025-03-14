import { create } from 'zustand';

export interface RegistrationInvoiceInfo {
  // 청구ID
  invoiceId: string;
  // 고객ID
  customerId: string;
  // 청구서번호 구분
  billingType: string;
  // 수령인
  recipient: string;
  // 발송형태
  invoiceType: string;
  // 청구서 이메일
  invoiceEmail: string;
  // 청구서 우편번호
  invoicePostalCode: string;
  // 청구서 주소
  invoiceAddress: string;
  // 청구서 상세주소
  invoiceAddressDetail: string;
  // 납부방법
  paymentMethod: string;
  // 은행명
  bankCompany: string;
  // 계좌번호
  bankAccount: string;
  // 카드사명
  cardCompany: string;
  // 카드번호
  cardNumber: string;
  // 결제일
  paymentDate: string;
  // 납부고객명
  paymentName: string;
  // 생년월일
  birthDate: string;
}

export interface RegistrationInvoices {
  [contractTapId: string]: RegistrationInvoiceInfo;
}

export interface RegistrationInvoiceState {
  registrationInvoices: RegistrationInvoices;
  displayMode: string;
  getRegistrationInvoiceInfo: (contractTapId: string) => RegistrationInvoiceInfo | undefined;
  setRegistrationInvoiceInfo: (contractTapId: string, info: RegistrationInvoiceInfo) => void;
  setDisplayMode: (displayMode: string) => void;
  removeRegistrationInvoiceInfo: (contractTapId: string) => void;
}

const useRegistrationInvoiceStore = create<RegistrationInvoiceState>((set, get) => ({
  registrationInvoices: {},
  displayMode: 'home',

  getRegistrationInvoiceInfo: (contractTapId: string) => {
    return get().registrationInvoices[contractTapId] || null;
  },

  setRegistrationInvoiceInfo: (id: string, info: RegistrationInvoiceInfo) => {
    set((state) => ({
      registrationInvoices: {
        ...state.registrationInvoices,
        [id]: info,
      },
    }));
  },

  setDisplayMode: (displayMode: string) => {
    set(() => ({
      displayMode,
    }));
  },

  removeRegistrationInvoiceInfo: (contractTapId: string) => {
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [contractTapId]: removed, ...rest } = state.registrationInvoices;
      return { registrationInvoices: rest };
    });
  },
}));
export default useRegistrationInvoiceStore;
