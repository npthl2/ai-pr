/// <reference types="cypress" />
describe('Return health check result', () => {
    const services = ['admin'];
    const url = Cypress.config().baseUrl;
    services.forEach((service) => {
      it('Health Check for ' + service + ' service', () => {
        cy.request(url + '/health').then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });