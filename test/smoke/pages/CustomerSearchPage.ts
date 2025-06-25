/// <reference types="cypress" />

class CustomerSearchPage {

    visit() {
        cy.visit('/');
    }

    // 조회 모달
    clickCustomerSearchModalButton() {
        cy.get('[data-testid="customer-search-modal-button"]').click();
    }

    expectCustomerSearchModealToBeVisible() {
        cy.get('[data-testid="customer-search-modal"]').should('be.visible');
    }

    typeName(name: string) {
        cy.get('[data-testid="customer-name"]').clear().type(name);
    }

    typeBirthDate(birthDate: string) {
        cy.get('[data-testid="customer-birthdate"]').clear().type(birthDate);
    }

    checkGenderMale() {
        cy.get('[data-testid="customer-gender-male"]').check();
    }

    checkGenderFemale() {
        cy.get('[data-testid="customer-gender-female]').check();
    }

    typePhoneNumber(phoneNumber: string) {
        cy.get('[data-testid="customer-phone"]').clear().type(phoneNumber);
    }

    clickSearchButton() {
        cy.get('[data-testid="customer-search-button"]').click();
    }

    // 조회 화면
    expectGnbCustomerAreaToBeVisible() {
        cy.get('[data-testid="gnb-customer-area"]').should('be.visible');
    }

    // expectLnbCustomerAreaToBeExist(customerId: string) {
    //     cy.get(`[data-testid="customer-tab-${customerId}"]`).should('be.visible');
    // }

    expectLnbCustomerToBeVisible(customerId: string) {
        cy.get(`[data-testid="customer-tab-${customerId}"]`).should('be.visible');
    }

    // 상세 화면
    clickPhoneTreeItem(phoneNumber: string) {
        cy.get(`[data-testid="phone-tree-item-${phoneNumber}"]`).click();
    }

    clickFirstNodeOfTree() {
        cy.get('[data-testid="tree-lob-item"]').first().click();
    }
    clickPhoneTreeFirstItem() {
        cy.get('[data-testid="phone-tree-item"]').first().click();
    }

    assertContractInformationLoaded() {
        cy.get('[data-testid=information-service-contract-id]').contains('서비스계약번호');
    }
    assertInvoiceInformationLoaded() {
        cy.get('[data-testid=information-invoice-id]').contains('청구번호');
    }
    assertCustomerDetailInformationLoaded() {
        cy.get('[data-testid="service-info-change-button"]').should('be.visible');
    }

}

export default CustomerSearchPage;