/// <reference types="cypress" />

class ModificationRequestPage {
  constructor() {}

  assertRegistrationPending() {
    cy.get('[data-testid="modification-status-message"]')
      .contains('고객님의 상품 변경이 처리중입니다.')
      .should('be.visible');
  }

  assertTotalPriceInfoVisible(beforePrice: number, afterPrice: number) {
    cy.get('[data-testid="total-before-price"]')
      .contains(beforePrice.toLocaleString())
      .should('be.visible');

    cy.get('[data-testid="total-after-price"]')
      .contains(afterPrice.toLocaleString())
      .should('be.visible');
  }

  assertPriceDifferenceVisible(beforePrice: number, afterPrice: number) {
    const priceDifference = afterPrice - beforePrice;
    const formattedPriceDifference =
      priceDifference > 0
        ? `+${priceDifference.toLocaleString()}`
        : priceDifference.toLocaleString();

    cy.get('[data-testid="price-difference"]')
      .contains(formattedPriceDifference)
      .should('be.visible');
  }

  assertBeforeServiceInfoVisible(serviceName: string, serviceValue: number) {
    cy.get('[data-testid="before-services-name"]').contains(serviceName).should('be.visible');

    cy.get('[data-testid="before-services-value"]')
      .contains(serviceValue.toLocaleString())
      .should('be.visible');
  }

  assertAfterServiceInfoVisible(serviceName: string, serviceValue: number) {
    cy.get('[data-testid="after-services-name"]').contains(serviceName).should('be.visible');

    cy.get('[data-testid="after-services-value"]')
      .contains(serviceValue.toLocaleString())
      .should('be.visible');
  }

  assertBeforeAdditionalServicesVisible(
    additionalServices: { serviceName: string; serviceValue: number }[],
  ) {
    cy.get('[data-testid="before-services-additional-service-list"]').within(() => {
      additionalServices.forEach((service) => {
        cy.get('tr')
          .contains(service.serviceName)
          .parent()
          .within(() => {
            cy.contains(service.serviceValue.toLocaleString()).should('exist');
          });
      });
    });
  }

  assertAfterAdditionalServicesVisible(
    additionalServices: { serviceName: string; serviceValue: number }[],
  ) {
    cy.get('[data-testid="after-services-additional-service-list"]').within(() => {
      additionalServices.forEach((service) => {
        cy.get('tr')
          .contains(service.serviceName)
          .parent()
          .within(() => {
            cy.contains(service.serviceValue.toLocaleString()).should('exist');
          });
      });
    });
  }

  assertSuccessStatusVisible() {
    cy.get('[data-testid="modification-status-message"]')
      .contains(`상품 변경이 처리 완료되었습니다.`)
      .should('be.visible');
  }

  // 실패 상태 확인
  assertFailStatusVisible() {
    cy.get('[data-testid="modification-status-message"]')
      .contains(`상품 변경을 실패하였습니다.`)
      .should('be.visible');
  }

  // 홈으로 이동 버튼 클릭 시 LNB와 MDI가 닫히고 홈 화면으로 이동하는지 확인
  assertHomeButtonRedirectsAndClosesMenus() {
    // 홈으로 이동 버튼 클릭
    cy.get('[data-testid="go-home-button-in-modify-service"]').click();

    // 홈 화면으로 이동했는지 확인
    cy.get('[data-testid="home-content"]').should('be.visible');

    // LNB가 닫혔는지 확인
    cy.get('[data-testid="menu-list"]').should('not.exist');
    cy.get('[data-testid="bookmarks-list"]').should('not.exist');

    // MDI가 닫혔는지 확인
    cy.get('button[id*="NEW_SUBSCRIPTION"]').should('not.exist');
    cy.get('button[id*="CUSTOMER_SEARCH"]').should('not.exist');
    cy.get('button[id*="SERVICE_MODIFICATION"]').should('not.exist');
  }
}

export default ModificationRequestPage;
