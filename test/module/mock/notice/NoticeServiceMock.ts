/// <reference types="cypress" />

const notices = [
  {
    noticeId: 1,
    category: 'NOTICE',
    title: '[공지] 시스템 점검 안내',
    content: '안녕하세요. 시스템 점검 안내드립니다.',
    author: '박병*',
    isActive: true,
    firstCreateDatetime: '2024-04-10T10:00:00',
    lastUpdateDatetime: '2024-04-10T10:00:00',
  },
  {
    noticeId: 2,
    category: 'INTEGRATED',
    title: '[공지] 이벤트 시작 안내',
    content: '신규 이벤트가 시작됩니다.',
    author: '박병*',
    isActive: true,
    firstCreateDatetime: '2024-04-10T10:00:00',
    lastUpdateDatetime: '2024-04-10T10:00:00',
  },
];

const noticeListResponse = (keyword?: string, category?: string) => {
  return {
    successOrNot: 'Y',
    statusCode: 'SUCCESS',
    data: {
      notices: notices.filter((notice) => {
        if (keyword && category) {
          return notice.title.includes(keyword) && notice.category === category;
        }
        if (keyword) {
          return notice.title.includes(keyword);
        }
        if (category) {
          return notice.category === category;
        }
        return true;
      }),
    },
  };
};

const noticeSummaryResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    notices: [
      {
        noticeId: 1,
        category: 'NOTICE',
        title: '[공지] 시스템 점검 안내',
        firstCreateDatetime: '2024-04-10T10:00:00',
        lastUpdateDatetime: '2024-04-10T10:00:00',
      },
      {
        noticeId: 2,
        category: 'NOTICE',
        title: '[공지] 시스템 점검 안내 2',
        firstCreateDatetime: '2024-04-09T10:00:00',
        lastUpdateDatetime: '2024-04-09T10:00:00',
      },
      {
        noticeId: 3,
        category: 'NOTICE',
        title: '[공지] 시스템 점검 안내 3',
        firstCreateDatetime: '2024-04-08T10:00:00',
        lastUpdateDatetime: '2024-04-08T10:00:00',
      },
      {
        noticeId: 4,
        category: 'NOTICE',
        title: '[공지] 시스템 점검 안내 4',
        firstCreateDatetime: '2024-04-07T10:00:00',
        lastUpdateDatetime: '2024-04-07T10:00:00',
      },
      {
        noticeId: 5,
        category: 'NOTICE',
        title: '[공지] 시스템 점검 안내 5',
        firstCreateDatetime: '2024-04-06T10:00:00',
        lastUpdateDatetime: '2024-04-06T10:00:00',
      },
    ],
  },
};

export class NoticeServiceMock {
  successWhenGetNoticeList(keyword?: string, category?: string) {
    cy.intercept('GET', `**/v1/notices**`, {
      statusCode: 200,
      body: noticeListResponse(keyword, category),
    }).as('noticeRequest');
  }

  successWhenGetNoticeSummary() {
    cy.intercept('GET', '**/v1/notices/summary', {
      statusCode: 200,
      body: noticeSummaryResponse,
    }).as('noticeSummaryRequest');
  }
}

export default NoticeServiceMock;
