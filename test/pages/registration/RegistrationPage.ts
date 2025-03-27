/// <reference types="cypress" />

class RegistrationPage {
  // 홈 화면 방문
  visitHome() {
    cy.visit('/');
  }

  // 메뉴 버튼 클릭
  clickMenuButton() {
    cy.get('[data-testid="menu-button"]').click();
  }

  // 신규가입 메뉴 클릭
  clickCustomerSectionButton(menuName: string) {
    cy.get(`[data-testid="menu-item-${menuName}"]`).click();
  }

  // 신규가입 탭이 표시되는지 확인
  assertNewSubscriptionTabVisible() {
    cy.get('[data-testid="tab-신규가입"]').should('be.visible');
  }

  // 가입정보 요약 섹션으로 이동
  navigateToSummarySection() {
    cy.get('[data-testid="NEW_SUBSCRIPTION0-section-summary"]').click();
  }

  assertRegistrationPending() {
    cy.get('[data-testid="status-message"]')
      .contains('고객님의 가입이 처리중입니다.')
      .should('be.visible');
  }

  assertRegistrationCompleted() {
    cy.get('[data-testid="status-message"]')
      .contains('고객님의 가입이 처리 완료되었습니다.')
      .should('be.visible');
  }

  // 가입 후 안내 섹션으로 이동
  navigateToRequestSection() {
    cy.get('[data-testid="NEW_SUBSCRIPTION0-section-request"]').should('be.visible');
  }

  // 저장 버튼 클릭
  clickSaveButton() {
    cy.get('[data-testid="save-button"]').click();
  }

  // 이메일 발송 토글 버튼 클릭
  toggleEmailSending(enable: boolean) {
    cy.get('[data-testid="email-toggle"]')
      .invoke('prop', 'checked')
      .then((checked) => {
        if ((checked && !enable) || (!checked && enable)) {
          cy.get('[data-testid="email-toggle"]').parent().click();
        }
      });
  }

  // 이메일 주소 입력
  inputEmailAddress(email: string) {
    cy.get('[data-testid="email-input"]').clear().type(email);
  }

  // 이메일 도메인 선택
  selectEmailDomain(domain: string) {
    // Material-UI Select 컴포넌트 클릭하여 열기
    cy.get('[data-testid="domain-select-button"]').click();

    // 드롭다운 메뉴에서 해당 도메인 선택
    cy.get(`li[data-value="${domain}"]`).click();
  }

  // 이메일 도메인 직접 입력
  inputCustomEmailDomain(domain: string) {
    // 도메인 직접 입력 필드에 입력 (data-testid 사용)
    cy.get('[data-testid="custom-domain-input"]').type(domain);
  }

  // 이메일 발송 버튼 클릭
  clickSendEmailButton() {
    cy.get('[data-testid="send-email-button"]').click();
  }

  // 홈으로 이동 버튼 클릭
  clickGoHomeButton() {
    cy.get('[data-testid="go-home-button"]').click();
  }

  // 고객조회로 이동 버튼 클릭
  clickGoCustomerSearchButton() {
    cy.get('[data-testid="go-customer-search-button"]').click();
  }

  // 가입 후 안내 화면으로 이동 확인
  assertRedirectedToRegistrationRequest() {
    cy.get('[data-testid="NEW_SUBSCRIPTION0-section-request"]').should('be.visible');
  }

  // 이메일 발송 토글 버튼 활성화 확인
  assertEmailToggleEnabled() {
    // 토글 버튼이 비활성화되지 않았는지 확인
    cy.get('[data-testid="email-toggle"]').should('not.be.disabled');

    // 토글 버튼이 클릭 가능한지 확인
    cy.get('[data-testid="email-toggle"]').parent().should('not.have.class', 'Mui-disabled');

    // 토글 버튼이 실제로 클릭 가능한지 확인
    cy.get('[data-testid="email-toggle"]').parent().click();
    cy.get('[data-testid="email-toggle"]').parent().click(); // 원래 상태로 되돌리기
  }

