/// <reference types="cypress" />
class CustomerSearchPage {
  // CustomerSearch 컴포넌트를 모달 상태(open=true)로 마운트합니다.
  visit() {
    cy.visit('/login');
  }

  getOpenModalButton() {
    return cy.get('[data-testid="customer-search-modal-button"]');
  }

  getNameInput() {
    return cy.get('[data-testid="customer-name"]');
  }

  getBirthDateInput() {
    return cy.get('[data-testid="customer-birthdate"]');
  }

  getPhoneNumberInput() {
    return cy.get('[data-testid="customer-phone"]');
  }

  getSearchButton() {
    return cy.get('[data-testid="customer-search-button"]');
  }

  getModal() {
    return cy.get('[data-testid="customer-search-modal"]');
  }

  getAlertDialogTitle() {
    return cy.get('[data-testid="component-dialog-title"]');
  }

  getGNBCustomerArea() {
    return cy.get('[data-testid="gnb-customer-area"]');
  }

  getGNBCustomerName() {
    return cy.get('[data-testid="gnb-customer-name"]');
  }

  getGNBCustomerAge() {
    return cy.get('[data-testid="gnb-customer-age"]');
  }

  getGNBCustomerRrno() {
    return cy.get('[data-testid="gnb-customer-rrno"]');
  }

  getGNBCustomerGender() {
    return cy.get('[data-testid="gnb-customer-gender"]');
  }

  getGNBUnmaskingButton() {
    return cy.get('[data-testid="gnb-unmasking-button"]');
  }

  getLogoutButton() {
    return cy.get('[data-testid="logout-button"]');
  }

  getLNBCustomerList() {
    return cy.get('[data-testid="lnb-customer-list"]');
  }

  getLNBCustomer(customerId: string) {
    return cy.get(`[data-testid="customer-tab-${customerId}"]`);
  }
  getLNBCustomerRemoveButton(customerId: string) {
    return cy.get(`[data-testid="remove-btn-${customerId}"]`);
  }

  // 필요한 추가 동작들을 메서드로 정의할 수 있음
  typeName(name: string) {
    this.getNameInput().clear().type(name);
  }

  typeBirthDate(birthDate: string) {
    this.getBirthDateInput().clear().type(birthDate);
  }

  typePhoneNumber(phoneNumber: string) {
    this.getPhoneNumberInput().clear().type(phoneNumber);
  }

  clickSearch() {
    this.getSearchButton().click();
  }

  inputId(text: string) {
    cy.get('[data-testid="id"]').type(text);
  }

  inputPw(text: string) {
    cy.get('[data-testid="pw"]').type(text);
  }

  clickLoginButton() {
    cy.get('[data-testid="login"]').click();
  }
}

export default CustomerSearchPage;
