/// <reference types="cypress" />

export class PerformanceServiceMock {
  homeBookmark() {
    cy.intercept('GET', '**/v1/member/bookmark', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          memberId: '0',
          bookmarks: [],
        },
      },
    });
  }

  getRegistrationStatus() {
    cy.intercept('GET', '**/v1/registration-common/status', {
      statusCode: 200,
      body: { successOrNot: 'N', statusCode: 'FAIL', data: '회원 정보를 찾을 수 없습니다.' },
    });
  }

  getDailyWeeklyContractCount() {
    cy.intercept('GET', '**/v1/dashboard/statistics/contracts/daily-weekly', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: {
          today: '2025-04-08',
          contractCountToday: 10,
          weekStart: '2025-04-07',
          weekEnd: '2025-04-13',
          contractCountThisWeek: 15,
        },
      },
    });
  }

  getMonthlyContractCountIncrease() {
    cy.intercept('GET', '**/v1/dashboard/statistics/contracts/monthly', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: [
          {
            month: '2024-05',
            monthName: 'May',
            count: 7,
          },
          {
            month: '2024-06',
            monthName: 'Jun',
            count: 5,
          },
          {
            month: '2024-07',
            monthName: 'Jul',
            count: 4,
          },
          {
            month: '2024-08',
            monthName: 'Aug',
            count: 4,
          },
          {
            month: '2024-09',
            monthName: 'Sep',
            count: 4,
          },
          {
            month: '2024-10',
            monthName: 'Oct',
            count: 3,
          },
          {
            month: '2024-11',
            monthName: 'Nov',
            count: 4,
          },
          {
            month: '2024-12',
            monthName: 'Dec',
            count: 3,
          },
          {
            month: '2025-01',
            monthName: 'Jan',
            count: 3,
          },
          {
            month: '2025-02',
            monthName: 'Feb',
            count: 4,
          },
          {
            month: '2025-03',
            monthName: 'Mar',
            count: 11,
          },
          {
            month: '2025-04',
            monthName: 'Apr',
            count: 15,
          },
        ],
      },
    });
  }

  getMonthlyContractCountEqual() {
    cy.intercept('GET', '**/v1/dashboard/statistics/contracts/monthly', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: [
          {
            month: '2024-05',
            monthName: 'May',
            count: 7,
          },
          {
            month: '2024-06',
            monthName: 'Jun',
            count: 5,
          },
          {
            month: '2024-07',
            monthName: 'Jul',
            count: 4,
          },
          {
            month: '2024-08',
            monthName: 'Aug',
            count: 4,
          },
          {
            month: '2024-09',
            monthName: 'Sep',
            count: 3,
          },
          {
            month: '2024-10',
            monthName: 'Oct',
            count: 4,
          },
          {
            month: '2024-11',
            monthName: 'Nov',
            count: 4,
          },
          {
            month: '2024-12',
            monthName: 'Dec',
            count: 3,
          },
          {
            month: '2025-01',
            monthName: 'Jan',
            count: 3,
          },
          {
            month: '2025-02',
            monthName: 'Feb',
            count: 3,
          },
          {
            month: '2025-03',
            monthName: 'Mar',
            count: 8,
          },
          {
            month: '2025-04',
            monthName: 'Apr',
            count: 8,
          },
        ],
      },
    });
  }

  getMonthlyContractCountDecrease() {
    cy.intercept('GET', '**/v1/dashboard/statistics/contracts/monthly', {
      statusCode: 200,
      body: {
        successOrNot: 'Y',
        statusCode: 'SUCCESS',
        data: [
          {
            month: '2024-05',
            monthName: 'May',
            count: 6,
          },
          {
            month: '2024-06',
            monthName: 'Jun',
            count: 4,
          },
          {
            month: '2024-07',
            monthName: 'Jul',
            count: 4,
          },
          {
            month: '2024-08',
            monthName: 'Aug',
            count: 4,
          },
          {
            month: '2024-09',
            monthName: 'Sep',
            count: 4,
          },
          {
            month: '2024-10',
            monthName: 'Oct',
            count: 4,
          },
          {
            month: '2024-11',
            monthName: 'Nov',
            count: 3,
          },
          {
            month: '2024-12',
            monthName: 'Dec',
            count: 4,
          },
          {
            month: '2025-01',
            monthName: 'Jan',
            count: 4,
          },
          {
            month: '2025-02',
            monthName: 'Feb',
            count: 3,
          },
          {
            month: '2025-03',
            monthName: 'Mar',
            count: 12,
          },
          {
            month: '2025-04',
            monthName: 'Apr',
            count: 6,
          },
        ],
      },
    });
  }
}
