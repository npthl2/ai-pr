/// <reference types="cypress" />

class LoginPage {
    constructor(){}

    visitLoginPage(){
        cy.visit('/example/login')
    }

    inputId(text: string){
        cy.get('[data-testid="id"]').type(text);
    }

    inputPw(text: string){
        cy.get('[data-testid="pw"]').type(text);
    }

    clickLoginButton(){
        cy.get('[data-testid="login"]').click();
    }
}
export default LoginPage;