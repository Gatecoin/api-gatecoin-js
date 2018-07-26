import {MarketDepthResponse, BalancesResponse, BalanceResponse, TransactionsResponse} from './model';
import {sign} from './auth';

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
  async getTransactionHistory(pair: string): Promise<TransactionsResponse> {
    return this.request(`/Public/TransactionsHistory/${pair}`);
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

  private async request(path: string) {
    const {baseUrl, privateKey, publicKey, fetch} = this.options;
    const url = baseUrl + path;
    const signature = sign(url, 'GET', publicKey, privateKey, String(Date.now() / 1000));

    const response = await fetch(url, {
      headers: {
        'api_public_key': signature.publicKey,
        'api_request_signature': signature.signature,
        'api_request_date': signature.now,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusMessage);
    }

    return response.json();
  }
}

export default Client
export {
  ClientOptions
}
export * from './model';
