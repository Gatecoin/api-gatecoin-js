import Client, {Way} from '../../src/node-client';

jest.setTimeout(30000);

describe('Client', () => {
  it('should return a list of orders', async () => {
    const client = new Client({
      baseUrl: process.env.E2E_TEST_URL as string,
      publicKey: process.env.E2E_TEST_PUBLIC_KEY as string,
      privateKey: process.env.E2E_TEST_PRIVATE_KEY as string,
    });

    const response = await client.getOrderBook('BTCEUR');
    expect(typeof response.asks).toEqual('object');
    expect(typeof response.bids).toEqual('object');
  });

  it('should return all my balances', async () => {
    const client = new Client({
      baseUrl: process.env.E2E_TEST_URL as string,
      publicKey: process.env.E2E_TEST_PUBLIC_KEY as string,
      privateKey: process.env.E2E_TEST_PRIVATE_KEY as string,
    });

    const response = await client.getBalances();
    expect(Array.isArray(response.balances)).toBeTruthy();
    expect(response.responseStatus.message).toEqual('OK');
  });

  it('should place a limit buy order', async () => {
    const client = new Client({
      baseUrl: process.env.E2E_TEST_URL as string,
      publicKey: process.env.E2E_TEST_PUBLIC_KEY as string,
      privateKey: process.env.E2E_TEST_PRIVATE_KEY as string,
    });

    const response = await client.placeOrder({
      code: 'BTCEUR',
      way: Way.Bid,
      amount: 1,
      price: 0.1
    });

    expect(typeof response.clOrderId).toEqual('string');
    expect(response.responseStatus.message).toEqual('OK');

    // @todo: delete order
  });
});
