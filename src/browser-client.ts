import Client from './client';

class BrowserClient extends Client {}

export default BrowserClient;
export * from './client';
export * from './utils';
export {
  BrowserClient as Client
};
