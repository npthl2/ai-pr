import NoticePage from '../../../pages/home/NoticePage';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import { mockMemberStore } from '../../../support/helpers/mockMemberStore';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';
import NoticeServiceMock from '../../mock/notice/NoticeServiceMock';
import RegistrationStatusServiceMock from '../../mock/registration/RegistrationStatusServiceMock';

describe('KAN-33 홈화면 & 공지사항', () => {
  const page = new NoticePage();
  const service = new NoticeServiceMock();
  const bookmarkService = new BookmarkServiceMock();
  const registrationService = new RegistrationStatusServiceMock();

  before(() => {
    mockAuthStore();
    mockMemberStore({
      memberInfo: {
        memberId: 'user1',
        memberName: 'user1',
        authorities: ['ROLE_SEARCH_TEL_NO', 'ROLE_UNMASKING'],
      },
    });
    service.successWhenGetNoticeSummary();
    bookmarkService.successWhenGetBookmarkList();
    registrationService.successWhenGetRegistrationStatus();

    page.visit();
  });

  describe('KAN-33 신규가입 화면 진입 시', () => {
    it('KAN-33-1 로그인한 유저의 이름과 직급과 환영문구가 보인다.', () => {
      page.verifyUserInfoAndWelcome();
    });

    it('KAN-33-2 공지사항에 카테고리, 제목, 날짜가 보인다.', () => {
      page.verifyNoticeBasicInfo();
    });
  });

  describe('KAN-33 공지사항 모달 진입 시', () => {
    before(() => {
      service.successWhenGetNoticeList();

      page.openNoticeModal();
    });

    it('KAN-33-3 공지사항 목록이 보인다.', () => {
      page.verifyNoticeList();
      page.verifyNoticeItem(1);
      page.verifyNoticeItem(2);
    });

    it('KAN-33-4 공지사항 클릭시 아코디언이 펼쳐지고 내용이 보여진다.', () => {
      page.clickAndVerifyNoticeContent(1);
    });

    it('KAN-33-5 카테고리로 검색시 검색된 공지사항 목록이 보인다.', () => {
      service.successWhenGetNoticeList('', 'NOTICE');

      page.searchByCategory('NOTICE');
      page.verifySearchResults('시스템 점검 안내');
    });

    it('KAN-33-6 검색어로 검색시 검색된 공지사항 목록이 보인다.', () => {
      service.successWhenGetNoticeList('이벤트', '');

      page.searchByCategory('전체');
      page.searchByKeyword('이벤트');
      page.verifySearchResults('이벤트 시작 안내');
    });

    it('KAN-33-7 카테고리 + 검색어로 검색시 검색된 공지사항 목록이 보인다.', () => {
      service.successWhenGetNoticeList('점검', 'NOTICE');

      page.searchByCategoryAndKeyword('NOTICE', '점검');
      page.verifySearchResults('시스템 점검 안내');
    });

    it('KAN-33-8 조회결과가 없을 시 조회 결과가 없습니다 가 표시된다.', () => {
      service.successWhenGetNoticeList('존재하지않는내용', '');

      page.searchByKeyword('존재하지않는내용');
      page.verifyNoResults();
    });
  });
});
