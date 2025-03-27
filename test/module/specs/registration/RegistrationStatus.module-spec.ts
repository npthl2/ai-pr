import RegistrationStatusPage from '../../../pages/layout/RegistrationStatusPage';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';
import RegistrationStatusServiceMock from '../../mock/registration/RegistrationStatusServiceMock';
import { REGISTRATION_STATUS } from '../../../../src/constants/RegistrationConstants';

describe('KAN-43 메인화면 Floating 버튼 처리현황 퀵뷰', () => {
  const page = new RegistrationStatusPage();
  const service = new RegistrationStatusServiceMock();
  const bookmarkService = new BookmarkServiceMock();
  const userId = 'user1';

  before(() => {
    mockAuthStore();
    bookmarkService.successWhenGetBookmarkList();
    service.successWhenGetRegistrationStatus(userId);

    page.visit();
  });

  describe('KAN-43-1 부가서비스 변경이 성공하고 3초이내에 신규 가입이 실패했을때.', () => {
    it('부가서비스 변경 성공 토스트 메세지가 표시된다', () => {
      service.successWhenGetRegistrationStatus(userId, REGISTRATION_STATUS.COMPLETED);

      page.startGetRegistrationStatus();
      cy.contains('일철*님 요금제/부가서비스 변경처리 완료되었습니다.').should('be.visible');
      page.endGetRegistrationStatus();
    });

    it('신규가입 실패 토스트 메세지가 표시된다', () => {
      service.successWhenGetRegistrationStatus(
        userId,
        REGISTRATION_STATUS.COMPLETED,
        REGISTRATION_STATUS.FAILED,
      );

      page.startGetRegistrationStatus();
      cy.contains('이철*님 가입을 실패하였습니다.').should('be.visible');
      page.endGetRegistrationStatus();
    });
  });

  describe('KAN-43-2 부가서비스1 변경이 성공하고 부가서비스2 변경이 실패하고 부가서비스3 변경이 시도 되었을때.', () => {
    before(() => {
      service.successWhenGetRegistrationStatus(
        userId,
        REGISTRATION_STATUS.COMPLETED,
        REGISTRATION_STATUS.FAILED,
      );

      page.startGetRegistrationStatus();
      page.endGetRegistrationStatus();
    });

    it('spinner에 처리중 건수가 1건으로 보인다', () => {
      page.checkHistoryCount(1);
    });

    it('퀵뷰의 처리요청내역에 최신순으로 표시된다', () => {
      page.startGetRegistrationStatus();

      page.checkHistoryContentStatus(0, '처리완료');
      page.checkHistoryContent(0, '일철*님 요금제/부가서비스 변경');

      page.checkHistoryContentStatus(1, '처리실패');
      page.checkHistoryContent(1, '이철*님 가입');

      page.checkHistoryContentStatus(2, '처리중');
      page.checkHistoryContent(2, '삼철*님 요금제/부가서비스 변경');
    });

    it('처리중이 아닌 건은 완료시간이 보인다', () => {
      page.isVisibleHistoryContentStatusTime(0);
      page.isVisibleHistoryContentStatusTime(1);
      page.isNotVisibleHistoryContentStatusTime(2);

      page.endGetRegistrationStatus();
    });

    it('로그아웃 후 다시 로그인 했을 때 퀵뷰의 내용이 유지되어 보인다', () => {
      page.clickLogoutButton();
      mockAuthStore();
      page.visit();

      service.successWhenGetRegistrationStatus(
        userId,
        REGISTRATION_STATUS.COMPLETED,
        REGISTRATION_STATUS.FAILED,
      );

      page.startGetRegistrationStatus();

      page.checkHistoryContentStatus(0, '처리완료');
      page.checkHistoryContent(0, '일철*님 요금제/부가서비스 변경');

      page.checkHistoryContentStatus(1, '처리실패');
      page.checkHistoryContent(1, '이철*님 가입');

      page.checkHistoryContentStatus(2, '처리중');
      page.checkHistoryContent(2, '삼철*님 요금제/부가서비스 변경');

      page.endGetRegistrationStatus();
    });
  });

  describe('KAN-43-3 부가서비스1 변경이 성공하고 부가서비스2 변경이 실패하고 로그아웃 후 다른 아이디로 로그인 했을 때.', () => {
    before(() => {
      service.successWhenGetRegistrationStatus(
        'differentUser',
        REGISTRATION_STATUS.COMPLETED,
        REGISTRATION_STATUS.FAILED,
      );

      page.clickLogoutButton();
      mockAuthStore({
        userId: 'differentUser',
        userName: '다른사용자',
      });
      page.visit();
    });

    it('퀵뷰의 내용이 보이지 않는다', () => {
      page.startGetRegistrationStatus();

      page.isVisibleHistoryAreaEmptyContent();
      page.checkHistoryAreaEmptyContent('표시할 내용이 없습니다.');

      page.checkHistoryAreaCountLabel(0);

      page.endGetRegistrationStatus();
    });
  });
});
