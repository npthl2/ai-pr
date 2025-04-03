/// <reference types="cypress" />

import SendHistoryPage from '../../../pages/memoAndSendHistory/SendHistoryPage';
import SendHistoryServiceMock from '../../mock/memoAndSendHistory/SendHistoryServiceMock';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';
import { mockMemberStore } from '../../../support/helpers/mockMemberStore';
import MemoHistoryPage from '../../../pages/memoAndSendHistory/MemoHistoryPage';
import MemoHistoryServiceMock from '../../mock/memoAndSendHistory/MemoHistoryServiceMock';
import { CustomerSearchServiceMock } from '../../mock/customer/search/CustomerSearchServiceMock';
import CustomerDetailServiceMock from '../../mock/customer/detail/CustomerDetailServiceMock';
import CustomerSearchTestPage from '../../../pages/customer/search/CustomerSearch';
import { MessageType } from '../../../../src/model/SendHistory';


describe('KAN-273 발송이력 조회를 위한 화면 진입', () => {
  const sendHistoryPage = new SendHistoryPage();
  const sendHistoryService = new SendHistoryServiceMock();
  const memoPage = new MemoHistoryPage();
  const memoService = new MemoHistoryServiceMock();
  const customerSearch = new CustomerSearchTestPage();
  const customerSearchServiceMock = new CustomerSearchServiceMock();
  const customerDetailServiceMock = new CustomerDetailServiceMock();

  before(() => {
    // 초기 셋업
    mockAuthStore();
    mockMemberStore({
      memberInfo: {
        memberId: 'user1',
        memberName: 'user1',
        authorities: [''],
      },
    });

    memoService.successWhenGetHomeBookmark();

    customerSearch.visitCustomerSearch();
    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('김철수');
    customerSearch.typeBirthDate('781012');
    customerSearchServiceMock.successFindCustomer01();
    customerDetailServiceMock.successWhenGetCustomerContracts();
    customerSearch.clickSearch();
    
  });

  it('KAN-273-1 메모 및 발송이력 화면이 렌더링 되었을 때 - SMS와 Email 체크박스가 체크되어 있고, 성공 건만 보기는 체크되어 있지 않다', () => {
    sendHistoryService.successWhenGetSendHistory();
    memoPage.clickMemoOpenButton();

    sendHistoryPage.assertSmsCheckboxChecked();
    sendHistoryPage.assertEmailCheckboxChecked();
    sendHistoryPage.assertSuccessOnlySwitchUnchecked();
  });

  // 발송이력의 그리드를 클릭 했을 때 - 클릭한 그리드 기준으로 Sorting된다
  it('KAN-273-2 발송이력의 그리드를 클릭 했을 때 - 클릭한 그리드 기준으로 Sorting된다', () => {
    sendHistoryPage.clickSendHistoryGrid('messageType');
    sendHistoryPage.clickSendHistoryGrid('requestTime');
    sendHistoryPage.clickSendHistoryGrid('sendTime');
    sendHistoryPage.clickSendHistoryGrid('successYn');
  });

  it('KAN-273-3-1 Email체크박스를 해제하고 SMS를 체크했을 때 - 발송이력이 SMS만 조회되어 보인다', () => {
    sendHistoryService.successWhenGetSendHistoryByMessageType(MessageType.SMS);
    sendHistoryPage.clickEmailCheckbox();    
    sendHistoryPage.assertSendHistoryGetByMessageType(MessageType.SMS);
  });

  it('KAN-273-3-2 SMS체크박스를 해제하고 Email을 체크했을 때 - 발송이력이 Email만 조회되어 보인다', () => {
    sendHistoryService.successWhenGetSendHistoryByMessageType(MessageType.EMAIL);
    sendHistoryPage.clickEmailCheckbox();
    sendHistoryPage.clickSmsCheckbox();
    sendHistoryPage.assertSmsCheckboxUnchecked();
    sendHistoryPage.assertEmailCheckboxChecked();
    sendHistoryPage.assertSendHistoryGetByMessageType(MessageType.EMAIL);
  });

  it('KAN-273-4 성공 건만 보기 토글을 클릭하여 ON이 되었을때 - 성공여부 Y인 발송이력건만 보인다', () => {
    sendHistoryService.successWhenGetSendHistoryBySuccessOnly();
    sendHistoryPage.clickSuccessOnlySwitch();
    sendHistoryPage.assertSendHistoryGetBySuccessOnly();
  });
});
