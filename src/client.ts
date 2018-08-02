import {
  MarketDepthResponse,
  BalancesResponse,
  BalanceResponse,
  TradeHistoryResponse,
  OrderParams,
  PlaceOrderResponse,
  Response,
  FieldError,
  OrderResponse,
  CancelOrderResponse,
  CancelOrdersResponse,
  OrdersResponse,
  TickersResponse,
  TradeHistoryParams,
  TransactionsResponse,
} from './model';
import {request} from './http';
import {filterLimits} from './trading';

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
   * @param {number} total
   * @param {number} volume
   * @returns {Promise<MarketDepthResponse>}
   */
  async getOrderBook(pair: string, total?: number, volume?: number) {
    const response = await this.request<MarketDepthResponse>('GET', `/${pair}/OrderBook`);
    response.bids = filterLimits(response.bids, total, volume);
    response.asks = filterLimits(response.bids, total, volume);

    return response;
  }

  /**
   * Gets the available balance for each currency for the logged in account.
   *
   * @returns {Promise<BalancesResponse>}
   */
  async getBalances() {
    return this.request<BalancesResponse>('GET', `/Balance/Balances`);
  }

  /**
   * Gets all transactions for the given currency pair.
   *
   * @param {string} pair
   * @param {number} count
   * @param {number} transactionId
   * @returns {Promise<TransactionsResponse>}
   */
  async getTransactionHistory(pair: string, count?: number, transactionId?: number) {
    return this.request<TransactionsResponse>('GET', `/Public/TransactionsHistory/${pair}`, {
      count,
      transactionId
    });
  }

  /**
   * Gets all trade history of the logged in user.
   *
   * @param {TradeHistoryParams} params
   * @returns {Promise<TradeHistoryResponse>}
   */
  async getTradeHistory(params: TradeHistoryParams) {
    return this.request<TradeHistoryResponse>('GET', `/Trade/TradeHistory`, params);
  }

  /**
   * Gets the available balance for s currency for the logged in account.
   *
   * @param {string} currency
   * @returns {Promise<BalanceResponse>}
   */
  async getBalance(currency: string) {
    return this.request<BalanceResponse>('GET', `/Balance/Balances/${currency}`);
  }

  /**
   * Place an order at the exchange.
   *
   * @param order
   */
  async placeOrder(order: OrderParams) {
    return this.request<PlaceOrderResponse>('POST', `/Trade/Orders`, order, order);
  }

  /**
   * Gets an order for the logged in trader.
   *
   * @param {string} orderId
   * @returns {Promise<OrderResponse>}
   */
  async getOrder(orderId: string) {
    return this.request<OrderResponse>('GET', `/Trade/Orders/${orderId}`);
  }

  /**
   * Cancels an existing order.
   *
   * @param {string} orderId
   * @returns {Promise<CancelOrderResponse>}
   */
  async cancelOrder(orderId: string) {
    return this.request<CancelOrderResponse>('DELETE', `/Trade/Orders/${orderId}`);
  }

  /**
   * Cancels all existing orders.
   *
   * @returns {Promise<CancelOrdersResponse>}
   */
  async cancelOrders() {
    return this.request<CancelOrdersResponse>('DELETE', `/Trade/Orders`);
  }

  /**
   * Gets open orders for the logged in trader.
   *
   * @param {string} pair
   * @returns {Promise<OrdersResponse>}
   */
  async getOrders(pair?: string) {
    return this.request<OrdersResponse>('GET', `/Trade/Orders`, {currencyPair: pair});
  }

  /**
   * Get live ticker for all currency.
   *
   * @returns {Promise<TickersResponse>}
   */
  async getTickers() {
    return this.request<TickersResponse>('GET', `/Public/LiveTicker`);
  }

  private async request<T extends Response>(method: string, path: string, query?: Object, body?: Object): Promise<T> {
    const {baseUrl, privateKey, publicKey, fetch} = this.options;

    const result = await request<T>(fetch, method, baseUrl + path, {privateKey, publicKey}, query, body);

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
