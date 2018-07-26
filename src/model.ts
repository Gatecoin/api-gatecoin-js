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

// TransactionsResponse {
//   Transactions (Array[Transaction]),
//     ResponseStatus (ResponseStatus)
// }
// Transaction {
//   TransactionId (long),
//     TransactionTime (Date),
//     Price (double),
//     Quantity (double),
//     CurrencyPair (string),
//     Way (string),
//     AskOrderId (string),
//     BidOrderId (string)
// }

// {
//   "transactionId": 5172181,
//   "transactionTime": "1531282245",
//   "price": 1,
//   "quantity": 1
// }

interface TransactionsResponse extends Response {
  transactions: Array<Transaction>;
}

// doesn't match the swagger definition
interface Transaction {
  transactionId: number;
  transactionTime: string;
  price: number;
  quantity: number;
}

enum Way {
  Ask = 'Ask',
  Bid = 'Bid',
}

interface Response {
  responseStatus: ResponseStatus;
}

interface ResponseStatus {
  message: string;
}

export {
  MarketDepthResponse,
  Limit,
  BalancesResponse,
  BalanceResponse,
  TransactionsResponse,
  Way,
}
