/// <reference types="cypress" />

const customerResponse = {
  customerId: 'C-3000000000',
};

class CustomerSectionServiceMock {
  successWhenGetAvailableCustomerContract(availableCount: number) {
    cy.intercept('GET', '**/v1/contract/**/check', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          availableCount: availableCount,
        },
      },
    });
  }

  successWhenCreateCustomer() {
    cy.intercept('POST', '**/v1/customer', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: customerResponse,
      },
    });
  }

  successWhenCustomerNameVerification(result: string) {
    cy.intercept('POST', '**/v1/customer/name-verification', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerNameVerificationHistoryId: 22,
          nameVerificationResult: result,
          checkResult: result,
          organization: 'KAIT',
        },
      },
    });
  }
}
export default CustomerSectionServiceMock;
