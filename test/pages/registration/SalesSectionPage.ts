class SalesSectionPage {
  constructor() {}

  // 공통
  assertComponentToBeVisible(componentName: string) {
    cy.wait(3000);
    cy.get(`[data-testid="${componentName}"]`).should('be.visible');
  }

  assertComponentToBeInvisible(componentName: string) {
    cy.wait(3000);
    cy.get(`[data-testid="${componentName}"]`).should('be.invisible');
  }

  //before
  visit() {
    cy.visit('/');
  }

  clickMenuButton() {
    cy.get('[data-testid="menu-button"]').click();
  }

  clickCustomerSectionButton(menuName: string) {
    cy.get(`[data-testid="menu-item-${menuName}"]`).click();
  }

  assertSalesSectionToBeExpanded() {
    cy.get('[data-testid="NEW_SUBSCRIPTION0-section-sales"]').should('be.visible');
  }

  isFocusedOnSalesDepartmentInput() {
    cy.get('[data-testid="sales-department-input"] input').should('be.focused');
  }

  typeSalesDepartmentInput(value: string) {
    cy.get('[data-testid="sales-department-input"] input').type(value);
  }

  typeSalesDepartmentInputFull(value: string) {
    cy.get('[data-testid="sales-department-input"] input').focus();
    cy.get('[data-testid="sales-department-input"] input').clear();
    cy.get('[data-testid="sales-department-input"] input').blur();
  }

  assertSalesDepartmentEmptyInputError() {
    cy.get('[data-testid="sales-department-input"]')
      .parent()
      .find('.MuiFormHelperText-root')
      .should('contain', '가입대리점을 입력해 주세요');
  }

  assertContractSectionToBeExpanded() {
    cy.get('[data-testid="NEW_SUBSCRIPTION0-section-contract"]').should('be.visible');
  }

  typeSalesComponentInputSuccess(componentName: string) {
    cy.get(`[data-testid="${componentName}"] input`).focus();
    cy.get(`[data-testid="${componentName}"] input`).type('test');
    cy.get(`[data-testid="${componentName}"] input`).blur();
  }

  typeSalesComponentInputOver10(componentName: string) {
    cy.get(`[data-testid="${componentName}"] input`).focus();
    cy.get(`[data-testid="${componentName}"] input`).type('testtesttest');
    cy.get(`[data-testid="${componentName}"] input`).should('have.attr', 'aria-invalid');
    cy.get(`[data-testid="${componentName}"] input`).blur();
  }

  assertSalesComponentInputOver10Error(componentName: string) {
    cy.get(`[data-testid="${componentName}"] input`).should('have.attr', 'aria-invalid');
  }
}

export default SalesSectionPage;
