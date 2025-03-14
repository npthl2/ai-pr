/// <reference types="cypress" />

class InvoiceSectionPage {
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

  assertCustomerSectionToBeExpanded() {
    cy.get('[data-testid="NEW_SUBSCRIPTION0-section-customer"]').should('be.visible');
  }

  clickNameVerificationButton() {
    cy.get('[data-testid="name-verification-button"]').click();
  }

  assertInvoiceSectionToBeExpanded() {
    cy.get('[data-testid="NEW_SUBSCRIPTION0-section-invoice"]').should('be.visible');
  }

  assertInvoiceSearchButtonEnabled() {
    cy.get('[data-testid="invoice-search-button"]').should('be.enabled');
  }

  assertInvoiceSearchButtonDisabled() {
    cy.get('[data-testid="invoice-search-button"]').should('be.disabled');
  }

  assertInvoiceCreateButtonDisabled() {
    cy.get('[data-testid="invoice-create-button"]').should('be.disabled');
  }

  clickInvoiceSearchButton() {
    cy.get('[data-testid="invoice-search-button"]').click();
  }

  clickInvoiceCreateButton() {
    cy.get('[data-testid="invoice-create-button"]').click();
  }

  assertInvoiceSearchModalToBeClosed() {
    cy.get('[data-testid="invoice-search-modal"]').should('not.exist');
  }

  clickInvoiceListItemRadio(index: number) {
    cy.get(`[data-testid="invoice-list-item-radio-${index}"]`).click();
  }

  clickModalConfirmButton() {
    cy.get('[data-testid="component-dialog-confirm-button"]').click();
  }

  clickVerificationButton() {
    cy.get('[data-testid="verification-button"]').click();
  }

  assertSalesSectionToBeExpanded() {
    cy.get('[data-testid="NEW_SUBSCRIPTION0-section-sales"]').should('be.visible');
  }

  clickPaymentMethodRadio(type: string) {
    cy.get(`[data-testid="payment-method-radio-${type}"]`).click();
  }

  clickInvoiceTypeRadio(type: string) {
    cy.get(`[data-testid="invoice-type-radio-${type}"]`).click();
  }

  clickInvoicePostalCodeSearchIcon() {
    cy.get('[data-testid="invoice-postal-code-search-icon"]').click();
  }

  clickDialogCloseButton() {
    cy.get('[data-testid="component-dialog-close-button"]').click();
  }

  typeInputField(fieldName: string, value: string) {
    cy.get(`[data-testid="${fieldName}"]`).type(value);
  }

  clickBankCompanySelectField() {
    cy.get(`[data-testid="invoice-bank-company-select"]`).click();
  }

  clickBankCompanyMenuItem(fieldName: string) {
    cy.get(`[data-testid="invoice-bank-company-menu-item-${fieldName}"]`).click();
  }

  assertComponentToBeVisible(componentName: string) {
    cy.get(`[data-testid="${componentName}"]`).should('be.visible');
  }

  assertComponentToBeInvisible(componentName: string) {
    cy.get(`[data-testid="${componentName}"]`).should('not.exist');
  }

  assertToastVisible() {
    cy.get('#Toast').should('be.visible');
  }

  assertToastMessage(message: string) {
    cy.get('#Toast').should('have.text', message);
  }

  assertTemporarySaveButtonEnabled() {
    cy.get('[data-testid="temporary-save-button"]').should('be.enabled');
  }

  typeInvoiceAddressInput(address: string) {
    cy.get('[data-testid="invoice-address-input"] input')
      .then(($input) => {
        // disabled 속성 제거
        $input.prop('disabled', false);
        // aria-disabled 속성도 제거
        $input.attr('aria-disabled', 'false');
      })
      .type(address);
    cy.get('[data-testid="invoice-address-input"] input').type(address);
  }
}
export default InvoiceSectionPage;
