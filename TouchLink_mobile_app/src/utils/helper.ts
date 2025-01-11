import CryptoJS from 'crypto-js';

const decryptServerUrl = (cipherText: any)=> {
    const key = 'process.env.key=secret@12$abcd';
    let bytes = CryptoJS.AES.decrypt(cipherText, key);
    let plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
  }

export {decryptServerUrl};