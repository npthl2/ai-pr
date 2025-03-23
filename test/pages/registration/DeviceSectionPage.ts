/// <reference types="cypress" />

class DeviceSectionPage {
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

    typeClearField(fieldName: string) {
        cy.get(`[data-testid="${fieldName}"]`).clear();
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
    
    /**
     * 단말기 할부 결제 옵션이 선택되어 있는지 확인
     */
    assertDeviceInstallmentPaymentOptionSelected() {
      cy.get('[data-testid="device-payment-type-installment"] input').should('be.checked');
    }

    clickDevicePaymentTypeRadio(componentName: string, type: string) {
      cy.get(`[data-testid="${componentName}-${type}"] input`).click();
    }

    clickDevicePaymentInputButton() {
      cy.get(`[data-testid="device-payment-input-button"]`).click();
    }

    clickDevicePaymentModalCloseButton(componentName: string, type: string) {
      cy.get(`[data-testid="${componentName}-${type}-close-button"]`).click();
    }

    clickDevicePaymentModalConfirmButton(componentName: string, type: string) {
      cy.get(`[data-testid="${componentName}-${type}-confirm-button"]`).click();
    }

    clickDevicePaymentModalSupportTypeRadio(componentName: string, type: string, supportType: string) {
      cy.get(`[data-testid="${componentName}-${type}-support-type-${supportType}"]`).click();     
    }

    clickDevicePaymentModalEngagementPeriodRadio(componentName: string, type: string, engagementPeriod: string) {
        cy.get(`[data-testid="${componentName}-${type}-engagement-period-${engagementPeriod}"]`).click();   
    }

    assertDevicePaymentModalToBeVisible(componentName: string, type: string) {
      cy.get(`[data-testid="${componentName}-${type}"]`).should('be.visible');
    }

    assertDevicePaymentModalInstallmentChangePriceByPrepaidPrice() {
      cy.get('[data-testid="device-payment-modal-installment-installment-total-amount"]').should('contain.text', '755,000');
      cy.get('[data-testid="device-payment-modal-installment-installment-fee"]').should('contain.text', '44,545');
      cy.get('[data-testid="device-payment-modal-installment-total-price"]').should('contain.text', '799,545');
      cy.get('[data-testid="device-payment-modal-installment-monthly-payment-price"]').should('contain.text', '33,314');
    }

    assertDevicePaymentModalToBeConfirmedInstallment() {
      cy.get('[data-testid="device-payment-sponsor-type"]').should('have.text', '통합스폰서');
      cy.get('[data-testid="device-payment-engagement-period"]').should('have.text', '12개월');
      cy.get('[data-testid="device-payment-support-type"]').should('have.text', '공시지원금');
    }

    assertDevicePaymentModalToBeConfirmedImmediate() {
        cy.get('[data-testid="device-payment-sponsor-type"]').should('have.text', '통합스폰서');
        cy.get('[data-testid="device-payment-engagement-period"]').should('have.text', '24개월');
        cy.get('[data-testid="device-payment-support-type"]').should('have.text', '선택약정');
    }

    assertDevicePaymentModalSupportTypeToBeSelected() {
        cy.get('[data-testid="device-payment-modal-immediate-discount-price"]').should('have.text', '0 원');
        cy.get('[data-testid="device-payment-modal-immediate-total-price"]').should('have.text', '0 원');
    }

    assertDevicePaymentModalImmediateDefaultValues() {
        cy.get('[data-testid="device-payment-modal-immediate-discount-price"]').should('have.text', '300,000 원');
        cy.get('[data-testid="device-payment-modal-immediate-total-price"]').should('have.text', '-300,000 원');
    }

    assertDevicePaymentModalInstallmentDefaultValues() {
        cy.get('[data-testid="device-payment-modal-installment-installment-total-amount"]').should('contain.text', '855,000');
        cy.get('[data-testid="device-payment-modal-installment-installment-fee"]').should('contain.text', '50,445');
        cy.get('[data-testid="device-payment-modal-installment-total-price"]').should('contain.text', '905,445');
        cy.get('[data-testid="device-payment-modal-installment-monthly-payment-price"]').should('contain.text', '37,726');
    }
    
    forceDeviceInfo(componentName: string, type: string) {
        cy.get(`[data-testid="${componentName}-${type}-device-name"]`).invoke('text', 'DEV-AP-1');
        cy.get(`[data-testid="${componentName}-${type}-device-sales-price"]`).invoke('text', '1800000');
    }
    
  }
  export default DeviceSectionPage;
  