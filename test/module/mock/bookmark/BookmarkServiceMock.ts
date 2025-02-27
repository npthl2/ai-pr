/// <reference types="cypress" />

const bookmarkResponse = {
  memberId: '0',
  bookmarks: ['NEW_SUBSCRIPTION'],
};

class BookmarkServiceMock {
  // 즐겨찾기 목록 조회 성공 mock설정
  successWhenGetBookmarkList() {
    cy.intercept('GET', '**/v1/member/bookmark', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: bookmarkResponse,
      },
    });
  }

  // 즐겨찾기 등록/삭제 성공 mock설정
  successWhenSaveBookmark() {
    cy.intercept('POST', '**/v1/member/bookmark', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
      },
    });
  }
}
export default BookmarkServiceMock;
