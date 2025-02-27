/// <reference types="cypress" />

export class LoginServiceMock {
  adminLogin() {
    cy.intercept('POST', '**/v1/auth/login', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          accessToken: 'token',
          memberInfo: {
            memberId: 'S-0001',
            memberName: '김콜센터',
            classOfPosition: '대리',
            memberGroup: '콜센터',
            authorities: ['A-0001', 'A-0002'],
          },
        },
      },
    });
  }

  normalLogin() {
    cy.intercept('POST', '**/v1/auth/login', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          accessToken: 'token',
          memberInfo: {
            memberId: 'S-0002',
            memberName: '이대리점',
            classOfPosition: '과장',
            memberGroup: '대리점',
            authorities: [],
          },
        },
      },
    });
  }
}

export class CustomerSearchServiceMock {
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
    cy.intercept('GET', '**/v1/customers?**', {
      statusCode: 200,
      body: {
        successOrNot: 'N',
        statusCode: 'CUSTOMER_NOT_FOUND',
        data: 'Customer not found',
      },
    });
  }

  successFindCustomer01() {
    cy.intercept('GET', '**/v1/customers?**', {
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

  successFindCustomer02() {
    cy.intercept('GET', '**/v1/customers?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000002',
          customerName: '이영희',
          encryptedCustomerName: '이영희',
          rrno: '010724-4679321',
          encryptedRrno: '010724-4679321',
          gender: 'F',
          age: 42,
          contractId: null,
        },
      },
    });
  }

  successFindCustomer03() {
    cy.intercept('GET', '**/v1/customers?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000003',
          customerName: '박지훈',
          encryptedCustomerName: '박지훈',
          rrno: '891203-1876542',
          encryptedRrno: '891203-1876542',
          gender: 'M',
          age: 34,
          contractId: null,
        },
      },
    });
  }

  successFindCustomer04() {
    cy.intercept('GET', '**/v1/customers?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000004',
          customerName: '최민서',
          encryptedCustomerName: '최민서',
          rrno: '991105-2874321',
          encryptedRrno: '991105-2874321',
          gender: 'F',
          age: 33,
          contractId: null,
        },
      },
    });
  }

  successFindCustomer05() {
    cy.intercept('GET', '**/v1/customers?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000005',
          customerName: '한동욱',
          encryptedCustomerName: '한동욱',
          rrno: '851230-1278945',
          encryptedRrno: '851230-1278945',
          gender: 'M',
          age: 43,
          contractId: null,
        },
      },
    });
  }

  successFindCustomer06() {
    cy.intercept('GET', '**/v1/customers?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000006',
          customerName: '정다은',
          encryptedCustomerName: '정다은',
          rrno: '950315-2274567',
          encryptedRrno: '950315-2274567',
          gender: 'F',
          age: 40,
          contractId: null,
        },
      },
    });
  }

  successFindCustomer07() {
    cy.intercept('GET', '**/v1/customers?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000007',
          customerName: '오지훈',
          encryptedCustomerName: '오지훈',
          rrno: '701122-1378456',
          encryptedRrno: '701122-1378456',
          gender: 'M',
          age: 52,
          contractId: null,
        },
      },
    });
  }

  successFindCustomer08() {
    cy.intercept('GET', '**/v1/customers?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000008',
          customerName: '서준혁',
          encryptedCustomerName: '서준혁',
          rrno: '001001-3478950',
          encryptedRrno: '001001-3478950',
          gender: 'M',
          age: 48,
          contractId: null,
        },
      },
    });
  }

  successFindCustomer09() {
    cy.intercept('GET', '**/v1/customers?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000009',
          customerName: '강예진',
          encryptedCustomerName: '강예진',
          rrno: '891105-2678912',
          encryptedRrno: '891105-2678912',
          gender: 'F',
          age: 38,
          contractId: null,
        },
      },
    });
  }

  successFindCustomer10() {
    cy.intercept('GET', '**/v1/customers?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000010',
          customerName: '조윤성',
          encryptedCustomerName: '조윤성',
          rrno: '001225-3470123',
          encryptedRrno: '001225-3470123',
          gender: 'M',
          age: 49,
          contractId: null,
        },
      },
    });
  }
}
