/// <reference types="cypress" />

const emptyMemoList = [];
const memoList = [
  {
    memoId: '1',
    memoType: 'MEMBER',
    contents: '메모 내용',
    authorName: 'test',
    firstCreateDatetime: '2025-02-01 12:00:00',
  },
];

class MemoHistoryServiceMock {
  successWhenGetEmptyMemoList() {
    cy.intercept('GET', '**/v1/memos/**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: emptyMemoList,
      },
    }).as('getEmptyMemoList');
  }

  successWhenGetMemoList() {
    cy.intercept('GET', '**/v1/memos/**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: memoList,
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
