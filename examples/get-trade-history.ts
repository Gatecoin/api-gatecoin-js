import Client from '../src/node-client';

const main = async () => {
  const client = new Client({
    publicKey: 'your public key',
    privateKey: 'your private key',
  });

  // get transaction history for the BTC/EUR pair
  const response = await client.getTrades('BTCEUR');
  console.log(response);
};

main();
