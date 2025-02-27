/// <reference types="cypress" />

import LoginServiceMock from '../../module/mock/login/LoginServiceMock';
import LoginPage from '../login/LoginPage';
import { amber } from '@mui/material/colors';

class LayoutPage {
  constructor() {}

  visit() {
    cy.visit('/');
    const page = new LoginPage();
    const service = new LoginServiceMock();
    page.inputId('admin');
    page.inputPw('1234');
    service.successWhenLogin();
    page.clickLoginButton();
  }

  clickHomeButton() {
    cy.get('[data-testid="home-button"]').click();
  }

  clickMenuButton() {
    cy.get('[data-testid="menu-button"]').click();
  }

  clickBookmarkButton() {
    cy.get('[data-testid="bookmarks-button"]').click();
  }

  clickFloatingButton() {
    cy.get('[data-testid="floating-button"]').click();
  }

  toggleBookmarkForMenuItem(menuName: string) {
    cy.get(
      `[data-testid="menu-item-${menuName}"] [data-testid="bookmark-button-${menuName}"]`,
    ).click();
  }

  expectHomeButtonToBeVisible() {
    cy.get('[data-testid="home-button"]').should('be.visible');
  }

  expectMenuButtonToBeVisible() {
    cy.get('[data-testid="menu-button"]').should('be.visible');
  }

  expectBookmarkButtonToBeVisible() {
    cy.get('[data-testid="bookmarks-button"]').should('be.visible');
  }

  expectFloatingButtonToBeVisible() {
    cy.get('[data-testid="floating-button"]').should('be.visible');
  }

  expectMenuListToBeVisible() {
    cy.get('[data-testid="menu-list"]').should('be.visible');
  }

  expectBookmarkListToBeVisible() {
    cy.get('[data-testid="bookmarks-list"]').should('be.visible');
  }

  expectHistoryAreaToBeVisible() {
    cy.get('[data-testid="history-area"]').should('be.visible');
  }

  expectHistoryAreaNotToBeVisible() {
    cy.get('[data-testid="history-area"]').should('not.be.visible');
  }

  expectMenuItemToBeBookmarked(menuName: string) {
    cy.get(`[data-testid="bookmark-button-${menuName}"] svg g path`).should(
      'have.css',
      'fill',
      'none',
    );
  }

  expectMenuItemNotToBeBookmarked(menuName: string) {
    cy.get(`[data-testid="bookmark-button-${menuName}"] svg g path`).should(
      'not.have.css',
      'fill',
      'none',
    );
  }
}

export default LayoutPage;
