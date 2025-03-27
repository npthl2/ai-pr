import CustomerSearchTestPage from '../../../../pages/customer/search/CustomerSearch';
import { CustomerSearchServiceMock } from '../../../mock/customer/search/CustomerSearchServiceMock';
import { mockMemberStore } from '../../../../support/helpers/mockMemberStore';
import { mockAuthStore } from '../../../../support/helpers/mockAuthStore';
import CustomerDetailServiceMock from '../../../mock/customer/detail/CustomerDetailServiceMock';
import LayoutPage from '../../../../pages/layout/LayoutPage';
import ServiceSearchPage from '../../../../pages/modifyService/search/ServiceSearch';
import { ServiceSearchMock } from '../../../mock/modifyService/search/ServiceSearch';

describe('[KAN-21-1] 고객조회 X', () => {
  const customerSearch = new CustomerSearchTestPage();
  const layoutPage = new LayoutPage();
  const customerSearchServiceMock = new CustomerSearchServiceMock();
  const customerDetailServiceMock = new CustomerDetailServiceMock();
  const serviceSearchServiceMock = new ServiceSearchMock();

  const serviceSearchPage = new ServiceSearchPage();
  before(() => {
    mockAuthStore({
      isAuthenticated: true,
    });
    mockMemberStore({
      isAuthenticated: true,
      memberInfo: {
        memberId: 'user1',
        memberName: 'user1',
        authorities: ['ROLE_SEARCH_TEL_NO', 'ROLE_UNMASKING'],
      },
    });
    serviceSearchServiceMock.homeBookmark();
  });

  it('[KAN-21-1] LNB에서 메뉴를 클릭 했을 때 고객조회 모달이 보여야 한다', () => {
    serviceSearchPage.visitHome();
    layoutPage.clickMenuButton();
    serviceSearchPage.getServiceSearchMenu().click();
    customerSearch.getModal().should('be.visible');
  });

  it('[KAN-21-2-1] 다건일 경우 서비스 번호가 선택되지 않아야 한다', () => {
    serviceSearchServiceMock.getCustomerTwoLine();
    customerSearch.typeName('김철수');
    customerSearch.typeBirthDate('781012');
    customerSearch.clickSearch();
    serviceSearchPage.getServiceModificationContainer().should('be.visible');
    serviceSearchPage.getContractServiceListModal().should('be.visible');
  });

  it('[KAN-21-2-2] 단건일 경우 서비스 번호가 선택되어야 한다', () => {
    serviceSearchServiceMock.getCustomerOneLine();
    serviceSearchServiceMock.getCustomerOneLineContract();
    serviceSearchPage.visitHome();
    layoutPage.clickMenuButton();
    serviceSearchPage.getServiceSearchMenu().click();
    customerSearch.typeName('박지훈');
    customerSearch.typeBirthDate('891203');
    customerSearch.clickSearch();
    serviceSearchPage.getLineInformationPhoneNumber().should('be.visible');
    serviceSearchPage.getCurrentServiceName().should('be.visible');
  });
});
