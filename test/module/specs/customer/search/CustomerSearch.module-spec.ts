import CustomerSearchTestPage from '../../../../pages/customer/search/CustomerSearch';
import {
  CustomerSearchServiceMock,
  LoginServiceMock,
} from '../../../mock/customer/search/CustomerSearchServiceMock';

describe('KAN-18 고객검색 Modal - 일반유저', () => {
  const customerSearch = new CustomerSearchTestPage();
  const customerSearchServiceMock = new CustomerSearchServiceMock();
  const loginServiceMock = new LoginServiceMock();

  before(() => {
    customerSearch.visit();
    customerSearch.inputId('user2');
    customerSearch.inputPw('new1234');
    loginServiceMock.normalLogin();
    customerSearch.clickLoginButton();
    customerSearchServiceMock.homeBookmark();
  });

  it('사용자가 고객 조회 버튼 클릭', () => {
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

  it('LNB 고객 리스트를를 클릭하면 GNB의 고객 정보 변경', () => {
    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('이영희');
    customerSearch.typeBirthDate('781012');
    customerSearchServiceMock.successFindCustomer02();
    customerSearch.getLNBCustomer('100000000002').click();
    customerSearch.getGNBCustomerName().should('have.value', '이영*');
  });

  // it('탭을 클릭하면 onChange가 호출되어야 한다', () => {
  //   cy.get('[data-testid="customer-tab-lee"]').click();
  //   cy.get('@onChange').should('have.been.called');
  // });

  // it('삭제 버튼을 클릭하면 onRemove가 호출된다', () => {
  //   cy.get('[data-testid="customer-tab-kim"]').trigger('mouseenter');
  //   cy.get('[data-testid="remove-btn-kim"]').click();
  //   cy.get('@onRemove').should('have.been.calledWith', 'kim');
  // });

  // it('권한자일 경우 전화번호 조회 조건이 추가로 보여야 한다', () => {
  //   // 권한자 모드 토글하는 버튼을 클릭하는 등, 권한자 상태를 활성화시킨 후 검사
  //   cy.get('[data-testid="toggle-authority"]').click();
  //   customerSearch.getPhoneNumberInput().should('be.visible');
  // });

  // it('적절한 전화번호를 입력했을 때 고객 조회 버튼이 활성화된다', () => {
  //   // 권한자 모드를 활성화해서 전화번호 입력 필드가 나타난 상황
  //   cy.get('[data-testid="toggle-authority"]').click();
  //   customerSearch.typePhoneNumber('01012345678');
  //   customerSearch.getSearchButton().should('not.be.disabled');
  // });
});
