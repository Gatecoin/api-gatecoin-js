import Client from '../../src/gatecoin-client';

describe('Client', () => {
  it('should return a list of orders', async () => {
    const client = new Client({
      baseUrl: process.env.E2E_TEST_URL as string,
      publicKey: process.env.E2E_TEST_PUBLIC_KEY as string,
      privateKey: process.env.E2E_TEST_PRIVATE_KEY as string,
    });
    expect(await client.getOrderBook('BTCEUR')).toEqual({
      asks: [],
      bids: []
    });
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
});
