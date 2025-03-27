/// <reference types="cypress" />

export const bookmarkListResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    memberId: 'S-0001',
    bookmarks: ['SERVICE_MODIFICATION'],
  },
};

export class BookmarkServiceMock {
  // 북마크 목록 조회 성공 Mock
  successWhenGetBookmarkList() {
    cy.intercept('GET', '**/v1/member/bookmark', {
      statusCode: 200,
      body: bookmarkListResponse,
    }).as('bookmarkRequest');
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
