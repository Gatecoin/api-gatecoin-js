import * as CryptoJS from 'crypto-js';

interface Signature {
  publicKey: string;
  signature: string;
  now: string;
}

const sign = (url: string, verb: string, publicKey: string, privateKey: string, now: string): Signature => {
  const contentType = (verb.toLowerCase() === 'get') ? '' : 'application/json';
  const messageToSign = (verb + url + contentType + now).toLowerCase();

  const signature = CryptoJS.HmacSHA256(messageToSign, privateKey);
  const signatureBase64 = CryptoJS.enc.Base64.stringify(signature);

  return {
    publicKey,
    signature: signatureBase64,
    now
  };
};

export {
  sign,
  Signature,
}
