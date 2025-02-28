import LoginPage from '../../../pages/auth/LoginPage';
import AuthServiceMock from '../../mock/auth/AuthServiceMock';

describe('KAN-44 로그인 기능 테스트', () => {
    const loginPage = new LoginPage();
    const authMock = new AuthServiceMock();

    beforeEach(() => {
        authMock.successWhenLogin(); // ✅ Mock을 먼저 실행
        loginPage.visitLoginPage();  // ✅ 그 후 로그인 페이지 방문
        authMock.getBookmark();
    });

    it('KAN-44-1 정확한 ID와 PW 입력 후 로그인 버튼 클릭 시 로그인 성공 후 홈 화면으로 이동하고 로그인한 유저 정보가 보여야 한다', () => {

        loginPage.inputId('user1');
        loginPage.inputPw('new1234');
        loginPage.clickLoginButton();

        // authMock.getBookmark();
        // cy.wait('@bookmarkRequest');

        loginPage.assertRedirectedToHome();
        loginPage.assertUserInfoDisplayed('김콜센터', '대리');
    });

    it('KAN-44-2 항목이 누락된 상태로 로그인 버튼을 클릭할 때 에러 메시지가 표시되어야 한다', () => {
        // ID & PW 미입력 후 로그인 버튼 클릭
        loginPage.clickLoginButton();
        loginPage.assertLoginErrorMessage('ID와 Password를 모두 입력해주세요.');

        // ID 미입력
        loginPage.inputPw('new1234');
        loginPage.clickLoginButton();
        loginPage.assertLoginErrorMessage('ID를 입력해주세요.');

        // ✅ 비밀번호 미입력 테스트 전에 ID 입력 필드 초기화
        cy.get('[data-testid="pw"]').clear();  // ID 입력 필드 값 초기화

        // PW 미입력
        loginPage.inputId('testUser');
        loginPage.clickLoginButton();
        loginPage.assertLoginErrorMessage('Password를 입력해주세요.');
    });

    it('KAN-44-3 ID와 PW가 틀렸을 때 에러 메시지가 표시되어야 한다', () => {
        authMock.failWhenLogin();

        loginPage.inputId('wrongUser');
        loginPage.inputPw('wrongPass');
        loginPage.clickLoginButton();

        loginPage.assertLoginErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
    });


    it('KAN-44-4 로그아웃 버튼을 클릭하면 로그아웃 모달이 표시되어야 한다', () => {
        loginPage.inputId('user1');
        loginPage.inputPw('new1234');
        loginPage.clickLoginButton();

        loginPage.assertRedirectedToHome();

        cy.get('[data-testid="logout-button"]').click(); // ✅ 로그아웃 버튼 클릭
        cy.get('[data-testid="logout-dialog"]').should('be.visible'); // ✅ 로그아웃 모달이 표시되는지 확인
    });

    it('KAN-44-5 로그아웃 모달에서 확인 버튼을 클릭하면 로그아웃이 정상적으로 처리되어야 한다', () => {
        authMock.successWhenLogout();

        loginPage.inputId('user1');
        loginPage.inputPw('new1234');
        loginPage.clickLoginButton();

        loginPage.assertRedirectedToHome();

        cy.get('[data-testid="logout-button"]').click();
        cy.get('[data-testid="logout-dialog"]').should('be.visible');

        cy.get('[data-testid="logout-confirm-button"]').click();
        cy.wait('@logoutRequest');

        cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
    });

    it('KAN-44-6 로그아웃 성공 후 스낵바가 표시되어야 한다', () => {
        loginPage.inputId('user1');
        loginPage.inputPw('new1234');
        loginPage.clickLoginButton();

        loginPage.assertRedirectedToHome();

        cy.get('[data-testid="logout-button"]').click();
        cy.get('[data-testid="logout-dialog"]').should('be.visible');

        // ✅ 페이지 이동 전에 Cypress가 스낵바를 먼저 확인할 수 있도록 함
        cy.on('window:before:unload', () => {
            
            cy.get('[data-testid="logout-snackbar"]').should('be.visible');
            cy.contains('로그아웃 되었습니다.').should('be.visible');
        });
    
        cy.get('[data-testid="logout-confirm-button"]').click(); // ✅ 로그아웃 확인 버튼 클릭
    });

    
});
