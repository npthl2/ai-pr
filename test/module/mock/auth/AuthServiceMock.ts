/// <reference types="cypress" />

export const successLoginResponse = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    accessToken: 'mocked-access-token',
    member: {
      memberId: 'S-0001',
      memberName: '김대리점', // UI에 표시될 이름
      classOfPosition: '대리', // UI에 표시될 직급
      memberGroup: '대리점',
    },
    authorities: ['ROLE_SEARCH_TEL_NO', 'ROLE_UNMASKING'],
  },
};

export const getBookmark = {
  successOrNot: 'Y',
  statusCode: 'SUCCESS',
  data: {
    memberId: 'S-0001',
    bookmarks: ['NEW_SUBSCRIPTION'],
  },
};

export const failLoginResponse = {
  successOrNot: 'N',
  statusCode: 'FAIL',
  data: {
    errorMessage: '로그인 계정 정보가 올바르지 않습니다.',
  },
};

export class AuthServiceMock {
  // 로그인 성공 Mock
  successWhenLogin() {
    cy.intercept('POST', '**/v1/auth/login', {
      statusCode: 200,
      body: successLoginResponse,
    });
  }

  getBookmark() {
    cy.intercept('GET', '**/v1/member/bookmark', {
      statusCode: 200,
      body: getBookmark,
    });
  }

  // 로그인 실패 Mock (200 응답이지만 실패 데이터 반환)
  failWhenLogin() {
    cy.intercept('POST', '**/v1/auth/login', {
      statusCode: 200,
      body: failLoginResponse,
    });
  }

  // 로그아웃 실패 Mock (200 응답이지만 실패 데이터 반환)
  successWhenLogout() {
    cy.intercept('POST', '**/v1/auth/logout', {
      statusCode: 200,
      body: { successOrNot: 'Y', statusCode: 'SUCCESS' },
    }).as('logoutRequest');
  }

  // 동시 로그인 시 로그아웃
  forceLogoutWhenConflict() {
    cy.intercept('GET', '**/v1/contracts/today', {
      statusCode: 403,
      body: {
        errorCode: 'CMN_SEC_LOGIN_ANOTHER_USER',
        errorMessage: 'Login to another user',
      },
    }).as('forceLogoutWhenConflict');
  }
}

export default AuthServiceMock;
