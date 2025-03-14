/// <reference types="cypress" />

class ContractSectionServiceMock {
  successWhenGetAvailablePhoneNumber(endPhoneNumber: string, customerId: string) {
    cy.intercept(
      'GET',
      `**/v1/phone-numbers/availability?endPhoneNumber=${endPhoneNumber}&customerId=${customerId}`,
      {
        statusCode: 200,
        body: {
          successOrNot: 'Y',
          statusCode: 'SUCCESS',
          data: this.successGetAvailablePhoneNumber,
        },
      },
    ).as('getAvailablePhoneNumber');
  }
  successWhenClaimAvailablePhoneNumber() {
    cy.intercept('PUT', '**/v1/phone-numbers/*/claim', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {},
      },
    }).as('claimAvailablePhoneNumber');
  }
  successWhenGetServices() {
    cy.intercept('GET', '**/v1/services', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: this.successGetServices,
      },
    }).as('getServices');
  }
  successWhenGetAdditionalServices() {
    cy.intercept('GET', '**/v1/additional-services', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: this.successGetAdditionalServices,
      },
    }).as('getAdditionalServices');
  }
  successWhenCheckExclusiveServiceTrue() {
    cy.intercept('GET', '**/v1/additional-services/exclusive?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: true,
      },
    }).as('checkExclusiveServiceTrue');
  }
  successWhenCheckExclusiveServiceFalse() {
    cy.intercept('GET', '**/v1/additional-services/exclusive?**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: false,
      },
    }).as('checkExclusiveServiceFalse');
  }
  successWhenGetDeviceModelByIMEI() {
    cy.intercept('GET', '**/v1/device-inventories/*/device-model', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: this.successGetDeviceModelByIMEI,
      },
    }).as('getDeviceModelByIMEI');
  }
  failWhenGetDeviceModelByIMEI() {
    cy.intercept('PUT', '**/v1/device-inventories/*/device-model', {
      statusCode: 200,
      body: {
        successOrNot: 'N',
        statusCode: 'FAIL',
        data: '정보를 찾을 수 없습니다',
      },
    }).as('getDeviceModelByIMEI');
  }

  successGetAvailablePhoneNumber = [
    {
      phoneNumber: '010-2345-0010',
      statusCode: '사용가능',
      claimedCustomerId: null,
      phoneNumberProvider: 'KT',
      lastUpdateStatusDatetime: '2025-03-13T02:06:45.129+00:00',
      lastUpdateStatusMemberId: 'memberIdTest',
    },
  ];

  successGetDeviceModelByIMEI = {
    deviceModelId: 'dm_4',
    deviceModelName: 'DEV-AP-1',
    deviceModelNameAlias: 'iPhone 16',
    deviceType: '단말기',
    sellingPrice: 1800000,
  };

  successGetServices = [
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

  successGetAdditionalServices = [
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
}

export default ContractSectionServiceMock;
