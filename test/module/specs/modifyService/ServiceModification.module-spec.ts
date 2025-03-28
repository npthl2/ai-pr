import CustomerDetailPage from '../../../pages/customer/detail/CustomerDetail';
import CustomerSearchTestPage from '../../../pages/customer/search/CustomerSearch';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import { mockMemberStore } from '../../../support/helpers/mockMemberStore';
import CustomerDetailServiceMock from '../../mock/customer/detail/CustomerDetailServiceMock';
import ModifyServicePage from '../../../pages/modifyService/ModifyServicePage';
import ModifyServiceMock from '../../mock/modifyService/ModifyServiceMock';

describe('KAN-22 요금제/부가서비스 변경', () => {
  const customerDetailPage = new CustomerDetailPage();
  const customerSearchPage = new CustomerSearchTestPage();
  const customerDetailService = new CustomerDetailServiceMock();

  const service = new ModifyServiceMock();
  const page = new ModifyServicePage();

  before(() => {
    mockAuthStore();
    mockMemberStore({
      memberInfo: {
        memberId: 'user1',
        memberName: 'user1',
        authorities: ['ROLE_SEARCH_TEL_NO', 'ROLE_UNMASKING'],
      },
    });

    customerDetailService.homeBookmark();
    customerDetailPage.visitCustomerDetailPage();
    customerSearchPage.getOpenModalButton().click();
    customerSearchPage.typePhoneNumber('01077775555');
    customerDetailService.successGetCustomer();
    customerDetailService.successWhenGetCustomerContracts();
    customerSearchPage.clickSearch();

    service.rollbackAvailableWhenCheckServiceModifiable();
  });

  describe('KAN-22-1 사전 제약 사항', () => {
    beforeEach(() => {
      customerDetailService.homeBookmark();
      customerDetailPage.visitCustomerDetailPage();
      customerSearchPage.getOpenModalButton().click();
      customerSearchPage.typePhoneNumber('01077775555');
      customerDetailService.successGetCustomer();
      customerDetailService.successWhenGetCustomerContracts();
      customerSearchPage.clickSearch();
    });

    it('KAN-22-1-1 요금제/부가서비스 화면이 렌더링 될 때 당월 요금제 변경 이력이 있으면 요금제 변경 불가 모달이 보여야 한다', () => {
      service.failWhenCheckServiceModifiable();
      // 요금제/부가서비스 변경버튼 클릭
      customerDetailPage.clickServiceInfoChangeButton();
      // 모달이 표시되는지 확인
      page.assertModalVisible();

      // 모달 내용(요금제 변경) 확인
      page.assertModalContentVisible('요금제 변경은 월 1회만 가능합니다.');
    });

    it('KAN-22-1-2 요금제 변경 박스가 비활성화되어야 한다', () => {
      service.failWhenCheckServiceModifiable();
      // 요금제/부가서비스 변경버튼 클릭
      customerDetailPage.clickServiceInfoChangeButton();
      // 모달이 표시되는지 확인
      page.assertModalVisible();

      // 모달 내용(요금제 변경) 확인
      page.assertModalContentVisible('요금제 변경은 월 1회만 가능합니다.');

      // 확인 버튼 클릭
      page.clickModalConfirmButton();

      // 요금제 선택 박스가 비활성화되어 있는지 확인
      page.assertServiceSelectBoxDisabled();
    });

    it('KAN-22-1-3 요금제 변경 이력이 당일일 경우 "이전 요금제로 되돌리기" 버튼이 보여야 한다', () => {
      // 테스트 설정 변경: 당일 변경 이력 있음, 되돌리기 가능
      service.rollbackAvailableWhenCheckServiceModifiable();

      // 요금제/부가서비스 변경버튼 클릭
      customerDetailPage.clickServiceInfoChangeButton();

      // 모달이 표시되는지 확인
      page.assertModalVisible();

      // 확인 버튼 클릭
      page.clickModalConfirmButton();

      // 되돌리기 버튼이 표시되는지 확인
      page.assertRevertButtonVisible();
    });

    it('KAN-22-1-4 "이전 요금제로 되돌리기" 버튼 클릭 시 변경 전 요금제가 선택되어야 한다', () => {
      // 테스트 설정 변경: 당일 변경 이력 있음, 되돌리기 가능
      service.rollbackAvailableWhenCheckServiceModifiable();

      // 전체 요금제
      service.successWhenGetServices();

      // 현재 요금제 부가서비스
      service.successWhenGetAdditionalServices();

      // 이전 요금제 정보
      service.successWhenGetAdditional_SVC60_Services();

      // 요금제/부가서비스 변경버튼 클릭
      customerDetailPage.clickServiceInfoChangeButton();

      // 모달이 표시되는지 확인
      page.assertModalVisible();

      // 확인 버튼 클릭
      page.clickModalConfirmButton();

      // 되돌리기 버튼이 표시되는지 확인
      page.assertRevertButtonVisible();

      // 되돌리기 버튼 클릭
      page.clickRevertButton();

      // 이전 요금제가 변경되었는지 확인
      page.assertSelectedPreviousServiceIs('LTE Prime Max 요금제');
    });
  });

  describe('KAN-22-2 요금제 변경', () => {
    beforeEach(() => {
      customerDetailService.homeBookmark();
      customerDetailPage.visitCustomerDetailPage();
      customerSearchPage.getOpenModalButton().click();
      customerSearchPage.typePhoneNumber('01077775555');
      customerDetailService.successGetCustomer();
      customerDetailService.successWhenGetCustomerContracts();
      customerSearchPage.clickSearch();

      service.successWhenCheckServiceModifiable();
      service.noAgeRestrictionWhenCheckServiceAgeRestriction;
      service.successWhenGetServices();
      service.successWhenGetAdditionalServices();

      // 요금제/부가서비스 변경버튼 클릭
      customerDetailPage.clickServiceInfoChangeButton();
    });

    it('KAN-22-2-1 변경할 요금제 박스를 포커스 했을 때 요금제 리스트가 보여야 한다', () => {
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 요금제 목록이 표시되는지 확인
      page.assertServiceInList('LTE Speed Elite 요금제');
      page.assertServiceInList('LTE Prime Max 요금제');
      page.assertServiceInList('LTE Premium Pro 요금제');
    });

    it('KAN-22-2-2 키워드를 입력하면 해당 키워드를 포함한 요금제만 보여야 한다', () => {
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 검색어 입력
      page.typeServiceSearchKeyword('Speed');

      // 검색 결과에 프리미엄 요금제만 표시되는지 확인
      page.assertServiceInList('LTE Speed Max 요금제');
      page.assertServiceInList('LTE Speed Elite 요금제');
      page.assertServiceInList('5G Speed Master 요금제');
      page.assertServiceInList('5G Max Speed 요금제');
    });

    it('KAN-22-2-3 포함된 요금제가 없으면 빈 리스트가 보여야 한다', () => {
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 검색어 입력
      page.typeServiceSearchKeyword('존재하지 않는 요금제');

      // 요금제가 없다는 메시지가 표시되는지 확인
      page.assertServiceListEmpty();
    });

    it('KAN-22-2-4 요금제 리스트에는 요금제 이름과 금액이 표시되어야 한다', () => {
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 요금제 목록에 가격이 표시되는지 확인
      page.assertServicePriceVisible('LTE Speed Max 요금제', '60,000');
    });

    it('KAN-22-2-5 변경 가능한 요금제를 클릭 시 요금제 변경 모달이 보여야 한다', () => {
      service.noAgeRestrictionWhenCheckServiceAgeRestriction();
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 요금제 선택
      page.selectServiceFromList('LTE Prime Max 요금제');

      // 모달이 표시되는지 확인
      page.assertModalVisible();

      // 모달 내용(요금제 변경) 확인
      page.assertModalContentVisible('[LTE Prime Max 요금제]로 요금제 변경 처리하시겠습니까?');
    });

    it('KAN-22-2-6 모달 확인 클릭 시 선택한 요금제로 변경되고 금액이 표시되어야 한다', () => {
      service.noAgeRestrictionWhenCheckServiceAgeRestriction();
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 요금제 선택
      page.selectServiceFromList('LTE Prime Max 요금제');

      // 모달의 확인 버튼 클릭
      page.clickModalConfirmButton();

      // 선택한 요금제가 적용되었는지 확인
      page.assertSelectedServiceIs('LTE Prime Max 요금제');

      // 금액이 표시되는지 확인 (180,000원)
      page.assertSelectedServicePriceIs('180,000원');
    });

    it('KAN-22-2-7 변경 불가능한 요금제를 클릭 시 요금제 변경 불가 모달이 보여야 한다', () => {
      // 나이 제한 있음 모킹으로 변경
      service.hasAgeRestrictionWhenCheckServiceAgeRestriction();

      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 요금제 선택
      page.selectServiceFromList('LTE Speed Max 요금제');

      // 모달이 표시되는지 확인
      page.assertModalVisible();

      // 모달 내용(요금제 변경) 확인
      page.assertModalContentVisible(
        '해당 요금제는 연령 제한으로 가입이용 불가능 합니다. 다른 요금제를 선택해주세요.',
      );
    });
  });

  describe('KAN-22-3 부가서비스 목록', () => {
    beforeEach(() => {
      customerDetailService.homeBookmark();
      customerDetailPage.visitCustomerDetailPage();
      customerSearchPage.getOpenModalButton().click();
      customerSearchPage.typePhoneNumber('01077775555');
      customerDetailService.successGetCustomer();
      customerDetailService.successWhenGetCustomerContracts();
      customerSearchPage.clickSearch();

      service.successWhenCheckServiceModifiable();
      service.successWhenGetServices();
      service.successWhenGetAdditionalServices();
      service.successWhenGetAdditional_SVC60_Services();

      // 요금제/부가서비스 변경버튼 클릭
      customerDetailPage.clickServiceInfoChangeButton();
    });

    it('KAN-22-3-1 부가서비스 가입 불가 안내 문구가 보여야 한다', () => {
      // 부가서비스 가입 불가 안내 문구가 표시되는지 확인
      page.assertAdditionalServiceDisabledMessageVisible();
    });

    it('KAN-22-3-2 부가서비스 목록이 렌더링 되면 모든 부가서비스가 보여야 한다', () => {
      // 부가서비스 목록이 표시되는지 확인
      page.assertAdditionalServiceListVisible();
    });

    it('KAN-22-3-3 부가서비스 검색 기능이 보여야 한다', () => {
      // 부가서비스 검색 입력 필드가 표시되는지 확인
      page.assertAdditionalServiceSearchVisible();
    });

    it('KAN-22-3-4 현재 요금제의 부가서비스 목록이 선택된 목록에 보여야 한다', () => {
      // 현재 부가서비스가 선택된 목록에 표시되는지 확인
      page.assertCurrentAdditionalServiceInSelectedList();
    });

    it('KAN-22-3-5 가입 불가 부가서비스는 불가 표시가 되어야 한다', () => {
      service.noAgeRestrictionWhenCheckServiceAgeRestriction();
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 요금제 선택
      page.selectServiceFromList('LTE Prime Max 요금제');

      // 모달의 확인 버튼 클릭
      page.clickModalConfirmButton();

      cy.wait('@getAdditional_SVC60_Services');

      // 가입 불가 표시가 있는지 확인
      page.assertAdditionalServiceRestrictionVisible();
    });

    it('KAN-22-3-6 가입 불가 부가서비스의 추가 버튼은 비활성화되어야 한다', () => {
      service.noAgeRestrictionWhenCheckServiceAgeRestriction();
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 요금제 선택
      page.selectServiceFromList('LTE Prime Max 요금제');

      // 모달의 확인 버튼 클릭
      page.clickModalConfirmButton();

      cy.wait('@getAdditional_SVC60_Services');

      // 가입 불가 표시가 있는지 확인
      page.assertAdditionalServiceRestrictionVisible();

      // 가입 불가 부가서비스의 추가 버튼이 비활성화되어 있는지 확인
      page.assertAddButtonDisabled();
    });

    it('KAN-22-3-7 가입 불가 부가서비스에 마우스를 hover 했을 때 툴팁이 보여야 한다', () => {
      service.noAgeRestrictionWhenCheckServiceAgeRestriction();
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 요금제 선택
      page.selectServiceFromList('LTE Prime Max 요금제');

      // 모달의 확인 버튼 클릭
      page.clickModalConfirmButton();

      cy.wait('@getAdditional_SVC60_Services');

      // 가입 불가 부가서비스에 마우스 오버
      page.hoverAdditionalServiceItem('5G');

      // 툴팁이 표시되는지 확인
      page.assertTooltipVisible();
    });

    it('KAN-22-3-8 검색어 입력 시 해당 키워드를 포함한 부가서비스만 보여야 한다', () => {
      service.noAgeRestrictionWhenCheckServiceAgeRestriction();
      // 부가서비스 검색어 입력
      page.typeAdditionalServiceSearchKeyword('5G');

      // 검색 결과에 안심이 포함된 서비스만 표시되는지 확인
      page.assertAdditionalServiceInList('5G 3 Giga 충전 부가서비스');
    });

    it('KAN-22-3-9 키워드가 없으면 빈 리스트가 보여야 한다', () => {
      // 부가서비스 검색어 입력
      page.typeAdditionalServiceSearchKeyword('존재하지 않는 서비스');

      // 빈 목록이 표시되는지 확인
      page.assertServiceListEmpty();
    });

    it('KAN-22-3-10 부가서비스명/요금을 클릭 시 오름차/내림차순 정렬되어야 한다', () => {
      service.noAgeRestrictionWhenCheckServiceAgeRestriction();
      // 이름으로 정렬 클릭
      page.clickAdditionalServiceNameSort();
      page.assertTopAdditionalServiceIs('5G 3 Giga 충전 부가서비스');

      // 요금으로 정렬 클릭
      page.clickAdditionalServicePriceSort();
      page.assertTopAdditionalServiceIs('5G 3 Giga 충전 부가서비스');
    });

    it('KAN-22-3-11 부가서비스 추가 버튼 클릭 시 선택된 목록으로 이동해야 한다', () => {
      service.noAgeRestrictionWhenCheckServiceAgeRestriction();
      //   // 부가서비스 추가 버튼 클릭
      page.clickAddAdditionalServiceButton('LTE 3 Giga 충전 부가서비스');

      // 선택된 부가서비스 목록에 해당 서비스가 표시되는지 확인
      page.assertSelectedAdditionalServiceIs('LTE 3 Giga 충전 부가서비스');
    });

    it('KAN-22-3-12 선택된 부가서비스 목록도 정렬 가능해야 한다', () => {
      // 선택된 부가서비스 목록의 이름 정렬 클릭
      page.clickAdditionalServiceNameSort();
      page.assertSelectedTopAdditionalServiceIs('5G 1 Giga 충전 부가서비스');

      // 선택된 부가서비스 목록의 요금 정렬 클릭
      page.clickAdditionalServicePriceSort();
      page.assertSelectedTopAdditionalServiceIs('5G 1 Giga 충전 부가서비스');
    });

    it('KAN-22-3-12 삭제 버튼 클릭 시 부가서비스 목록으로 이동해야 한다', () => {
      // 선택된 부가서비스의 삭제 버튼 클릭
      page.clickRemoveSelectedServiceButton('5G 1 Giga 충전 부가서비스');

      page.assertAdditionalServiceInList('5G 1 Giga 충전 부가서비스');
    });

    it('KAN-22-3-13 선택된 부가서비스 목록이 변경되면 합계 금액이 변경되어야 한다', () => {
      // 기존 금액 확인
      page.assertTotalAmountIs('47,000원');

      // 부가서비스 추가 버튼 클릭
      page.clickAddAdditionalServiceButton('LTE 1 Giga 충전 부가서비스');

      // 합계 금액이 변경되었는지 확인
      page.assertTotalAmountIs('66,000원');
    });

    it('KAN-22-3-14 선택된 부가서비스가 없을 경우 빈 리스트가 보여야 한다', () => {
      page.clickRemoveSelectedServiceButton('5G 1 Giga 충전 부가서비스');
      page.clickRemoveSelectedServiceButton('5G 2 Giga 충전 부가서비스');

      page.assertSelectedServiceListEmpty();
    });
  });

  describe('KAN-22-4 저장 / 초기화', () => {
    beforeEach(() => {
      customerDetailService.homeBookmark();
      customerDetailPage.visitCustomerDetailPage();
      customerSearchPage.getOpenModalButton().click();
      customerSearchPage.typePhoneNumber('01077775555');
      customerDetailService.successGetCustomer();
      customerDetailService.successWhenGetCustomerContracts();
      customerSearchPage.clickSearch();

      service.successWhenCheckServiceModifiable();
      service.successWhenGetServices();
      service.successWhenGetAdditionalServices();
      service.successWhenGetAdditional_SVC60_Services();

      // 요금제/부가서비스 변경버튼 클릭
      customerDetailPage.clickServiceInfoChangeButton();
    });

    it('KAN-22-4-1 요금제 또는 부가서비스 변경 시 저장 버튼이 활성화되어야 한다', () => {
      //
      page.clickRemoveSelectedServiceButton('5G 1 Giga 충전 부가서비스');
      // 저장 버튼이 활성화되었는지 확인
      page.assertSaveButtonEnabled();
    });

    it('KAN-22-4-2 초기화 버튼이 활성화되어야 한다', () => {
      page.clickRemoveSelectedServiceButton('5G 1 Giga 충전 부가서비스');
      // 초기화 버튼이 활성화되었는지 확인
      page.assertResetButtonEnabled();
    });

    it('KAN-22-4-3 저장 버튼 클릭 시 해지필요 부가서비스가 없으면 확인 모달이 보여야 한다', () => {
      // 해지필요 부가서비스 삭제
      page.clickRemoveSelectedServiceButton('5G 1 Giga 충전 부가서비스');
      // 저장 버튼 클릭
      page.clickSaveButton();

      // 확인 모달이 표시되는지 확인
      page.assertModalVisible();

      // 모달 내용 확인
      page.assertModalContentVisible('변경하시겠습니까?');
    });

    it('KAN-22-4-4 확인 클릭 시 상품 변경정보 요약 페이지로 이동해야 한다', () => {
      // 서비스 변경 요청 API 모킹
      service.successWhenModifyService();

      // 해지필요 부가서비스 삭제
      page.clickRemoveSelectedServiceButton('5G 1 Giga 충전 부가서비스');
      // 저장 버튼 클릭
      page.clickSaveButton();

      // 확인 모달이 표시되는지 확인
      page.assertModalVisible();

      // 확인 모달에서 확인 버튼 클릭
      page.clickModalConfirmButton();

      // 상품 변경정보 요약 페이지로 이동했는지 확인
      page.assertModificationRequestVisible();
    });

    it('KAN-22-4-5 해지필요 부가서비스가 있을 경우 변경 불가 모달이 보여야 한다', () => {
      service.noAgeRestrictionWhenCheckServiceAgeRestriction();
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 요금제 선택
      page.selectServiceFromList('LTE Prime Max 요금제');

      // 모달의 확인 버튼 클릭
      page.clickModalConfirmButton();

      cy.wait('@getAdditional_SVC60_Services');

      // 저장 버튼 클릭
      page.clickSaveButton();

      // 확인 모달이 표시되는지 확인
      page.assertModalVisible();

      // 모달 내용 확인
      page.assertModalContentVisible('해지 필요한 부가서비스를 삭제한 후 다시 시도해 주세요.');
    });

    it('KAN-22-4-6 초기화 클릭 시 요금제가 클리어되어야 한다', () => {
      service.noAgeRestrictionWhenCheckServiceAgeRestriction();
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 요금제 선택
      page.selectServiceFromList('LTE Prime Max 요금제');

      // 모달의 확인 버튼 클릭
      page.clickModalConfirmButton();
      // 초기화 버튼 클릭
      page.clickResetButton();
      // 요금제가 초기화되었는지 확인
      page.assertServiceListEmpty();
    });

    it('KAN-22-4-7 부가서비스 목록은 최초 조회 상태로 변경되어야 한다', () => {
      service.noAgeRestrictionWhenCheckServiceAgeRestriction();
      // 부가서비스 추가
      page.clickAddAdditionalServiceButton('LTE 3 Giga 충전 부가서비스');

      page.assertSelectedAdditionalServiceIs('LTE 3 Giga 충전 부가서비스');
      // 초기화 버튼 클릭
      page.clickResetButton();
      // 부가서비스가 초기화되었는지 확인
      page.assertAdditionalServiceInList('LTE 3 Giga 충전 부가서비스');
    });

    it('KAN-22-4-8 선택된 부가서비스가 현재 부가서비스로 변경되어야 한다', () => {
      service.noAgeRestrictionWhenCheckServiceAgeRestriction();
      // 부가서비스 삭제
      page.clickRemoveSelectedServiceButton('5G 1 Giga 충전 부가서비스');
      // 초기화 버튼 클릭
      page.clickResetButton();
      // 부가서비스가 초기화되었는지 확인
      page.assertSelectedAdditionalServiceIs('5G 1 Giga 충전 부가서비스');
    });
  });
});
