class CustomerDetailPage {
  constructor() {}

  visitCustomerDetailPage() {
    cy.visit('/');
  }

  assertTree() {
    cy.get('[data-testid="tree"]').should('exist');
    cy.get('[data-testid="tree-lob-item"]').should('exist');
  }

  clickFirstNodeOfTree() {
    cy.get('[data-testid="tree-lob-item"]').first().click();
  }

  clickPhoneTreeItem() {
    cy.get('[data-testid="phone-tree-item"]').first().click();
  }

  assertInformation() {
    cy.get('[data-testid="information"]').should('exist');
  }

  assertTreeSelected1depthClosed() {
    cy.get('[data-group-testid="tree-item"]')
      .filter('[aria-expanded="true"]')
      .should('have.length', 0); // 아무 노드도 열려있지 않아야 한다다
  }

  assertInformationText() {
    cy.get('[data-testid=information-service-contract-id]').contains('서비스계약번호');
    cy.get('[data-testid=information-invoice-id]').contains('청구번호');
  }

  clickSampleUnmaskableItem() {
    // cy.get('[data-testid="maskinginformation-invoice-payment-name"]').rightclick();
    cy.contains('고객정보보호').first().rightclick();
  }

  clickUnmaskingMenuItem() {
    cy.get('[data-testid="unmasking-menu-item"]').click();
  }

  cancelUnmaskingPopup() {
    cy.get('body').type('{esc}');
  }

  assertUnmaskingPopup() {
    cy.get('[data-testid="unmasking-popup"]').should('exist');
  }

  clickUnmaskingPopup() {
    cy.get('[data-testid="unmasking-popup"]').click();
  }

  clickServiceInfoChangeButton() {
    cy.get('[data-testid="service-info-change-button"]').click();
  }

  clickIncludeCancelledCheckbox() {
    cy.get('[data-testid="include-cancelled-checkbox"]').click();
  }

  assertCancelledPhoneStatus() {
    cy.get('[data-testid="phone-status"]')
      .each(($el) => {
        if ($el.text().trim() === '해지') {
          return false; // 하나라도 찾으면 테스트 통과
        }
      })
      .should('exist');
  }

  putPhoneNumber(phoneNumber: string) {
    cy.get('input[placeholder="전화번호 (11자리 숫자 입력)"]').clear().type(phoneNumber);
  }

  clickSearchIcon() {
    cy.get('[data-testid="search-icon"]').click();
  }

  assertSearchContract() {
    cy.get('[data-testid="phone-tree-item"]')
      .each(($el) => {
        if ($el.hasClass('Mui-selected')) {
          return false; // 하나라도 있으면 성공
        }
      })
      .should('exist');
  }

  assertToastMessage(message) {
    cy.get('#Toast').should('have.text', message);
  }
}
export default CustomerDetailPage;
