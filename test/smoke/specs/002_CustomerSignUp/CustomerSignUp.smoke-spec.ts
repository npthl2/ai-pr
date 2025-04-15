import CustomerSignUpPage from '../../pages/CustomerSignUpPage';
import LoginPage from '../../pages/LoginPage';

const MENU_NAME = 'menu-button';
const REGISTRATION_BUTTON_NAME = 'menu-item-신규가입';
const CUSTOMER_NAME = '가무토';
const CUSTOMER_RRNO = '8501011099999';
const SALES_DEPARTMENT = '경복대리점';
const END_PHONE_NUMBER = '0001';
// 고객정보 영역
const CUSTOMER_NAME_INPUT_NAME = 'name-field';
const CUSTOMER_RRNO_INPUT_NAME = 'rrno-field';
const CUSTOMER_PERSONAL_INFO_CONSENT_NAME = 'personal-info-consent';
const CUSTOMER_IDENTITY_VERIFICATION_CONSENT_NAME = 'identity-verification-consent';
const CUSTOMER_VERIFICATION_AUTH_BUTTON_NAME = 'verification-auth-button';
const CUSTOMET_VERIFICATION_BUTTON_NAME = 'verification-button';
const CUSTOMER_RRNO_ISSUE_DATE_FIELD_NAME = 'rrno-issue-date-field';
const CUSTOMER_VERIFICATION_CONFIRM_BUTTON_NAME = 'component-dialog-confirm-button';
const CUSTOMER_VERIFICATION_CHECK_BUTTON_NAME = 'verification-check-button';
// 청구정보 영역
const INVOICE_RECIPIENT_INPUT_NAME = 'invoice-recipient-input';
const INVOICE_TYPE_RADIO_NAME = 'invoice-type-radio-MOBILE';
const INVOICE_POSTAL_CODE_INPUT_NAME = 'invoice-postal-code-input';
const INVOICE_ADDRESS_DETAIL_INPUT_NAME = 'invoice-address-detail-input';
const INVOICE_BANK_COMPANY_SELECT_NAME = 'invoice-bank-company-select';
const INVOICE_BANK_COMPANY_MENU_ITEM_KB_NAME = 'invoice-bank-company-menu-item-KB';
const INVOICE_BANK_ACCOUNT_INPUT_NAME = 'invoice-bank-account-input';
const INVOICE_PAYMENT_NAME_INPUT_NAME = 'invoice-payment-name-input';
const INVOICE_BIRTH_DATE_INPUT_NAME = 'invoice-birth-date-input';
const INVOICE_CREATE_BUTTON_NAME = 'invoice-create-button';
// 판매정보 영역
const SALES_DEPARTMENT_INPUT_NAME = 'sales-department-input';
const SALES_CONTRACT_POINT_INPUT_NAME = 'sales-contact-point-input';
// 가입정보 영역
const CONTRACT_END_PHONE_NUMBER_INPUT_NAME = 'end-phone-number-input';
const CONTRACT_SELECT_PHONE_NUMBER_BUTTON_NAME = 'select-phone-number-button';
const CONTRACT_PHONE_NUMBER_RADIO_NAME = 'phone-number-radio-1';
const CONTRACT_CONFIRM_AVAILABLE_PHONE_NUMBER_BUTTON_NAME = 'confirm-available-phone-number-button';
const CONTRACT_SIM_INPUT_NAME = 'SIM-input';
const CONTRACT_IMEI_INPUT_NAME = 'IMEI-input';
const CONTRACT_SELECT_SERVICE_ICON_NAME = 'service-select-icon';
const CONTRACT_SELECT_SERVICE_RADIO_NAME = 'service-select-radio-0';
const CONTRACT_CONFIRM_SERVICE_BUTTON_NAME = 'confirm-service-button';
// 단말기정보 영역
const DEVICE_PAYMENT_INPUT_BUTTON_NAME = 'device-payment-input-button';
const DEVICE_PAYMENT_CREATE_BUTTON_NAME = 'device-payment-modal-installment-confirm-button';
// 가입 영역
const REGISTRATION_SAVE_BUTTON_NAME = 'save-button';

