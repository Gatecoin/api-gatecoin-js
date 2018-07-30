import {request} from '../src/http';
import nock from 'nock';
import fetch from 'node-fetch';

describe('request()', () => {
  it('should handle errors correctly', async () => {
    nock('http://api.com')
      .get('/BTCEUR/OrderBook')
      .reply(500, {});

    let error;
    try {
      await request(
        fetch,
        'http://api.com/BTCEUR/OrderBook',
        {privateKey: '', publicKey: ''}
      );
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
  });

});
