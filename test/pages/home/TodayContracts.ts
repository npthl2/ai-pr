import TodayContractsMock from '../../module/mock/home/TodayContractsMock';

class TodayContracts {
  constructor() {}

  visit() {
    cy.visit('/');
  }

  getTotalContracts() {
    return cy.get('[data-testid="total-contracts"]').should('be.visible');
  }

  getCardsGreaterThan(number: number) {
    cy.get('[data-testid^="card-"]').should('have.length.greaterThan', number);
  }

  getQuote() {
    cy.get('[data-testid="quote-text"]').should('be.visible');
  }

  getArrow() {
    cy.get('[data-testid="next-arrow"]').should('be.visible');
  }

  clickArrow() {
    cy.get('[data-testid="next-arrow"]').click();
  }

  clickSearch(input: string) {
    cy.get('[data-testid="search-input"]').type(input);
    cy.get('[data-testid="search-icon"]').click();
  }

  clickDetailInfo(index: number) {
    cy.get(`[data-testid="card-detail-info-${index}"]`).click();
  }

  getDialog() {
    cy.get('[data-testid="today-contracts-detail-dialog"]').should('be.visible');
  }

  getDialogDetails() {
    cy.get('[data-testid="contract-info-title"]').should('contain', '계약정보');
    cy.get('[data-testid="invoice-info-title"]').should('contain', '납부정보');
    cy.get('[data-testid="service-info-title"]').should('contain', '상세정보');
  }
}

export default TodayContracts;
