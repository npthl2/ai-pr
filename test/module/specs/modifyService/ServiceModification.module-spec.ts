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
  });

  describe('📌 사전 제약 사항', () => {
    beforeEach(() => {
      customerDetailService.homeBookmark();
      customerDetailPage.visitCustomerDetailPage();
      customerSearchPage.getOpenModalButton().click();
      customerSearchPage.typePhoneNumber('01077775555');
      customerDetailService.successGetCustomer();
      customerDetailService.successWhenGetCustomerContracts();
      customerSearchPage.clickSearch();

      service.successWhenGetServices();
      service.successWhenGetAdditionalServices();

      service.failWhenCheckServiceModifiable();
    });

    // it('요금제/부가서비스 화면이 렌더링 될 때 당월 요금제 변경 이력이 있으면 요금제 변경 불가 모달이 보여야 한다', () => {
    //   service.failWhenCheckServiceModifiable();
    //   // 요금제/부가서비스 변경버튼 클릭
    //   customerDetailPage.clickServiceInfoChangeButton();

    //   cy.wait('@failWhenCheckServiceModifiable');
    //   service.failWhenCheckServiceModifiable();
    //   // 요금제 변경 불가 모달이 표시되는지 확인
    //   page.assertServiceModificationBlockModalVisible();
    //   // // 모달 타입이 MONTHLY_RESTRICTION인지 확인
    //   // page.assertModalTypeIs('MONTHLY_RESTRICTION');
    // });

    // it('요금제 변경 박스가 비활성화되어야 한다', () => {
    //   // 요금제 선택 박스가 비활성화되어 있는지 확인
    //   page.assertServiceModifyBoxDisabled();
    // });

    // it('요금제 변경 이력이 당일일 경우 "이전 요금제로 되돌리기" 버튼이 보여야 한다', () => {
    //   // 테스트 설정 변경: 당일 변경 이력 있음, 되돌리기 가능
    //   service.rollbackAvailableWhenCheckServiceModifiable();

    //   // 홈 화면 방문 후 고객 조회 및 서비스 변경 화면으로 이동
    //   page.visitHome();
    //   page.clickMenuButton();
    //   page.clickCustomerSearchButton();

    //   page.typeCustomerName('김고객');
    //   page.typeBirthDate('781012');
    //   page.clickSearchButton();

    //   cy.wait('@searchCustomer');
    //   page.selectCustomerFromResults();
    //   cy.wait('@getCustomerDetail');

    //   page.clickServiceModificationTab();

    //   // 되돌리기 버튼이 표시되는지 확인
    //   page.assertRevertButtonVisible();
    // });

    // it('"이전 요금제로 되돌리기" 버튼 클릭 시 변경 전 요금제가 선택되어야 한다', () => {
    //   // 테스트 설정 변경: 당일 변경 이력 있음, 되돌리기 가능
    //   service.rollbackAvailableWhenCheckServiceModifiable();

    //   // 홈 화면 방문 후 고객 조회 및 서비스 변경 화면으로 이동
    //   page.visitHome();
    //   page.clickMenuButton();
    //   page.clickCustomerSearchButton();

    //   page.typeCustomerName('김고객');
    //   page.typeBirthDate('781012');
    //   page.clickSearchButton();

    //   cy.wait('@searchCustomer');
    //   page.selectCustomerFromResults();
    //   cy.wait('@getCustomerDetail');

    //   page.clickServiceModificationTab();

    //   // 되돌리기 버튼 클릭
    //   page.clickRevertButton();

    //   // 이전 요금제 (5G 스탠다드 요금제)가 선택되었는지 확인
    //   page.assertSelectedServiceIs('5G 스탠다드 요금제');
    // });
  });

  // 테스트 성공 확인
  describe('📌 요금제 변경', () => {
    beforeEach(() => {
      customerDetailService.homeBookmark();
      customerDetailPage.visitCustomerDetailPage();
      customerSearchPage.getOpenModalButton().click();
      customerSearchPage.typePhoneNumber('01077775555');
      customerDetailService.successGetCustomer();
      customerDetailService.successWhenGetCustomerContracts();
      customerSearchPage.clickSearch();

      service.successWhenGetServices();
      service.successWhenGetAdditionalServices();

      service.failWhenCheckServiceModifiable();

      // 요금제/부가서비스 변경버튼 클릭
      customerDetailPage.clickServiceInfoChangeButton();
    });


    it('변경할 요금제 박스를 포커스 했을 때 요금제 리스트가 보여야 한다', () => {
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 요금제 목록이 표시되는지 확인
      page.assertServiceInList('LTE Speed Elite 요금제');
      page.assertServiceInList('LTE Prime Max 요금제');
      page.assertServiceInList('LTE Premium Pro 요금제');
    });


    it('키워드를 입력하면 해당 키워드를 포함한 요금제만 보여야 한다', () => {
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


    it('포함된 요금제가 없으면 빈 리스트가 보여야 한다', () => {
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 검색어 입력
      page.typeServiceSearchKeyword('존재하지 않는 요금제');

      // 요금제가 없다는 메시지가 표시되는지 확인
      page.assertServiceListEmpty();
    });


    it('요금제 리스트에는 요금제 이름과 금액이 표시되어야 한다', () => {
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 요금제 목록에 가격이 표시되는지 확인
      page.assertServicePriceVisible('LTE Speed Max 요금제', '60,000');
    });


    it('변경 가능한 요금제를 클릭 시 요금제 변경 모달이 보여야 한다', () => {
      // 요금제 선택 박스 클릭
      page.clickServiceSelectBox();

      // 요금제 선택
      page.selectServiceFromList('LTE Prime Max 요금제');

      // 모달이 표시되는지 확인
      page.assertModalVisible();

      // 모달 내용(요금제 변경) 확인
      page.assertModalContentVisible(
        '[LTE Prime Max 요금제]로 요금제 변경 처리하시겠습니까?',
      );
    });


    it('모달 확인 클릭 시 선택한 요금제로 변경되고 금액이 표시되어야 한다', () => {
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

      it('변경 불가능한 요금제를 클릭 시 요금제 변경 불가 모달이 보여야 한다', () => {
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

  // describe('📌 부가서비스 목록', () => {
  //   beforeEach(() => {
  //     // 요금제 변경 가능 모킹
  //     service.successWhenCheckServiceModifiable();

  //     // 고객 조회 관련 모킹
  //     service.successWhenSearchCustomer();
  //     service.successWhenGetCustomerDetail();

  //     // 홈 화면 방문
  //     page.visitHome();

  //     // 메뉴 버튼 클릭
  //     page.clickMenuButton();

  //     // 고객 검색 버튼 클릭
  //     page.clickCustomerSearchButton();

  //     // 고객 검색 프로세스
  //     page.typeCustomerName('김고객');
  //     page.typeBirthDate('781012');
  //     page.clickSearchButton();

  //     // 검색 API 응답 대기
  //     cy.wait('@searchCustomer');

  //     // 검색 결과에서 고객 선택
  //     page.selectCustomerFromResults();

  //     // 고객 상세 정보 API 응답 대기
  //     cy.wait('@getCustomerDetail');

  //     // 서비스 변경 탭 클릭
  //     page.clickServiceModificationTab();
  //   });

  //   it('부가서비스 가입 불가 안내 문구가 보여야 한다', () => {
  //     // 부가서비스 가입 불가 안내 문구가 표시되는지 확인
  //     page.assertAdditionalServiceDisabledMessageVisible();
  //   });

  //   it('부가서비스 목록이 렌더링 되면 모든 부가서비스가 보여야 한다', () => {
  //     // 부가서비스 목록이 표시되는지 확인
  //     page.assertAdditionalServiceListVisible();
  //   });

  //   it('부가서비스 검색 기능이 보여야 한다', () => {
  //     // 부가서비스 검색 입력 필드가 표시되는지 확인
  //     page.assertAdditionalServiceSearchVisible();
  //   });

  //   it('현재 요금제의 부가서비스 목록이 선택된 목록에 보여야 한다', () => {
  //     // 현재 부가서비스가 선택된 목록에 표시되는지 확인
  //     page.assertCurrentAdditionalServiceInSelectedList();
  //   });

  //   it('가입 불가 부가서비스는 불가 표시가 되어야 한다', () => {
  //     // 가입 불가 표시가 있는지 확인
  //     page.assertAdditionalServiceRestrictionVisible();
  //   });

  //   it('가입 불가 부가서비스의 추가 버튼은 비활성화되어야 한다', () => {
  //     // 가입 불가 부가서비스의 추가 버튼이 비활성화되어 있는지 확인
  //     page.assertAddButtonDisabled();
  //   });

  //   it('가입 불가 부가서비스에 마우스를 hover 했을 때 툴팁이 보여야 한다', () => {
  //     // 가입 불가 부가서비스에 마우스 오버
  //     page.hoverAdditionalServiceItem('청소년 안심 서비스');

  //     // 툴팁이 표시되는지 확인
  //     page.assertTooltipVisible();
  //   });

  //   it('검색어 입력 시 해당 키워드를 포함한 부가서비스만 보여야 한다', () => {
  //     // 부가서비스 검색어 입력
  //     page.typeAdditionalServiceSearchKeyword('안심');

  //     // 검색 결과에 안심이 포함된 서비스만 표시되는지 확인
  //     page.assertServiceInList('안심 데이터 차단');
  //     page.assertServiceInList('청소년 안심 서비스');
  //   });

  //   it('키워드가 없으면 빈 리스트가 보여야 한다', () => {
  //     // 부가서비스 검색어 입력
  //     page.typeAdditionalServiceSearchKeyword('존재하지 않는 서비스');

  //     // 빈 목록이 표시되는지 확인
  //     page.assertServiceListEmpty();
  //   });

  //   it('부가서비스명/요금을 클릭 시 오름차/내림차순 정렬되어야 한다', () => {
  //     // 이름으로 정렬 클릭
  //     page.clickAdditionalServiceNameSort();

  //     // 요금으로 정렬 클릭
  //     page.clickAdditionalServicePriceSort();
  //   });

  //   it('부가서비스 추가 버튼 클릭 시 선택된 목록으로 이동해야 한다', () => {
  //     // 부가서비스 추가 버튼 클릭
  //     page.clickAddAdditionalServiceButton('데이터 안심옵션');

  //     // 선택된 부가서비스 목록에 해당 서비스가 표시되는지 확인
  //     page.assertSelectedServiceIs('데이터 안심옵션');
  //   });

  //   it('선택된 부가서비스 목록도 정렬 가능해야 한다', () => {
  //     // 선택된 부가서비스 목록의 이름 정렬 클릭
  //     page.clickAdditionalServiceNameSort();

  //     // 선택된 부가서비스 목록의 요금 정렬 클릭
  //     page.clickAdditionalServicePriceSort();
  //   });

  //   it('삭제 버튼 클릭 시 부가서비스 목록으로 이동해야 한다', () => {
  //     // 선택된 부가서비스의 삭제 버튼 클릭
  //     page.clickRemoveSelectedServiceButton('데이터 안심옵션');

  //     // 선택된 목록에서 제거되었는지 확인
  //     // (구현 방법에 따라 달라질 수 있음)
  //   });

  //   it('선택된 부가서비스 목록이 변경되면 합계 금액이 변경되어야 한다', () => {
  //     // 부가서비스 추가 버튼 클릭
  //     page.clickAddAdditionalServiceButton('데이터 안심옵션');

  //     // 합계 금액이 변경되었는지 확인
  //     page.assertTotalAmountIs('5,000원');
  //   });

  //   it('선택된 부가서비스가 없을 경우 빈 리스트가 보여야 한다', () => {
  //     // 모든 선택된 부가서비스 제거 로직
  //     // (구현 방법에 따라 달라질 수 있음)

  //     // 선택된 목록이 비어있는지 확인
  //     // (구현 방법에 따라 달라질 수 있음)
  //   });
  // });

  // describe('📌 저장 / 초기화', () => {
  //   beforeEach(() => {
  //     // 요금제 변경 가능 모킹
  //     service.successWhenCheckServiceModifiable();
  //     // 나이 제한 없음 모킹
  //     service.noAgeRestrictionWhenCheckServiceAgeRestriction();
  //     // 서비스 변경 요청 성공 모킹
  //     service.successWhenModifyService();

  //     // 고객 조회 관련 모킹
  //     service.successWhenSearchCustomer();
  //     service.successWhenGetCustomerDetail();

  //     // 홈 화면 방문
  //     page.visitHome();

  //     // 메뉴 버튼 클릭
  //     page.clickMenuButton();

  //     // 고객 검색 버튼 클릭
  //     page.clickCustomerSearchButton();

  //     // 고객 검색 프로세스
  //     page.typeCustomerName('김고객');
  //     page.typeBirthDate('781012');
  //     page.clickSearchButton();

  //     // 검색 API 응답 대기
  //     cy.wait('@searchCustomer');

  //     // 검색 결과에서 고객 선택
  //     page.selectCustomerFromResults();

  //     // 고객 상세 정보 API 응답 대기
  //     cy.wait('@getCustomerDetail');

  //     // 서비스 변경 탭 클릭
  //     page.clickServiceModificationTab();

  //     // 요금제 변경
  //     page.clickServiceSelectBox();
  //     page.selectServiceFromList('5G 프리미엄 요금제');
  //     page.clickModalConfirmButton();
  //   });

  //   it('요금제 또는 부가서비스 변경 시 저장 버튼이 활성화되어야 한다', () => {
  //     // 저장 버튼이 활성화되었는지 확인
  //     page.assertSaveButtonEnabled();
  //   });

  //   it('초기화 버튼이 활성화되어야 한다', () => {
  //     // 초기화 버튼이 활성화되었는지 확인
  //     page.assertResetButtonEnabled();
  //   });

  //   it('저장 버튼 클릭 시 해지필요 부가서비스가 없으면 확인 모달이 보여야 한다', () => {
  //     // 저장 버튼 클릭
  //     page.clickSaveButton();

  //     // 확인 모달이 표시되는지 확인
  //     page.assertConfirmModalVisible();
  //   });

  //   it('확인 클릭 시 상품 변경정보 요약 페이지로 이동해야 한다', () => {
  //     // 저장 버튼 클릭
  //     page.clickSaveButton();

  //     // 확인 모달에서 확인 버튼 클릭
  //     page.clickModalConfirmButton();

  //     // API 호출 대기
  //     cy.wait('@modifyService');

  //     // 상품 변경정보 요약 페이지로 이동했는지 확인
  //     page.assertModificationRequestVisible();
  //   });

  //   it('해지필요 부가서비스가 있을 경우 변경 불가 모달이 보여야 한다', () => {
  //     // 가입 불가 부가서비스 선택 로직
  //     // (이 테스트는 구현 방법에 따라 달라질 수 있음)

  //     // 저장 버튼 클릭
  //     page.clickSaveButton();

  //     // 변경 불가 모달이 표시되는지 확인
  //     page.assertBlockModalVisible();
  //   });

  //   it('이전 요금제로 되돌리기 불가할 경우 불가 모달이 보여야 한다', () => {
  //     // 이전 요금제로 되돌리기 불가 상황 모킹 및 테스트
  //     // (이 테스트는 구현 방법에 따라 달라질 수 있음)
  //   });

  //   it('초기화 클릭 시 요금제가 클리어되어야 한다', () => {
  //     // 초기화 버튼 클릭
  //     page.clickResetButton();

  //     // 요금제가 초기화되었는지 확인
  //     page.assertSelectedServiceIs('');
  //   });

  //   it('부가서비스 목록은 최초 조회 상태로 변경되어야 한다', () => {
  //     // 초기화 버튼 클릭
  //     page.clickResetButton();

  //     // 부가서비스 목록이 초기 상태로 돌아갔는지 확인
  //     // (구현 방법에 따라 달라질 수 있음)
  //   });

  //   it('선택된 부가서비스가 현재 부가서비스로 변경되어야 한다', () => {
  //     // 초기화 버튼 클릭
  //     page.clickResetButton();

  //     // 선택된 부가서비스가 현재 부가서비스와 동일한지 확인
  //     // (구현 방법에 따라 달라질 수 있음)
  //   });
  // });
});
