import { getCurrentDateTimeShort } from '../support/format-date.js';
let productName = "";
let currentTime = ""

describe('Azure Active Directory Authentication', () => {
  beforeEach(() => {
    // log into Azure Active Directory through our sample SPA using our custom command
    cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'))
  })

  // test itself
  it('Creates the product then checks it is visible in Products Tab in Pending status', () => {
    // click Create
    cy.get('a').contains('Create').click();
    // get current date and time
    currentTime = getCurrentDateTimeShort();
    // form and remember the name of the Product
    productName = "Cypress Auto Test " + currentTime;
    // input name of the product
    cy.get('input[name="name"]').type(productName);
    // input description of the product
    cy.get('textarea[name="description"]').type("Cypress Auto Test Description field " + currentTime);
    // click ministry box
    cy.get('input[name="ministry"]').parent().click();
    // click CITZ
    cy.get('li[role="option"]').each((ministry) => {
        if (ministry.text() == "Citizens' Services (CITZ)") {
            cy.wrap(ministry).click();
        };
    })
    // click cluster box
    cy.get('input[name="cluster"]').parent().click();
    // click Silver
    cy.get('li[role="option"]').each((cluster) => {
      if (cluster.text() == "Silver Kamloops") {
          cy.wrap(cluster).click();
      }
    })
    // start typing email of product owner "platform"
    cy.get('input[id="projectOwner.email"]').type("platform");
    // click platform services account
    cy.get('li[role="option"]').each((name) => {
      if (name.text() == "platform.services.test.account@gov.bc.ca") {
          cy.wrap(name).click();
      }
    })
    // type "artem" in techincal lead box 
    cy.get('input[id="primaryTechnicalLead.email"]').type("artem");
    // click artem.kravchenko account
    cy.get('li[role="option"]').each((name) => {
      if (name.text() =="artem.kravchenko@gov.bc.ca") {
        cy.wrap(name).click();
      };
    })
    // submit creation
    cy.get('button[type="submit"]').click();
    // confirm popup
    cy.get('button[type="button"]').contains('Create').click();
    // check we are at Request page
    cy.get('div').contains("PENDING DECISION").should('be.visible');
    // check the project with name 
    cy.get('td').contains(productName).should('be.visible');
  })

})