import SalesSectionPage from '../../../pages/registration/SalesSectionPage';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';
import ContractSectionServiceMock from '../../mock/registration/ContractSectionServiceMock';
import CustomerSectionPage from '../../../pages/registration/CustomerSectionPage';
import CustomerSectionServiceMock from '../../mock/registration/CustomerSectionServiceMock';
import InvoiceSectionPage from '../../../pages/registration/InvoiceSectionPage';
import InvoiceSectionServiceMock from '../../mock/registration/InvoiceSectionServiceMock';

describe('KAN-38  판매정보 확인', () => {
  const page = new SalesSectionPage();
  const bookmarkService = new BookmarkServiceMock();
  const registrationContractService = new ContractSectionServiceMock();
  const customerSectionPage = new CustomerSectionPage();
  const customerSectionService = new CustomerSectionServiceMock();
  const invoiceSectionPage = new InvoiceSectionPage();
  const invoiceSectionService = new InvoiceSectionServiceMock();

  before(() => {
    // 초기 셋업
    mockAuthStore();
    bookmarkService.successWhenGetBookmarkList();

    // 먼저 마운트 하는 데이터 셋업
    registrationContractService.successWhenGetServices();
    registrationContractService.successWhenGetAdditionalServices();

    // 신규가입 아코디언 화면 진입
    page.visit();
    page.clickMenuButton();
    page.clickCustomerSectionButton('신규가입');
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
    invoiceSectionService.successWhenGetInvoiceList();
    customerSectionPage.clickVerificationCheckButton();

    // 청구정보 입력
    invoiceSectionPage.assertComponentToBeInvisible('address-search-modal');
    invoiceSectionPage.typeInputField('invoice-recipient-input', '홍길동');
    invoiceSectionPage.typeInputField('invoice-postal-code-input', '11111');
    invoiceSectionPage.typeInvoiceAddressInput('서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층');
    invoiceSectionPage.typeInputField('invoice-address-detail-input', '101호');
    invoiceSectionPage.typeInputField('invoice-payment-name-input', '홍길동');
    invoiceSectionPage.typeInputField('invoice-birth-date-input', '111111');
    invoiceSectionPage.clickBankCompanySelectField();
    invoiceSectionPage.clickBankCompanyMenuItem('KB');
    invoiceSectionPage.typeInputField('invoice-bank-account-input', '1234567890');
    invoiceSectionService.successWhenSaveInvoice();
    invoiceSectionService.successWhenGetInvoiceList();
    invoiceSectionPage.clickInvoiceCreateButton();    

    // 가입정보 섹션 확인 - 초기값
    page.assertComponentToBeVisible('sales-section');
    page.assertSalesSectionToBeExpanded();
  });

  it('KAN-38-1 판매처가 포커스 되어있다', () => {
    page.isFocusedOnSalesDepartmentInput();
  });

  it('KAN-38-2 판매처 입력 후 focust out하면 가입정보 섹션이 보인다', () => {
    page.typeSalesDepartmentInput('test');
    page.assertContractSectionToBeExpanded();
  });

  it('KAN-38-3 모두 10자리까지만 입력된다', () => {
    page.typeSalesComponentInputSuccess('sales-contact-point-input');
    page.typeSalesComponentInputSuccess('finalseller-input');
    page.typeSalesComponentInputSuccess('supporter-input');

    page.typeSalesComponentInputOver10('sales-contact-point-input');
    page.typeSalesComponentInputOver10('finalseller-input');
    page.typeSalesComponentInputOver10('supporter-input');
  });

  it('KAN-38-4 판매처를 삭제한 채 focusout하면 에러 메시지가 뜬다', () => {
    page.typeSalesDepartmentInputFull('');
    page.assertSalesDepartmentEmptyInputError();
  });
});
