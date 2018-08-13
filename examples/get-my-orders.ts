import Client from '../src/node-client';
import '../env';

const main = async () => {
  const client = new Client({
    baseUrl: process.env.E2E_TEST_URL,
    credentials: {
      publicKey: process.env.E2E_TEST_PUBLIC_KEY as string,
      privateKey: process.env.E2E_TEST_PRIVATE_KEY as string,
    }
  });

  // get my open orders for the BTC/EUR pair
  const response = await client.getOrders('BTCEUR');
  console.log(response);

  // get all of my open orders
  const allOrdersResponse = await client.getOrders();
  console.log(allOrdersResponse);
};

main().catch(e => {
  console.error(e);
  process.exit(1);
});

