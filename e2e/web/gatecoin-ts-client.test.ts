import Client from '../../src/gatecoin-client';

describe('Client', () => {
  it('should return a list of orders', async () => {
    const env = (window as any).__env__;
    const client = new Client({
      baseUrl: env.E2E_TEST_URL as string
    });
    expect(await client.getOrderBook('BTCEUR')).toEqual({
      asks: [],
      bids: []
    });
  })
});
