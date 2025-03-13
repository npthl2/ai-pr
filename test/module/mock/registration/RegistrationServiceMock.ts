/// <reference types="cypress" />

export const successRegistrationResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    businessProcessId: 'CCA_0000000001'
  }
};

export const failRegistrationResponse = {
  successOrNot: 'N',
  statusCode: 'FAIL',
  data: {
    errorMessage: '가입 처리 중 오류가 발생했습니다.'
  }
};

export const pendingStatusResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    status: 'PENDING'
  }
};

export const completedStatusResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    status: 'COMPLETED',
    contractId: 'C-12345'
  }
};

export const failedStatusResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    status: 'FAILED',
    reason: '가입 처리 중 오류가 발생했습니다.'
  }
};

export const successEmailResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    emailHistoryId: 'EMAIL_0000000001',
    sentTimestamp: '2025-03-12 10:00:00'
  }
};

export const failEmailResponse = {
  successOrNot: 'N',
  statusCode: 'FAIL',
  data: {
    errorMessage: '이메일 발송에 실패했습니다.'
  }
};

export const successCustomerResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    customerId: 'C-0001',
    customerName: '홍길동',
    encryptedCustomerName: 'encrypted-name',
    rrno: '123456-1234567',
    encryptedRrno: 'encrypted-rrno',
    age: 30,
    gender: 'M',
    contractId: 'C-12345'
  }
};

export const successContractInfoResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    "customerId": "NEW_SUBSCRIPTION0",
    "contracts": []
  }
};

export class RegistrationServiceMock {
  // 신규가입 탬 진입 시 사용
  successWhenGetContractInfo() {
    cy.intercept('GET', '**/v1/customers/NEW_SUBSCRIPTION0/contracts', {
      statusCode: 200,
      body: successContractInfoResponse
    }).as('contractInfoRequest');
  }

  // 등록 요청 성공 Mock
  successWhenRegistration() {
    cy.intercept('POST', '**/v1/registration-common', {
      statusCode: 200,
      body: successRegistrationResponse
    }).as('registrationRequest');
  }

  // 등록 요청 실패 Mock
  failWhenRegistration() {
    cy.intercept('POST', '**/v1/registration', {
      statusCode: 200,
      body: failRegistrationResponse
    }).as('registrationRequest');
  }

  // 등록 상태 조회 - 진행 중 Mock
  pendingWhenGetStatus() {
    cy.intercept('GET', '**/v1/registration/status', {
      statusCode: 200,
      body: pendingStatusResponse
    }).as('statusRequest');
  }

  // 등록 상태 조회 - 완료 Mock
  completedWhenGetStatus() {
    cy.intercept('GET', '**/v1/registration-common/*', {
      statusCode: 200,
      body: completedStatusResponse
    }).as('statusRequest');
  }

  // 등록 상태 조회 - 실패 Mock
  failedWhenGetStatus() {
    cy.intercept('GET', '**/v1/registration/status/*', {
      statusCode: 200,
      body: failedStatusResponse
    }).as('statusRequest');
  }

  // 이메일 발송 성공 Mock
  successWhenSendEmail() {
    cy.intercept('POST', '**/v1/email/history', {
      statusCode: 200,
      body: successEmailResponse
    }).as('emailRequest');
  }

  // 이메일 발송 실패 Mock
  failWhenSendEmail() {
    cy.intercept('POST', '**/v1/email/send', {
      statusCode: 200,
      body: failEmailResponse
    }).as('emailRequest');
  }

  // 고객 조회 성공 Mock
  successWhenFetchCustomer() {
    cy.intercept('GET', '**/v1/customer*', {
      statusCode: 200,
      body: successCustomerResponse
    }).as('customerRequest');
  }
}

export default RegistrationServiceMock; 