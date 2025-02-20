import LoginPage from '../../../pages/login/LoginPage';
import LoginServiceMock from '../../mock/login/LoginServiceMock';


describe('KAN-1 로그인 화면 진입', () => {
    const page = new LoginPage();
    const service = new LoginServiceMock();

    it('KAN-10 로그인 화면 진입 후 로그인', () => {
      page.visitLoginPage();
      page.inputId('admin');
      page.inputPw('1234');
      service.successWhenLogin();
      page.clickLoginButton();
    })
});