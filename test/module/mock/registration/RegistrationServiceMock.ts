/// <reference types="cypress" />

export const successRegistrationResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    businessProcessId: 'CCA_0000000001'
  }
};

export const failRegistrationResponse = {
  successOrNot: 'N',
  statusCode: 'FAIL',
  data: {
    errorMessage: '가입 처리 중 오류가 발생했습니다.'
  }
};

export const pendingStatusResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    status: 'PENDING'
  }
};

export const completedStatusResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    status: 'COMPLETED',
    contractId: 'C-12345'
  }
};

export const failedStatusResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    status: 'FAILED',
    reason: '가입 처리 중 오류가 발생했습니다.'
  }
};

export const successEmailResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    emailHistoryId: 'EMAIL_0000000001',
    sentTimestamp: '2025-03-12 10:00:00'
  }
};

export const failEmailResponse = {
  successOrNot: 'N',
  statusCode: 'FAIL',
  data: {
    errorMessage: '이메일 발송에 실패했습니다.'
  }
};

export const successCustomerResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
        "customerId": "100000000001",
        "customerName": "김철*",
        "encryptedCustomerName": "ouJfSE0yT1CoRKQOGngA4Q==",
        "rrno": "781012-1*******",
        "encryptedRrno": "no2xSDY4PxVJaOy/9zbt4g==",
        "gender": "M",
        "age": 46,
        "contractId": "6872339294"
    }
};

export const successContractInfoResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    "customerId": "NEW_SUBSCRIPTION0",
    "contracts": []
  }
};

