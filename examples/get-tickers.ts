import Client from '../src/node-client';

const main = async () => {
  const client = new Client({
    publicKey: 'your public key',
    privateKey: 'your private key',
  });

  // get tickers for all currency
  const response = await client.getTickers();
  console.log(response);

};

main().catch(e => {
  console.error(e);
  process.exit(1);
});

