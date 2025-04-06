/// <reference types="cypress" />


const modifyServiceRequestSuccessResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    businessProcessId: 'CCA_GTR_550e8400-e29b-41d4-a716-446655440001',
  },
};

const registrationStatusSuccessResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    registrations: [
      {
        businessProcessId: 'CCA_0000000001',
        customerId: '100000000001',
        customerName: '홍길동',
        status: 'COMPLETED',
        processType: 'MODIFY_SERVICE',
        registrationDatetime: '2023-06-01T09:00:00.000Z',
        completionDatetime: '2023-06-01T09:05:00.000Z',
        errorMessage: null,
      },
    ],
  },
};

const registrationStatusFailResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    registrations: [
      {
        businessProcessId: 'CCA_0000000002',
        customerId: '100000000001',
        customerName: '홍길동',
        status: 'FAILED',
        processType: 'MODIFY_SERVICE',
        registrationDatetime: '2023-06-01T09:00:00.000Z',
        completionDatetime: '2023-06-01T09:05:00.000Z',
        errorMessage: '시스템 오류로 처리에 실패했습니다.',
      },
    ],
  },
};

// 목 데이터: 등록 상태 조회 응답 (진행 중 상태)
const registrationStatusProcessingResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    registrations: [
      {
        businessProcessId: 'CCA_0000000003',
        customerId: '100000000001',
        customerName: '홍길동',
        status: 'PROCESSING',
        processType: 'MODIFY_SERVICE',
        registrationDatetime: '2023-06-01T09:00:00.000Z',
        completionDatetime: null,
        errorMessage: null,
      },
    ],
  },
};

class ModificationRequestMock {
  // 등록 요청 API 모킹
  successWhenRequestServiceModification() {
    cy.intercept('PUT', '**/v1/registration-service', {
      statusCode: 200,
      body: modifyServiceRequestSuccessResponse,
    }).as('modifyServiceRequestSuccessResponse');
  }

  // 등록 상태 조회 API 모킹 (성공)
  successWhenGetRegistrationStatus() {
    cy.intercept('GET', '**/v1/registration/status*', {
      statusCode: 200,
      body: registrationStatusSuccessResponse,
    }).as('getRegistrationStatusSuccess');
  }

  // 등록 상태 조회 API 모킹 (실패)
  failWhenGetRegistrationStatus() {
    cy.intercept('GET', '**/v1/registration/status*', {
      statusCode: 200,
      body: registrationStatusFailResponse,
    }).as('getRegistrationStatusFail');
  }

  // 등록 상태 조회 API 모킹 (진행 중)
  processingWhenGetRegistrationStatus() {
    cy.intercept('GET', '**/v1/registration/status*', {
      statusCode: 200,
      body: registrationStatusProcessingResponse,
    }).as('getRegistrationStatusProcessing');
  }
}

export default ModificationRequestMock;
