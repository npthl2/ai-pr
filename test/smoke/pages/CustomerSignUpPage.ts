/// <reference types="cypress" />

class CustomerSignUpPage {
    constructor() {}
    // 공통
    typeInputComponent(componentName: string, value: string) {
        cy.get(`[data-testid="${componentName}"] input`).clear().type(value);
    }

    typeComponent(componentName: string, value: string) {
        cy.get(`[data-testid="${componentName}"]`).type(value);
    }

    clickComponent(componentName: string) {
        cy.get(`[data-testid="${componentName}"]`).click();
    }

    checkInputComponent(componentName: string) {
        cy.get(`[data-testid="${componentName}"] input`).check({ force: true });
    }

    checkComponent(componentName: string) {
        cy.get(`[data-testid="${componentName}"]`).check({ force: true });
    }

    //홈 이동
    visit() {
        cy.visit('/');
    }

    expectNewSubscriptionTabToBeVisible() {
        cy.get('[data-testid="customer-tab-NEW_SUBSCRIPTION0"]').should('be.visible');
    }

    // 고객정보 영역

    // 청구정보 영역
    expectInvoiceSectionToBeVisible() {
        cy.get('[data-testid="NEW_SUBSCRIPTION0-section-invoice"]').should('be.visible');
    }

    typeInvoiceAddressInput(address: string) {
        cy.get('[data-testid="invoice-address-input"] input')
          .then(($input) => {
            // disabled 속성 제거
            $input.prop('disabled', false);
            // aria-disabled 속성도 제거
            $input.attr('aria-disabled', 'false');
          })
          .type(address);
        cy.get('[data-testid="invoice-address-input"] input').type(address);
    }

    expectInvoiceSummaryRecipientInputToBeInputValue(value: string) {
        cy.get('[data-testid="invoice-summary-recipient-input"]')
          .should('have.text', value);
    }

    expectInvoiceSummaryPaymentMethodInputToBeInputValue(value: string) {
        cy.get('[data-testid="invoice-summary-payment-method-input"]')
          .should('have.text', value);
    }

    // 판매정보 영역
    expectSalesSummarySalesDepartmentInputToBeInputValue(value: string) {
        cy.get('[data-testid="sales-summary-sales-department-input"]')
          .should('have.text', value);
    }

    // 가입정보 영역
    expectContractSummaryInputToBeSelectedService() {
        cy.get('[data-testid="service-search-text-field"] input').then(($input) => {
            cy.get('[data-testid="contract-summary-service-input"]')
                .should('have.text', $input.val());
        });
    }

    // 단말기 결재 정보 영역
    setDevicePaymentInfo() {
        cy.get('[data-testid="device-payment-modal-installment-device-sales-price"]')
        .invoke('text')
        .as('deviceSalesPrice');

        cy.get('[data-testid="device-payment-modal-installment-discount-price"]')
        .invoke('text')
        .as('discountPrice');

        cy.get('[data-testid="device-payment-modal-installment-installment-total-amount"]')
        .invoke('text')
        .as('installmentPrice');

        cy.get('[data-testid="device-payment-modal-installment-installment-total-amount"]')
        .invoke('text')
        .as('installmentPrice');

        cy.get('[data-testid="device-payment-modal-installment-installment-fee"]')
        .invoke('text')
        .as('installmentFee');

        cy.get('[data-testid="device-payment-modal-installment-total-price"]')
        .invoke('text')
        .as('totalPrice');

        cy.get('[data-testid="device-payment-modal-installment-monthly-payment-price"]')
        .invoke('text')
        .as('monthlyPrice');
    }

    expectDeviceSummarySalesPriceToBe() {
        cy.get('@deviceSalesPrice').then((deviceSalesPrice) => {
            const trimedText = deviceSalesPrice.toString().replace(/\s+/g, '');
            cy.get('[data-testid="device-summary-sales-price"]')
                .should('have.text', trimedText);
        });

        cy.get('@discountPrice').then((discountPrice) => {
            const trimedText = discountPrice.toString().replace(/\s+/g, '');
            cy.get('[data-testid="device-summary-discount-price"]')
                .should('have.text', trimedText);
        });

        cy.get('@installmentPrice').then((installmentPrice) => {
            const trimedText = installmentPrice.toString().replace(/\s+/g, '');
            cy.get('[data-testid="device-summary-installment-price"]')
                .should('have.text', trimedText);
        });

        cy.get('@installmentFee').then((installmentFee) => {
            const trimedText = installmentFee.toString().replace(/\s+/g, '');
            cy.get('[data-testid="device-summary-installment-fee"]')
                .should('have.text', trimedText);
        });

        cy.get('@totalPrice').then((totalPrice) => {
            const trimedText = totalPrice.toString().replace(/\s+/g, '');
            cy.get('[data-testid="device-summary-total-price"]')
                .should('have.text', trimedText);
        });

        cy.get('@monthlyPrice').then((monthlyPrice) => {
            const trimedText = monthlyPrice.toString().replace(/\s+/g, '');
            cy.get('[data-testid="device-summary-monthly-payment-price"]')
                .should('have.text', trimedText);
        });
    }

    // 가입 결과 영역
    assertRegistrationPending() {
        cy.get('[data-testid="status-message"]')
          .contains('고객님의 가입이 처리중입니다.')
          .should('be.visible');
      }

}

export default CustomerSignUpPage;