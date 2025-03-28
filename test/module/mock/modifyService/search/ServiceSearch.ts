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

  getCustomerSearchPhoneNumber() {
    cy.intercept('GET', '**/v1/customers?**phoneNumber=01098765432**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000001',
          customerName: '김철*',
          encryptedCustomerName: 'cTm8Crihexhp5iEyZAq/Bw==',
          rrno: '781012-1*******',
          encryptedRrno: 'Wkm1+VfdxDldQhn4zp90Dw==',
          gender: 'M',
          age: 46,
          contractId: '7823440192',
        },
      },
    });
  }

  getCustomerSearchCanclePhoneNumber() {
    cy.intercept('GET', '**/v1/customers?**phoneNumber=01012345678**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000001',
          customerName: '김철*',
          encryptedCustomerName: 'cTm8Crihexhp5iEyZAq/Bw==',
          rrno: '781012-1*******',
          encryptedRrno: 'Wkm1+VfdxDldQhn4zp90Dw==',
          gender: 'M',
          age: 46,
          contractId: '6872339294',
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
      statusCode: 200,
      body: {
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

  getCustomerCancleLineContract() {
    cy.intercept('GET', '**/v1/contract/100000000005', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          contracts: [],
        },
      },
    });
  }

  getCustomerOneLineContractService() {
    cy.intercept('GET', '**/v1/contract/6872339297/service', {
      statusCode: 200,
      body: {
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
      },
    });
  }

  getCustomerCancleContractService() {
    cy.intercept('GET', '**/v1/contract/6872339296/service', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          contractId: '6872339294',
          contractStatusCode: 'CANCLE',
          serviceId: 'svc_2',
          serviceName: '5G Max Speed 요금제',
          serviceType: 'PLAN',
          serviceValue: 0,
          additionalService: [],
        },
      },
    });
  }

  getCustomerTwoLineContractService() {
    cy.intercept('GET', '**/v1/contract/7823440192/service', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          contractId: '7823440192',
          contractStatusCode: 'USING',
          serviceId: 'svc_1',
          serviceName: '5G Ultra Plus 요금제',
          serviceType: 'PLAN',
          serviceValue: 130000,
          additionalService: [
            {
              contractId: '7823440192',
              contractStatusCode: 'USING',
              serviceId: 'a_5g_3',
              serviceName: '5G 3 Giga 충전 부가서비스',
              serviceType: 'ADDITIONAL',
              serviceValue: 5000,
            },
          ],
        },
      },
    });
  }

  getUnmaskingPhoneNumber() {
    cy.intercept('POST', '**/v1/unmasking', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          resultMessage: 'Success',
          unmaskedItem: '010-9876-5432',
        },
      },
    });
  }

  getCustomerInfomation100000000005() {
    cy.intercept('GET', '**/v1/customers/100000000005/contracts', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000005',
          contracts: [],
        },
      },
    });
  }

  getCustomerInfomation100000000003() {
    cy.intercept('GET', '**/v1/customers/100000000003/contracts', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000003',
          contracts: [],
        },
      },
    });
  }

  getCustomerInfomation100000000001() {
    cy.intercept('GET', '**/v1/customers/100000000001/contracts', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          customerId: '100000000001',
          contracts: [
            {
              customerId: '100000000001',
              contractId: '6872339294',
              orderId: '1000000001',
              contractDate: '2025-03-12T02:20:40.334+00:00',
              phoneNumber: '010-12**-*678',
              phoneNumberEncrypted: 'ZJ1F9BNu0wlCVuAUE5RqQQ==',
              contractDetail: {
                contractId: '6872339294',
                phoneNumber: '010-12**-*678',
                phoneNumberEncrypted: 'ZJ1F9BNu0wlCVuAUE5RqQQ==',
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
                  elapsedDays: '30일 / 90일',
                  totalDiscountRefundAmount: '150000',
                },
                device: {
                  deviceModelName: 'DEVICE-123-456',
                  deviceModelNameAlias: 'iPhone 15 Pro',
                  deviceSerialNumber: '고객정보보호',
                  deviceSerialNumberEncrypted: 'CmtpqEkjNuNYXmvLgSvCqg==',
                  simModelName: 'SIM-789-012',
                  simSerialNumber: '고객정보보호',
                  simSerialNumberEncrypted: 'CmtpqEkjNuNYXmvLgSvCqg==',
                },
                serviceList: [
                  {
                    serviceType: '요금제',
                    serviceName: '넷플릭스 초이스 스페셜',
                    serviceValueType: '유료',
                    serviceValue: '110000',
                  },
                  {
                    serviceType: '부가서비스',
                    serviceName: '데이터안심옵션',
                    serviceValueType: '무료',
                    serviceValue: '0',
                  },
                  {
                    serviceType: '부가서비스',
                    serviceName: '콜키퍼',
                    serviceValueType: '유료',
                    serviceValue: '10000',
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
                paymentNameEncrypted: 'MGjCsDVeHuxzmrKmWksHDw==',
                account: '123412-****',
                accountEncrypted: 'ULgVeUehdJqoMvcJjkpu2w==',
                card: '1234-12**-****-***4',
                cardEncrypted: 'tTFRLrf5dTNC9NWTuAJQa1qoLJFG8toncHNH3XQkTeQ=',
                invoiceType: '이메일',
                invoiceNumber: 'kimc***@kt.com',
                invoiceNumberEncrypted: 'Qkg5cFkrmQsE4njMGGxdPA==',
                invoiceAddress: '고객정보보호',
                invoiceAddressEncrypted:
                  'YMzmoFrEjovAiuTfLCxvsd2R9a24qfz/N/mV/I+DJKHhkzVeqNiT4Q+jHVJxNChN',
                recipient: '김고*',
                recipientEncrypted: 'MGjCsDVeHuxzmrKmWksHDw==',
                paymentDate: '15일',
              },
            },
            {
              customerId: '100000000001',
              contractId: '7823440192',
              orderId: '1000000002',
              contractDate: '2025-03-12T02:20:40.334+00:00',
              phoneNumber: '010-98**-*432',
              phoneNumberEncrypted: '/90gMwAuz6xCE4V+hQZnkA==',
              contractDetail: {
                contractId: '7823440192',
                phoneNumber: '010-98**-*432',
                phoneNumberEncrypted: '/90gMwAuz6xCE4V+hQZnkA==',
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
                  elapsedDays: '20일 / 60일',
                  totalDiscountRefundAmount: '200000',
                },
                device: {
                  deviceModelName: 'DEVICE-987-654',
                  deviceModelNameAlias: 'Galaxy S24 Ultra',
                  deviceSerialNumber: '고객정보보호',
                  deviceSerialNumberEncrypted: 'Ycn6q4oiNK6rOWG/Cx2vgw==',
                  simModelName: 'SIM-456-789',
                  simSerialNumber: '고객정보보호',
                  simSerialNumberEncrypted: 'R6RSYwFbsof60Yld216+RA==',
                },
                serviceList: [
                  {
                    serviceType: '요금제',
                    serviceName: '5G 프리미엄 요금제',
                    serviceValueType: '유료',
                    serviceValue: '130000',
                  },
                  {
                    serviceType: '부가서비스',
                    serviceName: '해외로밍 무제한',
                    serviceValueType: '유료',
                    serviceValue: '15000',
                  },
                  {
                    serviceType: '부가서비스',
                    serviceName: 'VIP 멤버십',
                    serviceValueType: '무료',
                    serviceValue: '0',
                  },
                ],
              },
              billingDetail: {
                remainingPayment: '950000',
                remainingInstallment: '18개월',
              },
              invoiceDetail: {
                billingType: '정규',
                paymentId: '9876543210',
                paymentMethod: '계좌이체',
                paymentName: '김지*',
                paymentNameEncrypted: '8rrqYbBTqrYmkPAXswhV2w==',
                account: '100256-******',
                accountEncrypted: 'oEY85dksivxijMOV4v831g==',
                card: '',
                cardEncrypted: null,
                invoiceType: '이메일',
                invoiceNumber: '***@kt.com',
                invoiceNumberEncrypted: '7ruuMV2psdE3XAfAiKoTnw==',
                invoiceAddress: '고객정보보호',
                invoiceAddressEncrypted:
                  'Ww1sky+8aePaeUe3wwIjzxGawjXTeDqviLvABQ4vIi5LSoLEwwVkMtoTFhlyE0Sr',
                recipient: '김지*',
                recipientEncrypted: '8rrqYbBTqrYmkPAXswhV2w==',
                paymentDate: '25일',
              },
            },
            {
              customerId: '100000000001',
              contractId: '9654321876',
              orderId: '1000000004',
              contractDate: '2024-02-14T15:00:00.000+00:00',
              phoneNumber: '010-55**-*333',
              phoneNumberEncrypted: 'ibXbDBOwzw0Sb0Whv6sNhg==',
              contractDetail: {
                contractId: '9654321876',
                phoneNumber: '010-55**-*333',
                phoneNumberEncrypted: 'ibXbDBOwzw0Sb0Whv6sNhg==',
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
                  elapsedDays: '10일 / 30일',
                  totalDiscountRefundAmount: '120000',
                },
                device: {
                  deviceModelName: 'DEVICE-333-222',
                  deviceModelNameAlias: 'Galaxy Z Fold 5',
                  deviceSerialNumber: '고객정보보호',
                  deviceSerialNumberEncrypted: '3ZyJnpGGakRDlYbRBSglEA==',
                  simModelName: 'SIM-111-999',
                  simSerialNumber: '고객정보보호',
                  simSerialNumberEncrypted: 'tJBNTXa7jSDdPkQS8IhEsw==',
                },
                serviceList: [
                  {
                    serviceType: '요금제',
                    serviceName: '5G 기업전용 플랜',
                    serviceValueType: '유료',
                    serviceValue: '90000',
                  },
                  {
                    serviceType: '부가서비스',
                    serviceName: '클라우드 스토리지 1TB',
                    serviceValueType: '유료',
                    serviceValue: '9900',
                  },
                ],
              },
              billingDetail: {
                remainingPayment: '780000',
                remainingInstallment: '20개월',
              },
              invoiceDetail: {
                billingType: '정규',
                paymentId: '5555667788',
                paymentMethod: '카드자동이체',
                paymentName: '최부*',
                paymentNameEncrypted: 'hJeWd9A2ChT7TZFGC69cOA==',
                account: '234567-******',
                accountEncrypted: 'bTWQ1YqQirFqDPfzjd7Wsw==',
                card: '5678-56**-****-***8',
                cardEncrypted: 'lueNK0XRN4XwJpU5Xp+yzE2Se/0AynYhEHXUYt6EgWs=',
                invoiceType: '이메일',
                invoiceNumber: 'c***@kt.com',
                invoiceNumberEncrypted: 'FGRNeGS3oPtg/GIVrvMf8A==',
                invoiceAddress: '고객정보보호',
                invoiceAddressEncrypted:
                  'Jun3E9Wu4/hAUKrvwf7FmEp9wVpakfHOGQl3wzWEU4LBxa4wg5a/NsB6B+g+aNdi',
                recipient: '최부*',
                recipientEncrypted: 'hJeWd9A2ChT7TZFGC69cOA==',
                paymentDate: '10일',
              },
            },
          ],
        },
      },
    });
  }
}
