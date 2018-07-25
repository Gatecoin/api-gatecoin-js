import axios from 'axios'
import {MarketDepthResponse} from './model';

interface ClientOptions {
  baseUrl?: string;
}

class Client {
  private options: ClientOptions;

  constructor(options: ClientOptions = {}) {
    const defaultOptions: ClientOptions = {
      baseUrl: 'https://api.gatecoin.com/v1'
    };

    this.options = Object.assign({}, defaultOptions, options);
  }

  // @todo: types
  async getOrderBook(pair: string): Promise<MarketDepthResponse> {
    return this.request(`/${pair}/OrderBook`);
  }

  private async request(path: string) {
    const instance = axios.create({
      baseURL: this.options.baseUrl
    });

    const response = await instance.get(path);

    return response.data;
  }
}

export default Client
export * from './model';
