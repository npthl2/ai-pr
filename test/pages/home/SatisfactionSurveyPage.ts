/// <reference types="cypress" />

class SatisfactionSurveyPage {
  constructor() {}

  visit() {
    cy.visit('/');
  }

  expectSatisfactionSurveyCardToBeVisible() {
    cy.get('[data-testid="satisfaction-survey-card"]').should('be.visible');
  }

  expectSatisfactionSurveyCardToHaveCurrentMonth() {
    const currentMonth = new Date().getMonth() + 1;
    cy.get('[data-testid="satisfaction-survey-card"]').should('contain', currentMonth);
  }

  expectSatisfactionSurveyCardToHaveText(text: string) {
    cy.get('[data-testid="satisfaction-survey-card"]').should('contain', text);
  }

  clickSatisfactionSurveyCard() {
    cy.get('[data-testid="satisfaction-survey-card"]').click();
  }

  expectSatisfactionSurveyModalToBeOpened() {
    cy.get('[data-testid="satisfaction-survey-modal"]').should('exist');
  }

  expectRatingComponentToBeVisible() {
    cy.get('[data-testid="component-rating"]').should('be.visible');
  }

  expectCommentFieldToBeVisible() {
    cy.get('[data-testid="satisfaction-survey-comment"]').should('be.visible');
  }

  expectSubmitButtonToBeDisabled() {
    cy.get('[data-testid="component-dialog-confirm-button"]').should('be.disabled');
  }

  expectSubmitButtonToBeEnabled() {
    cy.get('[data-testid="component-dialog-confirm-button"]').should('not.be.disabled');
  }

  clickModalConfirmButton() {
    cy.get('[data-testid="component-dialog-confirm-button"]').click();
  }

  clickModalCloseButton() {
    cy.get('[data-testid="component-dialog-close-button"]').click();
  }

  expectSatisfactionSurveyModalToBeClosed() {
    cy.get('[data-testid="satisfaction-survey-modal"]').should('not.exist');
  }

  typeCommentField(text: string) {
    cy.get('[data-testid="satisfaction-survey-comment"]').type(text);
  }

  clickRatingStar(index: number) {
    cy.get(`[data-testid="rating-star-${index}"]`).click();
  }

  expectRatingComponentToBeFilled(index: number) {
    cy.get(`[data-testid="rating-star-${index}"] svg g path`).should(
      'not.have.attr',
      'fill',
      'none',
    );
  }

  expectRatingComponentToBeEmpty(index: number) {
    cy.get(`[data-testid="rating-star-${index}"] svg g path`).should('have.attr', 'fill', 'none');
  }

  expectSatisfactionSurveyCardEnabled() {
    cy.get('[data-testid="satisfaction-survey-card"]').should('have.attr', 'completed', 'N');
  }

  expectSatisfactionSurveyCardDisabled() {
    cy.get('[data-testid="satisfaction-survey-card"]').should('have.attr', 'completed', 'Y');
  }
}

export default SatisfactionSurveyPage;
