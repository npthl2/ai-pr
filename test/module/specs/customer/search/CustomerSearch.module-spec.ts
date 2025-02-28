import CustomerSearchTestPage from '../../../../pages/customer/search/CustomerSearch';
import {
  CustomerSearchServiceMock,
  LoginServiceMock,
} from '../../../mock/customer/search/CustomerSearchServiceMock';
import { mockAuthStore } from '../../../../support/helpers/mockAuthStore';

describe('KAN-18 고객검색 Modal - 일반유저', () => {
  const customerSearch = new CustomerSearchTestPage();
  const customerSearchServiceMock = new CustomerSearchServiceMock();
  const loginServiceMock = new LoginServiceMock();

  beforeEach(() => {
    mockAuthStore({
      memberInfo: {
        id: 'user2',
        username: 'user2',
        role: ['ROLE_USER'],
      },
    });

    // customerSearch.visit();
    // customerSearch.inputId('user2');
    // customerSearch.inputPw('new1234');
    // loginServiceMock.normalLogin();
    // customerSearch.clickLoginButton();
    customerSearchServiceMock.homeBookmark();
  });
  /*
  it('사용자가 고객 조회 버튼 클릭', () => {
    customerSearch.visitCustomerSearch();
    customerSearch.getModal().should('not.exist');
    customerSearch.getOpenModalButton().click();
    customerSearch.getModal().should('be.visible');
  });

  it('ESC 키를 입력했을 때 고객 조회 모달이 닫혀야 한다', () => {
    // 모달이 열려있는 상태에서 ESC 키 입력 시 모달이 닫히는지 검사
    customerSearch.getModal().should('be.visible');
    cy.get('body').type('{esc}');
    customerSearch.getModal().should('not.exist');
  });

  it('사용자가 Ctrl + / 키 입력', () => {
    customerSearch.getModal().should('not.exist');
    cy.get('body').type('{ctrl+/}');
    customerSearch.getModal().should('be.visible');
  });

  it('모달 외부를 클릭했을 때 고객 조회 모달이 닫혀야 한다', () => {
    customerSearch.getModal().should('be.visible');
    cy.get('body').click(10, 10); // 모달 외부 클릭 (좌표는 조정 가능)
    customerSearch.getModal().should('not.exist');
  });

  it('이름과 생년월일 조회 조건이 보여야 한다', () => {
    customerSearch.getOpenModalButton().click();
    customerSearch.getNameInput().should('be.visible');
    customerSearch.getBirthDateInput().should('be.visible');
  });

  it('적절한 이름과 생년월일을 입력했을 때 고객 조회 버튼이 활성화된다', () => {
    customerSearch.typeName('홍길동');
    customerSearch.typeBirthDate('900101');
    customerSearch.getSearchButton().should('not.be.disabled');
  });

  it('고객 조회 버튼을 클릭했을 때 조회 결과가 없을 경우 에러 메시지가 표시되어야 한다', () => {
    customerSearch.typeName('없는이름');
    customerSearch.typeBirthDate('900101');
    customerSearchServiceMock.notFoundCustomer();
    customerSearch.clickSearch();
    cy.contains('등록된 고객 정보가 없습니다.').should('be.visible');
  });

  it('고객 조회 성공 && LNB에 고객 리스트 표시 && 조회된 고객 선택', () => {
    customerSearch.typeName('김철수');
    customerSearch.typeBirthDate('781012');
    customerSearchServiceMock.successFindCustomer01();
    customerSearch.clickSearch();

    customerSearch.getGNBCustomerArea().should('be.visible');
    customerSearch.getLNBCustomer('100000000001').should('have.attr', 'aria-selected', 'true');
  });

  it('탭에 마우스를 올리면 삭제 버튼이 표시된다', () => {
    customerSearch.getLNBCustomer('100000000001').trigger('mouseover');
    customerSearch.getLNBCustomerRemoveButton('100000000001').should('be.visible');
  });

  it('LNB 고객 리스트를 클릭하면 GNB의 고객 정보 변경', () => {
    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('이영희');
    customerSearch.typeBirthDate('781012');
    customerSearchServiceMock.successFindCustomer02();
    customerSearch.clickSearch();
    customerSearch.getLNBCustomer('100000000002').click();
    customerSearch.getGNBCustomerName().should('have.text', '이영희');
  });

  it('LNB 고객 리스트에 10명 있으면 경고 모달이 표시되어야 한다', () => {
    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('이영희');
    customerSearch.typeBirthDate('781012');
    customerSearchServiceMock.successFindCustomer02();
    customerSearch.clickSearch();

    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('박지훈');
    customerSearch.typeBirthDate('891203');
    customerSearchServiceMock.successFindCustomer03();
    customerSearch.clickSearch();

    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('최민서');
    customerSearch.typeBirthDate('991105');
    customerSearchServiceMock.successFindCustomer04();
    customerSearch.clickSearch();

    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('한동욱');
    customerSearch.typeBirthDate('851230');
    customerSearchServiceMock.successFindCustomer05();
    customerSearch.clickSearch();

    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('정다은');
    customerSearch.typeBirthDate('950315');
    customerSearchServiceMock.successFindCustomer06();
    customerSearch.clickSearch();

    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('오지훈');
    customerSearch.typeBirthDate('701122');
    customerSearchServiceMock.successFindCustomer07();
    customerSearch.clickSearch();

    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('서준혁');
    customerSearch.typeBirthDate('001001');
    customerSearchServiceMock.successFindCustomer08();
    customerSearch.clickSearch();

    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('강예진');
    customerSearch.typeBirthDate('891105');
    customerSearchServiceMock.successFindCustomer09();
    customerSearch.clickSearch();

    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('조윤성');
    customerSearch.typeBirthDate('001225');
    customerSearchServiceMock.successFindCustomer10();
    customerSearch.clickSearch();

    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('배수진');
    customerSearch.typeBirthDate('951013');
    customerSearchServiceMock.successFindCustomer11();
    customerSearch.clickSearch();

    customerSearch.getAlertDialogTitle().should('be.visible');
  });
});

describe('KAN-18 고객검색 Modal - 관리자', () => {
  const customerSearch = new CustomerSearchTestPage();
  const customerSearchServiceMock = new CustomerSearchServiceMock();
  const loginServiceMock = new LoginServiceMock();

  before(() => {
    customerSearch.visit();
    customerSearch.inputId('user1');
    customerSearch.inputPw('new1234');
    loginServiceMock.adminLogin();
    customerSearch.clickLoginButton();
    customerSearchServiceMock.homeBookmark();
  });

  it('권한자일 경우 전화번호 조회 조건이 추가로 보여야 한다', () => {
    customerSearch.getOpenModalButton().click();
    customerSearch.getPhoneNumberInput().should('be.visible');
  });

  it('적절한 전화번호를 입력했을 때 고객 조회 버튼이 활성화된다', () => {
    customerSearch.typePhoneNumber('01012345678');
    customerSearch.getSearchButton().should('not.be.disabled');
  });

  it('권한자일 경우 마스킹 해제 버튼이 보이고 클릭 시 마스킹 해제 창이 보여야 한다', () => {
    customerSearch.typePhoneNumber('01012345678');
    customerSearchServiceMock.successFindCustomer01();
    customerSearch.clickSearch();
    customerSearch.getGNBUnmaskingButton().should('be.visible');
    customerSearch.getGNBUnmaskingButton().click();
    customerSearch.getAlertDialogTitle().should('be.visible');
  }); */
});
