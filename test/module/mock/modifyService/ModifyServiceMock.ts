/// <reference types="cypress" />

// 목 데이터: 요금제 목록
const servicesMock = [
  {
    serviceId: 'S001',
    serviceName: '5G 스탠다드 요금제',
    serviceValue: 55000,
    serviceValueType: 'KRW',
    releaseDate: '2022-01-01'
  },
  {
    serviceId: 'S002',
    serviceName: '5G 프리미엄 요금제',
    serviceValue: 75000,
    serviceValueType: 'KRW',
    releaseDate: '2022-06-01'
  },
  {
    serviceId: 'S003',
    serviceName: '데이터 무제한 요금제',
    serviceValue: 95000,
    serviceValueType: 'KRW',
    releaseDate: '2023-01-01'
  }
];

// 목 데이터: 부가서비스 목록
const additionalServicesMock = [
  {
    serviceId: 'A001',
    serviceName: '안심 데이터 차단',
    serviceValue: 0,
    serviceValueType: 'KRW',
    hasAgeRestriction: false,
    exclusive: false
  },
  {
    serviceId: 'A002',
    serviceName: '데이터 안심옵션',
    serviceValue: 5000,
    serviceValueType: 'KRW',
    hasAgeRestriction: false,
    exclusive: false
  },
  {
    serviceId: 'A003',
    serviceName: '청소년 안심 서비스',
    serviceValue: 2000,
    serviceValueType: 'KRW',
    hasAgeRestriction: true,
    exclusive: false
  },
  {
    serviceId: 'A004',
    serviceName: 'VIP 로밍 서비스',
    serviceValue: 15000,
    serviceValueType: 'KRW',
    hasAgeRestriction: false,
    exclusive: true
  }
];

// 목 데이터: 요금제 변경 가능 여부 응답
const modifiableResponseTrue = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    isModifiable: true,
    isRollbackAvailable: false,
    previousService: null
  }
};

// 목 데이터: 요금제 변경 불가 응답 (당월 변경 이력 있음)
const modifiableResponseFalse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    isModifiable: false,
    isRollbackAvailable: false,
    previousService: null
  }
};

// 목 데이터: 요금제 변경 불가 응답 (당일 변경 이력 있음, 되돌리기 가능)
const modifiableResponseWithRollback = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    isModifiable: false,
    isRollbackAvailable: true,
    previousService: {
      serviceId: 'S001',
      serviceName: '5G 스탠다드 요금제',
      serviceValue: 55000,
      serviceValueType: 'KRW'
    }
  }
};

// 목 데이터: 나이 제한 확인 응답 (나이 제한 없음)
const ageRestrictionResponseFalse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    isAvailable: true
  }
};

// 목 데이터: 나이 제한 확인 응답 (나이 제한 있음)
const ageRestrictionResponseTrue = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    isAvailable: false
  }
};

// 목 데이터: 서비스 변경 요청 성공 응답
const serviceModificationSuccessResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    modificationId: 'MOD12345',
    status: 'REQUESTED'
  }
};

class ModifyServiceMock {
  // 고객 검색 결과 모킹
  successWhenSearchCustomer() {
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
    }).as('searchCustomer');
  }

  // 고객 상세 정보 모킹
  successWhenGetCustomerDetail() {
    cy.intercept('GET', '**/v1/customers/100000000001**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000001',
          contracts: [
            {
              contractId: '6872339294',
              orderId: '1000000001',
              contractDate: '2025-03-06T07:18:32.461+00:00',
              phoneNumber: '010-12**-*678',
              phoneNumberEncrypted: 'encrypted-phone'
            }
          ]
        }
      }
    }).as('getCustomerDetail');
  }

  // 요금제 목록 조회 API 모킹
  successWhenGetServices() {
    cy.intercept('GET', '**/v1/services', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: servicesMock
      }
    }).as('getServices');
  }

  // 부가서비스 목록 조회 API 모킹
  successWhenGetAdditionalServices() {
    cy.intercept('GET', '**/v1/services/additional**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y', 
        statusCode: 'SUCCESS',
        data: additionalServicesMock
      }
    }).as('getAdditionalServices');
  }

  // 요금제 변경 가능 여부 확인 API 모킹 (가능)
  successWhenCheckServiceModifiable() {
    cy.intercept('GET', '**/v1/service-modification/check**', {
      statusCode: 200,
      body: modifiableResponseTrue
    }).as('checkServiceModifiable');
  }

  // 요금제 변경 가능 여부 확인 API 모킹 (불가능 - 당월 변경 이력)
  failWhenCheckServiceModifiable() {
    cy.intercept('GET', '**/v1/service-modification/check**', {
      statusCode: 200,
      body: modifiableResponseFalse
    }).as('checkServiceModifiable');
  }

  // 요금제 변경 가능 여부 확인 API 모킹 (불가능 - 당일 변경 이력, 되돌리기 가능)
  rollbackAvailableWhenCheckServiceModifiable() {
    cy.intercept('GET', '**/v1/service-modification/check**', {
      statusCode: 200,
      body: modifiableResponseWithRollback
    }).as('checkServiceModifiable');
  }

  // 나이 제한 확인 API 모킹 (제한 없음)
  noAgeRestrictionWhenCheckServiceAgeRestriction() {
    cy.intercept('GET', '**/v1/services/check-age**', {
      statusCode: 200,
      body: ageRestrictionResponseFalse
    }).as('checkServiceAgeRestriction');
  }

  // 나이 제한 확인 API 모킹 (제한 있음)
  hasAgeRestrictionWhenCheckServiceAgeRestriction() {
    cy.intercept('GET', '**/v1/services/check-age**', {
      statusCode: 200,
      body: ageRestrictionResponseTrue
    }).as('checkServiceAgeRestriction');
  }

  // 서비스 변경 요청 API 모킹 (성공)
  successWhenModifyService() {
    cy.intercept('POST', '**/v1/service-modification', {
      statusCode: 200,
      body: serviceModificationSuccessResponse
    }).as('modifyService');
  }
}

export default ModifyServiceMock; 