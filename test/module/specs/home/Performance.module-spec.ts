import { mockMemberStore } from '../../../support/helpers/mockMemberStore';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';

import { PerformanceServiceMock } from '../../mock/home/PerformanceServiceMock';
import PerformancePage from '../../../pages/home/PerformancePage';

describe('[KAN-327-3] 내 실적', () => {
  const performanceServiceMock = new PerformanceServiceMock();

  const performancePage = new PerformancePage();

  beforeEach(() => {
    performanceServiceMock.homeBookmark();
    performanceServiceMock.getDailyWeeklyContractCount();
  });
  before(() => {
    mockAuthStore({
      isAuthenticated: true,
    });
    mockMemberStore({
      isAuthenticated: true,
      memberInfo: {
        memberId: 'user1',
        memberName: 'user1',
        authorities: ['ROLE_SEARCH_TEL_NO', 'ROLE_UNMASKING'],
      },
    });
  });

  it('[KAN-327-3-1] Home화면에서 내실적의 오늘 가입건수가 보여야한다', () => {
    performancePage.visitHome();
    performanceServiceMock.getDailyWeeklyContractCount();
    performancePage.getTodayNewRegistrationBox().should('be.visible');
    performancePage
      .getTodayNewRegistrationCount()
      .invoke('text')
      .then((value) => {
        expect(value).to.be.equal('10건');
      });
  });

  it('[KAN-327-3-2] Home화면에서 내실적의 이번주 가입건수가 보여야한다', () => {
    performancePage.getThisWeekNewRegistrationBox().should('be.visible');
    performancePage
      .getThisWeekNewRegistrationCount()
      .invoke('text')
      .then((value) => {
        expect(value).to.be.equal('15건');
      });
  });

  it('[KAN-327-3-3] Home화면에서 월별 실적 추이 차트가 보여야한다', () => {
    performanceServiceMock.getMonthlyContractCountIncrease();
    performancePage.getMonthlyChart().should('be.visible');
  });

  it('[KAN-327-3-4] 월별 실적 추이 차트(이번달 > 지난달) 툴팁 메세지가 보여야한다', () => {
    performanceServiceMock.getMonthlyContractCountIncrease();
    performancePage
      .getMonthlyChartTooltip()
      .should('be.visible')
      .and('have.text', '지난달 보다 실적 건수가 많아졌네요! 이번달도 화이팅:)');
  });

  it('[KAN-327-3-5] 월별 실적 추이 차트(이번달 = 지난달) 툴팁 메세지가 보여야한다', () => {
    performanceServiceMock.getMonthlyContractCountEqual();
    performancePage.visitHome();
    performancePage
      .getMonthlyChartTooltip()
      .should('be.visible')
      .and('have.text', '계속해서 좋은 실적 기대할게요. 화이팅:)');
  });

  it('[KAN-327-3-6] 월별 실적 추이 차트(이번달 < 지난달) 툴팁 메세지가 보여야한다', () => {
    performanceServiceMock.getMonthlyContractCountDecrease();
    performancePage.visitHome();
    performancePage
      .getMonthlyChartTooltip()
      .should('be.visible')
      .and('have.text', '이번달 실적 건수가 조금 아쉽네요. 끝까지 화이팅:)');
  });

  it('[KAN-327-3-7] 월별 실적 추이 차트 마우스 hover 시 툴팁 메세지가 보여야한다', () => {
    performancePage.getMonthlyChart().trigger('mouseover');
    performancePage.getMonthlyChartHoverTooltip().should('be.visible');
  });
});
