import CustomerDetailPage from '../../../../pages/customer/detail/CustomerDetail';
import { mockAuthStore } from '../../../../support/helpers/mockAuthStore';
import CustomerDetailServiceMock from '../../../mock/customer/detail/CustomerDetailServiceMock';

describe('KAN-20 고객 조회 페이지 진입', () => {
  const page = new CustomerDetailPage();
  const service = new CustomerDetailServiceMock();

  before(() => {
    mockAuthStore({
      isAuthenticated: true,
      accessToken: 'mock-token',
      memberInfo: {
        id: 'test-id',
        username: 'testuser',
        role: ['ROLE_SEARCH_TEL_NO', 'ROLE_UNMASKING'], // 필요한 권한 추가
      },
    });
  });

  it('KAN-20-1 고객 조회 화면 진입', () => {
    page.visitCustomerDetailPage();
    service.successWhenGetCustomerContracts();
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

  it('KAN-20-4 알맞은 핸드폰 번호 검색 했을 때 해당 회선만 표시되어야 한다', () => {
    page.putPhoneNumber('01098765432');
    page.clickSearchIcon();
    service.successWhenGetContractIdByPhoneNumber();
    page.clickFirstNodeOfTree();
    page.assertSearchContract();
  });

  it('KAN-20-4 마스킹 해제 권한이 있는 경우 우클릭 시 마스킹 해제 창 호출이 확인되어야 한다', () => {
    page.clickSampleUnmaskableItem();
    page.clickUnmaskingMenuItem();
    page.cancelUnmaskingPopup();
    // page.assertUnmaskingPopup();
    // 마스킹은 KAN-27에서 확인
  });

  it('KAN-20-4 요금제/부가서비스 변경 메뉴 클릭 시 탭 추가가 되어야 한다', () => {
    page.clickServiceInfoChangeButton();
    //탭체크는 KAN-16에서 확인
  });
});
