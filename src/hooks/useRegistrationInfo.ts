import {
  RegistrationInfo,
  CustomerInfo,
  InvoiceInfo,
  SalesInfo,
  ContractInfo,
  DeviceInfo,
  ServiceInfo,
} from '@model/RegistrationInfo';
import useRegistrationContractStore from '@stores/registration/RegistrationContractStore';
import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';
import useRegistrationInvoiceStore from '@stores/registration/RegistrationInvoiceStore';
import useRegistrationSalesStore from '@stores/registration/RegistrationSalesStore';
import { RegistrationStatusType } from '@constants/RegistrationConstants';
import useRegistrationDeviceStore from '@stores/registration/RegistrationDeviceStore';
/**
 * 계약 탭 ID를 기반으로 등록 정보를 가져오는 훅
 * @param contractTapId 계약 탭 ID
 * @returns 등록 정보
 */
export const useRegistrationInfo = (contractTapId: string): RegistrationInfo => {
  // 각 스토어의 상태를 가져옵니다
  const customerStore = useRegistrationCustomerStore.getState();
  // 아직 구현되지 않은 스토어들은 주석 처리
  const contractStore = useRegistrationContractStore.getState();
  const invoiceStore = useRegistrationInvoiceStore.getState();
  const deviceStore = useRegistrationDeviceStore.getState();
  const salesStore = useRegistrationSalesStore.getState();

  // 각 스토어에서 데이터를 가져옵니다
  const storeCustomerInfo = customerStore.getRegistrationCustomerInfo(contractTapId);
  const storeContractInfo = contractStore.getRegistrationContractInfo(contractTapId);
  const storeInvoiceInfo = invoiceStore.getRegistrationInvoiceInfo(contractTapId);
  const storeDeviceInfo = deviceStore.getRegistrationDeviceInfo(contractTapId);
  const storeSalesInfo = salesStore.getRegistrationSalesInfo(contractTapId);

  // 새로운 CustomerInfo 형태로 변환
  const customerInfo: CustomerInfo = {
    customerId: storeCustomerInfo?.customerId || '',
    name: storeCustomerInfo?.name || '',
    rrno: storeCustomerInfo?.rrno || '',
    rrnoIssueDate: storeCustomerInfo?.rrnoIssueDate || '',
    authHistoryId: storeCustomerInfo?.customerNameVerificationHistoryId || 0,
    isConsentPersonalInfo: storeCustomerInfo?.isConsentPersonalInfo || false,
    isConsentIdentityVerification: storeCustomerInfo?.isConsentIdentityVerification || false,
    verificationResult: storeCustomerInfo?.verificationResult || false,
    organization: storeCustomerInfo?.organization || '',
    availableContractCount: storeCustomerInfo?.availableContractCount || 1,
  };

  // 기본 서비스 정보
  const defaultService: ServiceInfo = {
    serviceId: '',
    serviceName: '',
    serviceValueType: '',
    serviceValue: 0,
  };

  // 기본 추가 서비스 정보
  const defaultAdditionalServices: ServiceInfo[] = [
    {
      serviceId: '',
      serviceName: ' ',
      serviceValueType: '',
      serviceValue: 0,
    },
  ];

  // 테스트를 위한 Contract 인터페이스 예시 데이터
  const contractInfo: ContractInfo = {
    contractType: storeContractInfo?.contractType || '', // 가입유형 예시
    sellType: storeContractInfo?.sellType || '', // 판매유형 예시
    phoneNumber: storeContractInfo?.phoneNumber || '', // 전화번호 예시
    sim: storeContractInfo?.sim || '', // SIM 정보 예시
    imei: storeContractInfo?.imei || '', // IMEI 정보 예시
    service: storeContractInfo?.service || defaultService,
    additionalServices: storeContractInfo?.additionalServices || defaultAdditionalServices,
    isValidated: storeContractInfo?.isValidated || false,
  };

  // 테스트를 위한 Invoice 인터페이스 예시 데이터
  const invoiceInfo: InvoiceInfo = {
    invoiceId: storeInvoiceInfo?.invoiceId || '',
    customerId: customerInfo.customerId || '',
    billingType: storeInvoiceInfo?.billingType || '',
    recipient: customerInfo.name,
    invoiceType: storeInvoiceInfo?.invoiceType || '',
    invoiceEmail: storeInvoiceInfo?.invoiceEmail || '',
    invoicePostalCode: storeInvoiceInfo?.invoicePostalCode || '',
    invoiceAddress: storeInvoiceInfo?.invoiceAddress || '',
    invoiceAddressDetail: storeInvoiceInfo?.invoiceAddressDetail || '',
    paymentMethod: storeInvoiceInfo?.paymentMethod || '',
    bankCompany: storeInvoiceInfo?.bankCompany || '',
    bankAccount: storeInvoiceInfo?.bankAccount || '',
    cardCompany: storeInvoiceInfo?.cardCompany || '',
    cardNumber: storeInvoiceInfo?.cardNumber || '',
    paymentDate: storeInvoiceInfo?.paymentDate || '',
    paymentName: customerInfo.name,
    birthDate: storeInvoiceInfo?.birthDate || '',
  };

  // 테스트를 위한 Device 인터페이스 예시 데이터
  const deviceInfo: DeviceInfo = {
    deviceId: storeDeviceInfo?.deviceId || '',
    deviceName: storeDeviceInfo?.deviceName || '',
    deviceNameAlias: storeDeviceInfo?.deviceNameAlias || '',
    deviceEngagementType: storeDeviceInfo?.deviceEngagementType as
      | 'PUBLIC_POSTED_SUPPERT'
      | 'SELECTED',
    deviceSponsorName: storeDeviceInfo?.deviceSponsorName || '',
    deviceEngagementPeriod: storeDeviceInfo?.deviceEngagementPeriod || 0,
    deviceEngagementName: storeDeviceInfo?.deviceEngagementName as '공시지원금' | '선택약정',
    deviceSalesPrice: storeDeviceInfo?.deviceSalesPrice || 0,
    deviceDiscountPrice: storeDeviceInfo?.deviceDiscountPrice || 0,
    devicePrepaidPrice: storeDeviceInfo?.devicePrepaidPrice || 0,
    deviceInstallmentAmount: storeDeviceInfo?.deviceInstallmentAmount || 0,
    deviceInstallmentFee: storeDeviceInfo?.deviceInstallmentFee || 0,
    deviceTotalPrice: storeDeviceInfo?.deviceTotalPrice || 0,
    deviceInstallmentPeriod: storeDeviceInfo?.deviceInstallmentPeriod || 0,
    monthlyInstallmentPrice: storeDeviceInfo?.monthlyInstallmentPrice || 0,
    isValidated: storeDeviceInfo?.isValidated || false,
  };

  // 테스트를 위한 Sales 인터페이스 예시 데이터
  const salesInfo: SalesInfo = {
    salesDepartment: storeSalesInfo?.salesDepartment || '',
    salesContractPoint: storeSalesInfo?.salesContractPoint || '',
    finalSeller: storeSalesInfo?.finalSeller || '',
    supporter: storeSalesInfo?.supporter || '',
    isValidated: storeSalesInfo?.isValidated || false,
  };

  const registrationInfo: RegistrationInfo = {
    customer: customerInfo,
    contract: contractInfo,
    invoice: invoiceInfo,
    device: deviceInfo,
    sales: salesInfo,
    // 필수 속성 추가
    businessProcessId: '', // 기본값 설정
    status: 'PENDING' as RegistrationStatusType, // 기본 상태 설정
  };

  return registrationInfo;
};
