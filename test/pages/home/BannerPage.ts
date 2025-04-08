/// <reference types="cypress" />
class BannerPage {
  visitHome() {
    cy.visit('/');
  }

  getPromotionBanner() {
    return cy.get('[data-testid="promotion-banner"]');
  }

  getPromotionDialog() {
    return cy.get('[data-testid="promotion-dialog"]');
  }

  getPromotionDialogCloseButton() {
    return cy.get('[data-testid="component-dialog-close-button"]');
  }

  getNewServicesSlider() {
    return cy.get('[data-testid="new-services-slider"]');
  }

  getNewServicesSliderImage(index: number) {
    return cy.get(`[data-testid="new-services-slider-image-${index}"]`);
  }

  getNewServicesSliderDot(index: number) {
    return cy.get(`[data-testid="new-services-slider-dot-${index}"]`);
  }
}

export default BannerPage;
