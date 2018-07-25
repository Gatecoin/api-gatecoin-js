import axios from 'axios'
import {MarketDepthResponse, BalancesResponse} from './model';
import {sign} from './auth';

interface ClientOptions {
  baseUrl?: string;
  publicKey: string;
  privateKey: string;
}

class Client {
  private options: ClientOptions;

  constructor(options: ClientOptions) {
    const defaultOptions: Partial<ClientOptions> = {
      baseUrl: 'https://api.gatecoin.com/v1'
    };

    this.options = Object.assign({}, defaultOptions, options);
  }

  async getOrderBook(pair: string): Promise<MarketDepthResponse> {
    return this.request(`/${pair}/OrderBook`);
  }

  // @todo: types
  async getBalances(): Promise<BalancesResponse> {
    return this.request(`/Balance/Balances`);
  }

  private async request(path: string) {
    const {baseUrl, privateKey, publicKey} = this.options;
    const signature = sign(baseUrl + path, 'GET', publicKey, privateKey, String(Date.now() / 1000));

    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        'api_public_key': signature.publicKey,
        'api_request_signature': signature.signature,
        'api_request_date': signature.now,
      }
    });

    const response = await instance.get(path);

    return response.data;
  }
}

export default Client
export * from './model';