const successGetCustomerContracts = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    "customerId": "100000000001",
    "contracts": [
        {
            "customerId": "100000000001",
            "contractId": "6872339294",
            "orderId": "1000000001",
            "contractDate": "2025-03-06T07:18:32.461+00:00",
            "phoneNumber": "010-12**-*678",
            "phoneNumberEncrypted": "jsbi9wYDPfXoCe4y+yybiA==",
            "contractDetail": {
                "contractId": "6872339294",
                "phoneNumber": "010-12**-*678",
                "phoneNumberEncrypted": "jsbi9wYDPfXoCe4y+yybiA==",
                "contractDate": "2024-01-31",
                "lobType": "Mobile",
                "contractStatus": "해지",
                "contractType": "일반",
                "contractor": {
                    "assignee": "이순신",
                    "assigneeDepartment": "IT전략1담당(일반)",
                    "salesDepartment": "IT전략2담당(일반)",
                    "finalSeller": "홍길동"
                },
                "engagement": {
                    "engagementType": "5G 프리미엄 [3년약정(선택약정)]",
                    "engagementDate": "2024-01-01 ~ 2027-01-01",
                    "discountEndDate": "2027-01-31",
                    "elapsedDays": "30일 / 90일",
                    "totalDiscountRefundAmount": "150000"
                },
                "device": {
                    "deviceModelName": "DEVICE-123-456",
                    "deviceModelNameAlias": "iPhone 15 Pro",
                    "deviceSerialNumber": "고객정보보호",
                    "deviceSerialNumberEncrypted": "Ho9xY2Cq2YnWA9KHBcwvjg==",
                    "simModelName": "SIM-789-012",
                    "simSerialNumber": "고객정보보호",
                    "simSerialNumberEncrypted": "Ho9xY2Cq2YnWA9KHBcwvjg=="
                },
                "serviceList": [
                    {
                        "serviceType": "요금제",
                        "serviceName": "넷플릭스 초이스 스페셜",
                        "serviceValueType": "유료",
                        "serviceValue": "110000"
                    },
                    {
                        "serviceType": "부가서비스",
                        "serviceName": "데이터안심옵션",
                        "serviceValueType": "무료",
                        "serviceValue": "0"
                    },
                    {
                        "serviceType": "부가서비스",
                        "serviceName": "콜키퍼",
                        "serviceValueType": "유료",
                        "serviceValue": "10000"
                    }
                ]
            },
            "billingDetail": {
                "remainingPayment": "850000",
                "remainingInstallment": "24월"
            },
            "invoiceDetail": {
                "billingType": "정규",
                "paymentId": "1234567890",
                "paymentMethod": "카드자동이체",
                "paymentName": "김고*",
                "paymentNameEncrypted": "qReCuLylXyVQZFGEqH8BWA==",
                "account": "123412-****",
                "accountEncrypted": "y8fSq0hEXgf4P2AM29+qLw==",
                "card": "1234-12**-****-***4",
                "cardEncrypted": "Y7SQiNbezuGxkyUKVH2YDMINymYuEih8J08dxQRzIHo=",
                "invoiceType": "이메일",
                "invoiceNumber": "kimc***@kt.com",
                "invoiceNumberEncrypted": "HURxL5eth9k/BzUEBTYE8Q==",
                "invoiceAddress": "고객정보보호",
                "invoiceAddressEncrypted": "W8WT8bMzH927ThxHekwz0ZIZXn3HMLWwtTwYNacnE4RJaLWQR3C7652Q6iLlvs7S",
                "recipient": "김고*",
                "recipientEncrypted": "qReCuLylXyVQZFGEqH8BWA==",
                "paymentDate": "15일"
            }
        },
        {
            "customerId": "100000000001",
            "contractId": "7823440192",
            "orderId": "1000000002",
            "contractDate": "2025-03-06T07:18:32.461+00:00",
            "phoneNumber": "010-98**-*432",
            "phoneNumberEncrypted": "cNUXo+iR2XVYMuMgg6hEiA==",
            "contractDetail": {
                "contractId": "7823440192",
                "phoneNumber": "010-98**-*432",
                "phoneNumberEncrypted": "cNUXo+iR2XVYMuMgg6hEiA==",
                "contractDate": "2024-02-15",
                "lobType": "Mobile",
                "contractStatus": "사용중",
                "contractType": "프리미엄",
                "contractor": {
                    "assignee": "강감찬",
                    "assigneeDepartment": "모바일사업부",
                    "salesDepartment": "온라인영업팀",
                    "finalSeller": "박지성"
                },
                "engagement": {
                    "engagementType": "5G 플래티넘 [2년약정(선택약정)]",
                    "engagementDate": "2024-02-01 ~ 2026-02-01",
                    "discountEndDate": "2026-02-28",
                    "elapsedDays": "20일 / 60일",
                    "totalDiscountRefundAmount": "200000"
                },
                "device": {
                    "deviceModelName": "DEVICE-987-654",
                    "deviceModelNameAlias": "Galaxy S24 Ultra",
                    "deviceSerialNumber": "고객정보보호",
                    "deviceSerialNumberEncrypted": "47HLA9p6MKh9I/SwPL1xEw==",
                    "simModelName": "SIM-456-789",
                    "simSerialNumber": "고객정보보호",
                    "simSerialNumberEncrypted": "14VZGRC5m6gxdw7Wb7i7Eg=="
                },
                "serviceList": [
                    {
                        "serviceType": "요금제",
                        "serviceName": "5G 프리미엄 요금제",
                        "serviceValueType": "유료",
                        "serviceValue": "130000"
                    },
                    {
                        "serviceType": "부가서비스",
                        "serviceName": "해외로밍 무제한",
                        "serviceValueType": "유료",
                        "serviceValue": "15000"
                    },
                    {
                        "serviceType": "부가서비스",
                        "serviceName": "VIP 멤버십",
                        "serviceValueType": "무료",
                        "serviceValue": "0"
                    }
                ]
            },
            "billingDetail": {
                "remainingPayment": "950000",
                "remainingInstallment": "18개월"
            },
            "invoiceDetail": {
                "billingType": "정규",
                "paymentId": "9876543210",
                "paymentMethod": "계좌이체",
                "paymentName": "김지*",
                "paymentNameEncrypted": "iGcHa7f/xuEoVtIQGGYSuQ==",
                "account": "100256-******",
                "accountEncrypted": "DUrPR9BHUU/EwAeIvnb9DQ==",
                "card": "",
                "cardEncrypted": null,
                "invoiceType": "이메일",
                "invoiceNumber": "***@kt.com",
                "invoiceNumberEncrypted": "kHye+7esc5erX3YOLmcz7g==",
                "invoiceAddress": "고객정보보호",
                "invoiceAddressEncrypted": "tV4cBRBqckkPiiAhGHQ01jh6i4sT9dRKeXjpkNPULzHJVRs00ILB1VhFk4Qft/O1",
                "recipient": "김지*",
                "recipientEncrypted": "iGcHa7f/xuEoVtIQGGYSuQ==",
                "paymentDate": "25일"
            }
        },
        {
            "customerId": "100000000001",
            "contractId": "9654321876",
            "orderId": "1000000004",
            "contractDate": "2024-02-14T15:00:00.000+00:00",
            "phoneNumber": "010-55**-*333",
            "phoneNumberEncrypted": "cgd+lNcmGqG4DyASeYKG7w==",
            "contractDetail": {
                "contractId": "9654321876",
                "phoneNumber": "010-55**-*333",
                "phoneNumberEncrypted": "cgd+lNcmGqG4DyASeYKG7w==",
                "contractDate": "2024-03-05",
                "lobType": "Mobile",
                "contractStatus": "사용중",
                "contractType": "기업",
                "contractor": {
                    "assignee": "유관순",
                    "assigneeDepartment": "기업영업팀",
                    "salesDepartment": "B2B 영업본부",
                    "finalSeller": "이강인"
                },
                "engagement": {
                    "engagementType": "5G 비즈니스 플랜 [1년약정]",
                    "engagementDate": "2024-03-01 ~ 2025-03-01",
                    "discountEndDate": "2025-03-31",
                    "elapsedDays": "10일 / 30일",
                    "totalDiscountRefundAmount": "120000"
                },
                "device": {
                    "deviceModelName": "DEVICE-333-222",
                    "deviceModelNameAlias": "Galaxy Z Fold 5",
                    "deviceSerialNumber": "고객정보보호",
                    "deviceSerialNumberEncrypted": "fnTQtQSBjT2kZoZQyXY1gQ==",
                    "simModelName": "SIM-111-999",
                    "simSerialNumber": "고객정보보호",
                    "simSerialNumberEncrypted": "oruxTSJhXG/8snS1+rwf/w=="
                },
                "serviceList": [
                    {
                        "serviceType": "요금제",
                        "serviceName": "5G 기업전용 플랜",
                        "serviceValueType": "유료",
                        "serviceValue": "90000"
                    },
                    {
                        "serviceType": "부가서비스",
                        "serviceName": "클라우드 스토리지 1TB",
                        "serviceValueType": "유료",
                        "serviceValue": "9900"
                    }
                ]
            },
            "billingDetail": {
                "remainingPayment": "780000",
                "remainingInstallment": "20개월"
            },
            "invoiceDetail": {
                "billingType": "정규",
                "paymentId": "5555667788",
                "paymentMethod": "카드자동이체",
                "paymentName": "최부*",
                "paymentNameEncrypted": "0CpDQeDR/sTLDnaXD1OZXQ==",
                "account": "234567-******",
                "accountEncrypted": "h7XJ8B8iIpPwkI2KFYqOrQ==",
                "card": "5678-56**-****-***8",
                "cardEncrypted": "x5CAabj5l2iSZd2Kqh2L4wpJmrNNvpQgcRTbXf83aIQ=",
                "invoiceType": "이메일",
                "invoiceNumber": "c***@kt.com",
                "invoiceNumberEncrypted": "TUU90D3etFM5krfJ9BotPQ==",
                "invoiceAddress": "고객정보보호",
                "invoiceAddressEncrypted": "tZK/G2X67heQYnGMI8FLicUOT5ttUgQWv4Chm7pd3nrC6CxBNU/TLz1dfsVc+J7U",
                "recipient": "최부*",
                "recipientEncrypted": "0CpDQeDR/sTLDnaXD1OZXQ==",
                "paymentDate": "10일"
            }
        }
    ]
}
};

