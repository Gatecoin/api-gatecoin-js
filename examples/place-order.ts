import Client, {Way} from '../src/node-client';

const main = async () => {
  const client = new Client({
    publicKey: 'your public key',
    privateKey: 'your private key',
  });

  // place a limit buy order for BTC
  const response = await client.order({
    code: 'BTCEUR',
    way: Way.Bid,
    amount: 1,
    price: 10000
  });
  console.log(response);
};

main();
