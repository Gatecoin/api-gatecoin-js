interface MarketDepthResponse extends Response {
  asks: Array<Limit>;
  bids: Array<Limit>;
}

interface Limit {
  price: number;
  volume: number;
}

interface BalancesResponse extends Response {
  balances: Array<AccountBalance>;
}

interface BalanceResponse extends Response {
  balance: AccountBalance;
}

interface AccountBalance {
  currency: string;
  balance: number;
  availableBalance: number;
  pendingIncoming: number;
  pendingOutgoing: number;
  openOrder: number;
  pledging: number;
  isDigital: boolean;
}

interface TradesResponse extends Response{
  response: Array<Trade>;
}

interface Trade {
  tid: number;
  amount: number;
  price: number;
  date: string;
}

enum Way {
  Ask = 'Ask',
  Bid = 'Bid',
}

interface OrderParams {
  code: string;
  way: Way;
  amount: number;
  price: number;
  spendAmount?: number;
  externalOrderId?: number;
  validationCode?: number;
}

interface PlaceOrderResponse extends Response {
  clOrderId: string;
}

interface Response {
  responseStatus: ResponseStatus;
}

interface ResponseStatus {
  message: string;
  errorCode?: string;
  errors?: Array<FieldError>
}

interface FieldError {
  message: string;
  errorCode: string;
  fieldName: string;
}

/**
 * {
  "placeOrder": {
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
}
 */



export {
  MarketDepthResponse,
  Limit,
  BalancesResponse,
  BalanceResponse,
  OrderParams,
  TradesResponse,
  PlaceOrderResponse,
  Way,
  Response,
  FieldError
}
