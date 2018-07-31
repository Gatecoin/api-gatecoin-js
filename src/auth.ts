import hmacsha256 from 'crypto-js/hmac-sha256';
import base64 from 'crypto-js/enc-base64';

interface Signature {
  publicKey: string;
  signature: string;
  now: string;
}

const sign = (url: string, verb: string, publicKey: string, privateKey: string, now: string): Signature => {
  const contentType = (verb.toLowerCase() === 'post') ? 'application/json' : '';
  const messageToSign = (verb + url + contentType + now).toLowerCase();

  const signature = hmacsha256(messageToSign, privateKey);
  const signatureBase64 = base64.stringify(signature);

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