  // 이메일 발송 토글 버튼 비활성화 확인
  assertEmailToggleDisabled() {
    // 토글 버튼 클릭 시도 후 상태 변화가 없는지 확인
    cy.get('[data-testid="email-toggle"]')
      .invoke('prop', 'checked')
      .then((initialChecked) => {
        // 클릭 시도
        cy.get('[data-testid="email-toggle"]').parent().click({ force: true });

        // 상태가 변하지 않았는지 확인 (비활성화 상태이므로 변하지 않아야 함)
        cy.get('[data-testid="email-toggle"]')
          .invoke('prop', 'checked')
          .should('eq', initialChecked);
      });
  }

  // 이메일 입력 필드 활성화 확인
  assertEmailInputEnabled() {
    cy.get('[data-testid="email-input"]').should('be.visible').and('not.be.disabled');
  }

  // 이메일 입력 필드 비활성화 확인
  assertEmailInputDisabled() {
    cy.get('[data-testid="email-input"]').should('be.disabled');
  }

  // 이메일 발송 성공 메시지 확인
  assertEmailSentSuccessMessage() {
    cy.contains('이메일 발송 완료되었습니다.').should('be.visible');
  }

  // 이메일 발송 실패 메시지 확인
  assertEmailSentFailMessage() {
    cy.contains('이메일 발송에 실패했습니다. 다시 시도해 주세요.').should('be.visible');
  }

  // 토스트 메시지가 표시되는지 확인
  assertToastVisible() {
    // 토스트 컨테이너가 존재하는지 확인
    cy.get('#Toast').should('exist');

    // 토스트 내용이 표시되는 요소 확인 (MuiSnackbarContent)
    cy.get('.MuiSnackbarContent-root').should('exist');
  }

  // 토스트 메시지 내용 확인
  assertToastMessage(message: string) {
    // 토스트 메시지 내용 확인
    cy.get('.MuiSnackbarContent-message').should('contain.text', message);
  }

  // 고객조회로 이동 버튼 표시 확인
  assertGoCustomerSearchButtonVisible() {
    cy.get('[data-testid="go-customer-search-button"]').should('be.visible');
  }

  // 홈 화면으로 이동 확인
  assertRedirectedToHome() {
    // 홈 화면이 표시되는지 확인
    cy.get('[data-testid="home-content"]').should('be.visible');

    // 신규가입 탭이 존재하지 않는지 확인
    cy.get('button[id*="NEW_SUBSCRIPTION"]').should('not.exist');
  }

  // 고객조회 탭으로 이동 확인
  assertRedirectedToCustomerSearch() {
    // 고객조회 탭이 표시되는지 확인
    cy.get('button[id*="CUSTOMER_SEARCH"]').should('be.visible');

    // 신규가입 탭이 존재하지 않는지 확인
    cy.get('button[id*="NEW_SUBSCRIPTION"]').should('not.exist');
  }

  // LNB가 닫혔는지 확인
  assertLNBClosed() {
    // LNB의 서브메뉴가 닫혔는지 확인
    cy.get('[data-testid="menu-list"]').should('not.exist');
    cy.get('[data-testid="bookmarks-list"]').should('not.exist');
  }

  // MDI가 닫혔는지 확인
  assertMDIClosed() {
    // 고객 탭이 닫혔는지 확인
    cy.get('button[id*="NEW_SUBSCRIPTION"]').should('not.exist');
    cy.get('button[id*="CUSTOMER_SEARCH"]').should('not.exist');
    cy.get('button[id*="SERVICE_MODIFICATION"]').should('not.exist');
  }

  // 홈으로 이동 버튼 클릭 시 LNB와 MDI가 닫히고 홈 화면으로 이동하는지 확인
  assertHomeButtonRedirectsAndClosesMenus() {
    // 홈으로 이동 버튼 클릭
    this.clickGoHomeButton();

    // 홈 화면으로 이동했는지 확인
    this.assertRedirectedToHome();

    // LNB가 닫혔는지 확인
    this.assertLNBClosed();

    // MDI가 닫혔는지 확인
    this.assertMDIClosed();
  }

  // 고객조회 탭이 활성화되었는지 확인
  assertCustomerSearchTabActive() {
    cy.get('[data-testid="tab-고객조회"]').should('be.visible');
  }
}

export default RegistrationPage;
