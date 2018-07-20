import {sign} from '../src/auth';

describe('auth', () => {
  it('sign()', async () => {
    const publicKey = 'PUT YOUR PUBLIC KEY HERE';
    const privateKey = 'PUT YOUR PRIVATE KEY HERE';
    const url = 'https://api.gatecoin.com/v1/Balance/Balances';
    const now = '1532540803.513';

    const signature = sign(url, 'GET', publicKey, privateKey, now);
    expect(signature).toEqual({
      publicKey: 'PUT YOUR PUBLIC KEY HERE',
      signature: 'PUT YOUR CALCULATED SIGNATURE HERE',
      now: '1532540803.513'
    });

    const signaturePost = sign(url, 'POST', publicKey, privateKey, now);
    expect(signaturePost).toEqual({
      publicKey: 'PUT YOUR PUBLIC KEY HERE',
      signature: 'PUT YOUR CALCULATED SIGNATURE HERE',
      now: '1532540803.513'
    });

    const signatureDelete = sign(url, 'DELETE', publicKey, privateKey, now);
    expect(signatureDelete).toEqual({
      publicKey: 'PUT YOUR PUBLIC KEY HERE',
      signature: 'PUT YOUR CALCULATED SIGNATURE HERE',
      now: '1532540803.513'
    });
  });
});
