/// <reference types="cypress" />

// 목 데이터: 요금제 목록
const successGetServices = [
  {
    serviceId: 'svc_58',
    serviceName: 'LTE Speed Max 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 60000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_60',
    serviceName: 'LTE Prime Max 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 180000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_55',
    serviceName: 'LTE Premium Pro 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 150000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_7',
    serviceName: '5G Speed Master 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 10000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_1',
    serviceName: '5G Ultra Plus 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 130000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_9',
    serviceName: '5G Turbo Flex 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 110000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_57',
    serviceName: 'LTE Flex Ultra 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 30000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_51',
    serviceName: 'LTE Ultra Max 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 100000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_53',
    serviceName: 'LTE Speed Elite 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 40000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_3',
    serviceName: '5G Turbo Pro 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 90000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_52',
    serviceName: 'LTE Power Plus 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 20000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_8',
    serviceName: '5G Hyper Ultra 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 80000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_59',
    serviceName: 'LTE Hyper Elite 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 90000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_2',
    serviceName: '5G Max Speed 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 80000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_56',
    serviceName: 'LTE Max Power 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 160000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_5',
    serviceName: '5G Infinity Max 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 20000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_6',
    serviceName: '5G Power Max 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 130000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_4',
    serviceName: '5G Elite Pro 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 110000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_10',
    serviceName: '5G Premium Max 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 20000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'svc_54',
    serviceName: 'LTE Turbo Flex 요금제',
    serviceType: '요금제',
    serviceValueType: '유료',
    serviceValue: 100000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
];

// 목 데이터: 부가서비스 목록
const successGetAdditionalServices = [
  {
    serviceId: 'a_5g_1',
    serviceName: '5G 1 Giga 충전 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 21000,
    exclusiveServiceIds: [
      'svc_51',
      'svc_52',
      'svc_53',
      'svc_54',
      'svc_55',
      'svc_56',
      'svc_57',
      'svc_58',
      'svc_59',
      'svc_60',
    ],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_lte_3',
    serviceName: 'LTE 3 Giga 충전 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 23000,
    exclusiveServiceIds: ['svc_1', 'svc_2', 'svc_3', 'svc_4', 'svc_5', 'svc_6'],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_lte_1',
    serviceName: 'LTE 1 Giga 충전 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 19000,
    exclusiveServiceIds: [
      'svc_1',
      'svc_2',
      'svc_3',
      'svc_4',
      'svc_5',
      'svc_6',
      'svc_7',
      'svc_8',
      'svc_9',
      'svc_10',
    ],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_lte_2',
    serviceName: 'LTE 2 Giga 충전 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 20000,
    exclusiveServiceIds: [
      'svc_1',
      'svc_2',
      'svc_3',
      'svc_4',
      'svc_5',
      'svc_6',
      'svc_7',
      'svc_8',
      'svc_9',
      'svc_10',
    ],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_ai_1',
    serviceName: 'AI로봇 부가서비스 Alpha',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 200000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_5g_3',
    serviceName: '5G 3 Giga 충전 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 5000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_5g_2',
    serviceName: '5G 2 Giga 충전 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 26000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_ai_2',
    serviceName: 'AI로봇 부가서비스 Beta',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 240000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_biz_1',
    serviceName: '스마트 라이프 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 8000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_app_2',
    serviceName: '기가 지니 부가서비스 2',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 29000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_app_1',
    serviceName: '기가 지니 부가서비스 1',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 14000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_biz_2',
    serviceName: '클라우드 스토리지 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 8000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
];

// 목 데이터: 부가서비스 목록
const successGetAdditional_SVC60_Services = [
  {
    serviceId: 'a_5g_1',
    serviceName: '5G 1 Giga 충전 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 21000,
    exclusiveServiceIds: [
      'svc_51',
      'svc_52',
      'svc_53',
      'svc_54',
      'svc_55',
      'svc_56',
      'svc_57',
      'svc_58',
      'svc_59',
      'svc_60',
    ],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
    hasAgeRestriction: false,
    exclusive: true,
  },
  {
    serviceId: 'a_5g_2',
    serviceName: '5G 2 Giga 충전 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 26000,
    exclusiveServiceIds: [
      'svc_51',
      'svc_52',
      'svc_53',
      'svc_54',
      'svc_55',
      'svc_56',
      'svc_57',
      'svc_58',
      'svc_59',
      'svc_60',
    ],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
    hasAgeRestriction: false,
    exclusive: true,
  },
  {
    serviceId: 'a_lte_3',
    serviceName: 'LTE 3 Giga 충전 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 23000,
    exclusiveServiceIds: ['svc_1', 'svc_2', 'svc_3', 'svc_4', 'svc_5', 'svc_6'],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_lte_1',
    serviceName: 'LTE 1 Giga 충전 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 19000,
    exclusiveServiceIds: [
      'svc_1',
      'svc_2',
      'svc_3',
      'svc_4',
      'svc_5',
      'svc_6',
      'svc_7',
      'svc_8',
      'svc_9',
      'svc_10',
    ],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',

  },
  {
    serviceId: 'a_lte_2',
    serviceName: 'LTE 2 Giga 충전 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 20000,
    exclusiveServiceIds: [
      'svc_1',
      'svc_2',
      'svc_3',
      'svc_4',
      'svc_5',
      'svc_6',
      'svc_7',
      'svc_8',
      'svc_9',
      'svc_10',
    ],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_ai_1',
    serviceName: 'AI로봇 부가서비스 Alpha',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 200000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_5g_3',
    serviceName: '5G 3 Giga 충전 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 5000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
    hasAgeRestriction: false,
    exclusive: true,
  },
  {
    serviceId: 'a_ai_2',
    serviceName: 'AI로봇 부가서비스 Beta',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 240000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
  {
    serviceId: 'a_biz_2',
    serviceName: '클라우드 스토리지 부가서비스',
    serviceType: '부가서비스',
    serviceValueType: '유료',
    serviceValue: 8000,
    exclusiveServiceIds: [''],
    validStartDatetime: '2025-03-09T15:00:00.000+00:00',
    validEndDatetime: '2028-03-09T15:00:00.000+00:00',
  },
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
        serviceId: 'svc_60',
        serviceName: 'LTE Prime Max 요금제',
        serviceValue: 180000,
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
    businessProcessId: 'CCA_0000000001'
  }
};

class ModifyServiceMock {
  // 요금제 목록 조회 API 모킹
  successWhenGetServices() {
    cy.intercept('GET', '**/v1/services', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: successGetServices
      }
    }).as('getServices');
  }

  // 부가서비스 목록 조회 API 모킹
  successWhenGetAdditionalServices() {
    cy.intercept(
      'GET', /\/v1\/additional-services\/age-exclusive\?age=\d+&serviceId=.+/, {
        statusCode: 200,
        body: {
          successOrNot: 'Y',
          statusCode: 'SUCCESS',
          data: successGetAdditionalServices
        }
      }
    ).as('getAdditionalServices');
  }

    // 부가서비스 목록 조회 API 모킹
    successWhenGetAdditional_SVC60_Services() {
      cy.intercept(
        'GET', '**/v1/additional-services/age-exclusive?age=46&serviceId=svc_60', {
          statusCode: 200,
          body: {
            successOrNot: 'Y',
            statusCode: 'SUCCESS',
            data: successGetAdditional_SVC60_Services
          }
        }
      ).as('getAdditional_SVC60_Services');
    }

  // 요금제 변경 가능 여부 확인 API 모킹 (가능)
  successWhenCheckServiceModifiable() {
    cy.intercept('GET', /\/v1\/contract\/service-modify\/[^/]+\/check$/, {
      statusCode: 200,
      body: modifiableResponseTrue
    }).as('successWhenCheckServiceModifiable');
  }

  // 요금제 변경 가능 여부 확인 API 모킹 (불가능 - 당월 변경 이력)
  failWhenCheckServiceModifiable() {
    cy.intercept('GET', /\/v1\/contract\/service-modify\/[^/]+\/check$/, {
      statusCode: 200,
      body: modifiableResponseFalse
    }).as('failWhenCheckServiceModifiable');
  }

  // 요금제 변경 가능 여부 확인 API 모킹 (불가능 - 당일 변경 이력, 되돌리기 가능)
  rollbackAvailableWhenCheckServiceModifiable() {
    cy.intercept('GET', /\/v1\/contract\/service-modify\/[^/]+\/check$/, {
      statusCode: 200,
      body: modifiableResponseWithRollback
    }).as('rollbackAvailableWhenCheckServiceModifiable');
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
    cy.intercept('PUT', '**/v1/registration-service', {
      statusCode: 200,
      body: serviceModificationSuccessResponse
    }).as('modifyService');
  }

}

export default ModifyServiceMock; 