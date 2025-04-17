/// <reference types="cypress" />

class CustomerDetailServiceMock {
  homeBookmark() {
    cy.intercept('GET', '**/cca-be/v1/member/bookmark', {
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

  successGetCustomer() {
    cy.intercept('GET', '**/stg-be/v1/customers?**', {
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
          age: 24,
          contractId: null,
        },
      },
    });
  }

  successWhenGetCustomerContracts() {
    cy.intercept('GET', '**/stg-be/v1/customers/*/contracts', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: successGetCustomerContracts,
      },
    }).as('getCustomerContracts');
  }

  successWhenGetContractIdByPhoneNumber() {
    cy.intercept('GET', '**/stg-be/v1/customers/*/contractId?phoneNumber=01098765432', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: '7823440192',
      },
    }).as('getContractIdByPhoneNumber');
  }
}

const successGetCustomerContracts = {
  customerId: '100000000002',
  contracts: [
    {
      customerId: '100000000002',
      contractId: '9876543210',
      orderId: '100000000002',
      contractDate: '2025-02-27T04:46:31.822+00:00',
      phoneNumber: '010-7777-5555',
      phoneNumberEncrypted: 'sz4/rHtHLULhFV06o+lg8A==',
      contractDetail: {
        contractId: '6872339294',
        phoneNumber: '010-7777-5555',
        phoneNumberEncrypted: 'sz4/rHtHLULhFV06o+lg8A==',
        contractDate: '2024-01-31',
        lobType: 'Mobile',
        contractStatus: '해지',
        contractType: '일반',
        contractor: {
          assignee: '이순신',
          assigneeDepartment: 'IT전략1담당(일반)',
          salesDepartment: 'IT전략2담당(일반)',
          finalSeller: '홍길동',
        },
        engagement: {
          engagementType: '5G 프리미엄 [3년약정(선택약정)]',
          engagementDate: '2024-01-01 ~ 2027-01-01',
          discountEndDate: '2027-01-31',
          elapsedDays: '30일/90일',
          totalDiscountRefundAmount: '150000',
        },
        device: {
          deviceModelName: 'DEVICE-123-456',
          deviceModelNameAlias: 'iPhone 15 Pro',
          deviceSerialNumber: '고객정보보호',
          deviceSerialNumberEncrypted: '0m8+Gf/0kbsZxnnXtvBBGA==',
          simModelName: 'SIM-789-012',
          simSerialNumber: '고객정보보호',
          simSerialNumberEncrypted: '0m8+Gf/0kbsZxnnXtvBBGA==',
        },
        serviceList: [
          {
            serviceType: '요금제',
            serviceName: '넷플릭스 초이스 스페셜',
            serviceValueType: '유료',
            serviceValue: '110,000원',
            validStartDatetime: '2024-01-01T00:00:00.000+00:00',
            validEndDatetime: '2027-01-01T00:00:00.000+00:00',
          },
          {
            serviceType: '부가서비스',
            serviceName: '데이터안심옵션',
            serviceValueType: '무료',
            serviceValue: '0원',
            validStartDatetime: '2024-01-01T00:00:00.000+00:00',
            validEndDatetime: '2027-01-01T00:00:00.000+00:00',
          },
          {
            serviceType: '부가서비스',
            serviceName: '콜키퍼',
            serviceValueType: '유료',
            serviceValue: '10,000원',
            validStartDatetime: '2024-01-01T00:00:00.000+00:00',
            validEndDatetime: '2027-01-01T00:00:00.000+00:00',
          },
        ],
      },
      billingDetail: {
        remainingPayment: '850000',
        remainingInstallment: '24월',
      },
      invoiceDetail: {
        billingType: '정규',
        paymentId: '1234567890',
        paymentMethod: '카드자동이체',
        paymentName: '김고*',
        paymentNameEncrypted: 'dvICzaXAPtsVjhCvqs0WBw==',
        account: '',
        accountEncrypted: '',
        card: '1234-12**-****-***4',
        cardEncrypted: 'keOSXHiv/VyGSnU7Ul8j1iX688OXuMlZRw1x80UsQEI=',
        invoiceType: '카드',
        invoiceNumber: 'kimc***@kt.com',
        invoiceNumberEncrypted: 'fWLkOaVho+jKOSoLVbfYOQ==',
        invoiceAddress: '고객정보보호',
        invoiceAddressEncrypted: 'UShlQxMaSL51FPzrZwKFDARzy0EOj8yduwMHlnNgETcTXxp8p49IOB3tq7qFEa9R',
        recipient: '김고*',
        recipientEncrypted: 'dvICzaXAPtsVjhCvqs0WBw==',
        paymentDate: '15일',
      },
    },
    {
      customerId: '100000000001',
      contractId: '7823440192',
      orderId: '1000000002',
      contractDate: '2025-02-27T04:46:31.822+00:00',
      phoneNumber: '010-98**-*432',
      phoneNumberEncrypted: 'YAhNg4U9IIkGLPuUT5tkRQ==',
      contractDetail: {
        contractId: '7823440192',
        phoneNumber: '010-98**-*432',
        phoneNumberEncrypted: 'YAhNg4U9IIkGLPuUT5tkRQ==',
        contractDate: '2024-02-15',
        lobType: 'Mobile',
        contractStatus: '사용중',
        contractType: '프리미엄',
        contractor: {
          assignee: '강감찬',
          assigneeDepartment: '모바일사업부',
          salesDepartment: '온라인영업팀',
          finalSeller: '박지성',
        },
        engagement: {
          engagementType: '5G 플래티넘 [2년약정(선택약정)]',
          engagementDate: '2024-02-01 ~ 2026-02-01',
          discountEndDate: '2026-02-28',
          elapsedDays: '20일/60일',
          totalDiscountRefundAmount: '200000',
        },
        device: {
          deviceModelName: 'DEVICE-987-654',
          deviceModelNameAlias: 'Galaxy S24 Ultra',
          deviceSerialNumber: '고객정보보호',
          deviceSerialNumberEncrypted: 'H6px+casoXRFn7ERTAIuVw==',
          simModelName: 'SIM-456-789',
          simSerialNumber: '고객정보보호',
          simSerialNumberEncrypted: 'X/k+CsENNUOViA/nPg+BCw==',
        },
        serviceList: [
          {
            serviceType: '요금제',
            serviceName: '5G 프리미엄 요금제',
            serviceValueType: '유료',
            serviceValue: '130,000원',
            validStartDatetime: '2024-02-01T00:00:00.000+00:00',
            validEndDatetime: '2026-02-01T00:00:00.000+00:00',
          },
          {
            serviceType: '부가서비스',
            serviceName: '해외로밍 무제한',
            serviceValueType: '유료',
            serviceValue: '15,000원',
            validStartDatetime: '2024-02-01T00:00:00.000+00:00',
            validEndDatetime: '2026-02-01T00:00:00.000+00:00',
          },
          {
            serviceType: '부가서비스',
            serviceName: 'VIP 멤버십',
            serviceValueType: '무료',
            serviceValue: '0원',
            validStartDatetime: '2024-02-01T00:00:00.000+00:00',
            validEndDatetime: '2026-02-01T00:00:00.000+00:00',
          },
        ],
      },
      billingDetail: {
        remainingPayment: '950000',
        remainingInstallment: '18월',
      },
      invoiceDetail: {
        billingType: '정규',
        paymentId: '9876543210',
        paymentMethod: '계좌이체',
        paymentName: '김지*',
        paymentNameEncrypted: 'gVmmt33Q2hnurkQC6CoATg==',
        account: '',
        accountEncrypted: '',
        card: '',
        cardEncrypted: '',
        invoiceType: '계좌이체',
        invoiceNumber: '***@kt.com',
        invoiceNumberEncrypted: 'lvpy+6FiB9Y2tPyOyP8dcg==',
        invoiceAddress: '고객정보보호',
        invoiceAddressEncrypted: 'PQR2Akb9przrtUVvS6OS2I9XzsD9f+Eyslw8drt97SGFj+zcrQwEEy+Q57QL1Fl2',
        recipient: '김지*',
        recipientEncrypted: 'gVmmt33Q2hnurkQC6CoATg==',
        paymentDate: '25일',
      },
    },
    {
      customerId: '100000000001',
      contractId: '9654321876',
      orderId: '1000000004',
      contractDate: '2024-02-14T15:00:00.000+00:00',
      phoneNumber: '010-55**-*333',
      phoneNumberEncrypted: 'Mm6WkP1vTFTv+i+3af+adQ==',
      contractDetail: {
        contractId: '9654321876',
        phoneNumber: '010-55**-*333',
        phoneNumberEncrypted: 'Mm6WkP1vTFTv+i+3af+adQ==',
        contractDate: '2024-03-05',
        lobType: 'Mobile',
        contractStatus: '사용중',
        contractType: '기업',
        contractor: {
          assignee: '유관순',
          assigneeDepartment: '기업영업팀',
          salesDepartment: 'B2B 영업본부',
          finalSeller: '이강인',
        },
        engagement: {
          engagementType: '5G 비즈니스 플랜 [1년약정]',
          engagementDate: '2024-03-01 ~ 2025-03-01',
          discountEndDate: '2025-03-31',
          elapsedDays: '10일/30일',
          totalDiscountRefundAmount: '120000',
        },
        device: {
          deviceModelName: 'DEVICE-333-222',
          deviceModelNameAlias: 'Galaxy Z Fold 5',
          deviceSerialNumber: '고객정보보호',
          deviceSerialNumberEncrypted: 'HnOCuLOwO1yxyZEBN+m4EQ==',
          simModelName: 'SIM-111-999',
          simSerialNumber: '고객정보보호',
          simSerialNumberEncrypted: 'VtjnS1rMiT7TjXbE7AVduw==',
        },
        serviceList: [
          {
            serviceType: '요금제',
            serviceName: '5G 기업전용 플랜',
            serviceValueType: '유료',
            serviceValue: '90,000원',
            validStartDatetime: '2024-03-01T00:00:00.000+00:00',
            validEndDatetime: '2025-03-01T00:00:00.000+00:00',
          },
          {
            serviceType: '부가서비스',
            serviceName: '클라우드 스토리지 1TB',
            serviceValueType: '유료',
            serviceValue: '9,900원',
            validStartDatetime: '2024-03-01T00:00:00.000+00:00',
            validEndDatetime: '2025-03-01T00:00:00.000+00:00',
          },
        ],
      },
      billingDetail: {
        remainingPayment: '780000',
        remainingInstallment: '20월',
      },
      invoiceDetail: {
        billingType: '정규',
        paymentId: '5555667788',
        paymentMethod: '카드자동이체',
        paymentName: '최부*',
        paymentNameEncrypted: '/BGnZIJiWiRxIvzukwEMHA==',
        account: '',
        accountEncrypted: '',
        card: '5678-56**-****-***8',
        cardEncrypted: 'dwkPn27l19WR9AhrXiRP38ztAgIUN4Hdzw1UFkKQ260=',
        invoiceType: '카드',
        invoiceNumber: 'c***@kt.com',
        invoiceNumberEncrypted: 'yOo6jMpfAdgA5zPxCCIn7w==',
        invoiceAddress: '고객정보보호',
        invoiceAddressEncrypted: 'hiW0yJErP5Y6SPsWq6Rt82UxRhPRitfYETzaoV1T+qAApH5y3UzuwPzm3nIYignC',
        recipient: '최부*',
        recipientEncrypted: '/BGnZIJiWiRxIvzukwEMHA==',
        paymentDate: '10일',
      },
    },
  ],
};

export default CustomerDetailServiceMock;
