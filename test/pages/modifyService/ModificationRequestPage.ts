/// <reference types="cypress" />

class ModificationRequestPage {
  constructor() {}

  // 상품 변경정보 요약 페이지 방문
  assertRegistrationPending() {
    cy.get('[data-testid="modification-status-message"]')
      .contains('고객님의 상품 변경이 처리중입니다.')
      .should('be.visible');
  }

  // 상품 변경정보 요약 화면이 렌더링 됐는지 확인
  assertModificationRequestPageVisible() {
    cy.get('[data-testid="modification-request-container"]').should('be.visible');
  }

  // 안내 문구와 함께 마스킹된 이름이 보이는지 확인
  assertModificationStatusMessageVisible() {
    cy.get('[data-testid="modification-status-message"]').should('be.visible');
  }

  // 성공 상태 확인
  assertSuccessStatusVisible(customerName: string) {
    cy.get('[data-testid="modification-status-message"]')
      .contains(`${customerName}님의 상품 변경이 완료되었습니다.`)
      .should('be.visible');
    cy.get('[data-testid="modification-status-success-icon"]').should('be.visible');
  }

  // 실패 상태 확인
  assertFailStatusVisible(customerName: string, reason: string) {
    cy.get('[data-testid="modification-status-message"]')
      .contains(`${customerName}님의 상품 변경 처리에 실패했습니다.`)
      .should('be.visible');
    cy.get('[data-testid="modification-status-fail-reason"]')
      .contains(reason)
      .should('be.visible');
    cy.get('[data-testid="modification-status-fail-icon"]').should('be.visible');
  }

  // 제목이 표시되는지 확인
  assertPageTitleVisible() {
    cy.get('[data-testid="page-title"]')
      .contains('상품 변경정보 요약')
      .should('be.visible');
  }

  // 변경 전/후 가격 정보 확인
  assertTotalPriceInfoVisible(beforePrice: number, afterPrice: number) {
    // 변경 전 금액 확인
    cy.get('[data-testid="total-before-price"]')
      .contains(beforePrice.toLocaleString())
      .should('be.visible');
    
    // 변경 후 금액 확인
    cy.get('[data-testid="total-after-price"]')
      .contains(afterPrice.toLocaleString())
      .should('be.visible');
    
    // 증감액 확인
    const priceDifference = afterPrice - beforePrice;
    const formattedPriceDifference = priceDifference > 0 
      ? `+${priceDifference.toLocaleString()}`
      : priceDifference.toLocaleString();
    
    cy.get('[data-testid="price-difference"]')
      .contains(formattedPriceDifference)
      .should('be.visible');
  }

  // 변경 전 서비스 정보 확인
  assertBeforeServiceInfoVisible(serviceName: string, serviceValue: number) {
    cy.get('[data-testid="before-service-info"]')
      .contains(serviceName)
      .should('be.visible');
    
    cy.get('[data-testid="before-service-value"]')
      .contains(serviceValue.toLocaleString())
      .should('be.visible');
  }

  // 변경 후 서비스 정보 확인
  assertAfterServiceInfoVisible(serviceName: string, serviceValue: number) {
    cy.get('[data-testid="after-service-info"]')
      .contains(serviceName)
      .should('be.visible');
    
    cy.get('[data-testid="after-service-value"]')
      .contains(serviceValue.toLocaleString())
      .should('be.visible');
  }

  // 변경 전 부가서비스 정보 확인
  assertBeforeAdditionalServicesVisible(additionalServices: { serviceName: string, serviceValue: number }[]) {
    cy.get('[data-testid="before-additional-services"]').should('be.visible');
    
    additionalServices.forEach(service => {
      cy.get('[data-testid="before-additional-services"]')
        .contains(service.serviceName)
        .should('be.visible');
      
      cy.get('[data-testid="before-additional-services"]')
        .contains(service.serviceValue.toLocaleString())
        .should('be.visible');
    });
  }

  // 변경 후 부가서비스 정보 확인
  assertAfterAdditionalServicesVisible(additionalServices: { serviceName: string, serviceValue: number }[]) {
    cy.get('[data-testid="after-additional-services"]').should('be.visible');
    
    additionalServices.forEach(service => {
      cy.get('[data-testid="after-additional-services"]')
        .contains(service.serviceName)
        .should('be.visible');
      
      cy.get('[data-testid="after-additional-services"]')
        .contains(service.serviceValue.toLocaleString())
        .should('be.visible');
    });
  }

  // 홈으로 이동 버튼 클릭
  clickGoHomeButton() {
    cy.get('[data-testid="go-home-button"]').click();
  }

  // 홈 화면으로 이동했는지 확인
  assertRedirectedToHome() {
    cy.url().should('include', '/home');
  }

  // 모든 탭이 닫혔는지 확인
  assertAllTabsClosed() {
    cy.get('[data-testid="customer-tab"]').should('not.exist');
    cy.get('[data-testid="modify-service-tab"]').should('not.exist');
  }
}

export default ModificationRequestPage;
