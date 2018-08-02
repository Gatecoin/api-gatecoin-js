interface MarketDepthResponse extends Response {
  asks: Array<Limit>;
  bids: Array<Limit>;
}

interface OrderBook {
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

interface TradeHistoryResponse extends Response{
  trades: Array<TraderTransaction>;
}

interface TradeHistoryParams {
  currencyPair: string;
  beforeId?: string;
  afterId?: string;
  page?: number;
  orderByEarliest?: boolean;
}

interface TransactionsResponse extends Response {
  transactions: Array<Transaction>;
}

interface Transaction {
  transactionId: number;
  transactionTime: string;
  price: number;
  quantity: number;
  currencyPair?: number;
  way?: string;
  askOrderId?: string;
  bidOrderId?: string;
}

enum Way {
  Ask = 'Ask',
  Bid = 'Bid',
}

interface OrderParams {
  code: string;
  way: Way;
  amount: number;
  price?: number;
  spendAmount?: number;
  externalOrderId?: number;
  validationCode?: number;
}

interface PlaceOrderResponse extends Response {
  clOrderId: string;
}

interface OrderResponse extends Response {
  order: Order;
}

interface Order {
  code: string;
  clOrderId: string;
  side: number;
  price: number;
  initialQuantity: number;
  remainingQuantity: number;
  status: number;
  statusDesc: string;
  tranSeqNo: number;
  type: number;
  date: string;
  trades?: Array<TraderTransaction>;
}

interface TraderTransaction {
  transactionId: number;
  transactionTime: string;
  askOrderID: string;
  bidOrderID: string;
  price: number;
  quantity: number;
  currencyPair: string;
  way: Way;
  feeRole: string;
  feeRate: number;
  feeAmount: number;
}

interface CancelOrderResponse extends Response {
}

interface CancelOrdersResponse extends Response {
}

interface OrdersResponse extends Response {
  orders: Array<Order>;
}

interface Ticker {
  currencyPair: string;
  open: number;
  last: number;
  lastQ: number;
  high: number;
  low: number;
  volume: number;
  volumn: number;
  bid: number;
  bidQ: number;
  ask: number;
  askQ: number;
  vwap: number;
  createDateTime: string;
}

interface TickersResponse extends Response {
  tickers: Array<Ticker>;
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

export {
  MarketDepthResponse,
  Limit,
  BalancesResponse,
  BalanceResponse,
  OrderParams,
  TradeHistoryResponse,
  TradeHistoryParams,
  TransactionsResponse,
  PlaceOrderResponse,
  Way,
  Response,
  FieldError,
  OrderResponse,
  Order,
  TraderTransaction,
  CancelOrderResponse,
  CancelOrdersResponse,
  OrdersResponse,
  Ticker,
  TickersResponse,
  OrderBook,
}
