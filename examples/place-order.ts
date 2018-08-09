import Client, {Way} from '../src/node-client';

const main = async () => {
  const client = new Client({
    baseUrl: 'https://api.gtcprojects.com/v1',
    publicKey: 'bvM7ViP498BHdC3oFdRHM8WWjRFd32JS',
    privateKey: 'F72D5F953F208647DDAF146DD4CD402F',
  });

  // place a limit buy order for BTC
  const response = await client.placeOrder({
    code: 'BTCEUR',
    way: Way.Bid,
    amount: 1,
    price: 10
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
    price: 20
  });
  console.log(sellResponse);

  // to place a market buy order, don't specify the price
  const marketBuyResponse = await client.placeOrder({
    code: 'BTCEUR',
    way: Way.Bid,
    amount: 1,
  });
  console.log(marketBuyResponse);

  // to place a market sell order, don't specify the price
  const marketSellResponse = await client.placeOrder({
    code: 'BTCEUR',
    way: Way.Ask,
    amount: 1,
  });
  console.log(marketSellResponse);
};

main().catch(e => {
  console.error(e);
  process.exit(1);
});

