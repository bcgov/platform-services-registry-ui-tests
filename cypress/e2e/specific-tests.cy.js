import * as user from '../fixtures/users/platform.services.test.account.json'
import * as admin from '../fixtures/users/artem.kravchenko.json'

describe('Azure Active Directory Authentication', () => {
    beforeEach(() => {
      // log into Azure Active Directory through our sample SPA using our custom command
      cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'));
    })
  
    
    it('Logs in, pastes the contact email, chooses the name and ', () => {
      // tag: smoke
      // click Create
      cy.get('a').contains('Create').click({ timeout: 10000 });
      cy.get('input[id="projectOwner.email"]', { timeout: 10000 }).invoke('val', user.email);
      // click platform.services.test.account@gov.bc.ca account
      cy.get('li[role="option"]', { timeout: 10000 }).each((name) => {
        if (name.text() == user.email) {
          cy.wrap(name).click({ timeout: 10000 });
        };
      });
      cy.get()      
    })
})