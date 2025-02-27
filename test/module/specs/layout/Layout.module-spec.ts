import LayoutPage from '../../../pages/layout/LayoutPage';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';

describe('KAN-16 홈 화면 진입', () => {
  const page = new LayoutPage();
  const service = new BookmarkServiceMock();

  it('KAN-20 게시판 화면 진입 후 게시글 목록 조회 확인', () => {
    // service.successWhenGetBoardList();

    page.visitHomePage();
    // page.assertBoardList(5);
  });

  // it('KAN-21 게시글 등록 버튼 클릭', () => {
  //   service.successWhenRegistBoard();
  //   service.successWhenGetBoardList();

  //   page.clickRegistBoardButton();
  //   page.assertBoardRegistFormVisible();
  //   page.inputBoardTitle('새로운 게시글 제목');
  //   page.inputBoardContent('새로운 게시글 내용');
  //   page.clickConfirmRegistBoardButton();
  //   page.assertBoardList(5);
  // })
});
