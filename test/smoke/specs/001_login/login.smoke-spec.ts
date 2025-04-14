import LoginPage from '../../pages/LoginPage';

describe('001. 로그인 시나리오 테스트', () => {
    const page = new LoginPage();

    before(() => {
        page.visitLoginPage();
    });

    it('관리자 로그인 시 홈 화면으로 이동하고 로그인한 유저 정보가 보여야 한다', () => {
        page.inputId('smoketestagent');
        page.inputPw('smoke1q2w3e4r');
        page.clickLoginButton();

        page.assertRedirectedToHome();
        page.assertUserInfoDisplayed('스대리점', '점장');
    });
});