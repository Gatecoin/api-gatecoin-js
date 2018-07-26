import Client, {MarketDepthResponse, BalancesResponse, BalanceResponse} from '../src/node-client';
import nock from 'nock';

const getCient = () => new Client({
  baseUrl: 'http://api.com',
  publicKey: '',
  privateKey: '',
});

describe('Client', () => {
  it('should have a default base url', async () => {
    const result: MarketDepthResponse = {
      asks: [],
      bids: [],
      responseStatus: {
        message: 'OK'
      }
    };

    nock('https://api.gatecoin.com/v1')
      .get('/BTCEUR/OrderBook')
      .reply(200, result);

    const client = new Client({
      publicKey: '',
      privateKey: '',
    });

    expect(await client.getOrderBook('BTCEUR')).toEqual(result);
  });

  it('should handle errors correctly', async () => {
    nock('http://api.com')
      .get('/BTCEUR/OrderBook')
      .reply(500, {});

    const client = getCient();

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
      bids: [],
      responseStatus: {
        message: 'OK'
      }
    };

    nock('http://api.com')
      .get('/BTCEUR/OrderBook')
      .reply(200, result);

    const client = getCient();

    expect(await client.getOrderBook('BTCEUR')).toEqual(result);
  });

  it('getBalances()', async () => {
    const result: BalancesResponse = {
      "balances": [
        {
          "currency": "USD",
          "balance": 0,
          "availableBalance": 0,
          "pendingIncoming": 0,
          "pendingOutgoing": 0,
          "openOrder": 0,
          "pledging": 0,
          "isDigital": false
        },
        {
          "currency": "EUR",
          "balance": 0,
          "availableBalance": 0,
          "pendingIncoming": 0,
          "pendingOutgoing": 0,
          "openOrder": 0,
          "pledging": 0,
          "isDigital": false
        },
      ],
      "responseStatus": {
        "message": "OK"
      }
    };

    nock('http://api.com')
      .get('/Balance/Balances')
      .reply(200, result);

    const client = getCient();

    expect(await client.getBalances()).toEqual(result);
  });

  it('getBalance()', async () => {
    const result: BalanceResponse = {
      "balance": {
        "currency": "USD",
        "balance": 0,
        "availableBalance": 0,
        "pendingIncoming": 0,
        "pendingOutgoing": 0,
        "openOrder": 0,
        "pledging": 0,
        "isDigital": false
      },
      "responseStatus": {
        "message": "OK"
      }
    };

    nock('http://api.com')
      .get('/Balance/Balances/USD')
      .reply(200, result);

    const client = getCient();

    expect(await client.getBalance('USD')).toEqual(result);
  });
});
