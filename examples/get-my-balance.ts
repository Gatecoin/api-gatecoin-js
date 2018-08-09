import Client from '../src/node-client';

const main = async () => {
  const client = new Client({
    publicKey: 'your public key',
    privateKey: 'your private key',
  });

  // get balances for all currencies
  const response = await client.getBalances();
  console.log(response);

  // get USD balance
  const usdBalanceResponse = await client.getBalance('USD');
  console.log(usdBalanceResponse);
};

main().catch(e => {
  console.error(e);
  process.exit(1);
});
