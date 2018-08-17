import Client, {
  MarketDepthResponse,
  BalancesResponse,
  BalanceResponse,
  TransactionsResponse,
  Way,
  GatecoinError,
  OrderResponse,
  CancelOrderResponse,
  CancelOrdersResponse,
  OrdersResponse,
  TickersResponse,
  PlaceOrderResponse,
  TradeHistoryResponse,
} from '../src/node-client';
import nock from 'nock';

const getCient = () => new Client({
  baseUrl: 'http://api.com',
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

    const client = new Client();

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

  it('getTransactions()', async () => {
    const result: TransactionsResponse = {
      "transactions": [
        {
          "transactionId": 5502382,
          "transactionTime": "1534512858",
          "price": 6503.2,
          "quantity": 0.06,
          "currencyPair": "BTCUSD",
          "way": "bid",
          "askOrderId": "BK11503963840",
          "bidOrderId": "BK11503963841"
        }
      ],
      "responseStatus": {
        "message": "OK"
      }
    };

    nock('http://api.com')
      .get('/Public/Transactions/BTCEUR?count=1&transactionId=2')
      .reply(200, result);

    const client = getCient();

    expect(await client.getTransactions(  'BTCEUR', 1, 2)).toEqual(result);
  });

  it('getTransactionHistory()', async () => {
    const result: TransactionsResponse = {
      "transactions": [
        {
          "transactionId": 4734055,
          "transactionTime": "1524815079",
          "price": 3,
          "quantity": 1
        }
      ],
      "responseStatus": {
        "message": "OK"
      }
    };

    nock('http://api.com')
      .get('/Public/TransactionsHistory/BTCEUR?count=1&transactionId=2')
      .reply(200, result);

    const client = getCient();

    expect(await client.getTransactionHistory(  'BTCEUR', 1, 2)).toEqual(result);
  });

  it('getTradeHistory()', async () => {
    const result: TradeHistoryResponse = {
      "trades": [
        {
          "transactionId": 5341853,
          "transactionTime": "1533051203",
          "askOrderID": "BK11502749589",
          "bidOrderID": "BK11502637876",
          "price": 0.1,
          "quantity": 1,
          "currencyPair": "BTCEUR",
          "way": "Ask" as Way,
          "feeRole": "taker",
          "feeRate": 0.0035,
          "feeAmount": 0.00035
        },
      ],
      "responseStatus": {
        "message": "OK"
      }
    };

    nock('http://api.com')
      .get('/Trade/TradeHistory?currencyPair=BTCEUR&orderByEarliest=true')
      .reply(200, result);

    const client = getCient();

    expect(await client.getTradeHistory({
      currencyPair: 'BTCEUR',
      orderByEarliest: true,
    })).toEqual(result);
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

  it('cancelOrder()', async () => {
    const result: CancelOrderResponse = {
      "responseStatus": {
        "message": "OK"
      }
    };

    nock('http://api.com')
      .delete('/Trade/Orders/BK11502639796')
      .reply(200, result);

    const client = getCient();

    expect(await client.cancelOrder('BK11502639796')).toEqual(result);
  });

  it('cancelOrders()', async () => {
    const result: CancelOrdersResponse = {
      "responseStatus": {
        "message": "OK"
      }
    };

    nock('http://api.com')
      .delete('/Trade/Orders')
      .reply(200, result);

    const client = getCient();

    expect(await client.cancelOrders()).toEqual(result);
  });

  it('getOrders()', async () => {
    const result: OrdersResponse = {
      "orders": [
        {
          "code": "BTCUSD",
          "clOrderId": "BK11502752303",
          "side": 0,
          "price": 1000,
          "initialQuantity": 1,
          "remainingQuantity": 1,
          "status": 1,
          "statusDesc": "New",
          "tranSeqNo": 0,
          "type": 0,
          "date": "1533053746"
        }
      ],
      "responseStatus": {
        "message": "OK"
      }
    };

    nock('http://api.com')
      .get('/Trade/Orders?currencyPair=BTCUSD')
      .reply(200, result);

    const client = getCient();

    expect(await client.getOrders('BTCUSD')).toEqual(result);
  });

  it('getTickers()', async () => {
    const result: TickersResponse = {
      "tickers": [
        {
          "currencyPair": "BTCEUR",
          "open": 1,
          "last": 0.1,
          "lastQ": 1,
          "high": 1,
          "low": 0.1,
          "volume": 9,
          "volumn": 9,
          "bid": 0,
          "bidQ": 0,
          "ask": 0,
          "askQ": 0,
          "vwap": 0.7,
          "createDateTime": "1533054236"
        }
      ],
      "responseStatus": {
        "message": "OK"
      }
    };

    nock('http://api.com')
      .get('/Public/LiveTicker')
      .reply(200, result);

    const client = getCient();

    expect(await client.getTickers()).toEqual(result);
  });
});
