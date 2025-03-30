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

describe('KAN-273 발송이력 조회를 위한 화면 진입', () => {
  const sendHistoryPage = new SendHistoryPage();
  const sendHistoryService = new SendHistoryServiceMock();
  const bookmarkService = new BookmarkServiceMock();
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

    memoPage.clickMemoOpenButton();
  });

  it('KAN-273-1 메모 및 발송이력 화면이 렌더링 되었을 때 - SMS와 Email 체크박스가 체크되어 있고 발송이력이 발송일시의 내림차순으로 조회되어 보여진다', () => {
    sendHistoryService.successWhenGetSendHistory();

    sendHistoryPage.assertSmsCheckboxChecked();
    sendHistoryPage.assertEmailCheckboxChecked();
    sendHistoryPage.assertSuccessOnlySwitchUnchecked();

    // Wait for the API response and verify the data is displayed
    cy.wait('@getSendHistory');

    // Verify the SendHistoryList component exists
    cy.get('[data-testid="send-history-list-sms-checkbox"]').should('exist');
    cy.get('[data-testid="send-history-list-email-checkbox"]').should('exist');
    cy.get('[data-testid="send-history-list-success-only-switch"]').should('exist');

    // Verify the table data is displayed
    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length', 11); // 11 data rows from mock

    // Verify some specific data from the mock
    cy.get('table tbody tr')
      .first()
      .within(() => {
        cy.contains('SMS').should('exist');
        cy.contains('2025-03-01 12:01:00').should('exist');
        cy.contains('2025-03-01 12:02:00').should('exist');
        cy.contains('SMS 메시지 내용').should('exist');
        cy.contains('Y').should('exist');
      });
  });

  // 발송이력의 그리드를 클릭 했을 때 - 클릭한 그리드 기준으로 Sorting된다

  // Email체크박스를 해제하고 SMS를 체크했을 때 - 발송이력이 SMS만 조회되어 보인다

  // 성공건만 보기 토글을 클릭하여 ON이 되었을때 - 성공여부 Y인 발송이력건만 보인다
});
