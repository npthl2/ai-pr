import CustomerSearchTestPage from '../../../../pages/customer/CustomerSearch';
import CustomerSearchServiceMock from '../../../mock/customer/search/CustomerSearchServiceMock';

describe('KAN-18 고객검색 Modal - 일반유저', () => {
  const customerSearch = new CustomerSearchTestPage();
  const customerSearchServiceMock = new CustomerSearchServiceMock();

  before(() => {
    customerSearchServiceMock.homeBookmark();
    customerSearch.visit();
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

  it('고객 조회 성공', () => {
    customerSearch.typeName('있는이름');
    customerSearch.typeBirthDate('900101');
    customerSearchServiceMock.successFindCustomer();
    customerSearch.clickSearch();

    //cy.contains('등록된 고객 정보가 없습니다.').should('be.visible');
  });

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
