import {sign} from '../src/auth';

describe('auth', () => {
  it('sign()', async () => {
    const publicKey = 'bvM7ViP498BHdC3oFdRHM8WWjRFd32JS';
    const privateKey = 'F72D5F953F208647DDAF146DD4CD402F';
    const url = 'https://api.gtcprojects.com/v1/Balance/Balances';
    const now = '1532540803.513';

    const signature = sign(url, 'GET', publicKey, privateKey, now);
    expect(signature).toEqual({
      publicKey: 'bvM7ViP498BHdC3oFdRHM8WWjRFd32JS',
      signature: '0x1dG7YWXTLCqVLJ3CFqgp848uPcRzqgXyF3pJ2nnmU=',
      now: '1532540803.513'
    });

    const signaturePost = sign(url, 'POST', publicKey, privateKey, now);
    expect(signaturePost).toEqual({
      publicKey: 'bvM7ViP498BHdC3oFdRHM8WWjRFd32JS',
      signature: '6GfPeR8slSPQlyvCQF04NBe6ymtO2HDPrbAYtP/n2q4=',
      now: '1532540803.513'
    });
  });
});
