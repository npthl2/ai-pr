import InvoiceSectionServiceMock from '../../mock/registration/InvoiceSectionServiceMock';
import InvoiceSectionPage from '../../../pages/registration/InvoiceSectionPage';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';
import CustomerDetailServiceMock from '../../mock/customer/detail/CustomerDetailServiceMock';

const CUSTOMER_SECTION_NAME = 'NEW_SUBSCRIPTION0-section-customer';
const INVOICE_SEARCH_MODAL_NAME = 'invoice-search-modal';
const ADDRESS_SEARCH_MODAL_NAME = 'address-search-modal';
const INVOICE_ADDRESS_NAME = 'invoice-address';
const INVOICE_LIST_ITEM_NAME = 'invoice-list-item-0';

const RECIPIENT_INPUT_NAME = 'invoice-recipient-input';
const EMAIL_ID_INPUT_NAME = 'invoice-email-id-input';
const EMAIL_DOMAIN_INPUT_NAME = 'invoice-email-domain-input';
const CARD_NUMBER_INPUT_NAME = 'invoice-card-number-input';
const BANK_ACCOUNT_INPUT_NAME = 'invoice-bank-account-input';
const POSTAL_CODE_INPUT_NAME = 'invoice-postal-code-input';
const ADDRESS_DETAIL_INPUT_NAME = 'invoice-address-detail-input';
const PAYMENT_NAME_INPUT_NAME = 'invoice-payment-name-input';
const BIRTH_DATE_INPUT_NAME = 'invoice-birth-date-input';

const EMAIL_DOMAIN_TYPE_SELECT_NAME = 'invoice-email-domain-type-select';
const CARD_COMPANY_SELECT_NAME = 'invoice-card-company-select';
const BANK_COMPANY_SELECT_NAME = 'invoice-bank-company-select';

