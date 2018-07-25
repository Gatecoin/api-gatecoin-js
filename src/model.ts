interface MarketDepthResponse {
  asks: Array<Limit>;
  bids: Array<Limit>;
}

interface Limit {
  price: number;
  volume: number;
}

interface BalancesResponse {
  balances: Array<AccountBalance>;
  responseStatus: ResponseStatus;
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

interface ResponseStatus {
  message: string;
}

export {
  MarketDepthResponse,
  Limit,
  BalancesResponse
}
