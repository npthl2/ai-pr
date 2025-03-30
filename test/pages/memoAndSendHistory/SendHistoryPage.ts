/// <reference types="cypress" />

class SendHistoryPage {
  constructor() {}

  visit() {
    cy.visit('/send-history');
  }

  clickSmsCheckbox() {
    cy.get('[data-testid="send-history-list-sms-checkbox"]').click();
  }

  clickEmailCheckbox() {
    cy.get('[data-testid="send-history-list-email-checkbox"]').click();
  }

  clickSuccessOnlySwitch() {
    cy.get('[data-testid="send-history-list-success-only-switch"]').click();
  }

  assertSendHistoryTableVisible() {
    cy.get('[data-testid="send-history-table"]').should('be.visible');
  }

  assertSmsCheckboxChecked() {
    cy.get('[data-testid="send-history-list-sms-checkbox"]').should('have.class', 'Mui-checked');
  }

  assertEmailCheckboxChecked() {
    cy.get('[data-testid="send-history-list-email-checkbox"]').should('have.class', 'Mui-checked');
  }

  assertSuccessOnlySwitchChecked() {
    cy.get('[data-testid="send-history-list-success-only-switch"]').should(
      'have.class',
      'Mui-checked',
    );
  }

  assertSuccessOnlySwitchUnchecked() {
    cy.get('[data-testid="send-history-list-success-only-switch"]').should(
      'not.have.class',
      'Mui-checked',
    );
  }

  assertSendHistorySortedByDate() {
    cy.wait('@getSendHistory').then(() => {
      cy.get('[data-testid="send-history-table"] tbody tr').each(($row, index) => {
        if (index > 0) {
          const currentDate = new Date($row.find('td:nth-child(3)').text());
          const previousDate = new Date($row.prev().find('td:nth-child(3)').text());
          expect(currentDate.getTime()).to.be.lte(previousDate.getTime());
        }
      });
    });
  }
}

export default SendHistoryPage;
