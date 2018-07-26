import {MarketDepthResponse, BalancesResponse} from './model';
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

    if (typeof window !== 'undefined' && window.fetch) {
      defaultOptions.fetch = window.fetch;
    }

    this.options = Object.assign({}, defaultOptions, options);
  }

  async getOrderBook(pair: string): Promise<MarketDepthResponse> {
    return this.request(`/${pair}/OrderBook`);
  }

  async getBalances(): Promise<BalancesResponse> {
    return this.request(`/Balance/Balances`);
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
