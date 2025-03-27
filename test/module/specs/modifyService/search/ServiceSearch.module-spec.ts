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
  const serviceSearchServiceMock = new ServiceSearchMock();

  const serviceSearchPage = new ServiceSearchPage();

  beforeEach(() => {
    serviceSearchServiceMock.homeBookmark();
  });
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
  });

  it('[KAN-21-1-1] LNB에서 메뉴를 클릭 했을 때 고객조회 모달이 보여야 한다', () => {
    serviceSearchPage.visitHome();
    layoutPage.clickMenuButton();
    serviceSearchPage.getServiceSearchMenu().click();
    customerSearch.getModal().should('be.visible');
  });

  it('[KAN-21-1-2] 다건일 경우 서비스 번호가 선택되지 않아야 한다', () => {
    serviceSearchServiceMock.getCustomerTwoLine();
    serviceSearchServiceMock.getCustomerTwoLineContract();
    serviceSearchServiceMock.getCustomerInfomation100000000001();
    customerSearch.typeName('김철수');
    customerSearch.typeBirthDate('781012');
    customerSearch.clickSearch();
    serviceSearchPage.getServiceModificationContainer().should('be.visible');
    serviceSearchPage.getContractServiceListModal().should('be.visible');
  });

  it('[KAN-21-1-3] 단건일 경우 서비스 번호가 선택되어야 한다', () => {
    serviceSearchServiceMock.getCustomerOneLine();
    serviceSearchServiceMock.getCustomerOneLineContract();
    serviceSearchServiceMock.getCustomerOneLineContractService();
    serviceSearchServiceMock.getCustomerInfomation100000000003();
    serviceSearchPage.visitHome();
    layoutPage.clickMenuButton();
    serviceSearchPage.getServiceSearchMenu().click();
    customerSearch.typeName('박지훈');
    customerSearch.typeBirthDate('891203');
    customerSearch.clickSearch();
    serviceSearchPage.getLineInformationPhoneNumber().should('be.visible');
    serviceSearchPage.getCurrentServiceName().should('be.visible');
    serviceSearchPage.getAllTabCloseButton().click();
  });
});

