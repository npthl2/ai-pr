import RegistrationPage from '../../../pages/registration/RegistrationPage';
import RegistrationServiceMock from '../../mock/registration/RegistrationServiceMock';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';
import ContractSectionServiceMock from '../../mock/registration/ContractSectionServiceMock';
import CustomerSectionPage from '../../../pages/registration/CustomerSectionPage';
import InvoiceSectionPage from '../../../pages/registration/InvoiceSectionPage';
import CustomerSectionServiceMock from '../../mock/registration/CustomerSectionServiceMock';
import InvoiceSectionServiceMock from '../../mock/registration/InvoiceSectionServiceMock';
import ContractSectionPage from '../../../pages/registration/ContractSectionPage';
import DeviceSectionPage from '../../../pages/registration/DeviceSectionPage';
import CustomerDetailServiceMock from '../../mock/customer/detail/CustomerDetailServiceMock';
import DeviceSectionServiceMock from '../../mock/registration/DeviceSectionServiceMock';
import RegistrationStatusServiceMock from '../../mock/registration/RegistrationStatusServiceMock';
import { REGISTRATION_STATUS } from '../../../../src/constants/RegistrationConstants';
import RegistrationStatusPage from '../../../pages/layout/RegistrationStatusPage';

describe('KAN-39 가입정보 요약 테스트', () => {
  const page = new RegistrationPage();
  const service = new RegistrationServiceMock();

  const invoiceSectionPage = new InvoiceSectionPage();
  const invoiceService = new InvoiceSectionServiceMock();
  const bookmarkService = new BookmarkServiceMock();
  const customerDetailService = new CustomerDetailServiceMock();
  const customerSectionPage = new CustomerSectionPage();
  const customerSectionService = new CustomerSectionServiceMock();
  const registrationContractService = new ContractSectionServiceMock();
  const contractSectionPage = new ContractSectionPage();
  const deviceSectionPage = new DeviceSectionPage();
  const deviceSectionService = new DeviceSectionServiceMock();

  const registrationStatusService = new RegistrationStatusServiceMock();
  const registrationStatusPage = new RegistrationStatusPage();

  const RECIPIENT_INPUT_NAME = 'invoice-recipient-input';
  const POSTAL_CODE_INPUT_NAME = 'invoice-postal-code-input';
  const ADDRESS_DETAIL_INPUT_NAME = 'invoice-address-detail-input';
  const PAYMENT_NAME_INPUT_NAME = 'invoice-payment-name-input';
  const BIRTH_DATE_INPUT_NAME = 'invoice-birth-date-input';

  const DEVICE_PAYMENT_TYPE = 'device-payment-type';
  const DEVICE_PAYMENT_MODAL = 'device-payment-modal';

  const USER_ID = 'user1';

  const setupInitialData = () => {
    // 초기 셋업
    mockAuthStore();
    bookmarkService.successWhenGetBookmarkList();
    customerDetailService.successWhenGetCustomerContracts();

    // 먼저 마운트 하는 데이터 셋업
    registrationContractService.successWhenGetServices();
    registrationContractService.successWhenGetAdditionalServices();
  };

  const setupCustomerSection = () => {
    // 고객정보 입력
    invoiceSectionPage.visit();
    invoiceSectionPage.clickMenuButton();
    invoiceSectionPage.clickCustomerSectionButton('신규가입');
    customerSectionPage.typeNameField('홍길동');
    customerSectionPage.typeRrnoField('9001011234567');
    customerSectionPage.checkPersonalInfoConsent();
    customerSectionPage.clickVerificationButton();
    customerSectionService.successWhenCustomerNameVerification('Y');
    customerSectionService.successWhenCreateCustomer();
    customerSectionPage.typeRrnoIssueDateField('20230101');
    customerSectionPage.checkIdentityVerificationConsent();
    customerSectionPage.clickVerificationAuthButton();
    customerSectionPage.clickVerificationConfirmButton();
    customerSectionService.successWhenGetAvailableCustomerContract(2);

    // 실명인증
    invoiceService.successWhenGetInvoiceList();
    customerSectionPage.clickVerificationCheckButton();
  };

  const setupInvoiceSection = () => {
    // 청구정보 입력
    invoiceSectionPage.clickPaymentMethodRadio('GIRO');
    invoiceSectionPage.typeInputField(RECIPIENT_INPUT_NAME, '홍길동');
    invoiceSectionPage.typeInputField(POSTAL_CODE_INPUT_NAME, '11111');
    invoiceSectionPage.typeInvoiceAddressInput('경기도 포천시 오남로 100');
    invoiceSectionPage.typeInputField(ADDRESS_DETAIL_INPUT_NAME, '1호');
    invoiceSectionPage.typeInputField(PAYMENT_NAME_INPUT_NAME, '홍길동');
    invoiceSectionPage.typeInputField(BIRTH_DATE_INPUT_NAME, '111111');
    invoiceService.successWhenSaveInvoice();
    invoiceService.successWhenGetInvoiceList();
    invoiceSectionPage.clickInvoiceCreateButton();
  };

  const setupContractSection = () => {
    // 판매정보 입력
    contractSectionPage.completeSalesSection();

    // 가입정보 입력
    contractSectionPage.focusOnEndPhoneNumber();
    contractSectionPage.typeEndPhoneNumberInputField('0010');
    contractSectionPage.focusOutEndPhoneNumber();
    registrationContractService.successWhenGetAvailablePhoneNumber('0010', 'NEW_SUBSCRIPTION0');
    contractSectionPage.clickSelectPhoneNumberButton();
    registrationContractService.successWhenClaimAvailablePhoneNumber();
    contractSectionPage.selectAvailablePhoneNumber(0);
    contractSectionPage.clickConfirmAvailablePhoneNumberButton();
    contractSectionPage.typeSIMInputField('1234567890123456789');
    registrationContractService.successWhenGetDeviceModelByIMEI();
    contractSectionPage.focusOnIMEIInput();
    contractSectionPage.typeIMEIInputField('1234567890');
    contractSectionPage.focusOutIMEIInput();
    contractSectionPage.clickServiceSelectIcon();
    contractSectionPage.clickSelectServiceRadioButton(0);
    contractSectionPage.clickConfirmServiceButton();
  };

  const setupDeviceSection = () => {
    // 결제정보 입력
    deviceSectionPage.clickDevicePaymentTypeRadio(DEVICE_PAYMENT_TYPE, 'installment');
    deviceSectionService.successWhenGetDeviceModelByIMEI();
    deviceSectionPage.clickDevicePaymentInputButton();
    deviceSectionPage.clickDevicePaymentModalConfirmButton(DEVICE_PAYMENT_MODAL, 'installment');
  };

  const setupCompleteRegistration = () => {
    setupInitialData();
    setupCustomerSection();
    setupInvoiceSection();
    setupContractSection();
    setupDeviceSection();
  };

  // 1. 테스트 전 인증 상태 설정 및 북마크 설정 (전체 테스트 시작 전 한 번만 실행)
  before(() => {
    setupCompleteRegistration();
  });

  it('KAN-39-1 저장 버튼을 클릭 했을 때 가입 후 안내 화면으로 이동해야 한다', () => {
    registrationStatusService.successWhenGetRegistrationStatus(USER_ID);
    service.successWhenRegistration();

    page.clickSaveButton();
    page.assertRegistrationPending();
    page.assertEmailToggleDisabled();
  });

  describe('KAN-39-2 가입처리가 완료 되었을 때', () => {
    it('KAN-39-2-1 이메일 발송 토글 버튼이 활성화 되어야 한다', () => {
      registrationStatusService.successWhenGetRegistrationStatus(
        USER_ID,
        REGISTRATION_STATUS.PENDING,
        REGISTRATION_STATUS.COMPLETED,
      );
      registrationStatusPage.startGetRegistrationStatus();
      cy.wait('@registrationStatusRequest');

      // 가입 처리 완료 상태 확인
      page.assertRegistrationCompleted();

      // 이메일 발송 토글 버튼 활성화 확인
      page.assertEmailToggleEnabled();

      registrationStatusPage.endGetRegistrationStatus();
    });

    it('KAN-39-2-2 고객조회로 이동 버튼이 보여야 한다', () => {
      // 고객조회로 이동 버튼 표시 확인
      page.assertGoCustomerSearchButtonVisible();
    });
  });

  describe('KAN-39-3 이메일 발송 기능 테스트', () => {
    it('KAN-39-3-1 이메일 발송 토글 버튼을 클릭 했을 때 이메일 주소 입력 창이 활성화 되어야 한다', () => {
      // 이메일 발송 토글 버튼 활성화
      page.toggleEmailSending(true);

      // 이메일 입력 필드 활성화 확인
      page.assertEmailInputEnabled();
    });

    it('KAN-39-3-2 이메일 주소를 입력하고 발송하기 버튼을 클릭 했을 때 성공 안내 메시지가 보여야 한다', () => {
      // 중요: 먼저 Mock 설정을 해야 합니다
      // 이메일 발송 성공 Mock 설정
      service.successWhenSendEmail();

      // 이메일 주소 입력
      page.inputEmailAddress('test');

      // 이메일 도메인 선택 (예: gmail.com)
      page.selectEmailDomain('gmail.com');

      // 이메일 발송 버튼 클릭
      page.clickSendEmailButton();

      // 이메일 발송 API 호출 대기
      cy.wait('@emailRequest');

      // 이메일 발송 성공 메시지 확인
      page.assertToastVisible();

      page.assertToastMessage('이메일 발송이 완료되었습니다.');
    });

    it('KAN-39-3-3 직접 입력으로 이메일 주소를 입력하고 발송하기 버튼을 클릭 했을 때 성공 안내 메시지가 보여야 한다', () => {
      // 이메일 발송 성공 Mock 설정
      service.successWhenSendEmail();

      // 직접입력 옵션 선택
      page.selectEmailDomain('직접입력');

      // 이메일 도메인 직접 입력
      page.inputCustomEmailDomain('example.com');

      // 이메일 발송 버튼 클릭
      page.clickSendEmailButton();

      // 이메일 발송 API 호출 대기
      cy.wait('@emailRequest');

      // 이메일 발송 성공 메시지 확인
      page.assertToastVisible();

      page.assertToastMessage('이메일 발송이 완료되었습니다.');
    });
  });

  describe('KAN-39-4 화면 이동 테스트', () => {
    describe('KAN-39-4 홈으로 이동 버튼을 클릭 했을 때', () => {
      it('KAN-39-4-1 LNB와 MDI를 닫고 홈 화면으로 이동해야 한다', () => {
        page.assertHomeButtonRedirectsAndClosesMenus();
      });
    });

    describe('KAN-39-4 고객조회로 이동 버튼을 클릭 했을 때 ', () => {
      before(() => {
        service.successWhenRegistration();
        registrationStatusService.successWhenGetRegistrationStatus(
          USER_ID,
          REGISTRATION_STATUS.PENDING,
          REGISTRATION_STATUS.COMPLETED,
        );

        setupCompleteRegistration();

        page.clickSaveButton();

        cy.wait('@registrationRequest');
        cy.wait('@registrationStatusRequest');
      });

      it('KAN-39-4-2 신규가입 탭을 닫고 고객조회 탭으로 이동해야 한다', () => {
        // 고객 조회 결과 Mock 설정
        service.successWhenFetchCustomerDetail();

        // 고객 조회 API 모킹 설정
        service.successWhenFetchCustomer();

        // 고객조회로 이동 버튼 클릭
        page.clickGoCustomerSearchButton();

        // 고객 조회 API 호출 대기
        cy.wait('@customerRequest');

        // 고객 조회 결과 Mock 호출 대기
        cy.wait('@customerResultRequest');

        // 고객조회 탭이 활성화되었는지 확인
        page.assertCustomerSearchTabActive();
      });
    });
  });
});
