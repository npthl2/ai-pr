/// <reference types="cypress" />

class LoginPage {
    constructor() {}

    visitLoginPage() {
        cy.visit('/login');
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

    assertRedirectedToHome() {
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    }

    assertUserInfoDisplayed(userName: string, position: string) {
        cy.contains(`${userName} ${position}`).should('be.visible');
    }    
}

export default LoginPage;