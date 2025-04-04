/// <reference types="cypress" />

import { MessageType } from '../../../src/model/SendHistory';

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

  assertSendHistoryTableBodyVisible() {
    cy.get('[data-testid="send-history-list-table-body"]').should('be.visible');
  }

  assertSmsCheckboxChecked() {
    cy.get('[data-testid="send-history-list-sms-checkbox"]').should('have.class', 'Mui-checked');
  }

  assertEmailCheckboxChecked() {
    cy.get('[data-testid="send-history-list-email-checkbox"]').should('have.class', 'Mui-checked');
  }

  assertSmsCheckboxUnchecked() {
    cy.get('[data-testid="send-history-list-sms-checkbox"]').should('not.have.class', 'Mui-checked');
  }

  assertEmailCheckboxUnchecked() {
    cy.get('[data-testid="send-history-list-email-checkbox"]').should('not.have.class', 'Mui-checked');
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

  assertSendHistoryGetByMessageType(messageType: MessageType) {
    cy.wait('@getSendHistoryByMessageType').then((interception) => {
      const url = interception.request.url;
      expect(url).to.include(`messageType=${messageType}`);
    });
  }

  assertSendHistoryGetBySuccessOnly() {
    cy.wait('@getSendHistoryBySuccessOnly').then((interception) => {
      const url = interception.request.url;
      expect(url).to.include(`includeOnlySuccessYN=Y`);
    });
  }

  clickSendHistoryGrid(columnKey: string) {
    cy.get(`[data-testid=send-history-list-sort-icon-${columnKey}]`).click();
  }
}

export default SendHistoryPage;
