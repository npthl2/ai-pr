/// <reference types="cypress" />
import LoginPage from '../../login/LoginPage';
import LoginServiceMock from '../../../module/mock/login/LoginServiceMock';
import CustomerSearchServiceMock from '../../../module/mock/customer/search/CustomerSearchServiceMock';

class CustomerSearchPage {
  // CustomerSearch 컴포넌트를 모달 상태(open=true)로 마운트합니다.
  visit() {
    cy.visit('/');
    const page = new LoginPage();
    const service = new LoginServiceMock();
    const customerSearchServiceMock = new CustomerSearchServiceMock();
    page.inputId('admin');
    page.inputPw('1234');
    service.successWhenLogin();
    customerSearchServiceMock.homeBookmark();
    page.clickLoginButton();
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

  getGNBCustomerArea() {
    return cy.get('[data-testid="gnb-customer-area"]');
  }

  getLNBCustomerList() {
    return cy.get('[data-testid="lnb-customer-list"]');
  }

  getLNBCustomer(customerId: string) {
    return cy.get(`[data-testid="customer-tab-${customerId}"]`);
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
}

export default CustomerSearchPage;
