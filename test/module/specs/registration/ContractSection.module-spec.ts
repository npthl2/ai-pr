import ContractSectionServiceMock from '../../mock/registration/ContractSectionServiceMock';
import ContractSectionPage from '../../../pages/registration/ContractSectionPage';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';
import CustomerSectionPage from '../../../pages/registration/CustomerSectionPage';
import CustomerSectionServiceMock from '../../mock/registration/CustomerSectionServiceMock';
import InvoiceSectionServiceMock from '../../mock/registration/InvoiceSectionServiceMock';
import InvoiceSectionPage from '../../../pages/registration/InvoiceSectionPage';

describe('KAN-38 가입정보 확인', () => {
  const page = new ContractSectionPage();
  const service = new ContractSectionServiceMock();
  const bookmarkService = new BookmarkServiceMock();
  const customerSectionPage = new CustomerSectionPage();
  const customerSectionService = new CustomerSectionServiceMock();
  const invoiceSectionPage = new InvoiceSectionPage();
  const invoiceSectionService = new InvoiceSectionServiceMock();

  before(() => {
    // 초기 셋업
    mockAuthStore();
    bookmarkService.successWhenGetBookmarkList();

    // 먼저 마운트 하는 데이터 셋업
    service.successWhenGetServices();
    service.successWhenGetAdditionalServices();

    // 고객정보 입력
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

    // 판매정보 진행
    page.completeSalesSection();

    // 가입정보 섹션 확인 - 초기값
    page.assertComponentToBeVisible('contract-section');
    page.assertContractSectionToBeExpanded();
  });

  it('KAN-38-1 전화번호 4자리 숫자를 입력하면 번호채번 버튼이 활성화된다', () => {
    // 버튼 비활성화 선체크
    page.assertSelectPhoneNumberButtonDisabled();
    page.focusOnEndPhoneNumber();
    page.typeEndPhoneNumberInputField('0010');
    page.focusOutEndPhoneNumber();
    page.assertSelectPhoneNumberButtonEnabled();
  });

  it('KAN-38-2 번호채번 모달을 누르면 선점가능한 번호 리스트가 보인다', () => {
    // 왜 안함?
    service.successWhenGetAvailablePhoneNumber('0010', 'NEW_SUBSCRIPTION0');
    page.clickSelectPhoneNumberButton();
    page.assertComponentToBeVisible('select-phone-number-modal');
    page.assertAvailablePhoneNumberListed();
  });

  it('KAN-38-3 번호 선택 시 번호채번 버튼 옆에 해당 번호가 기재된다', () => {
    service.successWhenClaimAvailablePhoneNumber();
    page.selectAvailablePhoneNumber(0).then((phoneNumber) => {
      page.clickConfirmAvailablePhoneNumberButton();
      page.assertSelectedPhoneNumberToBeVisible(phoneNumber);
    });
  });

  it('KAN-38-4 SIM은 숫자형태 13자리로 입력 가능하다', () => {
    page.focusOnSIMInput();
    page.typeSIMInputField('1234567890123');
    page.focusOutSIMInput();
  });

  it('KAN-38-5 IMEI를 입력 후 focus out하면 모델명이 보인다. 모델명이 없없을 경우 에러 메시지가 확인된다', () => {
    service.failWhenGetDeviceModelByIMEI();
    service.successWhenGetDeviceModelByIMEI();

    page.focusOnIMEIInput();
    page.typeIMEIInputField('123456');

    page.focusOutIMEIInput();
    page.assertModleNameErrorTypoToBeVisible('존재하는 모델이 없습니다');

    page.focusOnIMEIInput();
    page.typeIMEIInputField('1234567890');

    page.focusOutIMEIInput();
    page.assertModleNameTypoToBeVisible('iPhone 16');
  });

  it('KAN-38-6 요금제 미 선택 시 부가서비스 버튼은 비활성화 되어있다', () => {
    page.assertAdditionalServiceButtonDisabled();
  });

  it('KAN-38-7 요금제 아이콘을 클릭하면 요금제 목록이 1개 이상 보인다', () => {
    page.clickServiceSelectIcon();
    page.assertServiceSelectModalToBeVisible();
    page.assertServiceSelectTableRowToBeVisible();
  });

  it('KAN-38-8 요금제명을 검색 가능하다', () => {
    page.typeServiceSelectSearchInputField('5G');
    page.clickServiceSelectSearchButton();
    page.assertSearchResultToBeVisible('5G');
  });

  it('KAN-38-9 요금제를 선택하면 화면은 닫히고 요금제 옆에 해당요금제의 가격이 보인다', () => {
    page.clickSelectServiceRadioButton(0);
    page.clickConfirmServiceButton();
    page.assertSelectServiceValueToBeVisible('10,000원');
  });

  it('KAN-38-10 부가서비스 버튼을 클릭하면 부가서비스 목록이 보이며, 검색 가능하다', () => {
    page.clickServiceAdditionalSelectIcon();
    page.assertComponentToBeVisible('additional-service-select-modal');
  });

  it('KAN-38-11 부가서비스는 여러개 선택이 가능하며, 배타 부가서비스의 경우 경고창이 표시된다', () => {
    service.successWhenCheckExclusiveServiceFalse();

    page.clickAdditionalService(0);
    page.clickAdditionalService(4);

    service.successWhenCheckExclusiveServiceTrue();
    page.clickAdditionalService(1);
    page.assertComponentToBeVisible('additional-service-exclusive-alert');
  });

  it('KAN-38-11 선택한 부가서비스들은 버튼 하단에 칩으로 보이며, 삭제할 수 있다', () => {
    page.clickConfirmAdditionalService();
    page.assertAdditionalServiceChipToBeVisible();

    page.clickDeleteAdditionalServiceChip(1);
    page.clickDeleteAdditionalServiceChip(0);
    page.assertAdditionalServiceChipToBeInvisible();
  });

  it('KAN-38-12 요금제 텍스트필드 수정 후 새로운 요금제를 선택하지 않고 focus out 시 에러메시지가 뜨며, 요금제와 부가서비스가 사라진다다', () => {
    // 요금제 텍스트 필드 수정 후 포커스아웃
    page.focusOnServiceSearchTextField();
    page.typeServiceSearchTextField('5G');
    page.focusOutServiceSearchTextField();
    // 에러메시지 확인
    page.expectServiceSelectErrorMessageToBeVisible('요금제를 선택해주세요');

    // 선택된 내용들 사라짐
    page.assertSelectServiceValueToBeInvisible();
    page.assertAdditionalServiceChipToBeInvisible();
  });

  it('KAN-38-13 요금제 텍스트필드에서 입력하고 검색 아이콘을 클릭하면 알맞은 검색결과가 보인다', () => {
    page.focusOnServiceSearchTextField();
    page.typeServiceSearchTextField('5G');
    page.clickServiceSelectIcon();

    // 5G검색결과가 나옴
    page.assertSearchResultToBeVisible('5G');
  });
});
