/// <reference types="cypress" />

const modifyServiceRequestSuccessResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    businessProcessId: 'CCA_GTR_550e8400-e29b-41d4-a716-446655440001',
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
}

export default ModificationRequestMock;
