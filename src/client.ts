import {
  MarketDepthResponse,
  BalancesResponse,
  BalanceResponse,
  TradesResponse,
  OrderRequest,
  OrderResponse,
  Response,
  FieldError
} from './model';
import {request} from './http';

interface ClientOptions {
  baseUrl?: string;
  publicKey: string;
  privateKey: string;
  fetch?: any;
}

class GatecoinError {
  constructor(public errorCode: string, public message: string, public errors?: Array<FieldError>) {}
}

class Client {
  private options: ClientOptions;

  constructor(options: ClientOptions) {
    const defaultOptions: Partial<ClientOptions> = {
      baseUrl: 'https://api.gatecoin.com/v1',
    };

    /* istanbul ignore next */
    if (typeof window !== 'undefined' && window.fetch) {
      defaultOptions.fetch = window.fetch;
    }

    this.options = Object.assign({}, defaultOptions, options);
  }

  /**
   * Gets prices and market depth for the currency pair.
   *
   * @param {string} pair
   * @returns {Promise<MarketDepthResponse>}
   */
  async getOrderBook(pair: string) {
    return this.request<MarketDepthResponse>(`/${pair}/OrderBook`);
  }

  /**
   * Gets the available balance for each currency for the logged in account.
   *
   * @returns {Promise<BalancesResponse>}
   */
  async getBalances() {
    return this.request<BalancesResponse>(`/Balance/Balances`);
  }

  /**
   * Gets all transactions for the given pair.
   *
   * @param {string} pair
   * @returns {Promise<TransactionsResponse>}
   */
  async getTrades(pair: string) {
    return this.request<TradesResponse>(`/${pair}/Trades`);
  }

  /**
   * Gets the available balance for s currency for the logged in account.
   *
   * @param {string} currency
   * @returns {Promise<BalanceResponse>}
   */
  async getBalance(currency: string) {
    return this.request<BalanceResponse>(`/Balance/Balances/${currency}`);
  }

  /**
   * Place an order at the exchange.
   *
   * @param order
   */
  async order(order: OrderRequest) {
    return this.request<OrderResponse>(`/Trade/Orders`, order, order);
  }

  private async request<T extends Response>(path: string, query?: Object, body?: Object): Promise<T> {
    const {baseUrl, privateKey, publicKey, fetch} = this.options;

    const result = await request<T>(fetch, baseUrl + path, {privateKey, publicKey}, query, body);

    const {responseStatus} = result;
    if (responseStatus && responseStatus.errorCode) {
      throw new GatecoinError(responseStatus.errorCode, responseStatus.message, responseStatus.errors);
    }

    return result;
  }
}

export default Client
export {
  ClientOptions,
  GatecoinError,
}
export * from './model';
