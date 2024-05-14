"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const CryptoJSUtil = require("crypto-js");
// Encryption function
function encrypt(text) {
    // Get the KEY from the system environment variable
    const key = process.env.KEY || "TESTKEY";
    const cipherText = CryptoJSUtil.AES.encrypt(text, key).toString();
    return cipherText;
}
exports.encrypt = encrypt;
// Decryption function
function decrypt(cipherText) {
    // Get the SALT from the system environment variable
    const key = process.env.SALT || "TESTKEY";
    const bytes = CryptoJSUtil.AES.decrypt(cipherText, key);
    const originalText = bytes.toString(CryptoJSUtil.enc.Utf8);
    return originalText;
}
exports.decrypt = decrypt;
// command to run
//npx ts-node .\typescriptbasics\encrypt.ts 
const usernameEnc = encrypt('Test@test.com');
const passwordEnc = encrypt('Test@123');
const username = decrypt(usernameEnc);
const password = decrypt(passwordEnc);
console.log(`Encyrpted Text: \n Username: ${usernameEnc} \n Password: ${passwordEnc}`);
console.log(`Decrypted Text: \n Username: ${username} \n Password: ${password}`);
