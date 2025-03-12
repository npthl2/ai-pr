import CustomerSectionPage from '../../../pages/registration/CustomerSectionPage';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';
import CustomerSectionServiceMock from '../../mock/registration/CustomerSectionServiceMock';

describe('KAN-2 신규가입 화면 진입', () => {
  const page = new CustomerSectionPage();
  const service = new CustomerSectionServiceMock();
  const bookmarkService = new BookmarkServiceMock();

  before(() => {
    // 초기 셋업
    mockAuthStore();
    bookmarkService.successWhenGetBookmarkList();
  });

  it('KAN-36-1 신규가입 메뉴 클릭시 MDI 신규가입 탭 생성이 된다.', () => {
    page.visit();
    page.clickMenuButton();
    page.clickCustomerSectionButton('신규가입');

    page.expectNewSubscriptionTabToBeVisible();
  });

  it('KAN-36-2 신규가입 메뉴 클릭시 고객정보 아코디언 영역이 펼쳐진다', () => {
    page.expectCustomerSectionToBeExpanded();
  });

  it('KAN-36-3 고객정보의 입력폼에 focus후 focus out을 했을때 필수값 입력 유효성체크가 보인다', () => {
    page.clickNameField();
    page.clickRrnoField();
    page.expectNameErrorToBeVisible('이름을 입력해주세요.');

    page.clickRrnoField();
    page.clickNameField();
    page.expectRrnoErrorToBeVisible('주민번호 13자리를 입력해주세요.');
  });

  it('KAN-36-4 고객정보의 이름, 주민번호를 바르게 입력하고 개인정보활용 동의를 체크했을때 실명인증 버튼이 활성화 된다', () => {
    page.typeNameField('홍길동');
    page.typeRrnoField('9001011234567');
    page.checkPersonalInfoConsent();

    page.expectVerificationButtonToBeEnabled();
  });

  it('KAN-36-5 실명인증 버튼을 클릭했을때 부정가입확인-실명인증 모달이 열리고 본인조회동의는 미동의가 선택된다', () => {
    page.clickVerificationButton();

    page.expectVerificationModalToBeVisible();
    page.expectIdentityVerificationConsentToBeUnchecked();
  });

  describe('KAN-36 부정가입확인 - 실명인증 모달(정상케이스)', () => {
    it('KAN-36-6 유효한 주민등록 발급일자를 입력하고 본인조회동의-동의를 선택 후 실명인증을 클릭할 때 실명확인 결과에 성공이 보인다', () => {
      service.successWhenCustomerNameVerification('Y');
      service.successWhenCreateCustomer();

      page.typeRrnoIssueDateField('20230101');
      page.checkIdentityVerificationConsent();
      page.clickVerificationAuthButton();

      page.expectVerificationResultToShowSuccess();
    });

    it('KAN-36-7 확인을 클릭했을때 모달창이 닫히고 고객정보 영역에 고객검증라인이 추가되며 성공이 화면에 보인다', () => {
      page.clickVerificationConfirmButton();

      page.expectVerificationModalToBeClosed();
      page.expectCustomerVerificationLineToBeVisible();
      page.expectVerificationStatusToShowSuccess();
    });

    it('KAN-36-8 가입가능회선이 0일 때 실패가 고객검증라인에 표시된다', () => {
      service.successWhenGetAvailableCustomerContract(0);
      page.clickVerificationCheckButton();

      page.expectVerificationFailStatusToBeVisible();
    });

    it('KAN-36-9 가입가능회선이 0보다 클 때 통과가 고객검증라인에 표시된다', () => {
      service.successWhenGetAvailableCustomerContract(2);
      page.clickVerificationCheckButton();

      page.expectVerificationPassStatusToBeVisible();
    });
  });

  describe('KAN-36 부정가입확인 - 실명인증 모달(실패케이스)', () => {
    before(() => {
      mockAuthStore();
      bookmarkService.successWhenGetBookmarkList();
      page.setupVerificationModal();
    });

    it('KAN-36-10 인위적 실패케이스의 주민등록 발급일자를 입력하고 본인조회동의 동의를 선택 후 실명인증을 클릭할 때 실명확인 결과에 실패가 보인다', () => {
      service.successWhenCustomerNameVerification('N');
      service.successWhenCreateCustomer();

      page.typeRrnoIssueDateField('20240101');
      page.checkIdentityVerificationConsent();
      page.clickVerificationAuthButton();

      page.expectVerificationResultToShowFailure();
    });

    it('KAN-36-11 실명확인 결과가 실패 했고 확인을 클릭했을때 모달창이 닫히고 고객정보 영역에 고객검증라인이 추가되며 실패라고 화면에 보인다', () => {
      page.clickVerificationConfirmButton();

      page.expectVerificationModalToBeClosed();
      page.expectCustomerVerificationLineToBeVisible();
      page.expectVerificationStatusToShowFailure();
    });
  });
});
