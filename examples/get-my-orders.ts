import Client from '../src/node-client';

const main = async () => {
  const client = new Client({
    publicKey: 'your public key',
    privateKey: 'your private key',
  });

  // get my open orders for the BTC/EUR pair
  const response = await client.getOrders('BTCEUR');
  console.log(response);
};

main();
