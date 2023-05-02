describe('Azure Active Directory Authentication', () => {
  beforeEach(() => {
    // log into Azure Active Directory through our sample SPA using our custom command
    cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'))
  })


  it('Creates the product then checks it is visible in Products Tab in Pending status', () => {
    cy.get('a').contains('Create').click();
    cy.get('input[name="name"]').type("Cypress Auto Test " + now());
    cy.get('input[name="name"]').type("Cypress Auto Test Description field " + now());
    cy.get('input[name="ministry"]').select("Citizens' Services (CITZ)");
    cy.get('input[name="cluster"]').select("KLAB Kamloops");
    cy.get('input[id="projectOwner.email"]').type("artem");
    cy.get('input[id="projectOwner.email"]').select("artem.kravchenko@gov.bc.ca");
  })


  
})