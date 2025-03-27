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
            authorities: ['ROLE_SEARCH_TEL_NO', 'ROLE_UNMASKING'],
          },
        },
      },
    });
  }
}

export class ServiceSearchMock {
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

  getCustomerTwoLine() {
    cy.intercept('GET', '**/v1/customers?**birthDate=781012**', {
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

  getCustomerOneLine() {
    cy.intercept('GET', '**/v1/customers?**birthDate=891203**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000003',
          customerName: '박지*',
          encryptedCustomerName: '박지훈',
          rrno: '891203-1*******',
          encryptedRrno: 'qvNKdgiWaXhdfczwdoEj3Q==',
          gender: 'M',
          age: 25,
          contractId: null,
        },
      },
    });
  }

  getCustomerCancleLine() {
    cy.intercept('GET', '**/v1/customers?**birthDate=851230**', {
      successOrNot: 'Y',
      statusCode: 'SUCCESS',
      data: {
        customerId: '100000000005',
        customerName: '한동*',
        encryptedCustomerName: 'J45QiJNP9sF7ufOyjELr4g==',
        rrno: '851230-1*******',
        encryptedRrno: 'B4txadDuUOEnRTy1b5pv+Q==',
        gender: 'M',
        age: 39,
        contractId: null,
      },
    });
  }

  getCustomerTwoLineContract() {
    cy.intercept('GET', '**/v1/contract/100000000001', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          contracts: [
            {
              contractId: '7823440192',
              statusCode: 'USING',
              customerId: '100000000001',
              serviceId: 'svc_1',
              serviceName: '5G Ultra Plus 요금제',
              serviceType: 'PLAN',
              maskingPhoneNumber: '010-98**-*432',
              encryptedPhoneNumber: '/90gMwAuz6xCE4V+hQZnkA==',
              maskingImei: '666666666****',
              encryptedImei: '/OYrHvw+N/fPPibICbPN9Q==',
              deviceModelName: 'DEV-AP-6',
              deviceModelNameAlias: 'iPhone 13',
            },
            {
              contractId: '9654321876',
              statusCode: 'USING',
              customerId: '100000000001',
              serviceId: 'svc_3',
              serviceName: '5G Turbo Pro 요금제',
              serviceType: 'PLAN',
              maskingPhoneNumber: '010-55**-*333',
              encryptedPhoneNumber: 'ibXbDBOwzw0Sb0Whv6sNhg==',
              maskingImei: '444444444****',
              encryptedImei: 'WNMR7Rb1Lu4ojh9x6iFqcw==',
              deviceModelName: 'DEV-AP-4',
              deviceModelNameAlias: 'iPhone 11',
            },
          ],
        },
      },
    });
  }

  getCustomerOneLineContract() {
    cy.intercept('GET', '**/v1/contract/100000000003', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          contracts: [
            {
              contractId: '6872339297',
              statusCode: 'USING',
              customerId: '100000000003',
              serviceId: 'svc_3',
              serviceName: '5G Turbo Pro 요금제',
              serviceType: 'PLAN',
              maskingPhoneNumber: '010-44**-*222',
              encryptedPhoneNumber: 'u59HT2DB31wWdaNUbd+vdg==',
              maskingImei: '333333333****',
              encryptedImei: 'qpXQLT7nb/X+FWbJwnL3mQ==',
              deviceModelName: 'DEV-AP-3',
              deviceModelNameAlias: 'iPhone X',
            },
          ],
        },
      },
    });
  }

  getCustomerOneLineContractService() {
    cy.intercept('GET', '**/v1/contract/6872339297/service', {
      successOrNot: 'Y',
      statusCode: 'SUCCESS',
      data: {
        contractId: '6872339297',
        serviceId: 'svc_3',
        serviceName: '5G Turbo Pro 요금제',
        serviceType: 'PLAN',
        serviceValue: 90000,
        additionalService: [
          {
            contractId: '6872339297',
            serviceId: 'a_5g_2',
            serviceName: '5G 2 Giga 충전 부가서비스',
            serviceType: 'ADDITIONAL',
            serviceValue: 26000,
          },
          {
            contractId: '6872339297',
            serviceId: 'a_5g_3',
            serviceName: '5G 3 Giga 충전 부가서비스',
            serviceType: 'ADDITIONAL',
            serviceValue: 5000,
          },
        ],
      },
    });
  }
}
