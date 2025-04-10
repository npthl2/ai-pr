import SatisfactionSurveyPage from '../../../pages/home/SatisfactionSurveyPage';
import { mockAuthStore } from '../../../support/helpers/mockAuthStore';
import { mockMemberStore } from '../../../support/helpers/mockMemberStore';
import BookmarkServiceMock from '../../mock/bookmark/BookmarkServiceMock';
import SatisfactionSurveyServiceMock from '../../mock/home/SatisfactionSurveyServiceMock';
import RegistrationStatusServiceMock from '../../mock/registration/RegistrationStatusServiceMock';

describe('KAN-325 홈 화면 진입', () => {
  const page = new SatisfactionSurveyPage();
  const service = new SatisfactionSurveyServiceMock();
  const bookmarkService = new BookmarkServiceMock();
  const registrationStatusService = new RegistrationStatusServiceMock();
  before(() => {
    // 초기 셋업
    mockAuthStore();
    mockMemberStore({
      memberInfo: {
        memberId: 'user1',
        memberName: 'user1',
        authorities: ['ROLE_SEARCH_TEL_NO', 'ROLE_UNMASKING'],
      },
    });

    bookmarkService.successWhenGetBookmarkList();
    registrationStatusService.successWhenGetRegistrationStatus();
    service.successWhenGetSurveyResponse();

    // 페이지 진입
    page.visit();
  });

  it('KAN-325-1 시스템 만족도 조사 응답을 제출하지 않은 경우 참여전의 카드가 보이며 배너에 현재월이 표시된다', () => {
    // 참여전의 카드가 보이며 클릭이 가능한 상태이다
    page.expectSatisfactionSurveyCardToBeVisible();
    page.expectSatisfactionSurveyCardToHaveText('소중한 의견을 남겨주세요.');
    page.expectSatisfactionSurveyCardToHaveCurrentMonth();
    page.expectSatisfactionSurveyCardEnabled();
    // 현재의 월이 표시된다
    page.expectSatisfactionSurveyCardToHaveCurrentMonth();
  });

  it('KAN-325-2 시스템 만족도 참여 배너를 클릭했을 때 모달이 열리며 평가완료 버튼은 비활성화 상태이다', () => {
    // 카드를 클릭한다
    page.clickSatisfactionSurveyCard();
    // 모달이 열린다
    page.expectSatisfactionSurveyModalToBeOpened();
    // 입력 영역, 코멘트 입력 영역이 보인다
    page.expectRatingComponentToBeVisible();
    page.expectCommentFieldToBeVisible();
    // 평가완료 버튼은 비활성화 상태이다
    page.expectSubmitButtonToBeDisabled();
  });

  it('KAN-325-3 취소를 클릭했을 때 모달이 닫힌다', () => {
    // 취소 버튼을 클릭한다
    page.clickModalCloseButton();
    // 모달이 닫힌다
    page.expectSatisfactionSurveyModalToBeClosed();
  });

  it('KAN-325-4 시스템 만족도 조사 응답 모달의 외부영역을 클릭했을 때 모달이 닫힌다', () => {
    // 카드를 클릭한다
    page.clickSatisfactionSurveyCard();
    // 모달 외부영역을 클릭한다
    cy.get('body').click(10, 10);
    // 모달이 닫힌다
    page.expectSatisfactionSurveyModalToBeClosed();
  });

  it('KAN-325-5 점수적용을 위해 별을 클릭했을 때 클릭한 별 이전의 별까지 채워진다', () => {
    // 카드를 클릭한다
    page.clickSatisfactionSurveyCard();
    // 세번째 별을 클릭한다
    page.clickRatingStar(3);
    // 클릭한 별 이전의 별까지 채워진다
    page.expectRatingComponentToBeFilled(1);
    page.expectRatingComponentToBeFilled(2);
    page.expectRatingComponentToBeFilled(3);
    page.expectRatingComponentToBeEmpty(4);
    page.expectRatingComponentToBeEmpty(5);
  });

  it('KAN-325-6 코멘트를 입력했을 때 평가완료 버튼이 활성화된다', () => {
    // 코멘트를 입력한다
    page.typeCommentField('test');
    // 평가완료 버튼이 활성화된다
    page.expectSubmitButtonToBeEnabled();
  });

  it('KAN-325-7 평가완료 버튼을 클릭했을 때 화면이 닫히며 참여후의 카드가 보인다', () => {
    service.successWhenSaveSurveyResponse();
    service.successWhenGetCompletedSurveyResponse();
    // 평가완료 버튼을 클릭한다
    page.clickModalConfirmButton();
    // 모달이 닫힌다
    page.expectSatisfactionSurveyModalToBeClosed();
    // 참여후의 카드배너가 보이며 클릭이 불가능한 상태이다
    page.expectSatisfactionSurveyCardToHaveText('참여해주셔서 감사합니다:)');
    page.expectSatisfactionSurveyCardToHaveCurrentMonth();
    page.expectSatisfactionSurveyCardDisabled();
  });

  it('KAN-325-8 재진입시 시스템 만족도 조사 응답을 이미 제출한 경우 참여후의 카드배너가 보이며 클릭이 불가능한 상태이다', () => {
    // 재진입
    bookmarkService.successWhenGetBookmarkList();
    registrationStatusService.successWhenGetRegistrationStatus();
    service.successWhenGetCompletedSurveyResponse();
    page.visit();
    // 참여후의 카드배너가 보이며 클릭이 불가능한 상태이다
    page.expectSatisfactionSurveyCardToHaveText('참여해주셔서 감사합니다:)');
    page.expectSatisfactionSurveyCardToHaveCurrentMonth();
    page.expectSatisfactionSurveyCardDisabled();
  });
});
