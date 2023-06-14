// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// // Import commands.js using ES2015 syntax:
import './commands'
import './format-date'

function loginViaAAD(username, password) {

  cy.visit(Cypress.env('base_url'));
  cy.get('button').first().click();


  // Login to your AAD tenant.
  cy.origin(
    'login.microsoftonline.com',
    {
      args: {
        username
      },
    },

    ({ username }) => {
      cy.get('input[type="email"]', {timeout:60000}).type(username, {
        log: false,
      })
      cy.get('input[type="submit"]').click();
    }

  )

  // End of "origin" block. Getting redirected to sts.gov.bc.ca

  cy.get('input[type="password"]').type(password, {
    log: false,
  })
  cy.get('span[id="submitButton"]').click()

  // Another "origin" block

  cy.origin(
    'login.microsoftonline.com',

    () => {

      // Waiting for a human to approve login with Microsoft Authenticator

      cy.get('input[value="Yes"]',{timeout:60000}).click()
    }

  )

  
}

Cypress.Commands.add('loginToAAD', (username, password) => {
  const log = Cypress.log({
    displayName: 'Azure Active Directory Login',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  })
  log.snapshot('before')

  loginViaAAD(username, password)

  log.snapshot('after')
  log.end()
})