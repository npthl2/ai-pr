/// <reference types="cypress" />

class CustomerSearchServiceMock {
  homeBookmark() {
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
  notFoundCustomer() {
    cy.intercept('GET', '**/v1/customers', {
      statusCode: 200,
      body: {
        successOrNot: 'N',
        statusCode: 'CUSTOMER_NOT_FOUND',
        data: 'Customer not found',
      },
    });
  }

  successFindCustomer() {
    cy.intercept('GET', '**/v1/customers', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000001',
          customerName: '김철수',
          encryptedCustomerName: '김철수',
          rrno: '781012-1658743',
          encryptedRrno: '781012-1658743',
          gender: 'M',
          age: 46,
          contractId: null,
        },
      },
    });
  }
}
export default CustomerSearchServiceMock;