describe('[KAN-21-2] 고객조회 O', () => {
  const customerSearch = new CustomerSearchTestPage();
  const layoutPage = new LayoutPage();
  const serviceSearchServiceMock = new ServiceSearchMock();

  const serviceSearchPage = new ServiceSearchPage();

  beforeEach(() => {
    serviceSearchServiceMock.homeBookmark();
  });

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

  it('[KAN-21-2-1] 고객조회 화면에서 요금제/부가서비스 버튼을 클릭 했을 때 MDI에 요금제/부가서비스 탭이 생성되고 요금제/부가서비스 화면이 보여야 한다', () => {
    serviceSearchServiceMock.getCustomerSearchPhoneNumber();
    serviceSearchServiceMock.getCustomerTwoLineContract();
    serviceSearchServiceMock.getCustomerInfomation100000000001();
    serviceSearchPage.visitHome();
    layoutPage.clickMenuButton();
    customerSearch.getOpenModalButton().click();
    customerSearch.typePhoneNumber('01098765432');
    customerSearch.clickSearch();
    serviceSearchPage.getCustomerSearchTab().should('be.visible');
    serviceSearchPage.getServiceInfoChangeButton().click();
    serviceSearchPage.getServiceModificationContainer().should('be.visible');
    serviceSearchPage.getAllTabCloseButton().click();
  });

  it('[KAN-21-2-2] 고객조회 화면에서 해지된 회선은 요금제/부가서비스 버튼이 보이지 않아야 한다', () => {
    serviceSearchServiceMock.getCustomerSearchCanclePhoneNumber();
    serviceSearchServiceMock.getCustomerTwoLineContract();
    serviceSearchServiceMock.getCustomerOneLineContractService();
    serviceSearchServiceMock.getCustomerInfomation100000000001();
    serviceSearchPage.visitHome();
    layoutPage.clickMenuButton();
    customerSearch.getOpenModalButton().click();
    customerSearch.typePhoneNumber('01012345678');
    customerSearch.clickSearch();
    serviceSearchPage.getCustomerSearchTab().should('be.visible');
    serviceSearchPage.getIncludeCancelledCheckbox().click();
    serviceSearchPage.getServiceInfoChangeButton().should('not.exist');
    serviceSearchPage.getServiceModificationContainer().should('not.be.exist');
    serviceSearchPage.getAllTabCloseButton().click();
  });

  it('[KAN-21-2-3] 고객조회 화면에서 LNB 메뉴를 클릭 했을 때 서비스 선택 모달이 보여야 한다', () => {
    serviceSearchServiceMock.getCustomerTwoLine();
    serviceSearchServiceMock.getCustomerTwoLineContract();
    serviceSearchServiceMock.getCustomerInfomation100000000001();
    serviceSearchServiceMock.getCustomerTwoLineContractService();
    serviceSearchPage.visitHome();
    layoutPage.clickMenuButton();
    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('김철수');
    customerSearch.typeBirthDate('781012');
    customerSearch.clickSearch();
    serviceSearchPage.getCustomerSearchTab().should('be.visible');
    serviceSearchPage.getServiceSearchMenu().click();
    serviceSearchPage.getServiceSearchTab().should('be.visible');
    serviceSearchPage.getServiceModificationContainer().should('be.visible');
    serviceSearchPage.getContractServiceListModal().should('be.visible');
    serviceSearchPage.getContractServiceListCancelButton().click();
    serviceSearchPage.getAllTabCloseButton().click();
  });

  it('[KAN-21-2-4] 고객조회 화면에서 LNB 메뉴를 클릭 했을 때 사용 중 회선이 없는 경우 상품 변경 불가 모달이 보여야 한다', () => {
    serviceSearchServiceMock.getCustomerCancleLine();
    serviceSearchServiceMock.getCustomerCancleLineContract();
    serviceSearchServiceMock.getCustomerCancleContractService();
    serviceSearchServiceMock.getCustomerInfomation100000000005();
    serviceSearchPage.visitHome();
    layoutPage.clickMenuButton();
    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('한동욱');
    customerSearch.typeBirthDate('851230');
    customerSearch.clickSearch();
    serviceSearchPage.getCustomerSearchTab().should('be.visible');
    serviceSearchPage.getServiceSearchMenu().click();
    serviceSearchPage.getServiceSearchTab().should('be.visible');
    serviceSearchPage.getServiceModificationContainer().should('be.visible');
    serviceSearchPage.getServiceSearchNoContractDialog().should('be.visible');
    serviceSearchPage.getServiceSearchNoContractDialog().should('contain', '상품변경이 불가');
    serviceSearchPage.getServiceSearchNoContractDialogCloseButton().click();
    serviceSearchPage.getAllTabCloseButton().click();
  });
});