describe('002. 신규고객 생성 시나리오 테스트', () => {
    const page = new CustomerSignUpPage();
    const loginPage = new LoginPage();

    before(() => {
        loginPage.visitLoginPage();
        loginPage.inputId('smoketestagent');
        loginPage.inputPw('smoke1q2w3e4r');
        loginPage.clickLoginButton();
    });

    it('LNB 메뉴에서 신규 가입 버튼을 클릭해서 신규가입 화면으로 이동한다.', () => {
        page.visit();
        page.clickComponent(MENU_NAME);
        page.clickComponent(REGISTRATION_BUTTON_NAME);
        // 신규가입 화면 확인
        page.expectNewSubscriptionTabToBeVisible();
    });

    it('고객정보 입력했을 때 청구정보로 이동한다.', () => {
        // 고객정보 입력
        page.typeInputComponent(CUSTOMER_NAME_INPUT_NAME, CUSTOMER_NAME);
        page.typeInputComponent(CUSTOMER_RRNO_INPUT_NAME, CUSTOMER_RRNO);
        page.checkInputComponent(CUSTOMER_PERSONAL_INFO_CONSENT_NAME);
        page.clickComponent(CUSTOMET_VERIFICATION_BUTTON_NAME);
        // 실명인증 정보 입력
        page.typeInputComponent(CUSTOMER_RRNO_ISSUE_DATE_FIELD_NAME, '20230101');
        page.checkInputComponent(CUSTOMER_IDENTITY_VERIFICATION_CONSENT_NAME);
        page.clickComponent(CUSTOMER_VERIFICATION_AUTH_BUTTON_NAME);
        // 실명인증 확인 버튼 클릭
        page.clickComponent(CUSTOMER_VERIFICATION_CONFIRM_BUTTON_NAME);
        // 고객정보 사전체크 클릭
        page.clickComponent(CUSTOMER_VERIFICATION_CHECK_BUTTON_NAME);
        // 청구정보 영역 확인
        page.expectInvoiceSectionToBeVisible();
    });

    it('청구정보의 필수정보를 모두 입력했을 때 요약에 청구정보가 표시된다.', () => {
        page.typeComponent(INVOICE_RECIPIENT_INPUT_NAME, CUSTOMER_NAME);
        page.clickComponent(INVOICE_TYPE_RADIO_NAME);
        page.typeComponent(INVOICE_POSTAL_CODE_INPUT_NAME, '03142');
        //TO-DO: 카카오 iframe 제어 후 원복: page.clickComponent(INVOICE_POSTAL_CODE_SEARCH_ICON_NAME);
        // disabled인 입력 필드라서 속성 조작후 입력
        page.typeInvoiceAddressInput('서울 종로구 종로1길 50 (더케이트윈타워)');
        page.typeInputComponent(INVOICE_ADDRESS_DETAIL_INPUT_NAME, '2층');

        page.clickComponent(INVOICE_BANK_COMPANY_SELECT_NAME);
        page.clickComponent(INVOICE_BANK_COMPANY_MENU_ITEM_KB_NAME);
        page.typeInputComponent(INVOICE_BANK_ACCOUNT_INPUT_NAME, '1234567890');

        page.typeInputComponent(INVOICE_PAYMENT_NAME_INPUT_NAME, CUSTOMER_NAME);
        page.typeInputComponent(INVOICE_BIRTH_DATE_INPUT_NAME, '850101');

        page.clickComponent(INVOICE_CREATE_BUTTON_NAME);
        // 가입정보 요약의 청구정보 내용 확인
        page.expectInvoiceSummaryRecipientInputToBeInputValue(CUSTOMER_NAME);
        page.expectInvoiceSummaryPaymentMethodInputToBeInputValue('은행계좌 자동이체');
    });

    it('판매정보의 필수정보를 모두 입력했을 때 요약에 판매정보가 표시된다.', () => {
        page.typeInputComponent(SALES_DEPARTMENT_INPUT_NAME, SALES_DEPARTMENT);
        page.clickComponent(SALES_CONTRACT_POINT_INPUT_NAME);
        // 판매정보 요약의 판매정보 내용 확인
        page.expectSalesSummarySalesDepartmentInputToBeInputValue(SALES_DEPARTMENT);
    });

    it('가입정보의 필수정보를 모두 입력했을 때 요약에 가입정보가 표시된다.', () => {
        page.typeInputComponent(CONTRACT_END_PHONE_NUMBER_INPUT_NAME, END_PHONE_NUMBER);
        page.clickComponent(CONTRACT_SELECT_PHONE_NUMBER_BUTTON_NAME);
        page.clickComponent(CONTRACT_PHONE_NUMBER_RADIO_NAME);
        page.clickComponent(CONTRACT_CONFIRM_AVAILABLE_PHONE_NUMBER_BUTTON_NAME);

        page.typeInputComponent(CONTRACT_SIM_INPUT_NAME, '1234567890123');
        page.typeInputComponent(CONTRACT_IMEI_INPUT_NAME, '1234567890');

        page.clickComponent(CONTRACT_SELECT_SERVICE_ICON_NAME);
        page.clickComponent(CONTRACT_SELECT_SERVICE_RADIO_NAME);
        page.clickComponent(CONTRACT_CONFIRM_SERVICE_BUTTON_NAME);
        // 가입정보 요약의 가입정보 내용 확인
        page.expectContractSummaryInputToBeSelectedService();
    });

    it('단말기정보의 필수정보를 모두 입력했을 때 요약에 단말기정보가 표시된다.', () => {
        page.clickComponent(DEVICE_PAYMENT_INPUT_BUTTON_NAME);
        page.setDevicePaymentInfo();
        page.clickComponent(DEVICE_PAYMENT_CREATE_BUTTON_NAME);
        // 단말기정보 요약의 단말기정보 내용 확인
        page.expectDeviceSummarySalesPriceToBe();
    });

    it('저장 버튼 클릭 했을 때 신규 가입 진행 중 페이지로 이동한다.', () => {
        page.clickComponent(REGISTRATION_SAVE_BUTTON_NAME);
        page.assertRegistrationPending();
    });

    /*
    it('가입처리 완료 됐을 때 안내 문구 변경 및 토스트 메시지가 표시된다.', () => {
        page.clickCustomerSectionButton('가입처리');
        page.expectNewSubscriptionTabToBeVisible();
    });

    it('플로팅 버튼에 진행 사항이 표시된다.', () => {
        page.clickCustomerSectionButton('플로팅 버튼');
        page.expectNewSubscriptionTabToBeVisible();
    });

    it('고객조회로 이동 버튼 클릭했을 때 신규 고객 조회된 상태로 고객조회 페이지로 이동한다.', () => {
        page.clickCustomerSectionButton('고객조회로 이동');
        page.expectNewSubscriptionTabToBeVisible();
    });
    */

});
