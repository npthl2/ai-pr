import LayoutPage from '../../../pages/layout/LayoutPage';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';

describe('KAN-16 Home Layout', () => {
  const page = new LayoutPage();
  const service = new BookmarkServiceMock();

  before(() => {
    page.visit();
    service.successWhenGetBookmarkList();
  });

  it('KAN-16 LNB에 홈 버튼이 보여야 한다', () => {
    page.expectHomeButtonToBeVisible();
  });

  it('KAN-16 LNB에 메뉴 버튼이 보여야 한다', () => {
    page.expectMenuButtonToBeVisible();
  });

  it('KAN-16 LNB에 즐겨찾기 버튼이 보여야 한다', () => {
    page.expectBookmarkButtonToBeVisible();
  });

  it('KAN-16 플로팅 버튼이 보여야 한다', () => {
    page.expectFloatingButtonToBeVisible();
  });

  it('KAN-16 홈 버튼을 클릭 했을 때 홈 화면으로 이동해야 한다', () => {
    page.clickHomeButton();
    page.expectToBeOnHomePage();
  });

  it('KAN-16 메뉴 버튼을 클릭 했을 때 메뉴 리스트가 보여야 한다', () => {
    page.clickMenuButton();
    page.expectMenuListToBeVisible();
  });

  it('KAN-16 즐겨찾기 버튼을 클릭 했을 때 즐겨찾기한 메뉴 리스트가 보여야 한다', () => {
    page.clickBookmarkButton();
    page.expectBookmarkListToBeVisible();
  });

  it('KAN-16 메뉴 리스트에서 즐겨찾기 되지 않은 즐겨찾기 버튼을 클릭 했을 때 즐겨찾기 ON가 되어야 한다', () => {
    page.clickMenuButton();
    page.toggleBookmarkForMenuItem('신규가입');
    page.expectMenuItemToBeBookmarked('신규가입');
  });

  it('KAN-16 메뉴 리스트에서 즐겨찾기 된 즐겨찾기 버튼을 클릭 했을 때 즐겨찾기 OFF가 되어야 한다', () => {
    page.toggleBookmarkForMenuItem('요금제/부가서비스 변경');
    page.expectMenuItemNotToBeBookmarked('요금제/부가서비스 변경');
  });

  it('KAN-16 플로팅 버튼을 클릭 했을때 처리 내역 영역이 보여야 한다', () => {
    page.clickFloatingButton();
    page.expectHistoryAreaToBeVisible();
  });

  it('KAN-16 처리 내역 영역이 보일 때 플로팅 버튼을 클릭 했을 때 처리 내역 영역이 닫혀야 한다', () => {
    page.clickFloatingButton();
    page.expectHistoryAreaNotToBeVisible();
  });
});
