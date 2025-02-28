/// <reference types="cypress" />

export const successLoginResponse = {
    successOrNot: 'Y',
    statusCode: 'SUCCESS',
    data: {
        accessToken: 'mocked-access-token',
        memberInfo: {
            memberId: 'S-0001',
            memberName: '김콜센터',  // UI에 표시될 이름
            classOfPosition: '대리',  // UI에 표시될 직급
            memberGroup: '콜센터',
            authorities: [ "ROLE_SEARCH_TEL_NO", "ROLE_UNMASKING" ]
        }
    }
};

const getBookmark = {
    successOrNot: 'Y',
    statusCode: 'SUCCESS',
    data: {
        memberId: 'S-0001',
        bookmarks: ['NEW_SUBSCRIPTION'],
    }
};

const failLoginResponse = {
    successOrNot: 'N',
    statusCode: 'FAIL',
    data: {
        errorMessage: '아이디 또는 비밀번호가 일치하지 않습니다.'
    }
};

export class AuthServiceMock {
    // 로그인 성공 Mock
    successWhenLogin() {
        cy.intercept('GET', '**/v1/auth/login', {
            statusCode: 200,
            body: successLoginResponse
        });
    }

    getBookmark() {
        cy.intercept('GET', '**/v1/member/bookmark', {
            statusCode: 200,
            body: getBookmark
        });
    }

    // 로그인 실패 Mock (200 응답이지만 실패 데이터 반환)
    failWhenLogin() {
        cy.intercept('POST', '**/v1/auth/login', {
            statusCode: 200,
            body: failLoginResponse
        });
    }
}

export default AuthServiceMock;
