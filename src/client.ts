import {
  MarketDepthResponse,
  BalancesResponse,
  BalanceResponse,
  TradesResponse,
  OrderRequest,
  TradeResponse,
} from './model';
import {sign} from './auth';
import {stringify} from 'query-string'

interface ClientOptions {
  baseUrl?: string;
  publicKey: string;
  privateKey: string;
  fetch?: any;
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
  async getOrderBook(pair: string): Promise<MarketDepthResponse> {
    return this.request(`/${pair}/OrderBook`);
  }

  /**
   * Gets the available balance for each currency for the logged in account.
   *
   * @returns {Promise<BalancesResponse>}
   */
  async getBalances(): Promise<BalancesResponse> {
    return this.request(`/Balance/Balances`);
  }

  /**
   * Gets all transactions for the given pair.
   *
   * @param {string} pair
   * @returns {Promise<TransactionsResponse>}
   */
  async getTrades(pair: string): Promise<TradesResponse> {
    return this.request(`/${pair}/Trades`);
  }

  /**
   * Gets the available balance for s currency for the logged in account.
   *
   * @param {string} currency
   * @returns {Promise<BalanceResponse>}
   */
  async getBalance(currency: string): Promise<BalanceResponse> {
    return this.request(`/Balance/Balances/${currency}`);
  }

  async order(order: OrderRequest): Promise<TradeResponse> {
    return this.request(`/Trade/Orders`, order, order);
  }

  private async request(path: string, query?: Object, body?: Object) {
    const {baseUrl, privateKey, publicKey, fetch} = this.options;
    const url = baseUrl + path + ((query) ? '?' + stringify(query) : null);

    const method = (body) ? 'POST' : 'GET';

    const signature = sign(url, method, publicKey, privateKey, String(Date.now() / 1000));

    const options: any = {
      method,
      headers: {
        'api_public_key': signature.publicKey,
        'api_request_signature': signature.signature,
        'api_request_date': signature.now,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
      options.headers['content-type'] = 'application/json';
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  }
}

export default Client
export {
  ClientOptions
}
export * from './model';
