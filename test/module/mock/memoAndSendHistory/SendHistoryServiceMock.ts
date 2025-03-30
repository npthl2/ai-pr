/// <reference types="cypress" />

const sendHistoryList = [
  {
    messageType: 'SMS',
    requestDate: '2025-03-01 12:01:00',
    sendDate: '2025-03-01 12:02:00',
    message: 'SMS 메시지 내용',
    success: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestDate: '2025-02-28 12:10:00',
    sendDate: '2025-02-28 12:11:00',
    message: 'EMAIL 메시지 내용',
    success: 'Y',
  },
  {
    messageType: 'SMS',
    requestDate: '2025-02-26 12:20:00',
    sendDate: '2025-02-26 12:21:00',
    message: 'SMS 메시지 내용',
    success: 'N',
  },
  {
    messageType: 'EMAIL',
    requestDate: '2025-02-25 12:30:00',
    sendDate: '2025-02-25 12:31:00',
    message: 'EMAIL 메시지 내용',
    success: 'N',
  },
  {
    messageType: 'SMS',
    requestDate: '2025-02-24 12:40:00',
    sendDate: '2025-02-24 12:41:00',
    message: 'SMS 메시지 내용',
    success: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestDate: '2025-02-23 12:50:00',
    sendDate: '2025-02-23 12:51:00',
    message: 'EMAIL 메시지 내용',
    success: 'Y',
  },
  {
    messageType: 'SMS',
    requestDate: '2025-02-22 13:00:00',
    sendDate: '2025-02-22 13:01:00',
    message: 'SMS 메시지 내용',
    success: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestDate: '2025-02-21 13:10:00',
    sendDate: '2025-02-21 13:11:00',
    message: 'EMAIL 메시지 내용',
    success: 'Y',
  },
  {
    messageType: 'SMS',
    requestDate: '2025-02-20 13:20:00',
    sendDate: '2025-02-20 13:21:00',
    message: 'SMS 메시지 내용',
    success: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestDate: '2025-02-19 13:30:00',
    sendDate: '2025-02-19 13:31:00',
    message: 'EMAIL 메시지 내용',
    success: 'Y',
  },
  {
    messageType: 'SMS',
    requestDate: '2025-02-18 13:40:00',
    sendDate: '2025-02-18 13:41:00',
    message: 'SMS 메시지 내용',
    success: 'Y',
  },
];

class SendHistoryServiceMock {
  successWhenGetSendHistory() {
    cy.intercept('GET', '**/v1/send-histories', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: { sendHistories: sendHistoryList, totalCount: 11 },
      },
    }).as('getSendHistory');
  }
}

export default SendHistoryServiceMock;
