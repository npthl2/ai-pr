import BoardPage from '../../../pages/board/BoardPage';
import BoardServiceMock from '../../mock/board/BoardServiceMock';


describe('KAN-2 게시판 화면 진입', () => {
    const page = new BoardPage();
    const service = new BoardServiceMock();

    it('KAN-20 게시판 화면 진입 후 게시글 목록 조회 확인', () => {
      service.successWhenGetBoardList();

      page.visitBoardPage();
      page.assertBoardList(5);
    })

    it('KAN-21 게시글 등록 버튼 클릭', () => {
      service.successWhenRegistBoard();
      service.successWhenGetBoardList();

      page.clickRegistBoardButton();
      page.assertBoardRegistFormVisible();
      page.inputBoardTitle('새로운 게시글 제목');
      page.inputBoardContent('새로운 게시글 내용');
      page.clickConfirmRegistBoardButton();
      page.assertBoardList(5);
    })
});