/// <reference types="cypress" />

const boardList = [
	{
		id: 1,
		title: '첫 번째 게시글',
		content: '이것은 첫 번째 게시글의 내용입니다.',
		createdAt: '2025-02-01',
	},
	{
		id: 2,
		title: '두 번째 게시글',
		content: '두 번째 게시글의 내용이 여기에 들어갑니다.',
		createdAt: '2025-02-02',
	},
	{
		id: 3,
		title: '세 번째 게시글',
		content: '세 번째 게시글에 대한 내용이 여기에 있습니다.',
		createdAt: '2025-02-03',
	},
	{
		id: 4,
		title: '네 번째 게시글',
		content: '네 번째 게시글의 내용이 여기에 들어가 있습니다.',
		createdAt: '2025-02-04',
	},
	{
		id: 5,
		title: '다섯 번째 게시글',
		content: '다섯 번째 게시글의 내용입니다. 여기에 다양한 정보가 포함될 수 있습니다.',
		createdAt: '2025-02-05',
	},
];

class LoginServiceMock {
    successWhenLogin(){
        cy.intercept('POST', '**/v1/session', {
            statusCode: 200,
            body: {
                successOrNot: 'Y',
                statusCode: 'SUCCESS',
                data: { admin: 'Y' }
            }
        })
    }

    successWhenGetBoardList(){
        cy.intercept('GET', '**/v1/board', {
            statusCode: 200,
            body: {
                successOrNot: 'Y',
                statusCode: 'SUCCESS',
                data: boardList
            }
        })
    }
}
export default LoginServiceMock;