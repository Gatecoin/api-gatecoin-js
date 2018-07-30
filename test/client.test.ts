import Client, {MarketDepthResponse, BalancesResponse, BalanceResponse, TradesResponse, Way} from '../src/node-client';
import nock from 'nock';
import {OrderResponse} from "../src/model";

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

  it('getTrades()', async () => {
    const result: TradesResponse = {
      "response": [
        {
          "tid": 5281383,
          "price": 8278.4,
          "amount": 0.11,
          "date": "1532597624"
        },
        {
          "tid": 5281386,
          "price": 8278.4,
          "amount": 0.12,
          "date": "1532597658"
        },
      ],
    };

    nock('http://api.com')
      .get('/BTCEUR/Trades')
      .reply(200, result);

    const client = getCient();

    expect(await client.getTrades(  'BTCEUR')).toEqual(result);
  });

  it('order()', async () => {
    const result: OrderResponse = {
      "clOrderId": "BK11502633428",
      "responseStatus": {
        "message": "OK"
      }
    };
    const order = {
      code: 'BTCEUR',
      way: Way.Bid,
      amount: 1,
      price: 0.1
    }

    nock('http://api.com')
      .post('/Trade/Orders', order)
      .query(order)
      .reply(200, result);

    const client = getCient();

    expect(await client.order(order)).toEqual(result);
  });
});
