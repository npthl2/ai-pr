import { RegistrationInfo } from '@model/RegistrationInfo';
import useRegistrationContractStore, {
  Contract,
  Service,
} from '@stores/registration/RegistrationContractStore';
import useRegistrationCustomerStore, {
  RegistrationCustomerInfo,
} from '@stores/registration/RegistrationCustomerStore';
import useRegistrationInvoiceStore, {
  RegistrationInvoiceInfo,
} from '@stores/registration/RegistrationInvoiceStore';
import useRegistrationSalesStore, { Sales } from '@stores/registration/RegistrationSalesStore';
import useRegistrationDeviceStore, {
  RegistrationDeviceInfo,
} from '@stores/registration/RegistrationDeviceStore';
/**
 * 계약 탭 ID를 기반으로 등록 정보를 가져오는 훅
 * @param contractTapId 계약 탭 ID
 * @returns 등록 정보
 */
export const useRegistrationInfo = (contractTabId: string): RegistrationInfo => {
  const customer = useRegistrationCustomerStore((state) =>
    state.getRegistrationCustomerInfo(contractTabId),
  );

  const invoice = useRegistrationInvoiceStore((state) =>
    state.getRegistrationInvoiceInfo(contractTabId),
  );

  const device = useRegistrationDeviceStore((state) =>
    state.getRegistrationDeviceInfo(contractTabId),
  );

  const contract = useRegistrationContractStore((state) =>
    state.getRegistrationContractInfo(contractTabId),
  );

  const sales = useRegistrationSalesStore((state) => state.getRegistrationSalesInfo(contractTabId));

  // 새로운 CustomerInfo 형태로 변환
  const customerInfo: RegistrationCustomerInfo = {
    customerId: customer?.customerId || '',
    name: customer?.name || '',
    rrno: customer?.rrno || '',
    rrnoIssueDate: customer?.rrnoIssueDate || '',
    isConsentPersonalInfo: customer?.isConsentPersonalInfo || false,
    isConsentIdentityVerification: customer?.isConsentIdentityVerification || false,
    verificationResult: customer?.verificationResult || false,
    organization: customer?.organization || '',
    availableContractCount: customer?.availableContractCount || 1,
  };

  // 기본 서비스 정보
  const defaultService: Service = {
    serviceId: '',
    serviceName: '',
    serviceValueType: '',
    serviceValue: 0,
  };

  // 기본 추가 서비스 정보
  const defaultAdditionalServices: Service[] = [
    {
      serviceId: '',
      serviceName: ' ',
      serviceValueType: '',
      serviceValue: 0,
    },
  ];

  const contractInfo: Contract = {
    contractType: contract?.contractType || '', // 가입유형 예시
    sellType: contract?.sellType || '', // 판매유형 예시
    phoneNumber: contract?.phoneNumber || '', // 전화번호 예시
    sim: contract?.sim || '', // SIM 정보 예시
    imei: contract?.imei || '', // IMEI 정보 예시
    deviceModelName: contract?.deviceModelName || '', // 단말기 모델명 예시
    service: contract?.service || defaultService,
    additionalServices: contract?.additionalServices || defaultAdditionalServices,
    isValidated: contract?.isValidated || false,
  };

  const invoiceInfo: RegistrationInvoiceInfo = {
    invoiceId: invoice?.invoiceId || '',
    customerId: customerInfo.customerId || '',
    billingType: invoice?.billingType || '',
    recipient: customerInfo.name,
    invoiceType: invoice?.invoiceType || '',
    invoiceEmail: invoice?.invoiceEmail || '',
    invoicePostalCode: invoice?.invoicePostalCode || '',
    invoiceAddress: invoice?.invoiceAddress || '',
    invoiceAddressDetail: invoice?.invoiceAddressDetail || '',
    paymentMethod: invoice?.paymentMethod || '',
    bankCompany: invoice?.bankCompany || '',
    bankAccount: invoice?.bankAccount || '',
    cardCompany: invoice?.cardCompany || '',
    cardNumber: invoice?.cardNumber || '',
    paymentDate: invoice?.paymentDate || '',
    paymentName: customerInfo.name,
    birthDate: invoice?.birthDate || '',
  };

  const deviceInfo: RegistrationDeviceInfo = {
    deviceId: device?.deviceId || '',
    deviceName: device?.deviceName || '',
    deviceNameAlias: device?.deviceNameAlias || '',
    devicePaymentType: device?.devicePaymentType as 'installment' | 'immediate',
    deviceEngagementType: device?.deviceEngagementType as 'PUBLIC_POSTED_SUPPORT' | 'SELECTED',
    deviceEngagementPeriod: device?.deviceEngagementPeriod || 0,
    deviceEngagementName: device?.deviceEngagementName as '공시지원금' | '선택약정',
    deviceSponsorName: device?.deviceSponsorName || '통합스폰서',
    deviceSalesPrice: device?.deviceSalesPrice || 0,
    deviceDiscountPrice: device?.deviceDiscountPrice || 0,
    devicePrepaidPrice: device?.devicePrepaidPrice || 0,
    deviceInstallmentAmount: device?.deviceInstallmentAmount || 0,
    deviceInstallmentFee: device?.deviceInstallmentFee || 0,
    deviceTotalPrice: device?.deviceTotalPrice || 0,
    deviceInstallmentPeriod: device?.deviceInstallmentPeriod || 0,
    monthlyInstallmentPrice: device?.monthlyInstallmentPrice || 0,
    isValidated: device?.isValidated || false,
  };

  const salesInfo: Sales = {
    salesDepartment: sales?.salesDepartment || '',
    salesContractPoint: sales?.salesContractPoint || '',
    finalSeller: sales?.finalSeller || '',
    supporter: sales?.supporter || '',
    isValidated: sales?.isValidated || false,
  };

  const registrationInfo: RegistrationInfo = {
    customer: customerInfo,
    contract: contractInfo,
    invoice: invoiceInfo,
    device: deviceInfo,
    sales: salesInfo,
  };

  return registrationInfo;
};
