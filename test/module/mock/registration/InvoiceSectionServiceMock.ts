/// <reference types="cypress" />

const emptyInvoiceList = [];
const invoice = {
  invoiceId: 'A-7000000000',
  customerId: 'C-0012345678',
  billingType: '일반',
  recipient: '홍길동',
  invoiceType: '이메일',
  invoiceEmail: 'hong@example.com',
  invoicePostalCode: '12345',
  invoiceAddress: '서울특별시 강남구 테헤란로 123',
  invoiceAddressDetail: '빌딩 101호',
  paymentMethod: '카드',
  cardCompany: '신한카드',
  cardNumber: '1234123412341234',
  paymentDate: '매월말일',
  paymentName: '홍길동',
  birthDate: '900101',
};
const invoiceList = [invoice];

class InvoiceSectionServiceMock {
  successWhenSaveInvoice() {
    cy.intercept('POST', '**/v1/invoice', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: invoice,
      },
    });
  }

  successWhenGetEmptyInvoiceList() {
    cy.intercept('GET', '**/v1/invoice/**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: emptyInvoiceList,
      },
    }).as('getEmptyInvoiceList');
  }

  successWhenGetInvoiceList() {
    cy.intercept('GET', '**/v1/invoice/**', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: invoiceList,
      },
    }).as('getInvoiceList');
  }
}

export default InvoiceSectionServiceMock;
