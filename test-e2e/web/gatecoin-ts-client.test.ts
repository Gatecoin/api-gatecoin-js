import Client, {Way} from '../../src/browser-client';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe('Client', () => {
  it('should return a list of orders', async () => {
    const env = (window as any).__env__;
    const client = new Client({
      baseUrl: env.BASE_URL as string,
    });

    const response = await client.getOrderBook('BTCEUR');
    expect(typeof response.asks).toEqual('object');
    expect(typeof response.bids).toEqual('object');
  });

  it('should return all my balances', async () => {
    const env = (window as any).__env__;
    const client = new Client({
      baseUrl: env.BASE_URL as string,
      credentials: {
        publicKey: env.PUBLIC_KEY as string,
        privateKey: env.PRIVATE_KEY as string,
      }
    });

    const response = await client.getBalances();
    expect(Array.isArray(response.balances)).toEqual(true);
    expect(response.responseStatus.message).toEqual('OK');
  });

  it('should place a limit buy order', async () => {
    const env = (window as any).__env__;
    const client = new Client({
      baseUrl: env.BASE_URL as string,
      credentials: {
        publicKey: env.PUBLIC_KEY as string,
        privateKey: env.PRIVATE_KEY as string,
      }
    });

    const response = await client.placeOrder({
      code: 'BTCEUR',
      way: Way.Bid,
      amount: 1,
      price: 0.1
    });

    expect(typeof response.clOrderId).toEqual('string');
    expect(response.responseStatus.message).toEqual('OK');

    const deleteResponse = await client.cancelOrder(response.clOrderId);
    expect(deleteResponse.responseStatus.message).toEqual('OK');

    const orderResponse = await client.getOrder(response.clOrderId);
    expect(orderResponse.order.statusDesc).toEqual('Cancelled');
  });
});
