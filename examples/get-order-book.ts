import Client, {orderBookLeg, Way} from '../src/node-client';
import '../env';

const main = async () => {
  const client = new Client({
    baseUrl: process.env.E2E_TEST_URL,
  });

  // get order book for the BTC/EUR pair
  const response = await client.getOrderBook('BTCEUR');
  console.log(response);

  // calculate the buy leg of the order book
  const buyLeg = orderBookLeg(response, 10, Way.Ask);
  console.log(buyLeg);
};

main().catch(e => {
  console.error(e);
  process.exit(1);
});

