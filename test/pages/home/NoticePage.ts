/// <reference types="cypress" />

class NoticePage {
  constructor() {}

  visit() {
    cy.visit('/');
  }

  // 사용자 정보와 환영 메시지 확인
  verifyUserInfoAndWelcome() {
    cy.get('[data-testid="welcome-message"]')
      .should('be.visible')
      .and('contain', '오늘도 좋은 하루 보내세요');
    cy.get('[data-testid="user-name"]').should('be.visible');
  }

  // 공지사항 기본 정보 확인
  verifyNoticeBasicInfo() {
    cy.get('[data-testid="notice-category"]').should('be.visible');
    cy.get('[data-testid="notice-title"]').should('be.visible');
    cy.get('[data-testid="notice-date"]').should('be.visible');
  }

  // 공지사항 모달 열기
  openNoticeModal() {
    cy.get('[data-testid="notice-container"]').click();
  }

  // 공지사항 목록 확인
  verifyNoticeList() {
    cy.get('[data-testid="notice-list"]').should('be.visible');
  }

  verifyNoticeItem(noticeId: number) {
    cy.get(`[data-testid="notice-${noticeId}"]`).should('be.visible');
    cy.get(`[data-testid="notice-${noticeId}"] [data-testid="notice-category"]`).should(
      'be.visible',
    );
    cy.get(`[data-testid="notice-${noticeId}"] [data-testid="notice-title"]`).should('be.visible');
    cy.get(`[data-testid="notice-${noticeId}"] [data-testid="notice-date"]`).should('be.visible');
  }

  // 공지사항 아코디언 클릭 및 내용 확인
  clickAndVerifyNoticeContent(index = 0) {
    cy.get(`[data-testid="notice-${index}"]`).click();
    cy.get(`[data-testid="notice-${index}"] [data-testid="notice-content"]`).should('be.visible');
  }

  // 카테고리로 검색
  searchByCategory(category: string) {
    cy.get('[data-testid="category-select"]').click();
    cy.get(`[data-value="${category}"]`).click();
  }

  // 키워드로 검색
  searchByKeyword(keyword: string) {
    cy.get('[data-testid="search-input"]').clear().type(keyword);
    cy.get('[data-testid="search-button"]').click();
  }

  // 카테고리와 키워드로 검색
  searchByCategoryAndKeyword(category: string, keyword: string) {
    this.searchByCategory(category);
    this.searchByKeyword(keyword);
  }

  // 검색 결과 확인
  verifySearchResults(expectedText: string) {
    cy.get('[data-testid="notice-list"]').should('contain', expectedText);
  }

  // 검색 결과 없음 확인
  verifyNoResults() {
    cy.get('[data-testid="no-results"]')
      .should('be.visible')
      .and('contain', '조회 결과가 없습니다.');
  }
}

export default NoticePage;
