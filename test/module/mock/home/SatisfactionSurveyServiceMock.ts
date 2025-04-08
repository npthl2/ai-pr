/// <reference types="cypress" />

const surveyResponse = { alreadyRespondedYn: 'N', totalResponseCount: 9 };
const completedSurveyResponse = { alreadyRespondedYn: 'Y', totalResponseCount: 10 };

class SatisfactionSurveyServiceMock {
  successWhenGetSurveyResponse() {
    cy.intercept('GET', '**/v1/survey/satisfaction/*/response?**', {
      statusCode: 200,
      body: { successOrNot: 'Y', statusCode: 'SUCCESS', data: surveyResponse },
    }).as('getSurveyResponse');
  }

  successWhenGetCompletedSurveyResponse() {
    cy.intercept('GET', '**/v1/survey/satisfaction/*/response?**', {
      statusCode: 200,
      body: { successOrNot: 'Y', statusCode: 'SUCCESS', data: completedSurveyResponse },
    }).as('getCompletedSurveyResponse');
  }

  successWhenSaveSurveyResponse() {
    cy.intercept('POST', '**/v1/survey/satisfaction/*/response', {
      statusCode: 200,
      body: { successOrNot: 'Y', statusCode: 'SUCCESS', data: null },
    });
  }
}
export default SatisfactionSurveyServiceMock;
