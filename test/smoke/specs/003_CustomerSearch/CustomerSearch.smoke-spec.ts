import LoginPage from "../../pages/LoginPage";
import CustomerSearchPage from "../../pages/CustomerSearchPage";


const CUSTOMER_NAME = '김치국'
const CUSTOMER_BIRTH_DATE = '111111'
const CUSTOMER_ID = 'C-4000000000'

describe('003. 고객 조회 시나리오 테스트', () => {
    const page = new CustomerSearchPage();
    const loginPage = new LoginPage();

    before(() => {
        loginPage.visitLoginPage();
        loginPage.inputId('smoketestagent');
        loginPage.inputPw('smoke1q2w3e4r');
        loginPage.clickLoginButton();
    });

    it('GNB 고객 조회 버튼을 클릭해서 고객 검색 모달을 호출한다', () => {
        page.visit();
        page.clickCustomerSearchModalButton();
        page.expectCustomerSearchModealToBeVisible();
    });

    it('고객 검색 모달에서 고객정보(이름,생년월일,성별)를 입력하고 검색 버튼을 클릭해서 고객 정보를 확인한다', () => {
        page.typeName(CUSTOMER_NAME);
        page.typeBirthDate(CUSTOMER_BIRTH_DATE);
        // page.checkGenderMale();
        page.clickSearchButton();
        page.expectGnbCustomerAreaToBeVisible();
        page.expectLnbCustomerToBeVisible(CUSTOMER_ID);
    });

    it ('고객 조회 화면에서 고객정보를 클릭해서 고객 상세정보를 확인한다', () => {
        page.clickFirstNodeOfTree();
        page.clickPhoneTreeFirstItem();
        page.assertContractInformationLoaded();      
        page.assertCustomerDetailInformationLoaded();
        page.assertInvoiceInformationLoaded();  
    });
});