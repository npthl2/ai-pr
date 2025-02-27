/// <reference types="cypress" />

class MemoHistoryPage {
  constructor() {}

  visitMemoHistoryPage() {
    // TO-DO : 수정
    cy.visit('/example/memo-test');
    cy.intercept('GET', '**/adm-be/v1/memos/module-customer-id?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: { memos: [], isLast: true },
      },
    });
  }

  clickMemoOpenButton() {
    cy.get('[data-testid="memoOpenButton"]').click();
  }

  assertMemoPanelVisible() {
    cy.get('[data-testid="memoPanel"]').should('be.visible');
  }

  assertMemoPanelInvisible() {
    cy.get('[data-testid="memoPanel"]').should('not.exist');
  }

  assertMemoEmptyTableRowVisible() {
    cy.intercept('GET', '**/adm-be/v1/memos/module-customer-id?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: { memos: [], isLast: true },
      },
    });
    cy.get('[data-testid="memoEmptyTableRow"]').should('be.visible');
  }

  inputMemoTextarea(text: string) {
    cy.get('[data-testid="memoTextarea"]').type(text);
  }

  assertMemoSaveButtonDisabled() {
    cy.get('[data-testid="memoSaveButton"]').should('be.disabled');
  }

  assertMemoSaveButtonEnabled() {
    cy.get('[data-testid="memoSaveButton"]').should('be.enabled');
  }

  clickMemoSaveButton() {
    cy.get('[data-testid="memoSaveButton"]').click();
  }

  assertToastVisible() {
    cy.get('#Toast').should('be.visible');
  }

  assertToastMessage(message) {
    cy.get('#Toast').should('have.text', message);
  }

  clickMemoOverlay() {
    cy.get('[data-testid="memoOverlay"]').click();
  }

  clickMemoCloseButton() {
    cy.get('[data-testid="memoCloseButton"]').click();
  }
}
export default MemoHistoryPage;
