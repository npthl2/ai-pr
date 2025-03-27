import CustomerDetailPage from '../../../../pages/customer/detail/CustomerDetail';
import CustomerSearchTestPage from '../../../../pages/customer/search/CustomerSearch';
import { mockMemberStore } from '../../../../support/helpers/mockMemberStore';
import CustomerDetailServiceMock from '../../../mock/customer/detail/CustomerDetailServiceMock';

describe('KAN-20 고객 조회 페이지 진입', () => {
  const page = new CustomerDetailPage();
  const customerSearchPage = new CustomerSearchTestPage();
  const service = new CustomerDetailServiceMock();

  before(() => {
    mockMemberStore({
      memberInfo: {
        memberId: 'user1',
        memberName: 'user1',
        authorities: ['ROLE_SEARCH_TEL_NO', 'ROLE_UNMASKING'],
      },
    });

    service.homeBookmark();
    page.visitCustomerDetailPage();
    customerSearchPage.getOpenModalButton().click();
    customerSearchPage.typePhoneNumber('01012345678');
    service.successGetCustomer();
    service.successWhenGetCustomerContracts();
    customerSearchPage.clickSearch();
  });

  it('KAN-20-1 고객 조회 화면 진입', () => {
    page.assertTree();
    page.assertInformation();
  });

  it('KAN-20-2 검색 항목에 맞는 트리 상태 확인이 가능해야 한다', () => {
    // 이름 - 생일 - 성별 검색의 경우 모든 노드가 닫혀있어야 한다
    page.assertTreeSelected1depthClosed();
    page.clickFirstNodeOfTree(); // 20-3을 위한 노드 열기
  });

  it('KAN-20-3 항목 클릭 시 상세 정보 확인이 가능해야 한다', () => {
    page.clickFirstNodeOfTree();
    page.assertInformationText();
  });

  it('KAN-20-4 해지포함 체크를 클릭했을 때 해지된 계약이 표시되어야 한다', () => {
    page.clickIncludeCancelledCheckbox();
    page.assertCancelledPhoneStatus();
  });

  it('KAN-20-5 알맞은 핸드폰 번호 검색 했을 때 해당 회선만 표시되어야 한다', () => {
    page.putPhoneNumber('01098765432');
    service.successWhenGetContractIdByPhoneNumber();
    page.clickSearchIcon();
    page.clickFirstNodeOfTree();
    page.assertSearchContract();
  });

  it('KAN-20-6 마스킹 해제 권한이 있는 경우 우클릭 시 마스킹 해제 창 호출이 확인되어야 한다', () => {
    page.clickSampleUnmaskableItem();
    page.clickUnmaskingMenuItem();
    page.cancelUnmaskingPopup();
    // page.assertUnmaskingPopup();
  });

  it('KAN-20-7 요금제/부가서비스 변경 메뉴 클릭 시 탭 추가가 되어야 한다', () => {
    page.clickServiceInfoChangeButton();
    //탭체크는 KAN-16에서 확인
  });
});
