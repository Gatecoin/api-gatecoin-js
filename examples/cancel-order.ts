import Client, {Way} from '../src/node-client';
import '../env';

const main = async () => {
  const client = new Client({
    baseUrl: process.env.E2E_TEST_URL,
    credentials: {
      publicKey: process.env.E2E_TEST_PUBLIC_KEY as string,
      privateKey: process.env.E2E_TEST_PRIVATE_KEY as string,
    }
  });

  // place a limit buy order for BTC
  const response = await client.placeOrder({
    code: 'BTCEUR',
    way: Way.Bid,
    amount: 1,
    price: 10
  });
  console.log(response);

  // cancel order
  const cancelResponse = await client.cancelOrder(response.clOrderId);
  console.log(cancelResponse);

  // cancel all orders
  const cancelAllResponse = await client.cancelOrders();
  console.log(cancelAllResponse)
};

main().catch(e => {
  console.error(e);
  process.exit(1);
});