describe('[KAN-21-3] 회선정보', () => {
  const customerSearch = new CustomerSearchTestPage();
  const layoutPage = new LayoutPage();
  const serviceSearchServiceMock = new ServiceSearchMock();

  const serviceSearchPage = new ServiceSearchPage();

  beforeEach(() => {
    serviceSearchServiceMock.homeBookmark();
  });

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

  it('[KAN-21-3-1] 요금제/부가서비스 화면이 렌더링 될 때 회선 정보가 있으면 회선 정보와 사용중 요금제, 부가서비스 목록이 보여야 한다', () => {
    serviceSearchServiceMock.getCustomerOneLine();
    serviceSearchServiceMock.getCustomerOneLineContract();
    serviceSearchServiceMock.getCustomerOneLineContractService();
    serviceSearchServiceMock.getCustomerInfomation100000000003();
    serviceSearchPage.visitHome();
    layoutPage.clickMenuButton();
    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('박지훈');
    customerSearch.typeBirthDate('891203');
    customerSearch.clickSearch();
    serviceSearchPage.getCustomerSearchTab().should('be.visible');
    serviceSearchPage.getServiceInfoChangeButton().click();
    serviceSearchPage.getServiceModificationContainer().should('be.visible');
    serviceSearchPage.getLineInformationPhoneNumber().should('be.visible');
    serviceSearchPage.getCurrentServiceName().should('be.visible');
    serviceSearchPage.getCurrentServiceAdditionalServiceTable().should('be.visible');
  });

  it('[KAN-21-3-2] 사용 가능한 번호가 단건이면 번호선택 버튼이 비활성화 되어야 한다', () => {
    serviceSearchPage.getLineInformationPhoneNumberSelectButton().should('be.disabled');
    serviceSearchPage.getAllTabCloseButton().click();
  });

  it('[KAN-21-3-3] 번호 선택 버튼을 클릭 했을 때 서비스 선택 모달 및 회선 목록이 보여야 한다', () => {
    serviceSearchServiceMock.getCustomerTwoLine();
    serviceSearchServiceMock.getCustomerTwoLineContract();
    serviceSearchServiceMock.getCustomerTwoLineContractService();
    serviceSearchServiceMock.getCustomerInfomation100000000001();
    serviceSearchPage.visitHome();
    layoutPage.clickMenuButton();
    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('김철수');
    customerSearch.typeBirthDate('781012');
    customerSearch.clickSearch();
    serviceSearchPage.getCustomerSearchTab().should('be.visible');
    serviceSearchPage.getServiceSearchMenu().click();
    serviceSearchPage.getServiceSearchTab().should('be.visible');
    serviceSearchPage.getServiceModificationContainer().should('be.visible');
    serviceSearchPage.getContractServiceListModal().should('be.visible');
    serviceSearchPage.getContractServiceListTableRow('7823440192').should('be.visible');
  });

  it('[KAN-21-3-4] 서비스 선택 모달에서 회선번호 선택하고 선택 버튼 클릭 시 회선 정보가 변경되어야 한다', () => {
    serviceSearchServiceMock.getCustomerTwoLine();
    serviceSearchServiceMock.getCustomerTwoLineContract();
    serviceSearchServiceMock.getCustomerTwoLineContractService();
    serviceSearchServiceMock.getCustomerInfomation100000000001();
    serviceSearchPage.getContractServiceListTableRowRadio('7823440192').click();
    serviceSearchPage.getContractServiceListConfirmButton().click();
    serviceSearchPage.getLineInformationPhoneNumber().should('be.visible');
    serviceSearchPage.getCurrentServiceName().should('contain', '5G Ultra Plus 요금제');
  });

  it('[KAN-21-3-5] 서비스 선택 모달에서 취소 버튼을 클릭 했을 때 모달을 닫아야 한다', () => {
    serviceSearchPage.getLineInformationPhoneNumberSelectButton().click();
    serviceSearchPage.getContractServiceListCancelButton().click();
    serviceSearchPage.getContractServiceListModal().should('not.exist');
    serviceSearchPage.getAllTabCloseButton().click();
  });
});

describe('[KAN-21-4] 마스킹', () => {
  const customerSearch = new CustomerSearchTestPage();
  const layoutPage = new LayoutPage();
  const serviceSearchServiceMock = new ServiceSearchMock();

  const serviceSearchPage = new ServiceSearchPage();

  beforeEach(() => {
    serviceSearchServiceMock.homeBookmark();
  });

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

  it('[KAN-21-4-1] 마스킹 해제 메뉴 우클릭 시 마스킹 해제 모달이 보여야 한다', () => {
    serviceSearchServiceMock.getCustomerOneLine();
    serviceSearchServiceMock.getCustomerOneLineContract();
    serviceSearchServiceMock.getCustomerOneLineContractService();
    serviceSearchServiceMock.getCustomerInfomation100000000003();
    serviceSearchPage.visitHome();
    layoutPage.clickMenuButton();
    customerSearch.getOpenModalButton().click();
    customerSearch.typeName('박지훈');
    customerSearch.typeBirthDate('891203');
    customerSearch.clickSearch();
    serviceSearchPage.getCustomerSearchTab().should('be.visible');
    serviceSearchPage.getServiceInfoChangeButton().click();
    serviceSearchPage.getLineInformationPhoneNumber().rightclick();
    serviceSearchPage.getMaskingModalContent().should('be.visible');
  });

  it('[KAN-21-4-2] 마스킹 해제 사유 입력 후 해제 버튼 클릭 시 마스킹 해제', () => {
    serviceSearchServiceMock.getUnmaskingPhoneNumber();
    serviceSearchPage.getMaskingModalContent().type('마스킹 해제 테스트');
    serviceSearchPage.getMaskingModalConfirmButton().click();
    serviceSearchPage.getLineInformationPhoneNumber().should('contain', '010-9876-5432');
    serviceSearchPage.getAllTabCloseButton().click();
  });
});
