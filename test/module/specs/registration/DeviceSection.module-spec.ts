import InvoiceSectionServiceMock from '../../mock/registration/InvoiceSectionServiceMock';
import InvoiceSectionPage from '../../../pages/registration/InvoiceSectionPage';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';
import CustomerDetailServiceMock from '../../mock/customer/detail/CustomerDetailServiceMock';
import CustomerSectionPage from '../../../pages/registration/CustomerSectionPage';
import CustomerSectionServiceMock from '../../mock/registration/CustomerSectionServiceMock';
import ContractSectionServiceMock from '../../mock/registration/ContractSectionServiceMock';
import ContractSectionPage from '../../../pages/registration/ContractSectionPage';
import DeviceSectionPage from '../../../pages/registration/DeviceSectionPage';
import DeviceSectionServiceMock from '../../mock/registration/DeviceSectionServiceMock';

const RECIPIENT_INPUT_NAME = 'invoice-recipient-input';
const POSTAL_CODE_INPUT_NAME = 'invoice-postal-code-input';
const ADDRESS_DETAIL_INPUT_NAME = 'invoice-address-detail-input';
const PAYMENT_NAME_INPUT_NAME = 'invoice-payment-name-input';
const BIRTH_DATE_INPUT_NAME = 'invoice-birth-date-input';

const DEVICE_PAYMENT_TYPE = 'device-payment-type';
const DEVICE_PAYMENT_MODAL = 'device-payment-modal';

describe('KAN-40 신규가입 - 단말기 결제 정보 입력', () => {
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

  before(() => {
    // 초기 셋업
    mockAuthStore();
    bookmarkService.successWhenGetBookmarkList();
    customerDetailService.successWhenGetCustomerContracts();

    // 먼저 마운트 하는 데이터 셋업
    registrationContractService.successWhenGetServices();
    registrationContractService.successWhenGetAdditionalServices();

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

    // 판매정보 입력
    contractSectionPage.completeSalesSection();

    // 가입정보 입력
    contractSectionPage.focusOnEndPhoneNumber();
    contractSectionPage.typeEndPhoneNumberInputField('0010');
    contractSectionPage.focusOutEndPhoneNumber();
    registrationContractService.successWhenGetAvailablePhoneNumber('0010', 'C-3000000000');
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

    // DeviceSection이 펼쳐진 상태 확인
    // cy.get('[data-testid="NEW_SUBSCRIPTION0-section-device"]').should('be.visible');
  });

  it('KAN-40-1 단말기 결제 정보 영역이 열릴 때 할부 타입 라디오 버튼이 선택되어 있어야 한다.', () => {
    // DeviceSection 할부 타입 라디오 버튼 확인
    deviceSectionPage.assertDeviceInstallmentPaymentOptionSelected();
  });

  it('KAN-40-2 결제 타입을 할부로 선택하고 결제 정보 입력 버튼을 클릭 했을 때 단말기 결제 정보_할부 모달이 보여야 한다', () => {
    deviceSectionPage.clickDevicePaymentTypeRadio(DEVICE_PAYMENT_TYPE, 'installment');
    deviceSectionService.successWhenGetDeviceModelByIMEI();
    deviceSectionPage.clickDevicePaymentInputButton();
    deviceSectionPage.assertDevicePaymentModalToBeVisible(DEVICE_PAYMENT_MODAL, 'installment');
  });

  it('KAN-40-3 단말기 결제 정보_할부 모달이 보일 때 할부원금, 총 할부수수료, 총금액, 월 최종분납금의 초기값이 보여야 한다', () => {
    deviceSectionPage.assertDevicePaymentModalInstallmentDefaultValues();
  });

  it('KAN-40-4 단말기 결제 정보_할부 모달에서 선납금이 변경 될 때 할부원금, 총 할부수수료, 총금액, 월 최종분납금의 변경값이 보여야 한다', () => {
    deviceSectionPage.typeClearField('device-payment-modal-installment-prepaid-price-input');
    deviceSectionPage.typeInputField(
      'device-payment-modal-installment-prepaid-price-input',
      '100000',
    );
    deviceSectionPage.assertDevicePaymentModalInstallmentChangePriceByPrepaidPrice();
  });

  it('KAN-40-5 단말기 결제 정보_할부 모달에서 확인 버튼을 클릭 했을 때 모달이 닫히고 단말기 결제정보 영역에 스폰서유형, 약정기간, 지원방식이 전달되어 보여야한다', () => {
    deviceSectionPage.clickDevicePaymentModalConfirmButton(DEVICE_PAYMENT_MODAL, 'installment');
    deviceSectionPage.assertDevicePaymentModalToBeConfirmedInstallment();
  });

  it('KAN-40-6 결제 타입을 즉납으로 선택하고 결제 정보 입력 버튼을 클릭 했을 때 단말기 결제 정보_즉납 모달이 보여야 한다', () => {
    deviceSectionPage.clickDevicePaymentTypeRadio(DEVICE_PAYMENT_TYPE, 'immediate');
    deviceSectionService.successWhenGetDeviceModelByIMEI();
    deviceSectionPage.clickDevicePaymentInputButton();
    deviceSectionPage.assertDevicePaymentModalToBeVisible(DEVICE_PAYMENT_MODAL, 'immediate');
  });

  it('KAN-40-7 단말기 결제 정보_즉납 모달이 보일 때 공시지원금, 총금액의 초기값이 보여야 한다', () => {
    deviceSectionPage.assertDevicePaymentModalImmediateDefaultValues();
  });

  it('KAN-40-8 단말기 결제 정보_즉납 모달의 지원금 선택에서 선택약정을 선택했을 때 공시지원금 영역이 미표시 되고 총금액이 변경되어야 한다.', () => {
    deviceSectionPage.clickDevicePaymentModalSupportTypeRadio(
      DEVICE_PAYMENT_MODAL,
      'immediate',
      'selected',
    );
    // deviceSectionPage.assertDevicePaymentModalSupportTypeToBeSelected();
    deviceSectionPage.assertComponentToBeInvisible('device-payment-modal-immediate-discount-price');
  });

  it('KAN-40-9 단말기 결제 정보_즉납 모달에서 확인 버튼을 클릭 했을 때 모달이 닫히고 단말기 결제정보 영역에 스폰서유형, 약정기간, 지원방식이 전달되어 보여야한다', () => {
    deviceSectionPage.clickDevicePaymentModalEngagementPeriodRadio(
      DEVICE_PAYMENT_MODAL,
      'immediate',
      '24',
    );
    deviceSectionPage.clickDevicePaymentModalSupportTypeRadio(
      DEVICE_PAYMENT_MODAL,
      'immediate',
      'selected',
    );
    deviceSectionPage.clickDevicePaymentModalConfirmButton(DEVICE_PAYMENT_MODAL, 'immediate');
    deviceSectionPage.assertDevicePaymentModalToBeConfirmedImmediate();
  });
});
