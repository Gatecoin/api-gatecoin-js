import Client, {MarketDepthResponse} from '../gatecoin-client'
import nock from 'nock';

describe('Client', () => {
  it('should have a default base url', async () => {
    const result: MarketDepthResponse = {
      asks: [],
      bids: []
    };

    nock('https://api.gatecoin.com/v1')
      .get('/BTCEUR/OrderBook')
      .reply(200, result);

    const client = new Client();

    expect(await client.getOrderBook('BTCEUR')).toEqual(result);
  });

  it('should handle errors correctly', async () => {
    nock('http://api.com')
      .get('/BTCEUR/OrderBook')
      .reply(500, {});

    const client = new Client({
      baseUrl: 'http://api.com'
    });

    let error;
    try {
      await client.getOrderBook('BTCEUR');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
  });

  it('getOrderBook()', async () => {
    const result: MarketDepthResponse = {
      asks: [],
      bids: []
    };

    nock('http://api.com')
      .get('/BTCEUR/OrderBook')
      .reply(200, result);

    const client = new Client({
      baseUrl: 'http://api.com'
    });

    expect(await client.getOrderBook('BTCEUR')).toEqual(result);
  });
});
