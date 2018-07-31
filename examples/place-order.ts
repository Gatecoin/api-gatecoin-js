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

  // check order status
  const orderResponse = await client.getOrder(response.clOrderId);
  console.log(orderResponse.order.statusDesc);

  // place a limit sell order
  const sellResponse = await client.placeOrder({
    code: 'BTCEUR',
    way: Way.Ask,
    amount: 1,
    price: 11000
  });
  console.log(sellResponse);
};

main();
