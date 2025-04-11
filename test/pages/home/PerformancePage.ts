/// <reference types="cypress" />
class PerformancePage {
  visitHome() {
    cy.visit('/');
  }

  getTodayNewRegistrationBox() {
    return cy.get('[data-testid="오늘 가입 건수-box"]');
  }

  getTodayNewRegistrationCount() {
    return cy.get('[data-testid="오늘 가입 건수-count"]');
  }

  getThisWeekNewRegistrationBox() {
    return cy.get('[data-testid="이번주 가입 건수-box"]');
  }

  getThisWeekNewRegistrationCount() {
    return cy.get('[data-testid="이번주 가입 건수-count"]');
  }

  getMonthlyChart() {
    return cy.get('[data-testid="monthly-chart"]');
  }

  getMonthlyChartTooltip() {
    return cy.get('[data-testid="monthly-chart-tooltip"]');
  }

  getMonthlyChartHoverTooltip() {
    return cy.get('[data-testid="monthly-chart-hover-tooltip"]');
  }
}

export default PerformancePage;
