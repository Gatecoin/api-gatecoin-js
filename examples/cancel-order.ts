import Client, {Way} from '../src/node-client';

const main = async () => {
  const client = new Client({
    publicKey: 'your public key',
    privateKey: 'your private key',
  });

  // place a limit buy order for BTC
  const response = await client.placeOrder({
    code: 'BTCEUR',
    way: Way.Bid,
    amount: 1,
    price: 10000
  });
  console.log(response);

  // cancel order
  const cancelResponse = await client.cancelOrder(response.clOrderId);
  console.log(cancelResponse)
};

main();
