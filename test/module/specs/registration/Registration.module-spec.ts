import RegistrationPage from '../../../pages/registration/RegistrationPage';
import RegistrationServiceMock from '../../mock/registration/RegistrationServiceMock';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';

describe('KAN-39 가입정보 요약 테스트', () => {
  const registrationPage = new RegistrationPage();
  const registrationService = new RegistrationServiceMock();
  const bookmarkService = new BookmarkServiceMock();
  
  // 1. 테스트 전 인증 상태 설정 및 북마크 설정 (전체 테스트 시작 전 한 번만 실행)
  before(() => {
    mockAuthStore();
  });
  
  // 2. 각 테스트 시작 전 신규가입 화면으로 이동 (모든 테스트 케이스 실행 전마다 실행)
  beforeEach(() => {
    // 북마크 목록 조회 Mock 설정
    bookmarkService.successWhenGetBookmarkList();

    //신규입탬 진입 시 사용 
    registrationService.successWhenGetContractInfo();

    // 홈 화면 방문
    registrationPage.visitHome();
    
    // 메뉴 버튼 클릭
    registrationPage.clickMenuButton();

    // 신규가입 메뉴 클릭
    registrationPage.clickCustomerSectionButton('신규가입');
    
    // 신규가입 탭이 표시되는지 확인
    registrationPage.assertNewSubscriptionTabVisible();
  });

  it('KAN-39-1 저장 버튼을 클릭 했을 때 가입 후 안내 화면으로 이동해야 한다', () => {
      
      // 중요: 먼저 Mock 설정을 해야 합니다
      // businessProcessId Mock 설정
      registrationService.successWhenRegistration();
      
      // 그 다음 저장 버튼 클릭
      registrationPage.clickSaveButton();
      
      // API 호출 대기
      cy.wait('@registrationRequest');
      
      // 가입 처리 진행 중 상태 확인
      registrationPage.assertRegistrationPending();

      // 이메일 발송 토글 버튼 비활성화 확인
      registrationPage.assertEmailToggleDisabled();
  });

  // 3. 가입처리가 완료 되었을 때 테스트
  describe('KAN-39-2 가입처리가 완료 되었을 때', () => {
    it('KAN-39-2-1 이메일 발송 토글 버튼이 활성화 되어야 한다', () => {

      // 등록 요청 Mock 설정
      registrationService.successWhenRegistration();

      // 등록 상태 조회 Mock 설정
      registrationService.completedWhenGetStatus();
      
      // 그 다음 저장 버튼 클릭
      registrationPage.clickSaveButton();
      
      // API 호출 대기
      cy.wait('@registrationRequest');

      // 상태 조회 API 호출 대기
      cy.wait('@statusRequest');

      // 가입 처리 완료 상태 확인
      registrationPage.assertRegistrationCompleted();

      // 이메일 발송 토글 버튼 활성화 확인
      registrationPage.assertEmailToggleEnabled();
    });

    it('KAN-39-2-2 고객조회로 이동 버튼이 보여야 한다', () => {

      // 등록 요청 Mock 설정
      registrationService.successWhenRegistration();

      // 등록 상태 조회 Mock 설정
      registrationService.completedWhenGetStatus();
      
      // 그 다음 저장 버튼 클릭
      registrationPage.clickSaveButton();
      
      // API 호출 대기
      cy.wait('@registrationRequest');

      // 상태 조회 API 호출 대기
      cy.wait('@statusRequest');

      // 고객조회로 이동 버튼 표시 확인
      registrationPage.assertGoCustomerSearchButtonVisible();
    });
  });

  describe('KAN-39-3 이메일 발송 기능 테스트', () => {
    beforeEach(() => {
    // 북마크 목록 조회 Mock 설정
    bookmarkService.successWhenGetBookmarkList();

    // 홈 화면 방문
    registrationPage.visitHome();
    
    // 메뉴 버튼 클릭
    registrationPage.clickMenuButton();

    // 신규가입 메뉴 클릭
    registrationPage.clickCustomerSectionButton('신규가입');
    
    // 신규가입 탭이 표시되는지 확인
    registrationPage.assertNewSubscriptionTabVisible();

          // 등록 요청 Mock 설정
          registrationService.successWhenRegistration();

          // 등록 상태 조회 Mock 설정
          registrationService.completedWhenGetStatus();
          
          // 그 다음 저장 버튼 클릭
          registrationPage.clickSaveButton();
          
          // API 호출 대기
          cy.wait('@registrationRequest');
    
          // 상태 조회 API 호출 대기
          cy.wait('@statusRequest');

    });

    it('KAN-39-3-1 이메일 발송 토글 버튼을 클릭 했을 때 이메일 주소 입력 창이 활성화 되어야 한다', () => {
      // 이메일 발송 토글 버튼 활성화
      registrationPage.toggleEmailSending(true);
      
      // 이메일 입력 필드 활성화 확인
      registrationPage.assertEmailInputEnabled();
    });

    it('KAN-39-3-2 이메일 주소를 입력하고 발송하기 버튼을 클릭 했을 때 성공 안내 메시지가 보여야 한다', () => {
      // 중요: 먼저 Mock 설정을 해야 합니다
      // 이메일 발송 성공 Mock 설정
      registrationService.successWhenSendEmail();
      
      // 이메일 발송 토글 버튼 활성화
      registrationPage.toggleEmailSending(true);
      
      // 이메일 주소 입력
      registrationPage.inputEmailAddress('test');
      
      // 이메일 도메인 선택 (예: gmail.com)
      registrationPage.selectEmailDomain('gmail.com');
      
      // 이메일 발송 버튼 클릭
      registrationPage.clickSendEmailButton();
      
      // 이메일 발송 API 호출 대기
      cy.wait('@emailRequest');
      
      // 이메일 발송 성공 메시지 확인
      registrationPage.assertToastVisible();

      registrationPage.assertToastMessage('이메일 발송이 완료되었습니다.');
    });

    it('KAN-39-3-3 직접 입력으로 이메일 주소를 입력하고 발송하기 버튼을 클릭 했을 때 성공 안내 메시지가 보여야 한다', () => {
      // 이메일 발송 성공 Mock 설정
      registrationService.successWhenSendEmail();
      
      // 이메일 발송 토글 버튼 활성화
      registrationPage.toggleEmailSending(true);
      
      // 이메일 주소 입력
      registrationPage.inputEmailAddress('test');
      
      // 이메일 도메인 선택 (예: gmail.com)
      registrationPage.selectEmailDomain('gmail.com');
      
      // 이메일 발송 버튼 클릭
      registrationPage.clickSendEmailButton();
      
      // 이메일 발송 API 호출 대기
      cy.wait('@emailRequest');
      
      // 이메일 발송 성공 메시지 확인
      registrationPage.assertToastVisible();

      registrationPage.assertToastMessage('이메일 발송이 완료되었습니다.');
    });
  });

  describe('KAN-39-4 화면 이동 테스트', () => {
    beforeEach(() => {
      // 북마크 목록 조회 Mock 설정
      bookmarkService.successWhenGetBookmarkList();

      //신규입탬 진입 시 사용
      registrationService.successWhenGetContractInfo();

      // 홈 화면 방문
      registrationPage.visitHome();
      
      // 메뉴 버튼 클릭
      registrationPage.clickMenuButton();
  
      // 신규가입 메뉴 클릭
      registrationPage.clickCustomerSectionButton('신규가입');
      
      // 신규가입 탭이 표시되는지 확인
      registrationPage.assertNewSubscriptionTabVisible();
  
      // 등록 요청 Mock 설정
      registrationService.successWhenRegistration();

      // 등록 상태 조회 Mock 설정
      registrationService.completedWhenGetStatus();
      
      // 그 다음 저장 버튼 클릭
      registrationPage.clickSaveButton();
      
      // API 호출 대기
      cy.wait('@registrationRequest');

      // 상태 조회 API 호출 대기
      cy.wait('@statusRequest');
  
      });

    it('KAN-39-4-1 홈으로 이동 버튼을 클릭 했을 때 LNB와 MDI를 닫고 홈 화면으로 이동해야 한다', () => {
      // 홈으로 이동 버튼 클릭 시 LNB와 MDI가 닫히고 홈 화면으로 이동하는지 확인
      registrationPage.assertHomeButtonRedirectsAndClosesMenus();
    });

    // 고객조회 관련 테스트는 별도로 구현 필요
    it('KAN-39-4-2 고객조회로 이동 버튼을 클릭 했을 때 신규가입 탭을 닫고 고객조회 탭으로 이동해야 한다', () => {


      // 고객 조회 결과 Mock 설정
      registrationService.successWhenFetchCustomerDetail();

      // 고객 조회 API 모킹 설정
      registrationService.successWhenFetchCustomer();

      // 고객조회로 이동 버튼 클릭
      registrationPage.clickGoCustomerSearchButton();
    
      // 고객 조회 API 호출 대기
      cy.wait('@customerRequest');

      // 고객 조회 결과 Mock 호출 대기
      cy.wait('@customerResultRequest');
      
      // 고객조회 탭이 활성화되었는지 확인
      registrationPage.assertCustomerSearchTabActive();
    });
  });
});
