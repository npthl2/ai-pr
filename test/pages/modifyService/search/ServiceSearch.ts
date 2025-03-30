/// <reference types="cypress" />
class ServiceSearchPage {
  visitHome() {
    cy.visit('/');
  }

  getServiceSearchMenu() {
    return cy.get('[data-testid="menu-item-요금제/부가서비스 변경"]');
  }

  getServiceModificationContainer() {
    return cy.get('[data-testid="service-modification-container"]');
  }

  getContractServiceListModal() {
    return cy.get('[data-testid="contract-service-list-modal"]');
  }

  getLineInformationPhoneNumber() {
    return cy.get('[data-testid="line-information-phone-number"]');
  }

  getCurrentServiceName() {
    return cy.get('[data-testid="current-service-name"]');
  }

  getAllTabCloseButton() {
    return cy.get('[data-testid="close-all-tabs"]');
  }

  getCustomerSearchTab() {
    return cy.get('[data-testid="tab-고객조회"]');
  }
  getServiceSearchTab() {
    return cy.get('[data-testid="tab-요금제/부가서비스 변경"]');
  }
  getServiceInfoChangeButton() {
    return cy.get('[data-testid="service-info-change-button"]');
  }

  getContractServiceListCancelButton() {
    return cy.get('[data-testid="contract-service-list-cancel-button"]');
  }

  getIncludeCancelledCheckbox() {
    return cy.get('[data-testid="include-cancelled-checkbox"]');
  }

  getServiceSearchNoContractDialog() {
    return cy.get('[data-testid="component-dialog-content"]');
  }

  getServiceSearchNoContractDialogCloseButton() {
    return cy.get('[data-testid="component-dialog-close-button"]');
  }

  getCurrentServiceAdditionalServiceTable() {
    return cy.get('[data-testid="current-service-additional-service-table"]');
  }

  getLineInformationPhoneNumberSelectButton() {
    return cy.get('[data-testid="line-information-phone-number-select-button"]');
  }

  getContractServiceListTableRow(contractId: string) {
    return cy.get(`[data-testid="contract-service-list-table-row-${contractId}"]`);
  }

  getContractServiceListTableRowRadio(contractId: string) {
    return cy.get(`[data-testid="contract-service-list-table-row-${contractId}-radio"]`);
  }

  getContractServiceListConfirmButton() {
    return cy.get('[data-testid="contract-service-list-confirm-button"]');
  }

  getMaskingModalContent() {
    return cy.get('[data-testid="component-dialog-content"]');
  }

  getMaskingModalConfirmButton() {
    return cy.get('[data-testid="component-dialog-confirm-button"]');
  }
}

export default ServiceSearchPage;
