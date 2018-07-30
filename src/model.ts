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

interface TradesResponse {
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

interface OrderRequest {
  code: string;
  way: Way;
  amount: number;
  price: number;
  spendAmount?: number;
  externalOrderId?: number;
  validationCode?: number;
}

interface OrderResponse extends Response {
  clOrderId: string;
}

interface Response {
  responseStatus: ResponseStatus;
  errors?: Array<any> // @todo
}

interface ResponseStatus {
  message: string;
}

export {
  MarketDepthResponse,
  Limit,
  BalancesResponse,
  BalanceResponse,
  OrderRequest,
  TradesResponse,
  OrderResponse,
  Way,
}
