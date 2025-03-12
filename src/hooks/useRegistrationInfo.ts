import { RegistrationInfo, CustomerInfo, InvoiceInfo, SalesInfo, ContractInfo, DeviceInfo } from '@model/RegistrationInfo';
import useRegistrationContractStore from '@stores/registration/RegistrationContractStore';
import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';
import useRegistrationDeviceStore from '@stores/registration/RegistrationDeviceStore';
import useRegistrationInvoiceStore from '@stores/registration/RegistrationInvoiceStore';
import useRegistrationSalesStore from '@stores/registration/RegistrationSalesStore';
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
  // const storeContractInfo = contractStore.getRegistrationContractInfo(contractTapId);
  // const storeInvoiceInfo = invoiceStore.getRegistrationInvoiceInfo(contractTapId);
  // const storeDeviceInfo = deviceStore.getRegistrationDeviceInfo(contractTapId);
  // const storeSalesInfo = salesStore.getRegistrationSalesInfo(contractTapId);
  
  // 개발 환경인 경우 모킹 데이터를 사용
  let storeContractInfo, storeInvoiceInfo, storeDeviceInfo, storeSalesInfo;
  
  if (process.env.NODE_ENV === 'development') {
    // 기본 서비스 정보
    const defaultServiceMock = {
      serviceId: 'S001',
      serviceName: '5G 프리미엄 요금제',
      serviceValueType: 'KRW',
      serviceValue: 55000
    };
    
    // 기본 추가 서비스 정보
    const defaultAdditionalServicesMock = [
      {
        serviceId: 'A001',
        serviceName: '데이터 안심옵션',
        serviceValueType: 'KRW',
        serviceValue: 5000
      }
    ];
    
    // 모킹 데이터 생성
    storeContractInfo = {
      contractType: '신규가입',
      sellType: '일반판매',
      phoneNumber: '010-5555-5555',
      sim: 'USIM',
      imei: '123456789012345',
      service: defaultServiceMock,
      additionalServices: defaultAdditionalServicesMock
    };
    
    storeInvoiceInfo = {
      invoiceId: 'INV' + new Date().getTime(),
      customerId: storeCustomerInfo?.customerId || '',
      billingType: '휴대폰',
      recipient: storeCustomerInfo?.name || '홍길동',
      invoiceType: '이메일',
      invoiceEmail: 'user@example.com',
      invoicePostalCode: '06164',
      invoiceAddress: '서울특별시 강남구 테헤란로 123',
      invoiceAddressDetail: '5층 501호',
      paymentMethod: 'BANK',
      bankCompany: '국민은행',
      bankAccount: '123-456-789012',
      cardCompany: '신한카드',
      cardNumber: '1234-5678-9012-3456',
      paymentDate: '25',
      paymentName: storeCustomerInfo?.name || '홍길동',
      birthDate: '19900101'
    };
    
    storeDeviceInfo = {
      deviceId: '1',
      deviceModelName: '갤럭시 S23 Ultra',
      deviceModelNameAlias: 'Galaxy S23 Ultra',
      deviceEngagementType: 'PUBLIC_POSTED_SUPPERT',
      deviceSponsorName: '통합스폰서',
      deviceEngagementPeriod: 24,
      deviceEngagementName: '공시지원금',
      deviceSalesPrice: 1200000,
      deviceDiscountPrice: 300000,
      devicePrepaidPrice: 100000,
      deviceInstallmentAmount: 800000,
      deviceInstallmentFee: 24000,
      deviceTotalPriceAmout: 824000,
      deviceInstallmentPeriod: 24,
      monthlyInstallmentPrice: 34333,
      isValidated: true
    };
    
    storeSalesInfo = {
      salesDepartment: '온라인지점',
      salesContactPoint: '온라인',
      finalSeller: '홍길동',
      supporter: '김지원'
    };
  } else {
    // 개발 환경에서는 스토어에서 데이터를 가져옵니다
    try {
      storeContractInfo = (contractStore as any).getRegistrationContractInfo?.(contractTapId);
      storeInvoiceInfo = (invoiceStore as any).getRegistrationInvoiceInfo?.(contractTapId);
      storeDeviceInfo = (deviceStore as any).getRegistrationDeviceInfo?.(contractTapId);
      storeSalesInfo = (salesStore as any).getRegistrationSalesInfo?.(contractTapId);
    } catch (error) {
      console.error('스토어에서 데이터를 가져오는 중 오류가 발생했습니다:', error);
    }
  }
  
  // 새로운 CustomerInfo 형태로 변환
  const customerInfo: CustomerInfo = {
    customerId: storeCustomerInfo?.customerId || '3', //TODO customerId null로 변경 필요(메일 발송 테스트를 위해 임시 사용)
    name: storeCustomerInfo?.name || '',
    rrno: storeCustomerInfo?.rrno || '',
    rrnoIssueDate: storeCustomerInfo?.rrnoIssueDate || '',
    authHistoryId: storeCustomerInfo?.authHistoryId || 0,
    isConsentPersonalInfo: storeCustomerInfo?.isConsentPersonalInfo || false,
    isConsentIdentityVerification: storeCustomerInfo?.isConsentIdentityVerification || false,
    verificationResult: storeCustomerInfo?.verificationResult || false,
    organization: storeCustomerInfo?.organization || '',
    availableContractCount: storeCustomerInfo?.availableContractCount || 1
  };
  
  // 기본 서비스 정보
  const defaultService = {
    serviceId: '',
    serviceName: '',
    serviceValueType: '',
    serviceValue: 0
  };
  
  // 기본 추가 서비스 정보
  const defaultAdditionalServices = [
    {
      serviceId: '',
      serviceName: ' ',
      serviceValueType: '',
      serviceValue: 0
    }
  ];
  
  // 테스트를 위한 Contract 인터페이스 예시 데이터
  const contractInfo : ContractInfo = {
    contractType: storeContractInfo?.contractType || '', // 가입유형 예시
    sellType: storeContractInfo?.sellType || '', // 판매유형 예시
    phoneNumber: storeContractInfo?.phoneNumber || '', // 전화번호 예시
    sim: storeContractInfo?.sim || '', // SIM 정보 예시
    imei: storeContractInfo?.imei || '', // IMEI 정보 예시
    service: storeContractInfo?.service || defaultService,
    additionalServices: storeContractInfo?.additionalServices || defaultAdditionalServices
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
    birthDate: storeInvoiceInfo?.birthDate || ''
  };
  
  // 테스트를 위한 Device 인터페이스 예시 데이터
  const deviceInfo: DeviceInfo = {
    deviceId: storeDeviceInfo?.deviceId || '',
    deviceModelName: storeDeviceInfo?.deviceModelName || '',
    deviceModelNameAlias: storeDeviceInfo?.deviceModelNameAlias || '',
    deviceEngagementType: storeDeviceInfo?.deviceEngagementType || '',
    deviceSponsorName: storeDeviceInfo?.deviceSponsorName || '',
    deviceEngagementPeriod: storeDeviceInfo?.deviceEngagementPeriod || 0,
    deviceEngagementName: storeDeviceInfo?.deviceEngagementName || '',
    deviceSalesPrice: storeDeviceInfo?.deviceSalesPrice || 0,
    deviceDiscountPrice: storeDeviceInfo?.deviceDiscountPrice || 0,
    devicePrepaidPrice: storeDeviceInfo?.devicePrepaidPrice || 0,
    deviceInstallmentAmount: storeDeviceInfo?.deviceInstallmentAmount || 0,
    deviceInstallmentFee: storeDeviceInfo?.deviceInstallmentFee || 0,
    deviceTotalPriceAmout: storeDeviceInfo?.deviceTotalPriceAmout || 0,
    deviceInstallmentPeriod: storeDeviceInfo?.deviceInstallmentPeriod || 0,
    monthlyInstallmentPrice: storeDeviceInfo?.monthlyInstallmentPrice || 0,
    isValidated: storeDeviceInfo?.isValidated || false
  };
  
  // 테스트를 위한 Sales 인터페이스 예시 데이터
  const salesInfo: SalesInfo = {
    salesDepartment: storeSalesInfo?.salesDepartment || '',
    salesContactPoint: storeSalesInfo?.salesContactPoint || '',
    finalSeller: storeSalesInfo?.finalSeller || '',
    supporter: storeSalesInfo?.supporter || ''
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
