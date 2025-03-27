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
}

export default ServiceSearchPage;
