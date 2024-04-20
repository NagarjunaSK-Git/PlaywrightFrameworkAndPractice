const CryptoJSUtil = require("crypto-js");

// Encryption function
export function encrypt(text: string) {
  // Get the KEY from the system environment variable
  const key = process.env.KEY || "TESTKEY";
  const cipherText = CryptoJSUtil.AES.encrypt(text, key).toString();
  return cipherText;
}

// Decryption function
export function decrypt(cipherText: string) {
  // Get the SALT from the system environment variable
  const key = process.env.SALT || "TESTKEY";
  const bytes = CryptoJSUtil.AES.decrypt(cipherText, key);
  const originalText = bytes.toString(CryptoJSUtil.enc.Utf8);
  return originalText;
}

// command to run
//npx ts-node .\typescriptbasics\encrypt.ts 

const usernameEnc = encrypt('Test@test.com');
const passwordEnc = encrypt('Test@123');

const username = decrypt(usernameEnc);
const password = decrypt(passwordEnc);


console.log(`Encyrpted Text: \n Username: ${usernameEnc} \n Password: ${passwordEnc}`);
console.log(`Decrypted Text: \n Username: ${username} \n Password: ${password}`);