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

class BoardServiceMock {
	// 게시글 목록 조회 성공 mock설정
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

	// 게시글 등록 성공 mock설정
	successWhenRegistBoard(){
        cy.intercept('POST', '**/v1/board', {
            statusCode: 200,
            body: {
                successOrNot: 'Y',
                statusCode: 'SUCCESS',
            }
        })
    }
}
export default BoardServiceMock;