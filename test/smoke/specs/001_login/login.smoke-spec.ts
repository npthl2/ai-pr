import LoginPage from '../../../pages/auth/LoginPage';

describe('로그인 시나리오 테스트', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        loginPage.visitLoginPage();
    });

    it('관리자 로그인 시 홈 화면으로 이동하고 로그인한 유저 정보가 보여야 한다', () => {
        loginPage.inputId('smoketestagent');
        loginPage.inputPw('smoke1q2w3e4r');
        loginPage.clickLoginButton();

        loginPage.assertRedirectedToHome();
        loginPage.assertUserInfoDisplayed('스대리점', '점장');
    });
});