describe('KAN-7 신규가입 진입', () => {
  const page = new InvoiceSectionPage();
  const service = new InvoiceSectionServiceMock();
  const bookmarkService = new BookmarkServiceMock();
  const customerDetailService = new CustomerDetailServiceMock();

  before(() => {
    // 초기 셋업
    mockAuthStore();
    bookmarkService.successWhenGetBookmarkList();
    customerDetailService.successWhenGetCustomerContracts();

    // 고객정보 입력
    page.visit();
    page.clickMenuButton();
    page.clickCustomerSectionButton('신규가입');
    page.assertComponentToBeVisible(CUSTOMER_SECTION_NAME);
    page.assertCustomerSectionToBeExpanded();

    // 실명인증
    service.successWhenGetInvoiceList();
    page.clickNameVerificationButton();
    page.assertInvoiceSectionToBeExpanded();
    page.assertInvoiceSearchButtonEnabled();
    page.assertInvoiceCreateButtonDisabled();
  });

  // 청구정보 있는 경우
  it('KAN-37-1 기존의 청구정보가 있는 경우 청구정보조회 버튼 클릭시 청구정보조회 모달이 열린다', () => {
    page.clickInvoiceSearchButton();
    page.assertComponentToBeVisible(INVOICE_SEARCH_MODAL_NAME);
    page.assertComponentToBeVisible(INVOICE_LIST_ITEM_NAME);
  });

  it('KAN-37-2 청구정보조회 모달에서 청구정보를 선택하고 선택버튼을 눌렀을때 모달이 닫히며 청구정보영역에 청구정보가 보인다', () => {
    page.clickInvoiceListItemRadio(0);
    page.clickModalConfirmButton();
    page.assertInvoiceSearchModalToBeClosed();
    page.assertComponentToBeInvisible(RECIPIENT_INPUT_NAME);
    page.assertComponentToBeVisible(INVOICE_ADDRESS_NAME);
    page.assertSalesSectionToBeExpanded();
  });

  it('KAN-37-3 청구정보가 없는 경우 청구정보조회 버튼이 비활성화 된다.', () => {
    // 재진입
    bookmarkService.successWhenGetBookmarkList();
    customerDetailService.successWhenGetCustomerContracts();
    page.visit();
    page.clickMenuButton();
    page.clickCustomerSectionButton('신규가입');

    // 청구정보 없는 경우
    page.assertComponentToBeVisible(CUSTOMER_SECTION_NAME);
    service.successWhenGetEmptyInvoiceList();
    page.clickNameVerificationButton();
    page.assertInvoiceSectionToBeExpanded();
    page.assertInvoiceSearchButtonDisabled();
    page.assertInvoiceCreateButtonDisabled();
  });

  it('KAN-37-4 발송형태를 이메일로 변경했을때 이메일 입력 영역이 보인다', () => {
    page.clickInvoiceTypeRadio('EMAIL');
    page.assertComponentToBeVisible(EMAIL_ID_INPUT_NAME);
    page.assertComponentToBeVisible(EMAIL_DOMAIN_TYPE_SELECT_NAME);
    page.assertComponentToBeVisible(EMAIL_DOMAIN_INPUT_NAME);
  });

  it('KAN-37-5 발송형태를 모바일로 변경했을때 이메일 입력 영역이 사라진다', () => {
    page.clickInvoiceTypeRadio('MOBILE');
    page.assertComponentToBeInvisible(EMAIL_ID_INPUT_NAME);
    page.assertComponentToBeInvisible(EMAIL_DOMAIN_TYPE_SELECT_NAME);
    page.assertComponentToBeInvisible(EMAIL_DOMAIN_INPUT_NAME);
  });

  it('KAN-37-6 납부방법을 카드로 변경했을때 카드정보 입력 영역이 보인다', () => {
    page.clickPaymentMethodRadio('CARD');
    page.assertComponentToBeVisible(CARD_COMPANY_SELECT_NAME);
    page.assertComponentToBeVisible(CARD_NUMBER_INPUT_NAME);
  });

  it('KAN-37-7 납부방법을 지로로 변경했을때 카드정보 입력 영역이 사라진다', () => {
    page.clickPaymentMethodRadio('GIRO');
    page.assertComponentToBeInvisible(CARD_COMPANY_SELECT_NAME);
    page.assertComponentToBeInvisible(CARD_NUMBER_INPUT_NAME);
    page.assertComponentToBeInvisible(BANK_COMPANY_SELECT_NAME);
    page.assertComponentToBeInvisible(BANK_ACCOUNT_INPUT_NAME);
  });

  it('KAN-37-8 납부방법을 은행으로 변경했을때 은행계좌정보 입력 영역이 보인다', () => {
    page.clickPaymentMethodRadio('BANK');
    page.assertComponentToBeVisible(BANK_COMPANY_SELECT_NAME);
    page.assertComponentToBeVisible(BANK_ACCOUNT_INPUT_NAME);
  });

  it('KAN-37-9 청구주소 검색버튼을 클릭했을때 주소검색 모달이 열린다', () => {
    page.clickInvoicePostalCodeSearchIcon();
    page.assertComponentToBeVisible(ADDRESS_SEARCH_MODAL_NAME);
  });

  it('KAN-37-10 정보를 입력하고 청구정보생성완료 버튼을 클릭했을때 입력한 정보가 보이고 청구정보조회 버튼이 disalble 상태가 되며 청구정보생성완료 버튼이 사라진다.', () => {
    // 사용자 입력으로 동작시키기 위해서 모달을 닫고 입력을 진행한다.
    page.clickDialogCloseButton();
    page.assertComponentToBeInvisible(ADDRESS_SEARCH_MODAL_NAME);

    // 데이터 입력
    page.typeInputField(RECIPIENT_INPUT_NAME, '홍길동');
    page.typeInputField(POSTAL_CODE_INPUT_NAME, '11111');

    // disabled인 입력 필드라서 속성 조작후 입력
    page.typeInvoiceAddressInput('서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층');

    page.typeInputField(ADDRESS_DETAIL_INPUT_NAME, '101호');
    page.typeInputField(PAYMENT_NAME_INPUT_NAME, '홍길동');
    page.typeInputField(BIRTH_DATE_INPUT_NAME, '111111');
    page.clickBankCompanySelectField();
    page.clickBankCompanyMenuItem('KB');
    page.typeInputField(BANK_ACCOUNT_INPUT_NAME, '1234567890');

    // 입력 후 청구정보생성완료 버튼을 클릭한다.
    service.successWhenSaveInvoice();
    service.successWhenGetInvoiceList();
    page.clickInvoiceCreateButton();

    // 토스트 메시지 확인
    page.assertToastVisible();
    page.assertToastMessage('청구정보가 생성되었습니다.');

    // 저장후 화면변경 확인
    page.assertComponentToBeInvisible(RECIPIENT_INPUT_NAME);
    page.assertComponentToBeVisible(INVOICE_ADDRESS_NAME);
    page.assertSalesSectionToBeExpanded();
    page.assertTemporarySaveButtonEnabled();
  });
});
