import LayoutPage from '../../../pages/layout/LayoutPage';
import ModificationRequestPage from '../../../pages/modifyService/ModificationRequestPage';
import ModifyServicePage from '../../../pages/modifyService/ModifyServicePage';
import ServiceSearchPage from '../../../pages/modifyService/search/ServiceSearch';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import { CustomerSearchServiceMock } from '../../mock/customer/search/CustomerSearchServiceMock';
import ModificationRequestMock from '../../mock/modifyService/ModificationRequestMock';
import ModifyServiceMock from '../../mock/modifyService/ModifyServiceMock';
import { ServiceSearchMock } from '../../mock/modifyService/search/ServiceSearch';
import RegistrationStatusServiceMock from '../../mock/registration/RegistrationStatusServiceMock';
import CustomerSearchTestPage from '../../../pages/customer/search/CustomerSearch';

describe('KAN-26 상품 변경정보 요약', () => {
  const page = new ModificationRequestPage();
  const service = new ModificationRequestMock();

  const registrationStatusService = new RegistrationStatusServiceMock();
  const customerSearchServiceMock = new CustomerSearchServiceMock();

  const customerSearch = new CustomerSearchTestPage();
  const layoutPage = new LayoutPage();
  const serviceSearchServiceMock = new ServiceSearchMock();

  const serviceSearchPage = new ServiceSearchPage();

  const modifyServiceService = new ModifyServiceMock();
  const modifyServicePage = new ModifyServicePage();

  const USER_ID = 'user1';

  before(() => {
    // 인증 스토어 모킹
    mockAuthStore();
  });

  beforeEach(() => {
    serviceSearchServiceMock.getCustomerSearchPhoneNumber();
    serviceSearchServiceMock.getCustomerTwoLineContract();
    serviceSearchServiceMock.getCustomerTwoLineContractService();
    serviceSearchServiceMock.getCustomerInfomation100000000001();

    customerSearchServiceMock.homeBookmark();
    registrationStatusService.successWhenGetRegistrationStatus(USER_ID);

    modifyServiceService.successWhenCheckServiceModifiable();
    modifyServiceService.successWhenGetServices();
    modifyServiceService.successWhenGetAdditionalServices();
    modifyServiceService.successWhenGetAdditional_SVC60_Services();

    service.successWhenRequestServiceModification();

    serviceSearchPage.visitHome();
    layoutPage.clickMenuButton();
    customerSearch.getOpenModalButton().click();
    customerSearch.typePhoneNumber('01098765432');
    customerSearch.clickSearch();

    serviceSearchPage.getServiceInfoChangeButton().click();


    modifyServicePage.clickAddAdditionalServiceButton('LTE 1 Giga 충전 부가서비스');
    modifyServicePage.clickSaveButton();

    modifyServicePage.assertModalVisible();

    modifyServicePage.clickModalConfirmButton();
  });

  describe('KAN-26-1 상품 변경정보 요약 화면 렌더링', () => {
    it('KAN-26-1-1 마스킹 된 이름과 함께 안내 문구가 보인다', () => {
      page.assertRegistrationPending();
    });

    // it('KAN-26-1-2 변경 전/후 증감액이 보인다', () => {
    //   // 변경 전 금액: 60,000원, 변경 후 금액: 70,000원으로 가정
    //   page.assertTotalPriceInfoVisible(60000, 70000);
    // });

    // it('KAN-26-1-3 변경 전/후 요금이 보인다', () => {
    //   // 변경 전 금액: 60,000원, 변경 후 금액: 70,000원으로 가정
    //   page.assertTotalPriceInfoVisible(60000, 70000);
    // });

    // it('KAN-26-1-4 변경 전/후 요금제 정보가 보인다', () => {
    //   // 변경 전 요금제: LTE Speed Max 요금제 (60,000원)
    //   page.assertBeforeServiceInfoVisible('LTE Speed Max 요금제', 60000);

    //   // 변경 후 요금제: LTE Prime Max 요금제 (70,000원)
    //   page.assertAfterServiceInfoVisible('LTE Prime Max 요금제', 70000);
    // });

    // it('KAN-26-1-5 변경 전/후 부가서비스 정보가 보인다', () => {
    //   // 변경 전 부가서비스
    //   const beforeAdditionalServices = [
    //     { serviceName: '데이터 무제한 부가서비스', serviceValue: 10000 },
    //     { serviceName: '음성 무제한 부가서비스', serviceValue: 5000 },
    //   ];

    //   // 변경 후 부가서비스
    //   const afterAdditionalServices = [
    //     { serviceName: '데이터 무제한 부가서비스', serviceValue: 10000 },
    //     { serviceName: '클라우드 스토리지 부가서비스', serviceValue: 8000 },
    //   ];

    //   page.assertBeforeAdditionalServicesVisible(beforeAdditionalServices);
    //   page.assertAfterAdditionalServicesVisible(afterAdditionalServices);
    // });
  });

//   describe('KAN-26-2 상품 변경 처리 결과 확인', () => {
//     it('KAN-26-2-1 상품 변경 성공시 처리 완료 문구와 표시가 보인다', () => {
//       // 성공 상태로 API 응답 모킹
//       service.successWhenGetRegistrationStatus();

//       // 페이지 다시 방문하여 최신 상태 확인
//       page.visitModificationRequestPage();

//       // 성공 문구 및 아이콘 확인
//       page.assertSuccessStatusVisible('홍길동');
//     });

//     it('KAN-26-2-2 상품 변경 실패시 처리 실패 문구와 사유가 보인다', () => {
//       // 실패 상태로 API 응답 모킹
//       service.failWhenGetRegistrationStatus();

//       // 페이지 다시 방문하여 최신 상태 확인
//       page.visitModificationRequestPage();

//       // 실패 문구, 사유 및 아이콘 확인
//       page.assertFailStatusVisible('홍길동', '시스템 오류로 처리에 실패했습니다.');
//     });
//   });

//   describe('KAN-26-3 홈 이동 기능', () => {
//     it('KAN-26-3-1 홈 이동 버튼 클릭시 MDI의 고객조회, 요금제/부가서비스 변경 탭을 Close하고, 홈 화면으로 이동한다', () => {
//       // 홈 버튼 클릭
//       page.clickGoHomeButton();

//       // 홈으로 이동 확인
//       page.assertRedirectedToHome();

//       // 모든 탭이 닫혔는지 확인
//       page.assertAllTabsClosed();
//     });
//   });
});
