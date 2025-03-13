import ContractSectionServiceMock from '../../mock/registration/ContractSectionServiceMock';
import ContractSectionPage from '../../../pages/registration/ContractSectionPage';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';

describe('KAN-38 가입정보 확인', () => {
  const page = new ContractSectionPage();
  const service = new ContractSectionServiceMock();
  const bookmarkService = new BookmarkServiceMock();

  before(() => {
    // 초기 셋업
    mockAuthStore();
    bookmarkService.successWhenGetBookmarkList();

    // 먼저 마운트 하는 데이터 셋업
    service.successWhenGetServices();
    service.successWhenGetAdditionalServices();

    // 신규가입 아코디언 화면 진입
    page.visit();
    page.clickMenuButton();
    page.clickCustomerSectionButton('신규가입');

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
    page.selectAvailablePhoneNumber(0);
    page.clickConfirmAvailablePhoneNumberButton();
    page.assertSelectedPhoneNumberToBeVisible('010-2345-0010');
  });

  it('KAN-38-4 SIM은 숫자형태 13자리로 입력 가능하다', () => {
    page.focusOnSIMInput();
    page.typeSIMInputField('1234567890123');
    page.focusOutSIMInput();
  });

  it('KAN-38-5 IMEI를 입력 후 focus out하면 모델명이 보인다. 모델명이 없없을 경우 에러 메시지가 확인된다', () => {
    page.focusOnIMEIInput();
    page.typeIMEIInputField('123456');
    service.successWhenGetDeviceModelByIMEI();
    page.focusOutIMEIInput();
    service.failWhenGetDeviceModelByIMEI();
    //   page.assertIMEIInputErrorTypoToBeVisible('존재하는 모델이 없습니다');

    page.focusOnIMEIInput();
    page.typeIMEIInputField('1234567890');
    service.successWhenGetDeviceModelByIMEI();
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
    page.assertSearchResultToBeVisible('5G Speed Master 요금제');
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
});
