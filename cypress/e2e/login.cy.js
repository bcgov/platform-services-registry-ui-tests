describe('Azure Active Directory Authentication', () => {
  beforeEach(() => {
    // log into Azure Active Directory through our sample SPA using our custom command
    cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'))
    //cy.visit('https://platsrv-registry-web-101ed4-test.apps.silver.devops.gov.bc.ca/')
  })


  it('Verifies that we are logged in and found the link with "Create" text', () => {
    cy.get('a').contains('Create').should('have.text', 'Create')
  })
  
})