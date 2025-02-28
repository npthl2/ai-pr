/// <reference types="cypress" />

const emptyMemoList = [];
const memoList = [
  {
    memoId: '1',
    memoType: 'MEMBER',
    content: '메모 내용',
    authorName: 'member-id-01',
    firstCreateDatetime: '2025-02-01 12:00:00',
  },
];

class MemoHistoryServiceMock {
  successWhenGetHomeBookmark() {
    cy.intercept('GET', '**/v1/member/bookmark', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          memberId: '0',
          bookmarks: [],
        },
      },
    });
  }

  successWhenGetEmptyMemoList() {
    cy.intercept('GET', '**/v1/memos/**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: { memos: emptyMemoList, isLast: true },
      },
    }).as('getEmptyMemoList');
  }

  successWhenGetMemoList() {
    cy.intercept('GET', '**/v1/memos/**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: { memos: memoList, isLast: true },
      },
    }).as('getMemoList');
  }

  successWhenSaveMemo() {
    cy.intercept('POST', '**/v1/memos', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: null,
      },
    });
  }
}
export default MemoHistoryServiceMock;
