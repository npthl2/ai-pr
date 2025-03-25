/// <reference types="cypress" />

class RegistrationStatusPage {
  constructor() {}

  visit() {
    cy.visit('/');
  }

  startGetRegistrationStatus() {
    cy.get('[data-testid="floating-button"]').click();
  }

  endGetRegistrationStatus() {
    cy.get('[data-testid="floating-button"]').click();
  }

  checkHistoryCount(count: number) {
    cy.get('[data-testid="draggable-floating-button-history-count-label"]').should(
      'contain',
      count,
    );
  }

  checkHistoryContentStatus(index: number, status: string) {
    cy.get(`[data-testid="history-area-content-status-${index}"]`).should('contain', status);
  }

  checkHistoryContent(index: number, content: string) {
    cy.get(`[data-testid="history-area-content-${index}"]`).should('contain', content);
  }

  isVisibleHistoryContentStatusTime(index: number) {
    cy.get(`[data-testid="history-area-content-status-time-${index}"]`).should('be.visible');
  }

  isNotVisibleHistoryContentStatusTime(index: number) {
    cy.get(`[data-testid="history-area-content-status-time-${index}"]`).should('not.exist');
  }

  clickLogoutButton() {
    cy.get('[data-testid="logout-button"]').click();
  }

  clickLoginButton() {
    cy.get('[data-testid="login-button"]').click();
  }

  isVisibleHistoryAreaEmptyContent() {
    cy.get('[data-testid="history-area-empty-content"]').should('be.visible');
  }

  checkHistoryAreaEmptyContent(content: string) {
    cy.get('[data-testid="history-area-empty-content"]').should('contain', content);
  }

  checkHistoryAreaCountLabel(count: number) {
    cy.get('[data-testid="history-area-count-label"]').should('contain', count);
  }
}

export default RegistrationStatusPage;
