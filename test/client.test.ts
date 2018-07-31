import Client, {
  MarketDepthResponse,
  BalancesResponse,
  BalanceResponse,
  TradesResponse,
  Way,
  GatecoinError,
  OrderResponse,
} from '../src/node-client';
import nock from 'nock';
import {PlaceOrderResponse} from "../src/model";

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

  it('should trigger an exception on responses with an error', async () => {
    const order = {
      code: 'BTCEUR',
      way: Way.Bid,
      amount: 1,
      price: 0.1
    };

    const status = {
      "errorCode": "1005",
      "message": "Insufficient funds",
      "errors": [
        {
          "errorCode": "1004",
          "fieldName": "Amount, SpendAmount",
          "message": "At least one property must be greater than 0"
        }
      ]
    };

    nock('http://api.com')
      .post('/Trade/Orders', order)
      .query(order)
      .reply(200, {
        "responseStatus": status
      });

    const client = getCient();

    let error;
    try {
      await client.placeOrder(order);
    }
    catch (e) {
      error = e;
    }

    expect(error instanceof GatecoinError).toEqual(true);
    expect(error.errorCode).toEqual(status.errorCode);
    expect(error.message).toEqual(status.message);
    expect(error.errors).toEqual(status.errors);
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
      "responseStatus": {
        "message": "OK"
      }
    };

    nock('http://api.com')
      .get('/BTCEUR/Trades')
      .reply(200, result);

    const client = getCient();

    expect(await client.getTrades(  'BTCEUR')).toEqual(result);
  });

  it('placeOrder()', async () => {
    const result: PlaceOrderResponse = {
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
    };

    nock('http://api.com')
      .post('/Trade/Orders', order)
      .query(order)
      .reply(200, result);

    const client = getCient();

    expect(await client.placeOrder(order)).toEqual(result);
  });

  it('getOrder()', async () => {
    const result: OrderResponse = {
      "order": {
        "code": "BTCEUR",
        "clOrderId": "BK11502639796",
        "side": 0,
        "price": 0.1,
        "initialQuantity": 1,
        "remainingQuantity": 1,
        "status": 1,
        "statusDesc": "New",
        "tranSeqNo": 109725,
        "type": 0,
        "date": "1532970598",
        "trades": []
      },
      "responseStatus": {
        "message": "OK"
      }
    };

    nock('http://api.com')
      .get('/Trade/Orders/BK11502639796')
      .reply(200, result);

    const client = getCient();

    expect(await client.getOrder('BK11502639796')).toEqual(result);
  });
});
