import Client, {ClientOptions} from './client';
import fetch from 'node-fetch';

class NodeClient extends Client {
  constructor(options: ClientOptions) {
    options.fetch = fetch;

    super(options);
  }
}

export default NodeClient;
export * from './client';
