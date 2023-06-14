// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-keycloak";
import "cypress-keycloak-commands";

// Cypress.Commands.overwrite("login", (originalFn) => {
//   originalFn({
//     root: Cypress.env("authUrl"),
//     realm: Cypress.env("authRealm"),
//     username: Cypress.env("username"),
//     password: Cypress.env("password"),
//     client_id: Cypress.env("authClientId"),
//     redirect_uri: Cypress.env("host")
//   });
// });

// Cypress.Commands.overwrite("logout", (originalFn) => {
//   originalFn({
//     root: Cypress.env("authUrl"),
//     realm: Cypress.env("authRealm"),
//     redirect_uri: Cypress.env("host")
//   });
// });

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
})

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});