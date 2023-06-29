const CryptoJS = require('crypto-js');

// let encrypted =  CryptoJS.AES.encrypt('Password', KEY).toString();
// console.log(encrypted);

export function decrypted(encrypted){
    return CryptoJS.AES.decrypt(encrypted, Cypress.env('KEY')).toString(CryptoJS.enc.Utf8)
} 
