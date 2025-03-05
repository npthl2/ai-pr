/// <reference types="cypress" />

class LoginPage {
    // 로그인 페이지 방문
    visitLoginPage() {
        cy.visit('/login');
    }

    // ID 입력
    inputId(text: string) {
        cy.get('[data-testid="id"]').type(text);
    }

    // 비밀번호 입력
    inputPw(text: string) {
        cy.get('[data-testid="pw"]').type(text);
    }

    // 로그인 버튼 클릭
    clickLoginButton() {
        cy.get('[data-testid="login"]').click();
    }

    // 로그인 에러 메시지 확인
    assertLoginErrorMessage(message: string) {
        cy.contains(message).should('be.visible');
    }

    // 로그인 성공 후 홈 화면 이동 확인
    assertRedirectedToHome() {
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    }

    // 로그인한 유저 정보가 화면에 표시되는지 확인
    assertUserInfoDisplayed(userName: string, position: string) {
        cy.contains(`${userName} ${position}`).should('be.visible');
    }
}

export default LoginPage;
