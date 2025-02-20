/// <reference types="cypress" />

class BoardPage {
    constructor(){}

    // 게시글 화면 진입
    visitBoardPage(){
        cy.visit('/test/board')
    }

    // 게시글 목록 조회 확인
    assertBoardList(length: number){
      cy.get('[data-testid="boardItem"]').should('have.length', length);
    }

    // 게시글 등록 버튼 클릭
    clickRegistBoardButton(){
        cy.get('[data-testid="registBoard"]').click({force: true});
    }

    // 게시글 등록 폼 확인
    assertBoardRegistFormVisible(){
        cy.get('[data-testid="boardTitle"]').should('be.visible');
        cy.get('[data-testid="boardContent"]').should('be.visible');
        cy.get('[data-testid="boardRegistConfirm"]').should('be.visible');
    }

    // 게시글 제목 입력
    inputBoardTitle(text: string){
        cy.get('[data-testid="boardTitle"]').type(text);
    }

    // 게시글 내용 입력
    inputBoardContent(text: string){
        cy.get('[data-testid="boardContent"]').type(text);
    }

    // 게시글 등록 확인 버튼 클릭
    clickConfirmRegistBoardButton(){
        cy.get('[data-testid="boardRegistConfirm"]').click();
    }

  }
export default BoardPage;