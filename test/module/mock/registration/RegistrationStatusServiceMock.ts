/// <reference types="cypress" />

import {
  REGISTRATION_EVENT_TYPE,
  REGISTRATION_STATUS,
} from '../../../../src/constants/RegistrationConstants';

const calculatePendingCount = (...statuses: (string | undefined)[]) => {
  return statuses.reduce(
    (count, status) => count + (status === undefined || status === 'PENDING' ? 1 : 0),
    0,
  );
};

class RegistrationStatusServiceMock {
  successWhenGetRegistrationStatus(
    userId: string = 'user1',
    status1: string = REGISTRATION_STATUS.PENDING,
    status2: string = REGISTRATION_STATUS.PENDING,
    status3: string = REGISTRATION_STATUS.PENDING,
  ) {
    cy.intercept('GET', '**/v1/registration-common/status', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data:
          userId === 'user1'
            ? {
                pendingCount: calculatePendingCount(status1, status2, status3),
                registrations: [
                  {
                    status: status1,
                    contractId: '',
                    reason: null,
                    businessProcessId: 'CCA_GTR_550e8400-e29b-41d4-a716-446655440000',
                    statusTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                    eventType: REGISTRATION_EVENT_TYPE.PLAN_ADDITIONAL_SERVICE_CHANGE,
                    requestMemberId: 'user1',
                    customerId: '100000000001',
                    customerName: '일철*',
                  },
                  {
                    status: status2,
                    contractId: '',
                    reason: null,
                    businessProcessId: 'CCA_GTR_550e8400-e29b-41d4-a716-446655440001',
                    statusTime: new Date().toISOString(),
                    eventType: REGISTRATION_EVENT_TYPE.REGISTRATION_SAVE_REQUEST,
                    requestMemberId: 'user1',
                    customerId: '100000000002',
                    customerName: '이철*',
                  },
                  {
                    status: status3,
                    contractId: '',
                    reason: null,
                    businessProcessId: 'CCA_GTR_550e8400-e29b-41d4-a716-446655440002',
                    statusTime: new Date().toISOString(),
                    eventType: REGISTRATION_EVENT_TYPE.PLAN_ADDITIONAL_SERVICE_CHANGE,
                    requestMemberId: 'user1',
                    customerId: '100000000003',
                    customerName: '삼철*',
                  },
                ],
              }
            : {
                pendingCount: 0,
                registrations: [],
              },
      },
    });
  }
}
export default RegistrationStatusServiceMock;