export class RegistrationServiceMock {
  // 신규가입 탬 진입 시 사용
  successWhenGetContractInfo() {
    cy.intercept('GET', '**/v1/customers/NEW_SUBSCRIPTION0/contracts', {
      statusCode: 200,
      body: successContractInfoResponse
    }).as('contractInfoRequest');
  }

  // 등록 요청 성공 Mock
  successWhenRegistration() {
    cy.intercept('POST', '**/v1/registration-common', {
      statusCode: 200,
      body: successRegistrationResponse
    }).as('registrationRequest');
  }

  // 등록 요청 실패 Mock
  failWhenRegistration() {
    cy.intercept('POST', '**/v1/registration', {
      statusCode: 200,
      body: failRegistrationResponse
    }).as('registrationRequest');
  }

  // 등록 상태 조회 - 진행 중 Mock
  pendingWhenGetStatus() {
    cy.intercept('GET', '**/v1/registration/status', {
      statusCode: 200,
      body: pendingStatusResponse
    }).as('statusRequest');
  }

  // 등록 상태 조회 - 완료 Mock
  completedWhenGetStatus() {
    cy.intercept('GET', '**/v1/registration-common/*', {
      statusCode: 200,
      body: completedStatusResponse
    }).as('statusRequest');
  }

  // 등록 상태 조회 - 실패 Mock
  failedWhenGetStatus() {
    cy.intercept('GET', '**/v1/registration/status/*', {
      statusCode: 200,
      body: failedStatusResponse
    }).as('statusRequest');
  }

  // 이메일 발송 성공 Mock
  successWhenSendEmail() {
    cy.intercept('POST', '**/v1/email/history', {
      statusCode: 200,
      body: successEmailResponse
    }).as('emailRequest');
  }

  // 이메일 발송 실패 Mock
  failWhenSendEmail() {
    cy.intercept('POST', '**/v1/email/send', {
      statusCode: 200,
      body: failEmailResponse
    }).as('emailRequest');
  }

  // 고객 조회 성공 Mock
  successWhenFetchCustomer() {
    cy.intercept('GET', '**/v1/customers*', {
      statusCode: 200,
      body: successCustomerResponse
    }).as('customerRequest');
  }

  // 고객 조회 결과 Mock
  successWhenFetchCustomerDetail() {
    cy.intercept('GET', '**/v1/customers/**', {
      statusCode: 200,
      body: successGetCustomerContracts
    }).as('customerResultRequest');
  }
}

export default RegistrationServiceMock; 