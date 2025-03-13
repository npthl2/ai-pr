class ContractSectionPage {
  constructor() {}

  // 공통
  assertComponentToBeVisible(componentName: string) {
    cy.wait(3000);
    cy.get(`[data-testid="${componentName}"]`).should('be.visible');
  }

  assertComponentToBeInvisible(componentName: string) {
    cy.wait(3000);
    cy.get(`[data-testid="${componentName}"]`).should('be.invisible');
  }

  //before

  visit() {
    cy.visit('/');
  }

  completeSalesSection() {
    cy.get('[data-testid="sales-department-input"] input').focus();
    cy.get('[data-testid="sales-department-input"] input').type('test');
    cy.get('[data-testid="sales-department-input"] input').blur();
  }

  clickMenuButton() {
    cy.get('[data-testid="menu-button"]').click();
  }

  clickCustomerSectionButton(menuName: string) {
    cy.get(`[data-testid="menu-item-${menuName}"]`).click();
  }

  assertContractSectionToBeExpanded() {
    cy.get('[data-testid="NEW_SUBSCRIPTION0-section-contract"]').should('be.visible');
  }

  assertSelectPhoneNumberButtonDisabled() {
    cy.get(`[data-testid="select-phone-number-button"]`).should('be.disabled');
  }

  assertSelectPhoneNumberButtonEnabled() {
    cy.get(`[data-testid="select-phone-number-button"]`).should('be.enabled');
  }

  typeEndPhoneNumberInputField(value: string) {
    cy.get('[data-testid="end-phone-number-input"] input').type(value);
  }

  focusOnEndPhoneNumber() {
    cy.get('[data-testid="end-phone-number-input"] input').focus();
  }

  focusOutEndPhoneNumber() {
    cy.get('[data-testid="end-phone-number-input"] input').blur();
  }

  clickSelectPhoneNumberButton() {
    cy.get('[data-testid="select-phone-number-button"]').click();
  }

  assertAvailablePhoneNumberListed() {
    cy.get('[data-testid="available-phone-number-list"]').should('be.visible');
  }

  selectAvailablePhoneNumber(index: number) {
    cy.get(`[data-testid="phone-number-radio-${index}"]`).click();
  }

  clickConfirmAvailablePhoneNumberButton() {
    cy.get('[data-testid="confirm-available-phone-number-button"]').click();
  }

  assertSelectedPhoneNumberToBeVisible(value: string) {
    cy.get('[data-testid="selected-phone-number-typo"]').should('have.text', value);
  }

  typeSIMInputField(value: string) {
    cy.get('[data-testid="SIM-input"] input').type(value);
  }

  focusOnSIMInput() {
    cy.get('[data-testid="SIM-input"] input').focus();
  }

  focusOutSIMInput() {
    cy.get('[data-testid="SIM-input"] input').blur();
  }

  typeIMEIInputField(value: string) {
    cy.get('[data-testid="IMEI-input"] input').type(value);
  }

  focusOnIMEIInput() {
    cy.get('[data-testid="IMEI-input"] input').focus();
  }

  focusOutIMEIInput() {
    cy.get('[data-testid="IMEI-input"] input').blur();
  }

  assertModleNameTypoToBeVisible(value: string) {
    cy.wait(3000);
    cy.get('[data-testid="model-name-typo"]').should('contain.text', value);
  }

  assertAdditionalServiceButtonDisabled() {
    cy.get('[data-testid="additional-service-button"]').should('be.disabled');
  }

  clickServiceSelectIcon() {
    cy.get('[data-testid="service-select-icon"]').click();
  }

  assertServiceSelectModalToBeVisible() {
    cy.wait(3000);
    cy.get('[data-testid="service-select-modal"]').should('be.visible');
  }

  assertServiceSelectTableRowToBeVisible() {
    cy.wait(3000);
    cy.get('[data-testid="service-select-table-row"]').should('be.visible');
  }

  typeServiceSelectSearchInputField(value: string) {
    cy.get('[data-testid="service-select-search-input"] input').type(value);
  }

  clickServiceSelectSearchButton() {
    cy.get('[data-testid="service-select-search-button"]').click();
  }

  assertSearchResultToBeVisible(value: string) {
    cy.get('[data-testid="service-select-table-row"]').should('contain.text', value);
  }

  clickSelectServiceRadioButton(index: number) {
    cy.get(`[data-testid="service-select-radio-${index}"]`).click();
  }

  clickConfirmServiceButton() {
    cy.get('[data-testid="confirm-service-button"]').click();
  }

  assertSelectServiceValueToBeVisible(value: string) {
    cy.get('[data-testid="selected-service-price-typo"]').should('have.text', value);
  }

  clickServiceAdditionalSelectIcon() {
    cy.get('[data-testid="additional-service-button"]').click();
  }

  clickAdditionalService(index: number) {
    cy.wait(3000);
    cy.get(`[data-testid="additional-service-list-checkbox-${index}"]`).click();
  }

  clickConfirmAdditionalService() {
    cy.get('[data-testid="confirm-additional-service-button"]').click();
  }

  assertAdditionalServiceChipToBeVisible() {
    cy.wait(3000);
    cy.get('[data-testid="selected-additional-service-chip-0"]').should('exist');
  }

  clickDeleteAdditionalServiceChip(index: number) {
    cy.get(`[data-testid="selected-additional-service-chip-${index}"]`)
      .find('[data-testid="CancelIcon"]')
      .click();
  }

  assertAdditionalServiceChipToBeInvisible() {
    cy.wait(3000);
    cy.get('[data-testid="selected-additional-service-chip-0"]').should('not.exist');
  }
}

export default ContractSectionPage;
