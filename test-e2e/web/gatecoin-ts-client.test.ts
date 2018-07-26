import Client from '../../src/browser-client';

describe('Client', () => {
  it('should return a list of orders', async () => {
    const env = (window as any).__env__;
    const client = new Client({
      baseUrl: env.E2E_TEST_URL as string,
      publicKey: env.E2E_TEST_PUBLIC_KEY as string,
      privateKey: env.E2E_TEST_PRIVATE_KEY as string,
    });
    expect(await client.getOrderBook('BTCEUR')).toEqual({
      asks: [],
      bids: []
    });
  })

  it('should return all my balances', async () => {
    const env = (window as any).__env__;
    const client = new Client({
      baseUrl: env.E2E_TEST_URL as string,
      publicKey: env.E2E_TEST_PUBLIC_KEY as string,
      privateKey: env.E2E_TEST_PRIVATE_KEY as string,
    });

    const response = await client.getBalances();
    expect(Array.isArray(response.balances)).toEqual(true);
    expect(response.responseStatus.message).toEqual('OK');
  });
});
