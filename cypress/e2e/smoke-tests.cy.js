import { getCurrentDateTimeShort } from '../support/format-date.js';
import { decrypted } from '../support/decode.js';
import { blah } from '../support/decode.js';
import { heh } from '../support/decode.js';
import * as user from '../fixtures/users/platform.services.test.account.json';
import * as admin from '../fixtures/users/artem.kravchenko.json';
import { DropdownOption, productNameTextField, productDescriptionTextField, 
  productMinistryInput, productClusterInput, productProductOwnerInput, productFirstTechLeadInput, 
  productCreateButton, productConfirmationPopupSubmit } from '../support/selectors.js';

let productName = "";
let currentTime = "";

describe('Smoke tests set', () => {
  let actor = ''
  beforeEach(() => {
    // log into Azure Active Directory through our sample SPA using our custom command
    if (actor == 'user'){
      cy.log(user.email);
      cy.loginToAAD(user.email, Cypress.env('aad_password'));
    }
    else {
      cy.loginToAAD(admin.email, decrypted(Cypress.env('admin_password')));
      }
  })


  it.skip('Verifies that we are logged in by finding the link with "Create" text', () => {
    // tag: smoke
    cy.get('a').contains('Create').should('have.text', 'Create')
  })

  actor == 'user';
  it('Creates the product then checks it is visible in Products Tab in Pending status', () => {
    // tag: smoke, stage1

    // click Create
    cy.log(actor);
    cy.get('a').contains('Requests').click();
    cy.get('svg[data-testid="MenuIcon"]').click({ timeout: 10000 });
    cy.get('a').contains('Create Private Cloud Project').click({ timeout: 10000 });
    // get current date and time
    currentTime = getCurrentDateTimeShort();
    // form and remember the name of the Product
    productName = "Cypress Auto Test " + currentTime;
    // input name of the product
    cy.get(productNameTextField).type(productName);
    // input description of the product
    cy.get(productDescriptionTextField).type("Cypress Auto Test Description field " + currentTime);
    // click ministry box
    cy.get(productMinistryInput).parent().click({ timeout: 10000 });
    // click CITZ
    cy.get(DropdownOption).each((ministry) => {
      if (ministry.text() == "Citizens' Services (CITZ)") {
        cy.wrap(ministry).click({ timeout: 10000 });
      };
    })
    // click cluster box
    cy.get(productClusterInput).parent().click({ timeout: 10000 });
    // click Silver
    cy.get(DropdownOption).each((cluster) => {
      if (cluster.text() == "Silver Kamloops") {
        cy.wrap(cluster).click({ timeout: 10000 });
      }
    })
    // start typing email of product owner "platform"
    cy.get(productProductOwnerInput, { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get(productProductOwnerInput, { timeout: 10000 }).type("platfor");
    // click platform services account
    cy.get(DropdownOption).each((name) => {
      if (name.text() == user.email) {
        cy.log(user.email);
        cy.wrap(name).click({ timeout: 10000 });
      }
    })
    // type "artem" in techincal lead box 
    cy.get(productFirstTechLeadInput).click();
    cy.get(productFirstTechLeadInput).type("artem.kr")
    cy.wait(1000);
    //dropdown: div[role='presentaion']
    // click artem.kravchenko account
    cy.get(DropdownOption, { timeout: 10000 }).each((name) => {
      if (name.text() == admin.email) {
        cy.log(admin.email);
        cy.wrap(name).click({ timeout: 10000 });
      };
    })
    // submit creation
    cy.get(productCreateButton).click({ timeout: 10000 });
    // confirm popup
    cy.get(productConfirmationPopupSubmit).contains('Create').click({ timeout: 10000 });
    // check we are at Request page
    cy.get('div').contains("PENDING DECISION", { timeout: 10000 }).should('be.visible');
    // check the project with name 
    cy.get('td').contains(productName).should('be.visible');
  })

  actor = 'admin';
  it.skip('Logs in with admin role and approves the Product made in previous test', () => {
    cy.get('a').contains('Active Requests').should('be.visible').click();
    cy.get('td').contains(productName).should('be.visible').click();
    cy.get('button').contains('Approve').should('be.visible').click();
    // after check that it's in Processing state
    cy.get('td').contains(productName, { timeout: 20000 }).siblings().eq(1).should('contain', 'PROCESSING');
    
    
  })


})