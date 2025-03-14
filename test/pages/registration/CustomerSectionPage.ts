/// <reference types="cypress" />

class CustomerSectionPage {
  constructor() {}

  visit() {
    cy.visit('/');
  }

  clickMenuButton() {
    cy.get('[data-testid="menu-button"]').click();
  }

  clickCustomerSectionButton(menuName: string) {
    cy.get(`[data-testid="menu-item-${menuName}"]`).click();
  }

  expectNewSubscriptionTabToBeVisible() {
    cy.get('[data-testid="customer-tab-NEW_SUBSCRIPTION0"]').should('be.visible');
  }

  expectCustomerSectionToBeExpanded() {
    cy.get('[data-testid="NEW_SUBSCRIPTION0-section-customer"]').should('be.visible');
  }

  clickNameField() {
    cy.get('[data-testid="name-field"] input').click();
  }

  clickRrnoField() {
    cy.get('[data-testid="rrno-field"] input').click();
  }

  typeNameField(value: string) {
    cy.get('[data-testid="name-field"] input').clear().type(value);
  }

  typeRrnoField(value: string) {
    cy.get('[data-testid="rrno-field"] input').clear().type(value);
  }

  typeRrnoIssueDateField(value: string) {
    cy.get('[data-testid="rrno-issue-date-field"] input').clear().type(value);
  }

  checkPersonalInfoConsent() {
    cy.get('[data-testid="personal-info-consent"] input').check({ force: true });
  }

  checkIdentityVerificationConsent() {
    cy.get('[data-testid="identity-verification-consent"] input').check({ force: true });
  }

  expectNameErrorToBeVisible(message: string) {
    cy.get('[data-testid="name-field"]').parent().contains(message).should('be.visible');
  }

  expectRrnoErrorToBeVisible(message: string) {
    cy.get('[data-testid="rrno-field"]').parent().contains(message).should('be.visible');
  }

  expectVerificationButtonToBeEnabled() {
    cy.get('[data-testid="verification-button"]').should('not.be.disabled');
  }

  clickVerificationButton() {
    cy.get('[data-testid="verification-button"]').click();
  }

  expectVerificationModalToBeVisible() {
    cy.get('[data-testid="verification-modal"]').should('be.visible');
  }

  expectIdentityVerificationConsentToBeUnchecked() {
    cy.get('[data-testid="identity-verification-consent-no"] input').should('be.checked');
  }

  clickVerificationAuthButton() {
    cy.get('[data-testid="verification-auth-button"]').click();
  }

  clickVerificationConfirmButton() {
    cy.get('[data-testid="component-dialog-confirm-button"]').click();
  }

  clickVerificationCheckButton() {
    cy.get('[data-testid="verification-check-button"]').click();
  }

  expectVerificationModalToBeClosed() {
    cy.get('[data-testid="verification-modal"]').should('not.exist');
  }

  expectCustomerVerificationLineToBeVisible() {
    cy.get('[data-testid="customer-verification-line"]').should('be.visible');
  }

  expectVerificationResultToShowSuccess() {
    cy.get('[data-testid="verification-result"]').contains('성공').should('be.visible');
    cy.get('[data-testid="verification-status"]').contains('정상').should('be.visible');
  }

  expectVerificationResultToShowFailure() {
    cy.get('[data-testid="verification-result"]').contains('실패').should('be.visible');
  }

  expectVerificationStatusToShowSuccess() {
    cy.get('[data-testid="verification-status"]').contains('정상').should('be.visible');
  }

  expectVerificationStatusToShowFailure() {
    cy.get('[data-testid="verification-status"]').contains('실패').should('be.visible');
  }

  expectVerificationPassStatusToBeVisible() {
    cy.get('[data-testid="verification-pass-status"]').contains('통과').should('be.visible');
  }

  expectVerificationFailStatusToBeVisible() {
    cy.get('[data-testid="verification-fail-status"]').contains('미통과').should('be.visible');
  }

  setupVerificationModal() {
    this.visit();
    this.clickMenuButton();
    this.clickCustomerSectionButton('신규가입');
    this.typeNameField('홍길동');
    this.typeRrnoField('9001011234567');
    this.checkPersonalInfoConsent();
    this.clickVerificationButton();
  }
}

export default CustomerSectionPage;
