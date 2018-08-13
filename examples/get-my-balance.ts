import Client from '../src/node-client';
import '../env';

const main = async () => {
  const client = new Client({
    baseUrl: process.env.E2E_TEST_URL,
    credentials: {
      publicKey: process.env.E2E_TEST_PUBLIC_KEY as string,
      privateKey: process.env.E2E_TEST_PRIVATE_KEY as string,
    }
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
