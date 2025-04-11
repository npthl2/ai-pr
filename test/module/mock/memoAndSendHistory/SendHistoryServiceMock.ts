/// <reference types="cypress" />

const sendHistoryListBoth = [
  {
    messageType: 'SMS',
    requestTime: '2025-03-01 12:01:00',
    sentTime: '2025-03-01 12:02:00',
    message: 'SMS 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-28 12:10:00',
    sentTime: '2025-02-28 12:11:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'SMS',
    requestTime: '2025-02-26 12:20:00',
    sentTime: '2025-02-26 12:21:00',
    message: 'SMS 메시지 내용',
    successYn: 'N',
  },
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-25 12:30:00',
    sentTime: '2025-02-25 12:31:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'N',
  },
  {
    messageType: 'SMS',
    requestTime: '2025-02-24 12:40:00',
    sentTime: '2025-02-24 12:41:00',
    message: 'SMS 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-23 12:50:00',
    sentTime: '2025-02-23 12:51:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'SMS',
    requestTime: '2025-02-22 13:00:00',
    sentTime: '2025-02-22 13:01:00',
    message: 'SMS 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-21 13:10:00',
    sentTime: '2025-02-21 13:11:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'SMS',
    requestTime: '2025-02-20 13:20:00',
    sentTime: '2025-02-20 13:21:00',
    message: 'SMS 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-19 13:30:00',
    sentTime: '2025-02-19 13:31:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'SMS',
    requestTime: '2025-02-18 13:40:00',
    sentTime: '2025-02-18 13:41:00',
    message: 'SMS 메시지 내용',
    successYn: 'Y',
  },
];

const sendHistoryListSMSOnly = [
  {
    messageType: 'SMS',
    requestTime: '2025-03-01 12:01:00',
    sentTime: '2025-03-01 12:02:00',
    message: 'SMS 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'SMS',
    requestTime: '2025-02-26 12:20:00',
    sentTime: '2025-02-26 12:21:00',
    message: 'SMS 메시지 내용',
    successYn: 'N',
  },
  {
    messageType: 'SMS',
    requestTime: '2025-02-24 12:40:00',
    sentTime: '2025-02-24 12:41:00',
    message: 'SMS 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'SMS',
    requestTime: '2025-02-22 13:00:00',
    sentTime: '2025-02-22 13:01:00',
    message: 'SMS 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'SMS',
    requestTime: '2025-02-20 13:20:00',
    sentTime: '2025-02-20 13:21:00',
    message: 'SMS 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'SMS',
    requestTime: '2025-02-18 13:40:00',
    sentTime: '2025-02-18 13:41:00',
    message: 'SMS 메시지 내용',
    successYn: 'Y',
  },
];

const sendHistoryListEmailOnly = [
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-28 12:10:00',
    sentTime: '2025-02-28 12:11:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-25 12:30:00',
    sentTime: '2025-02-25 12:31:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'N',
  },
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-23 12:50:00',
    sentTime: '2025-02-23 12:51:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-21 13:10:00',
    sentTime: '2025-02-21 13:11:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-19 13:30:00',
    sentTime: '2025-02-19 13:31:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'Y',
  },
];

const sendHistoryListSuccessOnly = [
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-28 12:10:00',
    sentTime: '2025-02-28 12:11:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-23 12:50:00',
    sentTime: '2025-02-23 12:51:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-21 13:10:00',
    sentTime: '2025-02-21 13:11:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'Y',
  },
  {
    messageType: 'EMAIL',
    requestTime: '2025-02-19 13:30:00',
    sentTime: '2025-02-19 13:31:00',
    message: 'EMAIL 메시지 내용',
    successYn: 'Y',
  },
];

class SendHistoryServiceMock {
  successWhenGetSendHistory() {
    cy.intercept('GET', '**/v1/send-histories?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          sendHistories: [...sendHistoryListBoth],
          totalCount: sendHistoryListBoth.length
        }
      }
    }).as('getSendHistory');
  }
  
  successWhenGetSendHistoryByMessageType(messageType: string) {
    const sendHistoryList = messageType === 'SMS' 
      ? sendHistoryListSMSOnly 
      : messageType === 'EMAIL' 
        ? sendHistoryListEmailOnly 
        : sendHistoryListBoth;

    cy.intercept('GET', `**/v1/send-histories?*messageType=${messageType}*`, {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          sendHistories: [...sendHistoryList],
          totalCount: sendHistoryList.length
        }
      }
    }).as('getSendHistoryByMessageType');
  } 

  successWhenGetSendHistoryBySuccessOnly() {
    cy.intercept('GET', '**/v1/send-histories?*includeOnlySuccessYN=Y*', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          sendHistories: [...sendHistoryListSuccessOnly],
          totalCount: sendHistoryListSuccessOnly.length
        }
      }
    }).as('getSendHistoryBySuccessOnly');
  }
}

export default SendHistoryServiceMock;
